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
const gray = "rgb(107 114 128)";
const slate = "rgb(229 231 235)";
const slateDark = "rgb(229 231 235)";
const grayDark = "rgb(107 114 128)";
const buttonPrimaryText = "#fff";
const buttonPrimaryTextDark = "#fff";
const yellow = "#E9C46A";
const bottomSheetBg = "#fff";
const blackColor = "#000";
const whiteColor = "#fff";

export const Colors = {
  light: {
    primary: primaryColor,
    secondary: secondaryColor,
    grayLight: grayLight,
    gray: gray,
    slate: slate,
    text: "#11181C",
    textCard: "#11181C",
    textSearchBar: "#000",
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
    buttonPrimaryText: buttonPrimaryText,
    ratingBar: yellow,
    bottomSheetBg: bottomSheetBg,
    white: whiteColor,
  },
  dark: {
    primary: primaryColor,
    secondary: secondaryColorDark,
    grayLight: grayLightDark,
    gray: grayDark,
    slate: slate,
    white: blackColor,
    text: "#fff",
    textCard: "#000",
    textSearchBar: grayDark,
    buttonOutlineText: primaryColorDark,
    badge: secondaryColorDark,
    search: secondaryColorDark,
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
    buttonPrimaryText: buttonPrimaryTextDark,
    ratingBar: yellow,
    bottomSheetBg: bottomSheetBg,
  },
};
