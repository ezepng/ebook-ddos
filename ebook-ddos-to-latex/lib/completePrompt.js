const { Configuration, OpenAIApi } = require("openai");
const {
  summaryToAuthorPrompt,
  summaryToTitlePrompt,
  summaryOfANovelPrompt,
  writeIthChapterOutlinePrompt,
  writePromptFromChapterOutlinePrompt,
  writeChapterFromPromptAndSummaryPrompt,
  resumenDeUnaNovelaPrompt,
  autorDesdeResumenPrompt,
  tituloDesdeResumenPrompt,
  escribeElIesimoResumenDeCapituloPrompt,
  escribeUnPromptDesdeResumenDeCapituloPrompt,
  escribeUnCapituloDesdePromptYResumenPrompt
} = require('./prompts.js')

const {encode} = require('gpt-3-encoder')

require('dotenv').config()


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function num_tokens_from_string(s){
  encodings = encode(s)
  return encodings.length
}


async function completePrompt(prompt, temperature = 1, max_tokens=1024){
  const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature,
      max_tokens
    });
  return completion.data.choices[0].text;
}

async function completePromptWithChat(prompt){
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: "Hello world"}],
  });
  //  await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: [{"role": "system", "content": `${prompt}`}]
  // });
  return completion.data.choices[0].message;
}

async function getAuthorFromSummary(summary){
  return await completePrompt(summaryToAuthorPrompt(summary));
}

async function autorDesdeResumen(resumen){
  return await completePrompt(autorDesdeResumenPrompt(resumen));
}

async function getTitleFromSummary(summary){
  return await completePrompt(summaryToTitlePrompt(summary));
}

async function tituloDesdeResumen(resumen){
  return await completePrompt(tituloDesdeResumenPrompt(resumen));
}

async function writeASummaryOfANovel(){
  return await completePrompt(summaryOfANovelPrompt());
}

async function resumenDeUnaNovela(){
  return await completePrompt(resumenDeUnaNovelaPrompt());
}

async function writeAnOutlineFromASummary(summary){
  return await completePromptWithChat(outlinePrompt(summary));
}

async function writeTenPromptsFromAnOutline(outline){
  return await completePromptWithChat(createAPromptPrompt(outline));
}

async function writeIthChapterOutline(summary, chapters, i){
  return await completePrompt(writeIthChapterOutlinePrompt(summary, chapters, i));
}

async function escribeElIesimoResumenDeCapitulo(resumen, capitulos, i){
  return await completePrompt(escribeElIesimoResumenDeCapituloPrompt(resumen, capitulos, i))
}

async function writePromptFromChapterOutline(outline){
  return await completePrompt(writePromptFromChapterOutlinePrompt(outline));
}

async function escribeUnPromptDesdeResumenDeCapitulo(resumen){
  return await completePrompt(escribeUnPromptDesdeResumenDeCapituloPrompt(resumen));
}

async function writeChapterFromPromptAndSummary(prompt, summary){
  prompt = writeChapterFromPromptAndSummaryPrompt(prompt, summary);
  num_tokens = 4096 - num_tokens_from_string(prompt);
  temperature = 0.8
  return await completePrompt(prompt, temperature, num_tokens);
}

async function escribeUnCapituloDesdePromptYResumen(prompt, summary){
  prompt = escribeUnCapituloDesdePromptYResumenPrompt(prompt, summary);
  num_tokens = 4096 - num_tokens_from_string(prompt);
  temperature = 0.8
  return await completePrompt(prompt, temperature, num_tokens);
}


module.exports = {
  getAuthorFromSummary,
  getTitleFromSummary,
  writeASummaryOfANovel,
  writeAnOutlineFromASummary,
  writeTenPromptsFromAnOutline,
  writeIthChapterOutline,
  writePromptFromChapterOutline,
  writeChapterFromPromptAndSummary,
  resumenDeUnaNovela,
  autorDesdeResumen,
  tituloDesdeResumen,
  escribeElIesimoResumenDeCapitulo,
  escribeUnPromptDesdeResumenDeCapitulo,
  escribeUnCapituloDesdePromptYResumen
}
