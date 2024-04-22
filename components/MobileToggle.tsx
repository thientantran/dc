import NavigationSidebar from "@/components/NavigationSidebar";
import ServerSidebar from "@/components/ServerSidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface MobileToggleProps {
  serverId: string;
}
export default function MobileToggle({ serverId }: MobileToggleProps) {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className="p-0 flex gap-0">
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  )
}
