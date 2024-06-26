import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import { currentProfile } from "@/lib/current-profile";
import prismadb from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  }
}

export default async function page({
  params
}: ChannelIdPageProps
) {

  const profile = await currentProfile()
  if (!profile) {
    return redirectToSignIn()
  }

  const channel = await prismadb.channel.findUnique({
    where: {
      id: params.channelId,
      serverId: params.serverId
    }
  })

  // dung findFirst thay vi findUnique vi minh dung 2 tham so ma ko unique trong members
  const member = await prismadb.member.findFirst({
    where: {
      profileId: profile.id,
      serverId: params.serverId
    }
  })

  if (!channel || !member) {
    return redirect("/")
  }
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader serverId={params.serverId} name={channel.name} type="channel" />
      <ChatMessages member={member} name={channel.name} chatId={channel.id} type="channel" apiUrl="/api/messages" socketUrl="/api/socket/messages" socketQuery={{
        channelId: channel.id,
        serverId: channel.serverId
      }}
        paramKey="channelId" paramValue={channel.id} />
      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{ channelId: channel.id, serverId: channel.serverId }}
      />
    </div>
  )
}
