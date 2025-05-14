import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Home,
  Settings,
  Activity,
  FileText,
  BarChart2,
  User,
  Shield,
  Bell,
} from "lucide-react";
import { NavItemContainer, SubItemsContainer } from "./styles";

interface NavItemProps {
  item: {
    title: string;
    path: string;
    icon: string;
    subItems?: Array<{ title: string; path: string; icon: string }>;
  };
  isExpanded: boolean;
}

const iconComponents: { [key: string]: React.ComponentType<any> } = {
  Home,
  Settings,
  Activity,
  FileText,
  BarChart2,
  User,
  Shield,
  Bell,
};

export const NavItem = ({ item, isExpanded }: NavItemProps) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const Icon = iconComponents[item.icon];

  return (
    <NavItemContainer>
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
        onClick={() => item.subItems && setIsSubMenuOpen(!isSubMenuOpen)}
      >
        {Icon && <Icon size={20} />}
        {isExpanded && (
          <>
            <span className="nav-text">{item.title}</span>
            {item.subItems &&
              (isSubMenuOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              ))}
          </>
        )}
      </NavLink>

      {isExpanded && item.subItems && isSubMenuOpen && (
        <SubItemsContainer>
          {item.subItems.map((subItem) => {
            const SubIcon = iconComponents[subItem.icon];
            return (
              <NavLink
                key={subItem.path}
                to={subItem.path}
                className={({ isActive }) =>
                  isActive ? "sub-link active" : "sub-link"
                }
              >
                {SubIcon && <SubIcon size={16} />}
                <span>{subItem.title}</span>
              </NavLink>
            );
          })}
        </SubItemsContainer>
      )}
    </NavItemContainer>
  );
};
