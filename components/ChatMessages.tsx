'use client'
import ChatItem from "@/components/ChatItem";
import ChatWelcome from "@/components/ChatWelcome";
import { useChatQuery } from "@/hooks/useChatQuery";
import { useChatSocket } from "@/hooks/useChatSocket";
import { Member, Message, Profile } from "@prisma/client";
import { format } from "date-fns";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";

const DATE_FORMAT = 'd MMM yyyy, HH:mm'

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile
  }
}
interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string
  apiUrl: string
  socketUrl: string
  socketQuery: Record<string, any>
  paramKey: "channelId" | "conversationId"
  paramValue: string
  type: "channel" | "conversation"
}

export default function ChatMessages({ name, member, chatId, apiUrl, socketUrl, socketQuery, paramKey, paramValue, type }: ChatMessagesProps) {
  const queryKey = `chat:${chatId}`
  const addKey = `chat:${chatId}:messages` //`chat:${channelId}:messages:update` `chat:${channelId}:messages`
  const updateKey = `chat:${chatId}:messages:update`
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
    queryKey, apiUrl, paramKey, paramValue
  })
  useChatSocket({ addKey, updateKey, queryKey })
  if (status === 'pending') {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    )
  }
  if (status === 'error') {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong
        </p>
      </div>
    )
  }
  return (
    <div className="flex flex-1 flex-col py-4 overflow-y-auto">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                id={message.id}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                member={message.member}
                content={message.content}
                currentMember={member}
                fileUrl={message.fileUrl}
                deleted={message.deleted}
                isUpdated={message.updatedAt !== message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
