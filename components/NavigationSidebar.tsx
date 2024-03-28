import NavigationAction from "@/components/NavigationAction";
import { Separator } from "@/components/ui/separator";

export default function NavigationSidebar() {
  return (
    <div className="py-3 text-primary h-full w-full flex flex-col items-center dark:bg-[#1E1F22] space-y-4">
      <NavigationAction />
      <Separator
        className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
      />
    </div>
  )
}
