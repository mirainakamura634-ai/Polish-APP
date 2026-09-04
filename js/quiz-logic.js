function shuffle(array, rng) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function pickDistractors(category, correctPhrase, allCategories, rng) {
  const sameCategoryPool = category.phrases.filter(p => p !== correctPhrase);
  const shuffledSame = shuffle(sameCategoryPool, rng);
  const picked = shuffledSame.slice(0, 3);

  if (picked.length < 3) {
    const otherPool = allCategories
      .filter(c => c.id !== category.id)
      .flatMap(c => c.phrases);
    const shuffledOther = shuffle(otherPool, rng);
    for (const phrase of shuffledOther) {
      if (picked.length >= 3) break;
      if (phrase === correctPhrase || picked.includes(phrase)) continue;
      picked.push(phrase);
    }
  }

  return picked;
}

function buildQuizQuestions(category, allCategories, direction, rng) {
  const orderedPhrases = shuffle(category.phrases, rng);

  return orderedPhrases.map(phrase => {
    const distractors = pickDistractors(category, phrase, allCategories, rng);
    const isJaToPl = direction === 'ja2pl';

    const correctChoice = isJaToPl
      ? { text: phrase.pl, reading: phrase.reading }
      : { text: phrase.ja, reading: '' };

    const distractorChoices = distractors.map(d => isJaToPl
      ? { text: d.pl, reading: d.reading }
      : { text: d.ja, reading: '' });

    const shuffledChoices = shuffle([correctChoice, ...distractorChoices], rng);
    const correctIndex = shuffledChoices.findIndex(c => c.text === correctChoice.text);

    return {
      prompt: isJaToPl ? phrase.ja : phrase.pl,
      promptReading: isJaToPl ? '' : phrase.reading,
      correctAnswer: correctChoice.text,
      correctReading: correctChoice.reading,
      choices: shuffledChoices,
      correctIndex
    };
  });
}

const QuizLogic = { shuffle, pickDistractors, buildQuizQuestions };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { shuffle, pickDistractors, buildQuizQuestions };
}
