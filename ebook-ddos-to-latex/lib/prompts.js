function summaryOfANovelPrompt() {


  return `Write a summary for a short novel about \[https://en.wikipedia.org/wiki/Special:Random\].\n\nSummary:`;
}

function resumenDeUnaNovelaPrompt() {
  return `Escribe un resumen de una novela corta sobre \[https://en.wikipedia.org/wiki/Special:Random\].\n\nResumen:  `
}

function outlinePrompt(summary) {

  return `Write a 10 chapter outline for this novel: ${summary}\n\nOutline:\n\nChapter 1:\n\nChapter 2:\n\nChapter 3:`;
}

function createAPromptPrompt(outline){
  // l = outline.indexOf('Chapter 1:') + 'Chapter 1:'.lenght();
  // r = outline.indexOf('Chapter 2:') + 1;


  return `Write 10 prompts that I can use with you in order to write the 10 chapters of this novel:\n\n${outline}\n\nPrompt 1:`
}

function summaryToAuthorPrompt(summary) {
  return `Summary: The story takes place in an imagined future in the year 1984, when much of the world is in perpetual war. Great Britain, now known as Airstrip One, has become a province of the totalitarian superstate Oceania, which is led by Big Brother, a dictatorial leader supported by an intense cult of personality manufactured by the Party's Thought Police. Through the Ministry of Truth, the Party engages in omnipresent government surveillance, historical negationism, and constant propaganda to persecute individuality and independent thinking.\nAuthor: George Orwell\n   \nSummary:${summary}\nAuthor:`
}

function autorDesdeResumenPrompt(resumen){
  return `Resumen: La historia tiene lugar en un futuro imaginado en el año 1984, cuando gran parte del mundo está en guerra perpetua. Gran Bretaña, ahora conocida como Pista Aérea Uno, se ha convertido en una provincia del superestado totalitario Oceanía, dirigido por el Gran Hermano, un líder dictatorial apoyado por un intenso culto a la personalidad fabricado por la Policía del Pensamiento del Partido. A través del Ministerio de la Verdad, el Partido ejerce una omnipresente vigilancia gubernamental, negacionismo histórico y propaganda constante para perseguir la individualidad y el pensamiento independiente.\nAutor: George Orwell.\nResumen: ${resumen}\nAutor:`
}

function summaryToTitlePrompt(summary) {
  return `Summary: French science fiction author Jules Verne’s 20,000 Leagues Under the Sea was originally serialized in 1869 and 1870, was published in its entirety in 1871, and was first translated into English in 1873. Widely considered one of the world’s first great science fiction adventure novels, it tells the tale of Captain Nemo and his incredible submarine, the Nautilus, and the three men held captive there: a learned scientist, his devoted servant, and a brawny harpooner. Mostly told in the first person by Professor Pierre Aronnax, 20,000 Leagues Under the Sea has delighted readers for more than 150 years and has inspired many successful film adaptations.\nTitle:20,000 Leagues Under the Sea\n   \nSummary: ${summary}\nTitle:`
}

function tituloDesdeResumenPrompt(resumen){
  return `Resumen: 20.000 leguas de viaje submarino, del autor francés de ciencia ficción Julio Verne, se publicó originalmente por entregas en 1869 y 1870, se publicó íntegramente en 1871 y se tradujo por primera vez al inglés en 1873. Considerada una de las primeras grandes novelas de aventuras de ciencia ficción, narra la historia del capitán Nemo y su increíble submarino, el Nautilus, y de los tres hombres cautivos en él: un científico erudito, su devoto sirviente y un musculoso arponero. Contada en su mayor parte en primera persona por el profesor Pierre Aronnax, 20.000 leguas de viaje submarino ha hecho las delicias de los lectores durante más de 150 años y ha inspirado numerosas adaptaciones cinematográficas de gran éxito.\nTítulo:20.000 leguas de viaje submarino\n Resumen: ${resumen}\nTítulo:`

}

function writeIthChapterOutlinePrompt(summary, chapters, i) {
  ret = `Based on this summary:\n“The Inverted Periscoe” follows the story of a young woman named Camila who inherits her grandfather's antique shop after his passing. While going through the store's inventory, she discovers an unusual object: an inverted periscope. As she learns more about its history, she becomes entangled in a mystery involving her grandfather's past and the periscope's connection to a long-lost treasure. Camila sets out on a journey to uncover the truth and protect the periscope from those who would use it for their own gain.\nThis is the idea of the ${i}th chapter of a 6 chapters novel:`;

  example_chapters = [
    "Chapter 1: “Camila inherits her grandfather's antique shop and begins going through the inventory. She discovers the inverted periscope and becomes intrigued by its unusual design.”",
    "Chapter 2: “Camila sets out to discover what happened to Samuel and why he disappeared. She follows his trail to a remote island off the coast of South America.”",
    "Chapter 3: “Camila teams up with a local guide named Alejandro to search for Samuel's workshop. They discover that the island is full of hidden traps and obstacles designed to protect Samuel's inventions.”",
    "Chapter 4: “Camila and Alejandro enter the cave and find a secret chamber containing Samuel's greatest invention: a map that leads to a long-lost treasure.”",
    "Chapter 5: “Camila and Alejandro race against the other treasure hunters to find the treasure. They encounter numerous challenges along the way, including a dangerous storm and a treacherous climb up a mountain.”",
    "Chapter 6: “Camila and Alejandro reach the treasure first, but the other hunters catch up to them.A fierce confrontation ensues, and Camila and Alejandro emerge victorious and recover the treasure.They return to the antique shop with the inverted periscope and the map, and Camila realizes the true legacy of her grandfather and Samuel”."
  ];

  ret = [].concat([ret], example_chapters.slice(0, i), ["\n   \n", `Based on this summary:\n${summary}`]).join("\n");

  for (let j = 0; j < i; j++){
    ret = [ret, `Chapter ${j+1}: ${chapters[j]}`].join("\n")
  };

  ret = [ret, `Chapter ${i}:`].join("\n");

  return ret;
}

