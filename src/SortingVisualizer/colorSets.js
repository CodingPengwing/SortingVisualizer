    export const SOLID_COLOR_SET = "Solid Color Set";
export const BOTTOM_GLOW_COLOR_SET = "Bottom Glow Color Set";
export const TOP_GLOW_COLOR_SET = "Top Glow Color Set";
export const HIGH_CONTRAST_COLOR_SET = "High Contrast Color Set";

const mainBlue = "#4dc8ff";
const mainRed = "#f33b65";
const mainYellow = "#f3f399";
const mainGreen = "#35d742";
const glowColor = "#0FFE";

const solidColors = {
    primaryColor: "linear-gradient(0deg, " + mainBlue + " 100%, #000 0%)",
    compareColor: "linear-gradient(0deg, " + mainRed + " 100%, #000 0%)",
    locallySortedColor: "linear-gradient(0deg, " + mainYellow + " 100%, #000 0%)",
    globallySortedColor: "linear-gradient(0deg, " + mainGreen + " 100%, #000 0%)"
};

const glowPosition = "35%";
const nonGlowPosition = "90%";

const bottomGlow = {
    primaryColor: `linear-gradient(180deg, ${mainBlue} ${glowPosition}, ${glowColor} ${nonGlowPosition}`,
    compareColor: `linear-gradient(180deg, ${mainRed} ${glowPosition}, ${glowColor} ${nonGlowPosition}`,
    locallySortedColor: `linear-gradient(180deg, ${mainYellow} ${glowPosition}, ${glowColor} ${nonGlowPosition}`,
    globallySortedColor: `linear-gradient(180deg, ${mainGreen} ${glowPosition}, ${glowColor} ${nonGlowPosition}`
};

const topGlow = {
    primaryColor: `linear-gradient(0deg, ${mainBlue} ${glowPosition}, ${glowColor} ${nonGlowPosition}`,
    compareColor: `linear-gradient(0deg, ${mainRed} ${glowPosition}, ${glowColor} ${nonGlowPosition}`,
    locallySortedColor: `linear-gradient(0deg, ${mainYellow} ${glowPosition}, ${glowColor} ${nonGlowPosition}`,
    globallySortedColor: `linear-gradient(0deg, ${mainGreen} ${glowPosition}, ${glowColor} ${nonGlowPosition}`
};

const highContrast = {
    primaryColor: "linear-gradient(0deg, #FFF 100%, #000 0%)",
    compareColor: "linear-gradient(0deg, #FA4 100%, #000 0%)",
    locallySortedColor: "linear-gradient(0deg, #F4A 100%, #000 0%)",
    globallySortedColor: "linear-gradient(0deg, #4FF 100%, #000 0%)"
};

// const greeneryScenery = {

// }

// 88F
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
