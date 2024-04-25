'use client'

import ActionTooltip from "@/components/ActionTooltip"
import UserAvatar from "@/components/UserAvatar"
import { Member, MemberRole, Profile } from "@prisma/client"
import { ShieldAlert, ShieldCheck } from "lucide-react"

interface ChatItemProps {
  // id: string
  content: string
  member: Member & {
    profile: Profile
  }
  timestamp: string
  // fileUrl: string | null
  // deleted: boolean
  // currentMember: Member
  // isUpdated: boolean
  // socketUrl: string
  // socketQuery: Record<string, any>

}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 text-indigo-500" />,
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 text-rose-500" />,
};

export default function ChatItem({
  // id,
  content,
  member,
  timestamp,
  // fileUrl,
  // deleted,
  // currentMember,
  // isUpdated,
  // socketUrl,
  // socketQuery
}:
  ChatItemProps) {
  return (
    <div className="relative group flex items-center p-4 transition w-full hover:bg-black/5">
      <div className="group flex gap-x-2 items-start w-full">
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <UserAvatar src={member.profile.imageUrl} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p className="font-semibold text-sm cursor-pointer hover:underline mr-2">
                {member.profile.name}
              </p>
              <ActionTooltip label={member.role}>
                {roleIconMap[member.role]}
              </ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              {timestamp}
            </span>
          </div>
          {content}
        </div>
      </div>
    </div>
  )
}
