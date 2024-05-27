import { extendTheme } from "@chakra-ui/react";

export const COLORS = {
  PRIMARY: "#846273",
  SECONDARY: "#e8e7e5",
  BACKGROUND: "#f6f0e4",
  TEXT: "#333333",
  ACCENT: "#94302e",
  WHITE: "#FFFFFF",
  TABLEONE: "#cbddde",
  TABLETWO: "#78aabd",
};

export const theme = extendTheme({
  colors: {
    primary: COLORS.PRIMARY,
    secondary: COLORS.SECONDARY,
    background: COLORS.BACKGROUND,
    text: COLORS.TEXT,
    accent: COLORS.ACCENT,
  },
  fonts: {
    heading: "'Niconne', cursive",
    body: "'Niconne', sans-serif",
  },
  styles: {
    global: {
      body: {
        backgroundColor: "background",
        color: "text",
        lineHeight: "base",
        fontFamily: "body",
        overscrollBehavior: "none",
      },
      a: {
        color: "primary",
        _hover: {
          textDecoration: "underline",
        },
      },
      h1: {
        fontFamily: "heading",
      },
      h2: {
        fontFamily: "heading",
      },
      h3: {
        fontFamily: "heading",
      },
      h4: {
        fontFamily: "heading",
      },
      h5: {
        fontFamily: "heading",
      },
      h6: {
        fontFamily: "heading",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        solid: {
          bg: "primary",
          color: "white",
          _hover: {
            bg: "accent",
          },
        },
      },
    },
  },
});
