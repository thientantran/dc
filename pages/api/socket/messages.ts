import { currentProfilePages } from "@/lib/current-profile-pages";
import prismadb from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const profile = await currentProfilePages(req)
    const { content, fileUrl } = req.body
    const { serverId, channelId } = req.query

    if (!profile) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!serverId) {
      return res.status(400).json({ message: 'Server ID is required' })
    }

    if (!channelId) {
      return res.status(400).json({ message: 'Channel ID is required' })
    }
    if (!content) {
      return res.status(400).json({ message: 'Content ID is required' })
    }

    const server = await prismadb.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id
          }
        }
      },
      include: {
        members: true
      }
    })

    if (!server) {
      return res.status(404).json({ message: 'Server not found' })
    }

    const channel = prismadb.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string
      }
    })

    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' })
    }

    const member = server.members.find(member => member.profileId === profile.id)

    if (!member) {
      return res.status(404).json({ message: 'Member not found' })
    }

    const message = await prismadb.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    })

    const channelKey = `chat:${channelId}:messages`

    res?.socket?.server?.io?.emit(channelKey, message)

    return res.status(201).json(message)
  } catch (error) {
    console.log("[MESSAGE_ERROR]", error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}