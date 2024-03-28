import NavigationSidebar from '@/components/NavigationSidebar'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-fulls'>
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className='md:pl-[72px] h-full'>
        {children}
      </main>

    </div>
  )
}