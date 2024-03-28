import { Plus } from "lucide-react";
import ActionTooltip from "./ActionTooltip";

export default function NavigationAction() {
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button className="group flex items-center">
          <div className="flex items-center justify-center h-[48px] w-[48px] bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden mx-3">
            <Plus className="group-hover:text-white transition text-emerald-500" size={25} />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}
