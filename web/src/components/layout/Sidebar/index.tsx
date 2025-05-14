import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavItem } from "./NavItem";
import { SidebarContainer, ToggleButton } from "./styles";

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: "Home",
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: "Activity",
    subItems: [
      { title: "Reports", path: "/reports", icon: "FileText" },
      { title: "Statistics", path: "/statistics", icon: "BarChart2" },
    ],
  },
  {
    title: "Settings",
    path: "/settings",
    icon: "Settings",
    subItems: [
      { title: "Profile", path: "/profile", icon: "User" },
      { title: "Security", path: "/security", icon: "Shield" },
      { title: "Notifications", path: "/notifications", icon: "Bell" },
    ],
  },
];

export const Sidebar = ({ isExpanded, onToggle }: SidebarProps) => {
  return (
    <SidebarContainer isExpanded={isExpanded}>
      <ToggleButton onClick={onToggle} $isExpanded={isExpanded}>
        {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </ToggleButton>

      <nav>
        {menuItems.map((item) => (
          <NavItem key={item.path} item={item} isExpanded={isExpanded} />
        ))}
      </nav>
    </SidebarContainer>
  );
};
