import { test } from 'node:test';
import assert from 'node:assert/strict';
import { shuffle, pickDistractors, buildQuizQuestions } from '../js/quiz-logic.js';

function seededRng(seed) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

test('shuffle returns all original elements without mutating input', () => {
  const original = [1, 2, 3, 4, 5];
  const copy = [...original];
  const result = shuffle(original, seededRng(1));
  assert.deepEqual(original, copy);
  assert.equal(result.length, original.length);
  assert.deepEqual([...result].sort(), [...original].sort());
});

const categoryA = {
  id: 'a',
  title: 'A',
  phrases: [
    { pl: 'p1', reading: 'r1', ja: 'j1', note: '' },
    { pl: 'p2', reading: 'r2', ja: 'j2', note: '' },
    { pl: 'p3', reading: 'r3', ja: 'j3', note: '' },
    { pl: 'p4', reading: 'r4', ja: 'j4', note: '' }
  ]
};
const categoryB = {
  id: 'b',
  title: 'B',
  phrases: [
    { pl: 'q1', reading: 's1', ja: 'k1', note: '' },
    { pl: 'q2', reading: 's2', ja: 'k2', note: '' }
  ]
};
const allCategories = [categoryA, categoryB];

test('pickDistractors picks 3 unique phrases excluding the correct one, from same category when possible', () => {
  const correct = categoryA.phrases[0];
  const distractors = pickDistractors(categoryA, correct, allCategories, seededRng(2));
  assert.equal(distractors.length, 3);
  assert.ok(!distractors.includes(correct));
  const uniquePl = new Set(distractors.map(d => d.pl));
  assert.equal(uniquePl.size, 3);
  for (const d of distractors) {
    assert.ok(categoryA.phrases.includes(d));
  }
});

test('pickDistractors supplements from other categories when the category is too small', () => {
  const correct = categoryB.phrases[0];
  const distractors = pickDistractors(categoryB, correct, allCategories, seededRng(3));
  assert.equal(distractors.length, 3);
  assert.ok(!distractors.includes(correct));
  const fromOther = distractors.filter(d => categoryA.phrases.includes(d));
  assert.ok(fromOther.length >= 2, 'should pull remaining distractors from other categories');
});

test('buildQuizQuestions ja2pl: prompt is Japanese, correct answer is Polish, 4 choices', () => {
  const questions = buildQuizQuestions(categoryA, allCategories, 'ja2pl', seededRng(4));
  assert.equal(questions.length, categoryA.phrases.length);
  for (const q of questions) {
    assert.equal(q.choices.length, 4);
    const sourcePhrase = categoryA.phrases.find(p => p.ja === q.prompt);
    assert.ok(sourcePhrase);
    assert.equal(q.correctAnswer, sourcePhrase.pl);
    assert.equal(q.correctReading, sourcePhrase.reading);
    assert.equal(q.choices[q.correctIndex].text, sourcePhrase.pl);
    const texts = q.choices.map(c => c.text);
    assert.equal(new Set(texts).size, 4);
  }
});

test('buildQuizQuestions pl2ja: prompt is Polish, correct answer is Japanese', () => {
  const questions = buildQuizQuestions(categoryA, allCategories, 'pl2ja', seededRng(5));
  for (const q of questions) {
    const sourcePhrase = categoryA.phrases.find(p => p.pl === q.prompt);
    assert.ok(sourcePhrase);
    assert.equal(q.promptReading, sourcePhrase.reading);
    assert.equal(q.correctAnswer, sourcePhrase.ja);
    assert.equal(q.choices[q.correctIndex].text, sourcePhrase.ja);
  }
});
