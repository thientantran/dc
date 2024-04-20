'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useModalStore } from "@/hooks/useModalStore";
import { useState } from "react";


export default function LeaveServerModal() {
  // goi modal tu store
  const [isLoading, setIsLoading] = useState(false)
  const { onOpen, isOpen, onClose, type, data } = useModalStore();
  const isModalOpen = isOpen && type === 'leaveServer';

  const { server } = data


  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Do you want to leave this server
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          LEAVE
        </div>
      </DialogContent>
    </Dialog>
  )
}
