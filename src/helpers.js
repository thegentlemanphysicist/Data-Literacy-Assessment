export async function getMarkdown(markdownFile, updateState) {
    markdownFile = await fetch(markdownFile);
    markdownFile = await markdownFile.text();
    updateState(markdownFile);
}

export const cspsColours = {
    purple: "rgb(63, 42, 86)",
    grey: "rgb(78, 91, 115)",
    lightGrey: "#EDEFF1",
    mediumGrey: "#E5E7EA",
    coral: "#DA797A"
};