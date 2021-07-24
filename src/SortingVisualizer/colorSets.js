export const SOLID_COLOR_SET = "Solid Color Set";
export const BOTTOM_GLOW_COLOR_SET = "Bottom Glow Color Set";
export const TOP_GLOW_COLOR_SET = "Top Glow Color Set";
export const HIGH_CONTRAST_COLOR_SET = "High Contrast Color Set";

const mainBlue = "#4dc8ff";
const mainRed = "#f33b65";
const mainYellow = "#f3f399";
const mainGreen = "#35d742";
const glowColor = "#0FF";

// 88F

const solidColors = {
    primaryColor: "linear-gradient(0deg, " + mainBlue + " 100%, #000 0%)",
    compareColor: "linear-gradient(0deg, " + mainRed + " 100%, #000 0%)",
    locallySortedColor: "linear-gradient(0deg, " + mainYellow + " 100%, #000 0%)",
    globallySortedColor: "linear-gradient(0deg, " + mainGreen + " 100%, #000 0%)"
};

const bottomGlow = {
    primaryColor: "linear-gradient(180deg, " + mainBlue + " 50%, " + glowColor + " 90%)",
    compareColor: "linear-gradient(180deg, " + mainRed + " 50%, " + glowColor + " 90%)",
    locallySortedColor: "linear-gradient(180deg, " + mainYellow + " 50%, " + glowColor + " 90%)",
    globallySortedColor: "linear-gradient(180deg, " + mainGreen + " 50%, " + glowColor + " 90%)"
};

const topGlow = {
    primaryColor: "linear-gradient(0deg, " + mainBlue + " 50%, " + glowColor + " 90%)",
    compareColor: "linear-gradient(0deg, " + mainRed + " 50%, " + glowColor + " 90%)",
    locallySortedColor: "linear-gradient(0deg, " + mainYellow + " 50%, " + glowColor + " 90%)",
    globallySortedColor: "linear-gradient(0deg, " + mainGreen + " 50%, " + glowColor + " 90%)"
};

const highContrast = {
    primaryColor: "linear-gradient(0deg, #0FF 100%, #000 0%)",
    compareColor: "linear-gradient(0deg, #F00 100%, #000 0%)",
    locallySortedColor: "linear-gradient(0deg, #F0F 100%, #000 0%)",
    globallySortedColor: "linear-gradient(0deg, #FF0 100%, #000 0%)"
};

// const greeneryScenery = {

// }

// const pinkMania = {
//     primaryColor: "linear-gradient(0deg, #88F 100%, #000 0%)",
//     compareColor: "linear-gradient(0deg, #F00 100%, #000 0%)",
//     locallySortedColor: "linear-gradient(0deg, #F0F 100%, #000 0%)",
//     globallySortedColor: "linear-gradient(0deg, #FF0 100%, #000 0%)"
// }

// const purpleTown = {

// }

// const fourShadesOfGrey = {

// }

export const colorSets = {
    solidColors: solidColors,
    bottomGlow: bottomGlow,
    topGlow: topGlow,
    highContrast: highContrast,
    // pinkMania: pinkMania,
    // purpleTown: purpleTown,
}
