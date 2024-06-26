import prismadb from "@/lib/db"

const findConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await prismadb.conversation.findFirst({
      where: {
        AND: [
          { memberOneId },
          { memberTwoId }
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
  } catch (error) {
    return null
  }

}

const createNewConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await prismadb.conversation.create({
      data: {
        memberOneId,
        memberTwoId
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
  } catch (error) {
    return null
  }
}

export const getOrCreateConversation = async (memberOneId: string, memberTwoId: string) => {
  let conversation = await findConversation(memberOneId, memberTwoId) || await findConversation(memberTwoId, memberOneId)

  if (!conversation) {
    conversation = await createNewConversation(memberOneId, memberTwoId)
  }

  return conversation
}