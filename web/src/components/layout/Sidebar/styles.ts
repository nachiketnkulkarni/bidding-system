import styled from "styled-components";
import { theme } from "../../assets/styles/theme";

export const SidebarContainer = styled.div<{ isExpanded: boolean }>`
  width: ${({ isExpanded }) => (isExpanded ? "260px" : "80px")};
  background: ${theme.colors.white};
  height: calc(100vh - 76px);
  position: fixed;
  top: 76px;
  left: 0;
  padding: ${theme.spacing.lg};
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  transition: ${theme.transitions.default};
  overflow: hidden;
  z-index: 999;

  nav {
    margin-top: ${theme.spacing.xl};
  }
`;

export const NavItemContainer = styled.div`
  margin-bottom: ${theme.spacing.sm};
  position: relative;

  .nav-link {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.sm};
    border-radius: 8px;
    color: ${theme.colors.text};
    text-decoration: none;
    transition: ${theme.transitions.default};
    white-space: nowrap;

    &:hover {
      background: ${theme.colors.background};
    }

    &.active {
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
    }

    .nav-text {
      flex: 1;
    }
  }
`;

export const SubItemsContainer = styled.div`
  margin-left: ${theme.spacing.lg};
  padding: ${theme.spacing.xs} 0;

  .sub-link {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    color: ${theme.colors.text};
    text-decoration: none;
    border-radius: 6px;
    font-size: 0.9rem;
    transition: ${theme.transitions.default};

    &:hover {
      background: ${theme.colors.background};
    }

    &.active {
      color: ${theme.colors.primary};
      font-weight: 500;
      background: ${theme.colors.background};
    }
  }
`;

export const ToggleButton = styled.button<{ $isExpanded: boolean }>`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: ${theme.colors.background};
  border: none;
  border-radius: 6px;
  padding: ${theme.spacing.xs};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${theme.transitions.default};
  z-index: 1000;

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    right: ${({ $isExpanded }) => ($isExpanded ? theme.spacing.md : "50%")};
    transform: ${({ $isExpanded }) =>
      $isExpanded ? "none" : "translateX(50%)"};
  }
`;
