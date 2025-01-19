import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface headerProps{
  userName:string
}

export default function Header({ userName }:headerProps) {
  return (
    <header className="flex items-center p-[1.1rem] bg-card border-b border-border shadow-sm">
      <Avatar className="mr-3">
        {<AvatarFallback>{userName[0]}</AvatarFallback>}
      </Avatar>
      <div className="ml-4 min-w-0">
        <p className="text-sm font-medium text-primary truncate">{userName}</p>
        <p className="text-xs text-muted-foreground truncate">Contact Info</p>
      </div>
    </header>
  );
}
