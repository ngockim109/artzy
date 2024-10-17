/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#E76F51";
const tintColorDark = "#E76F51";
const primaryColor = "#E76F51";
const secondaryColor = "#F4A261";
const secondaryColorDark = "#F4A261";
const thirdColor = "rgb(243 244 246)";
const thirdColorDark = "rgb(243 244 246)";
const primaryColorDark = "#E76F51";
const highlightColor = "#FF0000";
const grayLight = "rgb(243 244 246)";
const grayLightDark = "rgb(243 244 246)";

export const Colors = {
  light: {
    primary: primaryColor,
    secondary: secondaryColor,
    grayLight: grayLight,
    text: "#11181C",
    buttonOutlineText: primaryColor,
    badge: secondaryColor,
    search: primaryColor,
    highlight: highlightColor,
    badgeText: "#000",
    title: primaryColor,
    subtitle: primaryColor,
    background: "#FAFAFA",
    backgroundProduct: "rgb(243 244 246)",
    tint: tintColorLight,
    icon: primaryColor,
    link: primaryColor,
    tabIconDefault: primaryColor,
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: primaryColor,
    secondary: secondaryColorDark,
    grayLight: grayLightDark,
    text: "#ECEDEE",
    buttonOutlineText: primaryColorDark,
    badge: secondaryColorDark,
    search: primaryColorDark,
    highlight: highlightColor,
    badgeText: "#000",
    title: primaryColorDark,
    subtitle: primaryColorDark,
    background: "#151718",
    backgroundProduct: "rgb(243 244 246)",
    tint: tintColorDark,
    icon: primaryColorDark,
    link: primaryColorDark,
    tabIconDefault: primaryColorDark,
    tabIconSelected: tintColorDark,
  },
};
