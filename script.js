let fileNameInput;
let languageInput;
let borderStyleInput;
let colorSchemeInput;
let codeFontInput;
let codeFontSizeInput;
let titleFontInput;
let titleFontSizeInput;
let codeInput;

let previewLang;
let previewTitleBar;
let previewTitle;
let previewCode;

function onload()
{
    fileNameInput = document.getElementById("snippet-controls-filename");
    languageInput = document.getElementById("snippet-controls-language");
    borderStyleInput = document.getElementById("snippet-controls-borderstyle");
    colorSchemeInput = document.getElementById("snippet-controls-colorscheme");
    codeFontInput = document.getElementById("snippet-controls-codefont");
    codeFontSizeInput = document.getElementById("snippet-controls-codefont-size");
    titleFontInput = document.getElementById("snippet-controls-titlefont");
    titleFontSizeInput = document.getElementById("snippet-controls-titlefont-size");
    codeInput = document.getElementById("snippet-content-code");


    previewLang = document.getElementById("snippet-preview-lang");
    previewTitleBar = document.getElementById("snippet-preview-titletext");
    previewTitle = document.getElementById("snippet-preview-name");
    previewCode = document.getElementById("snippet-preview-code");


    cleanHighlightedText();
}

function applySettings()
{
    //apply name, lang and code
    previewLang.innerHTML = languageInput.value;
    previewTitle.innerHTML = fileNameInput.value;
    // previewCode.value = codeInput.value;  // for basic text
    previewTitleBar.style.fontSize = titleFontSizeInput.value + "pt";
    previewCode.style.fontSize = codeFontSizeInput.value+ "pt";

    //apply fonts
    previewCode.style.fontFamily = "'" + codeFontInput.value + "'";
    previewTitleBar.style.fontFamily = "'" + titleFontInput.value + "'";

    grabHighlightedText();


}

function cleanHighlightedText()
{
    //fix default styling of editor
    let codeDiv = previewCode;
    let i = 0;
    while(codeDiv.childElementCount === 1 && i<=100)
    {
        i++;
        codeDiv = codeDiv.firstChild;
    }
    codeDiv.style.backgroundColor = null;
    codeDiv.style.color = null;
    codeDiv.style.fontFamily = null;
    codeDiv.style.fontSize = null;
    codeDiv.style.lineHeight = null;

    if(codeDiv.nodeName === "PRE")
        codeDiv = codeDiv.firstChild;

    for(let i = 0;i<codeDiv.childElementCount;i++)
    {
        if(codeDiv.children[i].nodeName === "DIV")
        {
            // display: flex;
            // flex-wrap: wrap;

            codeDiv.children[i].style.display = "flex";
            codeDiv.children[i].style.flexWrap = "wrap";

        }
    }
}

function grabHighlightedText()
{
    previewCode.innerHTML = null;
    // console.log(codeInput.childElementCount);
    switch(codeInput.childElementCount)
    {
        case 0:
            previewCode.innerHTML = codeInput.innerHTML;
            break;
        case 1:
            let child = codeInput.firstChild.cloneNode(true);
            // alert(child);
            previewCode.append(child);
            cleanHighlightedText();
            break;
        default:
            break;
    }
}