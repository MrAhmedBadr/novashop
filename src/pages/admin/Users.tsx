import { useState } from "react";
import { Search, MoreHorizontal } from "lucide-react";
import { adminUsers } from "@/data/admin";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";
import { useSeo } from "@/hooks/useSeo";

const statusVariant = {
  active: "success",
  invited: "secondary",
  blocked: "destructive",
} as const;

export default function AdminUsers() {
  useSeo({ title: "Manage Users — Admin" });
  const [query, setQuery] = useState("");
  const filtered = adminUsers.filter(
    (u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">{filtered.length} customers</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users…" className="pl-9" />
      </div>

      <div className="overflow-x-auto rounded-2xl border">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Orders</th>
              <th className="px-4 py-3 font-medium">Spent</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((u) => (
              <tr key={u.id} className="transition-colors hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="text-xs">
                        {u.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={u.role === "admin" ? "default" : "outline"} className="capitalize">
                    {u.role}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{u.orders}</td>
                <td className="px-4 py-3 font-medium">{formatCurrency(u.spent)}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant[u.status]} className="capitalize">
                    {u.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" aria-label="Actions">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast.info(`Viewing ${u.name}`)}>View profile</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.success("Email sent")}>Send email</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => toast.error(`${u.name} blocked`)}>
                        Block user
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
