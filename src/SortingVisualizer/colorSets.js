export const SOLID_COLOR_SET = "Solid Color Set";
export const BOTTOM_GLOW_COLOR_SET = "Bottom Glow Color Set";
export const TOP_GLOW_COLOR_SET = "Top Glow Color Set";
export const HIGH_CONTRAST_COLOR_SET = "High Contrast Color Set";

const colorSet1 = {
    primaryColor: "linear-gradient(0deg, #3a7bd5 100%, #00d2ff 0%)",
    compareColor: "linear-gradient(0deg, #e37bd5 100%, #00d2ff 0%)",
    locallySortedColor: "linear-gradient(0deg, #e3ebd5 100%, #00d2ff 0%)",
    globallySortedColor: "linear-gradient(0deg, #35d742 100%, #00d2ff 00%)"
};

const colorSet2 = {
    primaryColor: "linear-gradient(180deg, #3a9bf5 50%, #00f5f5 80%)",
    compareColor: "linear-gradient(180deg, #e33b65 50%, #00d2ff 90%)",
    locallySortedColor: "linear-gradient(180deg, #e3ebd5 50%, #00d2ff 90%)",
    globallySortedColor: "linear-gradient(180deg, #35d742 50%, #00d2ff 90%)"
};

const colorSet3 = {
    primaryColor: "linear-gradient(180deg, #3a7bd5 40%, #00d2ff 90%)",
    compareColor: "linear-gradient(180deg, #e37bd5 40%, #00d2ff 90%)",
    locallySortedColor: "linear-gradient(180deg, #e3ebd5 40%, #00d2ff 90%)",
    globallySortedColor: "linear-gradient(180deg, #35d742 40%, #00d2ff 90%)"
};

const colorSet4 = {
    primaryColor: "linear-gradient(0deg, #3a7bd5 0%, #00d2ff 80%)",
    compareColor: "linear-gradient(0deg, #e37bd5 0%, #00d2ff 80%)",
    locallySortedColor: "linear-gradient(0deg, #e3ebd5 0%, #00d2ff 80%)",
    globallySortedColor: "linear-gradient(0deg, #35d742 0%, #00d2ff 80%)"
};

export const colorSets = {
    solidColors: colorSet1,
    bottomGlow: colorSet2,
    topGlow: colorSet3,
    highContrast: colorSet4
}
