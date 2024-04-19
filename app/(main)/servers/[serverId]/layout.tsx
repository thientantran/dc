import ServerSidebar from '@/components/ServerSidebar';
import { currentProfile } from '@/lib/current-profile';
import prismadb from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function layout({ children, params }: { children: React.ReactNode, params: { serverId: string } }) {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn()
  }
  const server = await prismadb.server.findUnique({
    // tìm server với serverId, và phải có ít nhất 1 thành viên có profileId là userId của profile, tức nghĩa nếu cái user này không phải là thành viên của server thì sẽ không truy cập được
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id
        }

      },
    },

  })
  if (!server) {
    return redirect("/")
  }

  // Add the return statement with the correct JSX element
  return (
    <div className='h-full'>
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">
        {children}
      </main>
    </div>
  )
}
