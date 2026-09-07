import { test } from 'node:test';
import assert from 'node:assert/strict';
import { POLISH_DATA } from '../data/content.js';

test('alphabet has 9 unique Polish letters', () => {
  assert.equal(POLISH_DATA.alphabet.length, 9);
  for (const entry of POLISH_DATA.alphabet) {
    assert.equal(typeof entry.letter, 'string');
    assert.equal(typeof entry.reading, 'string');
    assert.ok(entry.letter.length > 0);
    assert.ok(entry.reading.length > 0);
  }
});

test('digraphs has 6 entries', () => {
  assert.equal(POLISH_DATA.digraphs.length, 6);
  for (const entry of POLISH_DATA.digraphs) {
    assert.equal(typeof entry.letters, 'string');
    assert.equal(typeof entry.reading, 'string');
  }
});

test('categories has exactly the 11 required categories', () => {
  const expectedIds = [
    'greetings', 'fillers', 'feelings', 'questions',
    'requests', 'answers', 'family', 'colors', 'weather', 'impressions', 'numbers'
  ];
  assert.equal(POLISH_DATA.categories.length, 11);
  const actualIds = POLISH_DATA.categories.map(c => c.id);
  for (const id of expectedIds) {
    assert.ok(actualIds.includes(id), `missing category ${id}`);
  }
});

test('every category has at least 8 phrases with required fields', () => {
  for (const category of POLISH_DATA.categories) {
    assert.equal(typeof category.title, 'string');
    assert.ok(category.phrases.length >= 8, `${category.id} has too few phrases`);
    for (const phrase of category.phrases) {
      assert.equal(typeof phrase.pl, 'string');
      assert.equal(typeof phrase.reading, 'string');
      assert.equal(typeof phrase.ja, 'string');
      assert.ok(phrase.pl.length > 0);
      assert.ok(phrase.reading.length > 0);
      assert.ok(phrase.ja.length > 0);
      assert.equal(typeof phrase.note, 'string');
    }
  }
});
