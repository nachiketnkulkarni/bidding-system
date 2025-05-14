import { useState } from "react";
import {
  Menu,
  Search,
  User,
  ChevronDown,
  LogOut,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom"; // Added for navigation
import {
  HeaderContainer,
  Logo,
  SearchContainer,
  UserContainer,
  DropdownMenu,
  MenuToggle,
} from "./styles";

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderContainer>
      <MenuToggle onClick={onMenuToggle}>
        <Menu size={24} />
      </MenuToggle>

      <Logo>Admin Dashboard</Logo>

      <SearchContainer>
        <Search size={20} />
        <input type="text" placeholder="Search..." />
      </SearchContainer>

      <UserContainer onClick={() => setIsOpen(!isOpen)}>
        <div className="user-info">
          <User size={24} />
          <span>John Doe</span>
          <ChevronDown size={18} />
        </div>

        {isOpen && (
          <DropdownMenu>
            <li>
              <NavLink to="/settings">
                <Settings size={16} />
                <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout">
                <LogOut size={16} />
                <span>Logout</span>
              </NavLink>
            </li>
          </DropdownMenu>
        )}
      </UserContainer>
    </HeaderContainer>
  );
};
