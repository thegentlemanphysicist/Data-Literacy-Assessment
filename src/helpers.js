import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export async function getMarkdown(markdownFile, updateState) {
    markdownFile = await fetch(markdownFile);
    markdownFile = await markdownFile.text();
    updateState(markdownFile);
}

export function markdownLinkRenderer(props) {
    return <a href={props.href} target="_blank">{props.children}</a>;
}

export function getUUID() {
    if (localStorage){
        if (localStorage.uuid){
            return localStorage.uuid;
        }
        let uuid = uuidv4();
        localStorage.uuid = uuid;
        return uuid;
    }
    return uuidv4();
}

export const cspsColours = {
    purple: "rgb(63, 42, 86)",
    grey: "rgb(78, 91, 115)",
    lightGrey: "#EDEFF1",
    mediumGrey: "#E5E7EA",
    coral: "#DA797A"
};