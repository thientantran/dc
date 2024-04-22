'use client'

import UserAvatar from "@/components/UserAvatar";
import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server
}

const roleIconMap = {
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
  [MemberRole.MODERATOR]: <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />,
  [MemberRole.GUEST]: null
}
export default function ServerMember({ member, server }: ServerMemberProps) {

  const params = useParams()
  const router = useRouter()

  const icon = roleIconMap[member.role]

  const onClick = () => {
    router.push(`/servers/${server.id}/conversations/${member.id}`)
  }
  return (
    <button onClick={onClick} className={cn("px-2 py-2 rounded-md flex items-center gap-x-2 w-full group hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
      params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700")
    }>
      <UserAvatar src={member.profile.imageUrl} className="w-8 h-8" />
      <p className={cn('line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zin-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transistion',
        params?.memberId === member.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white")
      }>
        {member.profile.name}
      </p>
    </button>
  )
}
