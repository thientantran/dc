import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <p className="text-green-500 text-3xl font-bold">Hello world</p>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>

  );
}
