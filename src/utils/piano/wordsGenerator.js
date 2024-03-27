import randomWords from "random-words";

import {
  DEFAULT_WORDS_COUNT,
  COMMON_WORDS
} from "./constant";

function randomIntFromRange(min, max) {
  const minNorm = Math.ceil(min);
  const maxNorm = Math.floor(max);
  const idx = Math.floor(Math.random() * (maxNorm - minNorm + 1) + minNorm);
  return idx;
};


const wordsGenerator = (wordsCount, difficulty, languageMode) => {
  if (languageMode === 'ENGLISH_MODE') {
    if (difficulty === 'normal') {
      const EnglishWordList = [];
      for (let i = 0; i < DEFAULT_WORDS_COUNT; i++) {
        const rand = randomIntFromRange(0, 550);
        EnglishWordList.push(COMMON_WORDS[rand]);
      }
      return EnglishWordList;
    }
    const randomWordsGenerated = randomWords({ exactly: wordsCount, maxLength: 7 });
    const words = [];
    for (let i = 0; i < wordsCount; i++) {
      words.push({ key: randomWordsGenerated[i], val: randomWordsGenerated[i] });
    }
    return words;
  }
  return ["something", "went", "wrong"];
};

// const chineseWordsGenerator = ( difficulty, languageMode) => {
//   if (languageMode === CHINESE_MODE) {
//     if (difficulty === DEFAULT_DIFFICULTY){
//       const ChineseWordList = [];
//       for (let i = 0; i < DEFAULT_WORDS_COUNT; i++) {
//         const rand = randomIntFromRange(0, 5000);
//         if (COMMON_CHINESE_WORDS[rand] && COMMON_CHINESE_WORDS[rand].val){
//           ChineseWordList.push(COMMON_CHINESE_WORDS[rand]);
//         }
//       }

//       return ChineseWordList;
//     }

//     const ChineseIdiomsList = [];
//     for (let i = 0; i < DEFAULT_WORDS_COUNT; i++) {
//       const rand = randomIntFromRange(0, 5000);
//       if (COMMON_CHINESE_IDIOMS_WORDS[rand] && COMMON_CHINESE_IDIOMS_WORDS[rand].val){
//         ChineseIdiomsList.push(COMMON_CHINESE_IDIOMS_WORDS[rand]);
//       }
//     }

//     return ChineseIdiomsList;

//   }
// };

// const wordsCardVocabGenerator = (vocabSource, chapter) => {
//   const wordsList = [];
//   const chapterCatalog = DICTIONARY_SOURCE_CATALOG[vocabSource];
//   const chapterStartIndex = chapterCatalog[chapter][0];
//   const chapterEndIndex = chapterCatalog[chapter][1];
//   for (let i = chapterStartIndex; i < chapterEndIndex + 1; i++) {
//     wordsList.push(VOCAB_DICTIONARIES[vocabSource][i]);
//   }
//   return wordsList;
// }

// export { wordsGenerator, chineseWordsGenerator, wordsCardVocabGenerator};
export { wordsGenerator };
