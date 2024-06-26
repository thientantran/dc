import { currentProfilePages } from "@/lib/current-profile-pages";
import prismadb from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { MemberRole } from "@prisma/client";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  if (req.method !== 'DELETE' && req.method !== 'PATCH') {

    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const profile = await currentProfilePages(req)

    const { directMessageId, conversationId } = req.query
    const { content } = req.body
    if (!profile) {
      return res.status(401).json({ error: 'Unauthorized' })

    }
    if (!conversationId) {
      return res.status(400).json({ error: 'Conversation ID missing' })
    }

    const conversation = await prismadb.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            memberOne: {
              profileId: profile.id
            }
          },
          {
            memberTwo: {
              profileId: profile.id

            }
          }
        ]
      },
      include: {
        memberOne: {
          include: {
            profile: true
          }
        },
        memberTwo: {
          include: {
            profile: true
          }

        }
      }
    })
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' })
    }

    const member = conversation.memberOne.profileId === profile.id ? conversation.memberOne : conversation.memberTwo

    if (!member) {
      return res.status(404).json({ error: 'Member not found' })
    }
    let directMessage = await prismadb.directMessage.findFirst({
      where: {
        id: directMessageId as string,
        conversationId: conversationId as string
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    })

    if (!directMessage || directMessage.deleted) {
      return res.status(404).json({ error: 'message not found' })
    }

    const isMessageOwner = directMessage.memberId === member.id
    const isAdmin = member.role === MemberRole.ADMIN
    const isModerator = member.role === MemberRole.MODERATOR
    const canModify = isMessageOwner || isAdmin || isModerator
    if (!canModify) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    if (req.method === "DELETE") {
      directMessage = await prismadb.directMessage.update({
        where: {
          id: directMessageId as string
        },
        data: {
          fileUrl: null,
          deleted: true,
          content: "This message has been deleted"
        },
        include: {
          member: {
            include: {
              profile: true
            }
          }
        }
      })
    }
    if (req.method === "PATCH") {
      console.log("PATCH")
      if (!isMessageOwner) {
        return res.status(401).json({ error: "Unauthorized" })
      }
      directMessage = await prismadb.directMessage.update({
        where: {
          id: directMessageId as string
        },
        data: {
          content: content
        },
        include: {
          member: {
            include: {
              profile: true
            }
          }
        }
      })
    }
    const updateKey = `chat:${conversation.id}:messages:update`
    res?.socket?.server?.io?.emit(updateKey, directMessage)

    return res.status(200).json(directMessage)
  } catch (error) {
    console.log("[MESSAGE_ID", error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}