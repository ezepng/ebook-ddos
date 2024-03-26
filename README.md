# ebook-ddos
A tool that creates short novels with random themes and authorship. It takes approximately 75 seconds to generate a layout pdf file of between 24 and 36 pages and a cover image.

[lib\app.js
](ebook-ddos-to-latex/lib/app.js)

1	This is the central structure. Here we request the tool to 1) write a novel of n chapters (n will be 6, but it could be as many as we want) and save it; 2) lay out the text and create a PDF book. To write the novel, we automate a few steps: 1) write the summary of the future novel; 2) make up an author; 3) give it a title based on the summary; 4) develop the summary into 6 chapters; 5) write a title for each chapter; and 6) draw a cover based on the title. With the title, the author (with their bibliographic note), and the 6 chapters (with their corresponding titles) we generate a template in LaTeX to later create the pdf file. The files for each book - the LaTeX files, the pdf file, and a txt file containing a link to the cover image - are saved in a single directory so that there are no collisions and so that books can be generated massively.

[lib/prompts.js
](ebook-ddos-to-latex/lib/prompts.js)

1	Here are the prompts. The first prompt is: "Write a summary of a short novel about [https://en.wikipedia.org/wiki/ Special:Random]". The random seed we gave it to write books that were different from each other was a link to a random Wikipedia article. A link that the ai can't access but seems to work for us to trigger the randomness. The prompts to generate the author and title contain examples to communicate to the ai what we want in a more precise way. We used examples from George Orwell's 1984 and Jules Verne's 20,000 Leagues Under the Sea.

2	The writeAPromptFromChapterSummaryPrompt ("Write a prompt to develop this chapter of a novel in an original and evocative way") required the ai to write its prompts, which were then returned to it to write the chapters. But we had to dispense with that step because, while it made for more interesting books when it worked, it also added an unsustainable level of chaos (it works better in English than in Spanish, by the way).

[lib/completePrompt.js
](ebook-ddos-to-latex/lib/completePrompt.js)

1	In between the prompts and the program there is a call to OpenAI that is defined in this file. Here we indicate the ai engine we want to work with, the maximum tokens and temperature of each response, and the dimensions of the cover image. 
We work with text-davinci-003, the most consistent engine of gpt-3 which is not optimized for chat. We set the default temperature to 1 and the maximum tokens to 1024 for authors and abstracts, as the tasks were simple and we could play around generating more unexpected responses. To write the chapters we set the maximum number of tokens we could (4096), to generate as long chapters as possible and a temperature of 0.8 over 1. We set the temperature to provoke a "moderate hallucination" of the ai so that it could generate stranger and more unexpected narratives while maintaining readability. The tests we did at lower temperatures resulted in narratives that were overly repetitive and formulaic to the point of unreadability. The higher-temperature ones were incomprehensible jumbles that mixed up scenarios and invented words.

[lib\inputoutput.js
](ebook-ddos-to-latex/lib/inputoutput.js)

1	This last file is of little interest. It has 3 functions: one that reads from a file, one that creates a single directory tree so that books can be serially generated, and one that writes to a file, to generate the files necessary for LaTeX to generate the pdf.

[data\template\main.tex
](ebook-ddos-to-latex/data/2023_06_11_template/main.tex.fstring)

1	We also created the LaTeX template for the layout of the pdf books. This is an adaptation of the simplest template we found, to which we changed the page size and copyright page information; removed acknowledgments and preface; and modified the variables for title, author, and chapter titles. 

2	On the data page we wrote a response that chatgpt generated for us in a conversation about the copyright of the novels we were writing together. While testing prompts, in a request to chatgpt to generate an author for a novel, he replied: "As an AI linguistic model, I cannot attribute an author to this short novel, as it was generated from the given instructions and training data, but if someone were to develop and publish this story as a written work, they would be considered the author". We did so and therefore reserved "some rights".
