import styled from "styled-components";
import { theme } from "../../assets/styles/theme";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md};
  background: ${theme.colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 76px;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-wrap: wrap;
    gap: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    justify-content: flex-start;
    gap: ${theme.spacing.md};
  }
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.primary};
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.background};
  padding: ${theme.spacing.sm};
  border-radius: 8px;
  flex: 0 1 400px;

  input {
    border: none;
    background: transparent;
    outline: none;
    width: 100%;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  position: relative;
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: ${theme.colors.background};
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  }
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: ${theme.spacing.sm};
  width: 200px;

  li {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    padding: ${theme.spacing.sm};
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: ${theme.colors.background};
    }
  }
`;

export const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  padding: ${theme.spacing.sm};
  cursor: pointer;
  color: ${theme.colors.primary};

  @media (max-width: ${theme.breakpoints.lg}) {
    display: block;
  }
`;
