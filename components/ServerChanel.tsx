'use client'
import ActionTooltip from "@/components/ActionTooltip";
import { useModalStore } from "@/hooks/useModalStore";
import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface ServerChanelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video
}
export default function ServerChanel({ channel, server, role }: ServerChanelProps) {
  const params = useParams()
  const router = useRouter()
  const { onOpen } = useModalStore()

  const Icon = iconMap[channel.type]
  return (
    <button className={cn("flex items-center gap-x-2 w-full rounded-md px-2 py-2 mb-1 group hover:bg-zinc-700/10 dark:hover:bg-zinc-700/60 transition",
      params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700")
    }>
      <Icon className="flex-shrink w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      <p className={cn('line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zin-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transistion',
        params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white")
      }>
        {channel.name}
      </p>
      {channel.name !== 'general' && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit onClick={() => { onOpen('editChannel', { server, channel }) }} className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash onClick={() => { onOpen('deleteChannel', { server, channel }) }} className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
          </ActionTooltip>
        </div>
      )}
      {channel.name === 'general' && (
        <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      )}
    </button>
  )
}
