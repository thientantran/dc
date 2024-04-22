import NavigationAction from "@/components/NavigationAction";
import NavigationItem from "@/components/NavigationItem";
import { ModeToggle } from "@/components/mode-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import prismadb from "@/lib/db";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function NavigationSidebar() {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }
  const servers = await prismadb.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });
  return (
    <div className="py-3 text-primary h-full w-full flex flex-col items-center dark:bg-[#1E1F22] bg-[#E3E5E8] space-y-4">
      <NavigationAction />
      <Separator
        className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
      />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem id={server.id} imageUrl={server.imageUrl} name={server.name} />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]"
            }
          }}
        />
      </div>
    </div>
  )
}
