import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  PRIMARY_COLOR: "#00B4D8",
  SECONDARY_COLOR: "#90E0EF",
  BACKGROUND_COLOR: "#CAF0F8",
  TEXT_COLOR: "#03045E",
};

export const darkTheme = {
  PRIMARY_COLOR: "#03045E",
  SECONDARY_COLOR: "#9023e8a",
  BACKGROUND_COLOR: "#0077B6",
  TEXT_COLOR: "#CAF0F8",
};

export const GlobalStyle = createGlobalStyle`

    body {
        background-color: ${(props) => props.theme.BACKGROUND_COLOR}
        color: ${(props) => props.theme.TEXT_COLOR}
    }
    
`;
