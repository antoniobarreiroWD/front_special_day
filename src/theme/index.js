import { extendTheme } from "@chakra-ui/react";


export const COLORS = {
  PRIMARY: "#0f172a",
  SECONDARY: "#096394 ",
  BACKGROUND: "#white",
  TEXT: "#333333",
  ACCENT: "#20afd0 ",
  WHITE: "#FFFFFF",
  TABLEONE: "#cbddde ",
  TABLETWO: "#78aabd  ",
};


export const theme = extendTheme({
  colors: {
    primary: COLORS.PRIMARY,
    secondary: COLORS.SECONDARY,
    background: COLORS.BACKGROUND,
    text: COLORS.TEXT,
    accent: COLORS.ACCENT,
  },
  styles: {
    global: {
      body: {
        backgroundColor: "background",
        color: "text",
        lineHeight: "base",
        overscrollBehavior: "none",
      },
      a: {
        color: "primary",
        _hover: {
          textDecoration: "underline",
        },
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
