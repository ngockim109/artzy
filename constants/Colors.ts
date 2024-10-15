/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#E76F51";
const tintColorDark = "#E76F51";
const primaryColor = "#E76F51";
const primaryColorDark = "#E76F51";
const highlightColor = "#FF0000";

export const Colors = {
  light: {
    primary: primaryColor,
    text: "#11181C",
    buttonOutlineText: primaryColor,
    badge: primaryColor,
    search: primaryColor,
    highlight: highlightColor,
    badgeText: "#fff",
    title: primaryColor,
    subtitle: primaryColor,
    background: "#FAFAFA",
    tint: tintColorLight,
    icon: primaryColor,
    link: primaryColor,
    tabIconDefault: primaryColor,
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: primaryColor,
    text: "#ECEDEE",
    buttonOutlineText: primaryColorDark,
    badge: primaryColorDark,
    search: primaryColorDark,
    highlight: highlightColor,
    badgeText: "#fff",
    title: primaryColorDark,
    subtitle: primaryColorDark,
    background: "#151718",
    tint: tintColorDark,
    icon: primaryColorDark,
    link: primaryColorDark,
    tabIconDefault: primaryColorDark,
    tabIconSelected: tintColorDark,
  },
};
