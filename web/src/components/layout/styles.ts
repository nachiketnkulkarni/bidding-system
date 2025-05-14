import { styled } from "@mui/material";
import { theme } from "../../assets/styles/theme";

export const MainLayout = styled("div")`
  display: flex;
  min-height: 100vh;
`;

export const Content = styled("main")<{ $isExpanded: boolean }>`
  flex: 1;
  padding: ${theme.spacing.lg};
  margin-left: ${({ $isExpanded }) => ($isExpanded ? "260px" : "80px")};
  transition: ${theme.transitions.default};
  margin-top: 76px; /* Header height */

  @media (max-width: ${theme.breakpoints.lg}) {
    margin-left: 0;
    padding: ${theme.spacing.md};
  }
`;
