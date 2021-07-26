export const CLASSIC_COLOR_SET = "Classic";
export const BOTTOM_GLOW_COLOR_SET = "Bottom Glow";
export const TOP_GLOW_COLOR_SET = "Top Glow";
export const HIGH_CONTRAST_COLOR_SET = "High Contrast";
export const PURPLE_PINK_COLOR_SET = "Purple Pink";
export const GREY_COLOR_SET = "Grey";
export const GREEN_YELLOW_COLOR_SET = "Green Yellow";

const mainBlue = "#4dc8ff";
const mainRed = "#f33b65";
const mainYellow = "#f3f399";
const mainGreen = "#35d742";
const glowColor = "#0FF";

const classicColors = {
    primaryColor: `linear-gradient(0deg, ${mainBlue} 100%, #000 0%)`,
    compareColor: `linear-gradient(0deg, ${mainRed} 100%, #000 0%)`,
    locallySortedColor: `linear-gradient(0deg, ${mainYellow} 100%, #000 0%)`,
    globallySortedColor: `linear-gradient(0deg, ${mainGreen} 100%, #000 0%)`
};

const glowPosition = "50%";
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
    primaryColor: `linear-gradient(0deg, #FFF 100%, #000 0%)`,
    compareColor: `linear-gradient(0deg, #FA4 100%, #000 0%)`,
    locallySortedColor: `linear-gradient(0deg, #F4A 100%, #000 0%)`,
    globallySortedColor: `linear-gradient(0deg, #4FF 100%, #000 0%)`
};

const greenYellow = {
    primaryColor: `linear-gradient(180deg, #6faf6f ${glowPosition}, #eee ${nonGlowPosition})`,
    compareColor: `linear-gradient(180deg, #ff3b55 ${glowPosition}, #eee ${nonGlowPosition})`,
    locallySortedColor: `linear-gradient(180deg, #C4FF37 ${glowPosition}, #eee ${nonGlowPosition})`,
    globallySortedColor: `linear-gradient(180deg, #FF8 ${glowPosition}, #eee ${nonGlowPosition})`
}

const purplePink = {
    primaryColor: `linear-gradient(180deg, #88F ${glowPosition}, #eee ${nonGlowPosition})`,
    compareColor: `linear-gradient(180deg, #ff4b65 ${glowPosition}, #eee ${nonGlowPosition})`,
    locallySortedColor: `linear-gradient(180deg, #DA5FFF ${glowPosition}, #eee ${nonGlowPosition})`,
    globallySortedColor: `linear-gradient(180deg, #FFB2D7 ${glowPosition}, #eee ${nonGlowPosition})`
}

const fourShadesOfGrey = {
    primaryColor: `linear-gradient(180deg, #555 ${glowPosition}, #000 100%)`,
    compareColor: `linear-gradient(180deg, #BBB ${glowPosition}, #000 100%)`,
    locallySortedColor: `linear-gradient(180deg, #888 ${glowPosition}, #000 100%)`,
    globallySortedColor: `linear-gradient(180deg, #F7F7F7 ${glowPosition}, #000 100%)`
}

export const colorSets = {
    classicColors: classicColors,
    bottomGlow: bottomGlow,
    topGlow: topGlow,
    highContrast: highContrast,
    purplePink: purplePink,
    greenYellow: greenYellow,
    fourShadesOfGrey: fourShadesOfGrey,
}
