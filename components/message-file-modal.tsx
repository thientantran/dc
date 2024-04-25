'use client'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import { useForm } from "react-hook-form";

import { FileUpload } from "@/components/file-uploadthing";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useModalStore } from "@/hooks/useModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import qs from 'query-string';
import * as z from "zod";
const initialSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "File is required"
  })
})

export default function MessageFileModal() {
  const { isOpen, onClose, type, data } = useModalStore()
  const { apiUrl, query } = data
  const isModalOpen = isOpen && type === 'messageFile'
  const form = useForm<z.infer<typeof initialSchema>>({
    resolver: zodResolver(initialSchema),
    defaultValues: {
      fileUrl: ""
    }
  })

  const { isLoading } = form.formState
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof initialSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query
      })
      await axios.post(url, {
        ...values,
        content: values.fileUrl
      });

      form.reset();
      router.refresh();
      handleClose()
    } catch (error) {
      console.log(error);
    }
  }
  const handleClose = () => {
    form.reset()
    onClose()
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Send a file as a message
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="text-2xl text-center font-bold">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="messageFile"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant='primary' className="w-full" disabled={isLoading}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
