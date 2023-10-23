const { readFromFile, writeToFile } = require("./inputoutput.js")

const { getAuthorFromSummary, getTitleFromSummary, writeASummaryOfANovel, writeIthChapterOutline, writePromptFromChapterOutline, writeChapterFromPromptAndSummary, resumenDeUnaNovela, autorDesdeResumen, tituloDesdeResumen, escribeElIesimoResumenDeCapitulo, escribeUnPromptDesdeResumenDeCapitulo, escribeUnCapituloDesdePromptYResumen } = require("./completePrompt.js")

String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};

async function main(){


    summary = await resumenDeUnaNovela();

    writeToFile("output/summary.tex", summary);

    author = await autorDesdeResumen(summary);

    title = await tituloDesdeResumen(summary);

    mainTex = readFromFile("data/2023_06_11_template/main.tex.fstring");

    chapterOutlines = []
    chapterTitles = []
    for (let i = 1; i <= 6; i++){
        ithOutline = await escribeElIesimoResumenDeCapitulo(summary, chapterOutlines, i);
        ithPrompt = await escribeUnPromptDesdeResumenDeCapitulo(ithOutline);
        ithChapter = await escribeUnCapituloDesdePromptYResumen(ithPrompt, summary);
        chapterOutlines.push(ithOutline);
        chapterTitles.push(await getTitleFromSummary(ithOutline));
        writeToFile(`output/chapter${i}.tex`, ithChapter);
        writeToFile(`output/prompt${i}.txt`, ithPrompt)
    }

    outputTex = mainTex.formatUnicorn(
        {
            title:`${title}`,
            author: `${author}`,
            chapter1Title: chapterTitles[0],
            chapter2Title: chapterTitles[1],
            chapter3Title: chapterTitles[2],
            chapter4Title: chapterTitles[3],
            chapter5Title: chapterTitles[4]
        }
    );

    writeToFile("output/main.tex", outputTex);
}

main();
