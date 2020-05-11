const fs = require("fs");

// Import the meta details as JSON
let metadata = fs.readFileSync("./meta.json");
metadata = JSON.parse(metadata);

// Import the built index.html as a string
let index = fs.readFileSync("./build/index.html", "utf8");

// Create the /fr folder for the french version
fs.mkdirSync("./build/fr");

// Add the appropriate meta details for each language and save the file
fs.writeFileSync("./build/fr/index.html", addMetaTags(index, "fr"));
fs.writeFileSync("./build/index.html", addMetaTags(index, "en"));

// Function which uses regex to go through and replace the default strings with the supplied meta tags
function addMetaTags(html, lang) {
    let tags = metadata[lang];
    html = html.replace(/_setMeta_lang_/g, tags.lang);
    html = html.replace(/_setMeta_title_/g, tags.title);
    html = html.replace(/_setMeta_description_/g, tags.description);
    html = html.replace(/_setMeta_url_/g, tags.url);
    html = html.replace(/_setMeta_image_/g, tags.image);
    return html;
}