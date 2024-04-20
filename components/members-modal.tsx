'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useModalStore } from "@/hooks/useModalStore";


export default function MembersModal() {
  const { onOpen, isOpen, onClose, type, data } = useModalStore();
  const isModalOpen = isOpen && type === 'members';

  const { server } = data



  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          Members
        </div>
      </DialogContent>
    </Dialog>
  )
}
