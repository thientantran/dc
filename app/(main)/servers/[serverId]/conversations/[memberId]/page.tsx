import ChatHeader from "@/components/ChatHeader"
import ChatInput from "@/components/ChatInput"
import ChatMessages from "@/components/ChatMessages"
import { getOrCreateConversation } from "@/lib/conversation"
import { currentProfile } from "@/lib/current-profile"
import prismadb from "@/lib/db"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function page({ params }: { params: { serverId: string, memberId: string } }) {
  const profile = await currentProfile()
  if (!profile) {
    return redirectToSignIn()
  }

  const currentMember = await prismadb.member.findFirst({
    where: {
      profileId: profile.id,
      serverId: params.serverId
    }
  })

  if (!currentMember) {
    return redirect("/")
  }

  const conversation = await getOrCreateConversation(currentMember.id, params.memberId)

  if (!conversation) {
    return redirect(`/servers/${params.serverId}/`)
  }

  const { memberOne, memberTwo } = conversation
  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne

  return (
    <div className="bg-white flex flex-col h-full dark:bg-[#313338]">
      <ChatHeader serverId={params.serverId} imageUrl={otherMember.profile.imageUrl} name={otherMember.profile.name} type="conversation" />
      <ChatMessages
        member={currentMember}
        name={otherMember.profile.name}
        chatId={conversation.id}
        type="conversation"
        apiUrl="/api/direct-messages"
        paramKey="conversationId"
        paramValue={conversation.id}
        socketUrl="/api/socket/direct-messages"
        socketQuery={{
          conversationId: conversation.id
        }}
      />
      <ChatInput
        name={otherMember.profile.name}
        type="conversation"
        apiUrl="/api/socket/direct-messages"
        query={{
          conversationId: conversation.id
        }}
      />
    </div>
  )
}
