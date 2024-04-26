import { currentProfile } from "@/lib/current-profile"
import prismadb from "@/lib/db"
import { DirectMessage } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const profile = await currentProfile()
    const { searchParams } = new URL(req.url)

    const cursor = searchParams.get("cursor")
    const conversationId = searchParams.get("conversationId")

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!conversationId) {
      return new NextResponse("Conversation ID MISSING", { status: 400 })
    }

    let messages: DirectMessage[] = [];

    if (cursor) {
      messages = await prismadb.directMessage.findMany({
        take: Number(process.env.MESSAGES_BATCH),
        skip: 1,
        cursor: {
          id: cursor
        },
        where: {
          conversationId
        },
        include: {
          member: {
            include: {
              profile: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      })

    } else {
      messages = await prismadb.directMessage.findMany({
        take: Number(process.env.MESSAGES_BATCH),
        where: {
          conversationId
        },
        include: {
          member: {
            include: {
              profile: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      })
    }

    let nextCursor = null
    if (messages.length === Number(process.env.MESSAGES_BATCH)) {
      nextCursor = messages[messages.length - 1].id
    }

    return NextResponse.json({
      items: messages,
      nextCursor
    })
  } catch (error) {
    console.log("[DIRECT_MESSAGES_GET_Error: ", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}