function escribeElIesimoResumenDeCapituloPrompt(summary, chapters, i){
  ret = `Basado en este resumen:\n "El periscopio invertido" sigue la historia de una joven llamada Camila que hereda la tienda de antigüedades de su abuelo tras el fallecimiento de éste. Mientras revisa el inventario de la tienda, descubre un objeto inusual: un periscopio invertido. A medida que aprende más sobre su historia, se ve envuelta en un misterio relacionado con el pasado de su abuelo y la conexión del periscopio con un tesoro perdido hace mucho tiempo. Camila emprende un viaje para descubrir la verdad y proteger el periscopio de aquellos que quieren utilizarlo en su propio beneficio.\n Este es el ${i}esimo capitulo de una novela de 6 capitulos`;

  example_chapters = [
    "Capítulo 1: Camila hereda la tienda de antigüedades de su abuelo y comienza a revisar el inventario. Descubre el periscopio invertido y queda intrigada por su inusual diseño",
    "Capítulo 2: Camila se propone descubrir qué le pasó a Samuel y por qué desapareció. Sigue su rastro hasta una remota isla de la costa de Sudamérica",
    "Capítulo 3: Camila se une a un guía local llamado Alejandro para buscar el taller de Samuel. Descubren que la isla está llena de trampas y obstáculos ocultos diseñados para proteger los inventos de Samuel",
    "Capítulo 4: Camila y Alejandro entran en la cueva y encuentran una cámara secreta que contiene el mayor invento de Samuel: un mapa que conduce a un tesoro perdido hace mucho tiempo",
    "Capítulo 5: Camila y Alejandro compiten contra los otros cazadores de tesoros para encontrar el tesoro. Se encuentran con numerosos desafíos en el camino, incluyendo una peligrosa tormenta y una traicionera subida a una montaña",
    "Capítulo 6: Camila y Alejandro llegan primero al tesoro, pero los otros cazadores los alcanzan. Se produce un feroz enfrentamiento y Camila y Alejandro salen victoriosos y recuperan el tesoro. Regresan a la tienda de antigüedades con el periscopio invertido y el mapa, y Camila se da cuenta del verdadero legado de su abuelo y de Samuel"
  ];

  ret = [].concat([ret], example_chapters.slice(0, i), ["\n   \n", `Basado en este resumen:\n${summary}`]).join("\n");

  for (let j = 0; j < i; j++){
    ret = [ret, `Capitulo ${j+1}: ${chapters[j]}`].join("\n")
  };

  ret = [ret, `Capitulo ${i}:`].join("\n");

  return ret;
}

function writePromptFromChapterOutlinePrompt(outline){
  ret = `Write a prompt to develop this chapter of a novel in a fancy original way.\n\nOutline: Introduce the group of explorers, they get caught in a sandstorm while travelling through the Sahara, they find shelter in a nearby cave.\n\nPrompt: Write a scene where the sandstorm is personified as a vengeful god, seeking to punish the explorers for their hubris. End the scene with the explorers finding shelter in a cave.\n\nOutline: ${outline}\n\nPrompt: `;

  return ret;
}

function escribeUnPromptDesdeResumenDeCapituloPrompt(outline){
  ret = `Escribe un prompt para desarrollar este capítulo de una novela de forma original y evocadora.\n\nEsquema: Presenta al grupo de exploradores, se ven atrapados en una tormenta de arena mientras viajan por el Sáhara, encuentran refugio en una cueva cercana: Escribe una escena en la que la tormenta de arena se personifique como un dios vengativo que quiere castigar a los exploradores por su arrogancia. Termina la escena con los exploradores encontrando refugio en una cueva:\nOutline: ${outline}\nPrompt: `;

  return ret;
}

function writeChapterFromPromptAndSummaryPrompt(prompt, summary){
  ret = `Based on this summary write a 800 words chapter.\n Summary: ${summary}\nPrompt: ${prompt}\nChapter: `;
  return ret;
}

function escribeUnCapituloDesdePromptYResumenPrompt(prompt, resumen){
  ret = `Basándose en este resumen escriba un capítulo de 800 palabras.\nResumen: ${resumen}\nPrompt: ${prompt}\nCapítulo:`;

  return ret;
}

module.exports = {
  resumenDeUnaNovelaPrompt,
  summaryOfANovelPrompt,
  autorDesdeResumenPrompt,
  summaryToAuthorPrompt,
  tituloDesdeResumenPrompt,
  escribeElIesimoResumenDeCapituloPrompt,
  summaryToTitlePrompt,
  outlinePrompt,
  writeIthChapterOutlinePrompt,
  writePromptFromChapterOutlinePrompt,
  escribeUnPromptDesdeResumenDeCapituloPrompt,
  writeChapterFromPromptAndSummaryPrompt,
  escribeUnCapituloDesdePromptYResumenPrompt
}
