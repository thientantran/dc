'use client'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/useModalStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from 'query-string';
import { useState } from "react";

export default function DeleteMessageModal() {
  // goi modal tu store
  const [isLoading, setIsLoading] = useState(false)
  const { onOpen, isOpen, onClose, type, data } = useModalStore();
  const isModalOpen = isOpen && type === 'deleteMessage';

  const { server, channel } = data
  const router = useRouter()

  const onClick = async () => {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id
        }
      })
      await axios.delete(url)
      onClose()
      router.push(`/servers/${server?.id}`)
      router.refresh()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)

    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to this? <br />
            <span className="text-indigo-500 font-semibold">
              #{channel?.name} will be permanently deleted.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button variant='ghost' disabled={isLoading} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='primary' disabled={isLoading} onClick={onClick}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
