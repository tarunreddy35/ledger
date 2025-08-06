import { 
  LayoutDashboard, 
  FileText, 
  Building2, 
  GitMerge, 
  Mail, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  open: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "ledger", label: "Ledger Entries", icon: FileText },
  { id: "bank", label: "Bank Statements", icon: Building2 },
  { id: "reconciliation", label: "Reconciliation", icon: GitMerge },
  { id: "email", label: "Email Sync", icon: Mail },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({ open, activeSection, setActiveSection }: SidebarProps) => {
  return (
    <aside 
      className={cn(
        "bg-card border-r border-border transition-all duration-300 ease-in-out flex-shrink-0",
        open ? "w-64" : "w-16"
      )}
    >
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 transition-all duration-200",
                !open && "px-0 justify-center",
                isActive && "gradient-primary text-white shadow-[var(--shadow-glow)]"
              )}
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {open && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
};