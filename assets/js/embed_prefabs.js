const PREFABS = [
    "pf_header",
];
const ASSETS_FOLDER = document.querySelector('script').getAttribute('data-assets-folder');


for (filename of PREFABS) {
    try { // if the web won't let me do this in an elegant way, i won't write elegant code either
        fetch(ASSETS_FOLDER + 'html/' + filename + ".html")
        .then(res => res.text())
        .then(text => {
        
        
        let redirected_text = text.replaceAll("../", ASSETS_FOLDER);

        document.getElementById(filename).innerHTML = redirected_text;
        })
    } catch {continue;}
}
