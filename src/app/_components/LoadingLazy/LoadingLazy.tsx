import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

export function LoadingLazy() {
  return (
    <div className="flex items-center justify-center h-75 bg-slate-500/50">
      <Badge className=" w-20 h-10 font-extrabold">
        <Spinner data-icon="inline-start " />
        Syncing
      </Badge>
    </div>
  );
}
