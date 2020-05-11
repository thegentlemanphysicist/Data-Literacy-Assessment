export async function getMarkdown(markdownFile, updateState) {
    markdownFile = await fetch(markdownFile);
    markdownFile = await markdownFile.text();
    updateState(markdownFile);
}