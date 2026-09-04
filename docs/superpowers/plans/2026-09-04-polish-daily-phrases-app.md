# ポーランド語 日常会話アプリ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ポーランド語初心者の日本人ユーザーが、家族との日常会話フレーズを暗記できる個人学習用Webアプリ(HTML/CSS/JS、サーバー不要)を作る。

**Architecture:** データ(`data/content.js`)とロジック(`js/quiz-logic.js`, `js/app.js`)を分離した静的SPA。全コンテンツは1つのJSグローバル変数`POLISH_DATA`に集約し、UIはこれを読み込んで自動描画する。画面遷移は`.screen`クラスの表示切替(NOKENアプリと同パターン)。`file://`で直接開いても動くようscriptタグ読み込みのみを使う(fetch/ESM importは使わない)。

**Tech Stack:** プレーンHTML/CSS/JavaScript(フレームワーク・ビルドツールなし)。開発時のロジックテストのみNode.js組み込みの`node:test`を使う(追加パッケージなし)。

**Spec:** [polish-app/docs/superpowers/specs/2026-09-04-polish-daily-phrases-app-design.md](../specs/2026-09-04-polish-daily-phrases-app-design.md)

## Global Constraints

- サーバー・DB・会員機能は使わない。
- データは`data/content.js`の`POLISH_DATA`に集約し、UIコードはこれを変更せず新カテゴリ・新フレーズに対応できること。
- カタカナ発音は常にポーランド語表記のすぐ下に表示する(隠さない)。日本語訳とメモはタップで表示/非表示を切り替える。
- クイズは4択。誤答は同カテゴリ内からランダム抽出し、同カテゴリのフレーズが4未満の場合は他カテゴリから補完する。
- レスポンシブ(PC・スマホ両対応)。メインカラーはピンク×水色。NOKENアプリ(赤×金)と配色が衝突しないこと。

---

## Task 1: コンテンツデータ (data/content.js)

**Files:**
- Create: `data/content.js`
- Test: `tests/content.test.mjs`

**Interfaces:**
- Produces: グローバル変数 `POLISH_DATA` (ブラウザ用) / Node環境では `module.exports` 経由で同じオブジェクトを取得可能。構造:
  ```
  POLISH_DATA = {
    alphabet: [{ letter, reading, note }],
    digraphs: [{ letters, reading }],
    categories: [{ id, title, phrases: [{ pl, reading, ja, note }] }]
  }
  ```

- [ ] **Step 1: git初期化とプロジェクト直下ディレクトリ確認**

```bash
git init
mkdir -p data js css tests
git add -A
git commit -m "chore: initial project scaffold"
```

- [ ] **Step 2: 失敗するテストを書く**

`tests/content.test.mjs` を作成:

```js
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

test('categories has exactly the 8 required categories', () => {
  const expectedIds = [
    'greetings', 'fillers', 'feelings', 'questions',
    'requests', 'answers', 'family', 'numbers'
  ];
  assert.equal(POLISH_DATA.categories.length, 8);
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
```

- [ ] **Step 2b: テストを実行して失敗を確認**

Run: `node --test tests/content.test.mjs`
Expected: FAIL (`Cannot find module '../data/content.js'`)

- [ ] **Step 3: data/content.js を実装する**

```js
const POLISH_DATA = {
  alphabet: [
    { letter: "ą", reading: "オン", note: "鼻母音。「オ」と「ン」の中間のような音" },
    { letter: "ć", reading: "チ", note: "ciと似た柔らかい「チ」" },
    { letter: "ę", reading: "エン", note: "鼻母音。「エ」と「ン」の中間のような音" },
    { letter: "ł", reading: "ウ", note: "英語のwに近い「ウ」の音(Lではない)" },
    { letter: "ń", reading: "ニ", note: "niと似た柔らかい「ニ」" },
    { letter: "ó", reading: "ウ", note: "uと同じ発音(「オ」ではない)" },
    { letter: "ś", reading: "シ", note: "siと似た柔らかい「シ」" },
    { letter: "ź", reading: "ジ", note: "ziと似た柔らかい「ジ」" },
    { letter: "ż", reading: "ジ", note: "硬めの「ジ」(źより強い音)" }
  ],
  digraphs: [
    { letters: "cz", reading: "チ(強め)" },
    { letters: "sz", reading: "シュ" },
    { letters: "rz", reading: "ジ(żと同じ音)" },
    { letters: "dz", reading: "ヂ/ジ" },
    { letters: "dź", reading: "ヂ(柔らかい)" },
    { letters: "dż", reading: "ヂ(強め)" }
  ],
  categories: [
    {
      id: "greetings",
      title: "挨拶・別れ",
      phrases: [
        { pl: "Cześć!", reading: "チェシチ", ja: "やあ!/またね!", note: "家族間で一番よく使う。出会いにも別れにも使える" },
        { pl: "Dzień dobry", reading: "ジェイン ドブリ", ja: "おはよう/こんにちは(丁寧)", note: "家族以外や目上の人にも" },
        { pl: "Dobry wieczór", reading: "ドブリ ヴィエチュル", ja: "こんばんは", note: "夜の挨拶" },
        { pl: "Dobranoc", reading: "ドブラノツ", ja: "おやすみなさい", note: "寝る前" },
        { pl: "Do zobaczenia", reading: "ド ゾバチェニャ", ja: "またね(次に会う予定があるとき)", note: "やや丁寧な「またね」" },
        { pl: "Do jutra", reading: "ド ユトラ", ja: "また明日", note: "" },
        { pl: "Na razie", reading: "ナ ラジェ", ja: "じゃあね(カジュアル)", note: "Cześćよりさらにくだけた別れ言葉" },
        { pl: "Jak się masz?", reading: "ヤク シェン マシュ", ja: "元気?", note: "決まり文句として丸ごと覚えればOK" },
        { pl: "Dziękuję, dobrze", reading: "ジェンクィエン、ドブジェ", ja: "ありがとう、元気だよ", note: "上の質問への定番の返し" },
        { pl: "Miło cię widzieć", reading: "ミウォ チェン ヴィジェチ", ja: "会えて嬉しい", note: "久しぶりに会ったときなど" }
      ]
    },
    {
      id: "fillers",
      title: "相槌・つなぎ言葉",
      phrases: [
        { pl: "Tak", reading: "タク", ja: "うん、そうだね", note: "相槌の基本" },
        { pl: "Właśnie", reading: "ヴワシニェ", ja: "まさに、そうそう", note: "相手の言葉に強く同意するとき" },
        { pl: "No tak", reading: "ノ タク", ja: "まあね、そうだね", note: "少し譲歩するニュアンス" },
        { pl: "Naprawdę?", reading: "ナプラヴデン", ja: "本当に?", note: "驚いたときの相槌" },
        { pl: "Serio?", reading: "セリオ", ja: "マジで?", note: "カジュアルな驚き" },
        { pl: "Rozumiem", reading: "ロズミェム", ja: "わかります、なるほど", note: "理解を示す" },
        { pl: "No właśnie", reading: "ノ ヴワシニェ", ja: "そうそう、それそれ", note: "強い同意" },
        { pl: "To znaczy...", reading: "ト ズナチィ", ja: "つまり…", note: "言い換えるときのつなぎ" },
        { pl: "Czyli...", reading: "チリ", ja: "つまり…、というわけで…", note: "まとめるときのつなぎ" },
        { pl: "Wiesz co?", reading: "ヴィェシュ ツォ", ja: "ねえ、知ってる?", note: "話し始めるときの前置き" }
      ]
    },
    {
      id: "feelings",
      title: "気持ち・体調を伝える",
      phrases: [
        { pl: "Czuję się dobrze", reading: "チュイェン シェン ドブジェ", ja: "気分がいいです", note: "体調・気分を伝える基本形" },
        { pl: "Czuję się źle", reading: "チュイェン シェン ジレ", ja: "気分が悪いです", note: "" },
        { pl: "Jestem zmęczony/zmęczona", reading: "イェステム ズメンチョヌィ/ズメンチョナ", ja: "疲れています", note: "男性はzmęczony、女性はzmęczonaを使う" },
        { pl: "Jestem głodny/głodna", reading: "イェステム グウォドヌィ/グウォドナ", ja: "お腹が空いた", note: "男性形/女性形の順" },
        { pl: "Chce mi się spać", reading: "ヘツェ ミ シェン スパチ", ja: "眠いです", note: "" },
        { pl: "Boli mnie głowa", reading: "ボリ ムニェ グウォヴァ", ja: "頭が痛いです", note: "他の部位はgłowaを入れ替えて使う" },
        { pl: "Jestem szczęśliwy/szczęśliwa", reading: "イェステム シチェンシリヴィ/シチェンシリヴァ", ja: "幸せです", note: "男性形/女性形の順" },
        { pl: "Jestem smutny/smutna", reading: "イェステム スムトゥヌィ/スムトゥナ", ja: "悲しいです", note: "男性形/女性形の順" },
        { pl: "Wszystko w porządku", reading: "フシストコ フ ポジョンドク", ja: "大丈夫だよ、問題ないよ", note: "心配されたときの返事にも使える" },
        { pl: "Trochę się denerwuję", reading: "トロヘン シェン デネルヴイェン", ja: "ちょっと緊張してる/イライラしてる", note: "" }
      ]
    },
    {
      id: "questions",
      title: "質問する・聞き返す",
      phrases: [
        { pl: "Co?", reading: "ツォ", ja: "何?", note: "聞き取れなかったときにも使うがややぶっきらぼう" },
        { pl: "Słucham?", reading: "スウハム", ja: "もう一度言ってもらえますか?", note: "丁寧な聞き返し" },
        { pl: "Możesz powtórzyć?", reading: "モジェシュ ポフトゥジチ", ja: "もう一回言ってくれる?", note: "" },
        { pl: "Co to znaczy?", reading: "ツォ ト ズナチィ", ja: "それどういう意味?", note: "" },
        { pl: "Jak to powiedzieć po polsku?", reading: "ヤク ト ポヴィェジェチ ポ ポルスク", ja: "ポーランド語でどう言うの?", note: "" },
        { pl: "Gdzie jest...?", reading: "グジェ イェスト", ja: "…はどこ?", note: "「…」に場所や物を入れる" },
        { pl: "Kiedy...?", reading: "キェディ", ja: "いつ…?", note: "" },
        { pl: "Dlaczego?", reading: "ドラチェゴ", ja: "なぜ?", note: "" },
        { pl: "Co robisz?", reading: "ツォ ロビシュ", ja: "何してるの?", note: "" },
        { pl: "Rozumiesz?", reading: "ロズミェシュ", ja: "わかる?", note: "" }
      ]
    },
    {
      id: "requests",
      title: "お願い・感謝・謝罪",
      phrases: [
        { pl: "Proszę", reading: "プロシェン", ja: "お願いします、どうぞ", note: "依頼にも「どうぞ」にも使う万能語" },
        { pl: "Dziękuję", reading: "ジェンクィエン", ja: "ありがとう", note: "" },
        { pl: "Dziękuję bardzo", reading: "ジェンクィエン バルヅォ", ja: "どうもありがとう", note: "" },
        { pl: "Nie ma za co", reading: "ニェ マ ザ ツォ", ja: "どういたしまして", note: "" },
        { pl: "Przepraszam", reading: "プシェプラシャム", ja: "すみません、ごめんなさい", note: "" },
        { pl: "Czy możesz mi pomóc?", reading: "チ モジェシュ ミ ポムツ", ja: "手伝ってくれる?", note: "" },
        { pl: "Mogę prosić o...?", reading: "モゲン プロシチ オ", ja: "…をお願いできますか?", note: "「…」に欲しい物を入れる" },
        { pl: "Nie szkodzi", reading: "ニェ シュコジ", ja: "大丈夫だよ、気にしないで", note: "" },
        { pl: "Dzięki", reading: "ジェンキ", ja: "ありがと(カジュアル)", note: "Dziękujęのくだけた形" },
        { pl: "Przepraszam za spóźnienie", reading: "プシェプラシャム ザ スプジニェニェ", ja: "遅れてごめんなさい", note: "" }
      ]
    },
    {
      id: "answers",
      title: "簡単な返事",
      phrases: [
        { pl: "Tak", reading: "タク", ja: "はい", note: "" },
        { pl: "Nie", reading: "ニェ", ja: "いいえ", note: "" },
        { pl: "Może", reading: "モジェ", ja: "たぶん、かもね", note: "" },
        { pl: "Nie wiem", reading: "ニェ ヴィェム", ja: "わからない", note: "" },
        { pl: "Chyba tak", reading: "ヒバ タク", ja: "たぶんそう", note: "" },
        { pl: "Oczywiście", reading: "オチヴィシチェ", ja: "もちろん", note: "" },
        { pl: "Dobrze", reading: "ドブジェ", ja: "いいよ、わかった", note: "" },
        { pl: "Jasne", reading: "ヤスネ", ja: "もちろん、了解", note: "" },
        { pl: "W porządku", reading: "フ ポジョンドク", ja: "オーケー、大丈夫", note: "" },
        { pl: "Chwilowo nie", reading: "フヴィロヴォ ニェ", ja: "今のところはいいや", note: "" }
      ]
    },
    {
      id: "family",
      title: "家族の会話でよく出る一言",
      phrases: [
        { pl: "Dobranoc", reading: "ドブラノツ", ja: "おやすみなさい", note: "" },
        { pl: "Śpij dobrze", reading: "シピイ ドブジェ", ja: "よく眠ってね", note: "" },
        { pl: "Wracam!", reading: "ヴラツァム", ja: "行ってきます!/ただいま!", note: "出かける前にも帰宅時にも使える(文脈次第)" },
        { pl: "Już jestem w domu", reading: "ユシュ イェステム ヴ ドム", ja: "もう家に着いたよ", note: "" },
        { pl: "Idę już", reading: "イデン ユシュ", ja: "もう行くね", note: "" },
        { pl: "Smacznego", reading: "スマチネゴ", ja: "いただきます", note: "食事を始める前の決まり文句" },
        { pl: "Na zdrowie", reading: "ナ ズドロヴィェ", ja: "乾杯!/お大事に", note: "くしゃみをした人にも、乾杯の時にも使う" },
        { pl: "Kocham cię", reading: "コハム チェン", ja: "愛してるよ", note: "" },
        { pl: "Tęsknię za tobą", reading: "テンスクニェン ザ トバン", ja: "会いたいよ、恋しいよ", note: "" },
        { pl: "Uważaj na siebie", reading: "ウヴァジャイ ナ シェビェ", ja: "気をつけてね", note: "" }
      ]
    },
    {
      id: "numbers",
      title: "数字",
      phrases: [
        { pl: "zero", reading: "ゼロ", ja: "0", note: "" },
        { pl: "jeden", reading: "イェデン", ja: "1", note: "" },
        { pl: "dwa", reading: "ドヴァ", ja: "2", note: "" },
        { pl: "trzy", reading: "トシ", ja: "3", note: "" },
        { pl: "cztery", reading: "チュテリ", ja: "4", note: "" },
        { pl: "pięć", reading: "ピェンチ", ja: "5", note: "" },
        { pl: "sześć", reading: "シェシチ", ja: "6", note: "" },
        { pl: "siedem", reading: "シェデム", ja: "7", note: "" },
        { pl: "osiem", reading: "オシェム", ja: "8", note: "" },
        { pl: "dziewięć", reading: "ジェヴィェンチ", ja: "9", note: "" },
        { pl: "dziesięć", reading: "ジェシェンチ", ja: "10", note: "" },
        { pl: "dwadzieścia", reading: "ドヴァジェシチャ", ja: "20", note: "" },
        { pl: "pięćdziesiąt", reading: "ピェンチジェショント", ja: "50", note: "" },
        { pl: "sto", reading: "スト", ja: "100", note: "" },
        { pl: "Ile masz lat?", reading: "イレ マシュ ラト", ja: "何歳ですか?", note: "年齢の聞き方" },
        { pl: "Mam trzydzieści lat", reading: "マム トシジェシチ ラト", ja: "30歳です", note: "Mam ○○ latで「○○歳です」" },
        { pl: "Która godzina?", reading: "クトゥラ ゴジナ", ja: "今何時?", note: "時間の聞き方" },
        { pl: "Ile to kosztuje?", reading: "イレ ト コシュトゥイェ", ja: "これいくら?", note: "値段の聞き方" }
      ]
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { POLISH_DATA };
}
```

- [ ] **Step 4: テストを実行して成功を確認**

Run: `node --test tests/content.test.mjs`
Expected: PASS (全4テスト)

- [ ] **Step 5: コミット**

```bash
git add data/content.js tests/content.test.mjs
git commit -m "feat: add Polish phrase content data"
```

---

## Task 2: クイズ出題ロジック (js/quiz-logic.js)

**Files:**
- Create: `js/quiz-logic.js`
- Test: `tests/quiz-logic.test.mjs`

**Interfaces:**
- Consumes: `POLISH_DATA.categories` の形状 `{ id, title, phrases: [{ pl, reading, ja, note }] }`(Task 1で確定)
- Produces: グローバル `QuizLogic` (ブラウザ用)/ Node用 `module.exports` に以下を公開:
  - `shuffle(array, rng)` — `rng`は`() => number`(0以上1未満)を返す関数。破壊せず新配列を返す。
  - `pickDistractors(category, correctPhrase, allCategories, rng)` — `correctPhrase`以外から3つの`phrase`オブジェクトを返す。
  - `buildQuizQuestions(category, allCategories, direction, rng)` — `direction`は`'ja2pl'`または`'pl2ja'`。戻り値は配列で各要素は `{ prompt, promptReading, correctAnswer, correctReading, choices: [{ text, reading }], correctIndex }`。

- [ ] **Step 1: 失敗するテストを書く**

`tests/quiz-logic.test.mjs`:

```js
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
```

- [ ] **Step 2: テストを実行して失敗を確認**

Run: `node --test tests/quiz-logic.test.mjs`
Expected: FAIL (`Cannot find module '../js/quiz-logic.js'`)

- [ ] **Step 3: js/quiz-logic.js を実装する**

```js
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
```

- [ ] **Step 4: テストを実行して成功を確認**

Run: `node --test tests/quiz-logic.test.mjs`
Expected: PASS (全6テスト)

- [ ] **Step 5: コミット**

```bash
git add js/quiz-logic.js tests/quiz-logic.test.mjs
git commit -m "feat: add quiz question generation logic"
```

---

## Task 3: HTMLシェルとCSSテーマ

**Files:**
- Create: `index.html`
- Create: `css/style.css`

**Interfaces:**
- Produces: `index.html`内に以下のid付き要素(Task 4以降のJSがここに描画する):
  `#category-grid`, `#screen-top`, `#screen-alphabet`, `#alphabet-grid`, `#screen-category`, `#category-title`, `#phrase-grid`, `#screen-quiz-setup`, `#quiz-setup-title`, `#screen-quiz`, `#quiz-progress`, `#quiz-question-card`, `#screen-quiz-result`, `#quiz-result-body`
- Consumes: なし(このタスクは静的マークアップとスタイルのみ)

- [ ] **Step 1: css/style.css を作成する**

```css
:root {
  --color-primary: #ff7aa8;
  --color-primary-dark: #e85d8f;
  --color-secondary: #4ec9e0;
  --color-secondary-dark: #2fa7bf;
  --color-bg: #fdf3f8;
  --color-card-bg: #ffffff;
  --color-text: #3a2e35;
  --color-text-muted: #8a7a85;
  --color-success: #2e9e6b;
  --color-success-bg: #e6f9f0;
  --color-error: #e0527a;
  --color-error-bg: #fde9ef;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif;
  background: var(--color-bg);
  color: var(--color-text);
}

.container { max-width: 720px; margin: 0 auto; padding: 16px; }

.app-header {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: #fff;
  padding: 24px 16px;
}

.app-header h1 { margin: 8px 0 4px; font-size: 1.4rem; }
.app-header p { margin: 0; opacity: 0.95; font-size: 0.9rem; }

.badge {
  display: inline-block;
  background: rgba(255,255,255,0.25);
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 0.8rem;
}

.screen { display: none; }
.screen.active { display: block; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.card {
  background: var(--color-card-bg);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(232, 93, 143, 0.12);
}

.category-card {
  cursor: pointer;
  border: 2px solid transparent;
  text-align: center;
  transition: transform 0.15s ease, border-color 0.15s ease;
}

.category-card:hover { transform: translateY(-2px); border-color: var(--color-secondary); }
.category-card .icon { font-size: 1.8rem; }
.category-card .title { font-weight: bold; margin-top: 8px; font-size: 0.95rem; }

.phrase-card { margin-bottom: 12px; cursor: pointer; }
.phrase-card .pl { font-size: 1.15rem; font-weight: bold; color: var(--color-primary-dark); }
.phrase-card .reading { color: var(--color-secondary-dark); font-size: 0.95rem; margin-top: 2px; }
.phrase-card .details { display: none; margin-top: 10px; border-top: 1px dashed #eee; padding-top: 10px; }
.phrase-card.revealed .details { display: block; }
.phrase-card .ja { font-size: 1rem; }
.phrase-card .note { color: var(--color-text-muted); font-size: 0.85rem; margin-top: 4px; }

.btn {
  display: inline-block;
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 12px 24px;
  font-size: 1rem;
  cursor: pointer;
  margin: 6px 6px 6px 0;
}

.btn:hover { background: var(--color-primary-dark); }
.btn.secondary { background: var(--color-secondary); }
.btn.secondary:hover { background: var(--color-secondary-dark); }
.btn.ghost { background: transparent; color: var(--color-primary); border: 2px solid var(--color-primary); }

.choice-btn {
  display: block;
  width: 100%;
  text-align: left;
  background: #fff;
  border: 2px solid #f0d8e2;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 10px;
  font-size: 1rem;
  cursor: pointer;
}

.choice-btn:hover { border-color: var(--color-secondary); }
.choice-btn.correct { background: var(--color-success-bg); border-color: var(--color-success); }
.choice-btn.incorrect { background: var(--color-error-bg); border-color: var(--color-error); }

.progress-label { font-size: 0.9rem; color: var(--color-text-muted); margin-top: 12px; }

.action-row { margin-top: 16px; }

@media (max-width: 480px) {
  .app-header h1 { font-size: 1.2rem; }
  .grid { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); }
}
```

- [ ] **Step 2: index.html を作成する**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ポーランド語 日常会話</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="app-header">
  <div class="container">
    <span class="badge">🇵🇱 かぞくと話そう</span>
    <h1>ポーランド語 日常会話</h1>
    <p>フレーズを覚えて、家族との会話に使ってみよう</p>
  </div>
</header>

<main class="container">

  <section id="screen-top" class="screen active">
    <div id="category-grid" class="grid"></div>
  </section>

  <section id="screen-alphabet" class="screen">
    <button class="btn ghost" data-action="back-to-top">← トップへ戻る</button>
    <h2>ポーランド語の文字</h2>
    <div id="alphabet-grid"></div>
  </section>

  <section id="screen-category" class="screen">
    <button class="btn ghost" data-action="back-to-top">← トップへ戻る</button>
    <h2 id="category-title"></h2>
    <div id="phrase-grid"></div>
  </section>

  <section id="screen-quiz-setup" class="screen">
    <button class="btn ghost" data-action="back-to-top">← トップへ戻る</button>
    <h2 id="quiz-setup-title"></h2>
    <p>出題方向を選んでください</p>
    <button class="btn" data-action="start-quiz-ja2pl">日本語 → ポーランド語</button>
    <button class="btn secondary" data-action="start-quiz-pl2ja">ポーランド語 → 日本語</button>
  </section>

  <section id="screen-quiz" class="screen">
    <div class="progress-label" id="quiz-progress"></div>
    <div class="card" id="quiz-question-card"></div>
  </section>

  <section id="screen-quiz-result" class="screen">
    <div id="quiz-result-body"></div>
  </section>

</main>

<script src="data/content.js"></script>
<script src="js/quiz-logic.js"></script>
<script src="js/app.js"></script>
</body>
</html>
```

- [ ] **Step 3: ブラウザで見た目を確認する**

Claude Browser preview で `index.html` を開き、以下を確認する:
- ヘッダーがピンク→水色のグラデーションで表示される
- コンソールエラーが出ていない(この時点で`#category-grid`等は空でよい。`js/app.js`は未作成なので読み込みエラーは許容 — Task 4で解消)
- モバイル幅(375px)にリサイズしてもヘッダー・コンテナが崩れない

- [ ] **Step 4: コミット**

```bash
git add index.html css/style.css
git commit -m "feat: add HTML shell and pink/light-blue theme"
```

---

## Task 4: トップ画面・文字学習画面 (js/app.js 前半)

**Files:**
- Create: `js/app.js`

**Interfaces:**
- Consumes: `POLISH_DATA`(Task 1), `#category-grid`/`#screen-alphabet`/`#alphabet-grid`(Task 3のHTML)
- Produces: `showScreen(screenId)`, `renderTopScreen()`, `renderAlphabetScreen()` — Task 5・6のコードから呼び出される関数

- [ ] **Step 1: js/app.js を作成し、画面切替・トップ画面・文字学習画面を実装する**

```js
const CATEGORY_ICONS = {
  greetings: '👋', fillers: '💬', feelings: '❤️', questions: '❓',
  requests: '🙏', answers: '✅', family: '🏠', numbers: '🔢'
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

function renderTopScreen() {
  const grid = document.getElementById('category-grid');
  const alphabetCard = `
    <div class="card category-card" data-action="open-alphabet">
      <div class="icon">🔤</div>
      <div class="title">ポーランド語の文字</div>
    </div>`;
  const categoryCards = POLISH_DATA.categories.map(category => `
    <div class="card category-card" data-action="open-category" data-category-id="${escapeHtml(category.id)}">
      <div class="icon">${CATEGORY_ICONS[category.id] || '📘'}</div>
      <div class="title">${escapeHtml(category.title)}</div>
    </div>`).join('');
  grid.innerHTML = alphabetCard + categoryCards;
}

function renderAlphabetScreen() {
  const grid = document.getElementById('alphabet-grid');
  const letterCards = POLISH_DATA.alphabet.map(entry => `
    <div class="card" style="margin-bottom:10px;">
      <span class="pl" style="font-size:1.3rem;font-weight:bold;">${escapeHtml(entry.letter)}</span>
      <span class="reading" style="margin-left:10px;">${escapeHtml(entry.reading)}</span>
      <div class="note" style="color:var(--color-text-muted);margin-top:4px;">${escapeHtml(entry.note)}</div>
    </div>`).join('');
  const digraphCards = POLISH_DATA.digraphs.map(entry => `
    <div class="card" style="margin-bottom:10px;">
      <span class="pl" style="font-size:1.3rem;font-weight:bold;">${escapeHtml(entry.letters)}</span>
      <span class="reading" style="margin-left:10px;">${escapeHtml(entry.reading)}</span>
    </div>`).join('');
  grid.innerHTML = '<h3>独自の文字</h3>' + letterCards + '<h3>特殊な組み合わせ</h3>' + digraphCards;
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;

  if (action === 'back-to-top') {
    showScreen('screen-top');
  } else if (action === 'open-alphabet') {
    renderAlphabetScreen();
    showScreen('screen-alphabet');
  } else if (action === 'open-category') {
    renderCategoryScreen(target.dataset.categoryId);
    showScreen('screen-category');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  renderTopScreen();
  showScreen('screen-top');
});
```

- [ ] **Step 2: ブラウザで動作確認する**

Claude Browser preview で `index.html` をリロードし、以下を確認する(この時点では`renderCategoryScreen`が未定義のためカテゴリカードのクリックはコンソールエラーになるが、それはTask 5で解消する想定 — 確認は文字カードのクリックのみで行う):
- トップ画面に「ポーランド語の文字」+8カテゴリのカードが表示される
- 「ポーランド語の文字」カードをクリックすると文字学習画面に遷移し、9文字+6組み合わせが表示される
- 「← トップへ戻る」でトップ画面に戻れる

- [ ] **Step 3: コミット**

```bash
git add js/app.js
git commit -m "feat: add top screen and alphabet screen rendering"
```

---

## Task 5: カテゴリ詳細画面(フレーズカード開閉) (js/app.js 追加)

**Files:**
- Modify: `js/app.js`(Task 4で作成したファイルに追記)

**Interfaces:**
- Consumes: `escapeHtml`, `showScreen`(Task 4)
- Produces: `renderCategoryScreen(categoryId)` — Task 4のクリックハンドラから既に呼ばれている関数を実装する

- [ ] **Step 1: renderCategoryScreen とカード開閉ロジックを追加する**

`js/app.js` の `document.addEventListener('click', ...)` より前に追加:

```js
function renderCategoryScreen(categoryId) {
  const category = POLISH_DATA.categories.find(c => c.id === categoryId);
  document.getElementById('category-title').textContent = category.title;
  const grid = document.getElementById('phrase-grid');
  grid.innerHTML = category.phrases.map((phrase, index) => `
    <div class="card phrase-card" data-action="toggle-phrase" data-index="${index}">
      <div class="pl">${escapeHtml(phrase.pl)}</div>
      <div class="reading">${escapeHtml(phrase.reading)}</div>
      <div class="details">
        <div class="ja">${escapeHtml(phrase.ja)}</div>
        ${phrase.note ? `<div class="note">${escapeHtml(phrase.note)}</div>` : ''}
      </div>
    </div>`).join('');
  grid.dataset.categoryId = categoryId;

  const setupTitle = document.getElementById('quiz-setup-title');
  setupTitle.textContent = `${category.title} クイズ`;
  document.getElementById('screen-quiz-setup').dataset.categoryId = categoryId;

  const quizButton = document.querySelector('#screen-category [data-action="open-quiz-setup"]');
  if (!quizButton) {
    const btn = document.createElement('button');
    btn.className = 'btn action-row';
    btn.dataset.action = 'open-quiz-setup';
    btn.textContent = 'このカテゴリのクイズに挑戦';
    document.getElementById('screen-category').appendChild(btn);
  }
}
```

そして既存の `document.addEventListener('click', ...)` 内、`else if (action === 'open-category') { ... }` の直後に追加:

```js
  } else if (action === 'toggle-phrase') {
    target.classList.toggle('revealed');
  } else if (action === 'open-quiz-setup') {
    const categoryId = document.getElementById('phrase-grid').dataset.categoryId;
    showScreen('screen-quiz-setup');
    document.getElementById('screen-quiz-setup').dataset.categoryId = categoryId;
```

(このステップでは `open-quiz-setup` のハンドラ登録のみ行い、実際のクイズ開始処理はTask 6で追加する)

- [ ] **Step 2: ブラウザで動作確認する**

Claude Browser preview で `index.html` をリロードし、以下を確認する:
- トップ画面から「挨拶・別れ」カードをクリックしてカテゴリ詳細画面に遷移する
- ポーランド語とカタカナ読みが常に表示されている
- フレーズカードをタップすると日本語訳とメモが表示され、もう一度タップすると隠れる
- 「このカテゴリのクイズに挑戦」ボタンが表示され、クリックするとクイズ設定画面に遷移する(この時点ではまだ選択肢ボタンは機能しなくてよい)
- 「← トップへ戻る」でトップ画面に戻れる

- [ ] **Step 3: コミット**

```bash
git add js/app.js
git commit -m "feat: add category detail screen with tap-to-reveal phrase cards"
```

---

## Task 6: クイズ画面(出題・採点) (js/app.js 追加)

**Files:**
- Modify: `js/app.js`

**Interfaces:**
- Consumes: `QuizLogic.buildQuizQuestions`(Task 2)、`showScreen`/`escapeHtml`(Task 4)、`#screen-quiz-setup`の`data-category-id`(Task 5)
- Produces: 完成した学習アプリ(このタスクで全機能が揃う)

- [ ] **Step 1: クイズ状態管理と描画関数を追加する**

`js/app.js` 内、`renderCategoryScreen` の後に追加:

```js
const quizState = { questions: [], index: 0, score: 0, answered: false };

function startQuiz(categoryId, direction) {
  const category = POLISH_DATA.categories.find(c => c.id === categoryId);
  const rng = Math.random;
  quizState.questions = QuizLogic.buildQuizQuestions(category, POLISH_DATA.categories, direction, rng);
  quizState.index = 0;
  quizState.score = 0;
  quizState.answered = false;
  showScreen('screen-quiz');
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const total = quizState.questions.length;
  const current = quizState.questions[quizState.index];
  document.getElementById('quiz-progress').textContent = `${quizState.index + 1} / ${total} 問`;

  const promptReadingHtml = current.promptReading
    ? `<div class="reading">${escapeHtml(current.promptReading)}</div>`
    : '';

  const choicesHtml = current.choices.map((choice, i) => `
    <button class="choice-btn" data-action="select-choice" data-choice-index="${i}">
      ${escapeHtml(choice.text)}${choice.reading ? ` <span class="reading">(${escapeHtml(choice.reading)})</span>` : ''}
    </button>`).join('');

  document.getElementById('quiz-question-card').innerHTML = `
    <div class="pl" style="font-size:1.2rem;">${escapeHtml(current.prompt)}</div>
    ${promptReadingHtml}
    <div style="margin-top:16px;">${choicesHtml}</div>
    <div id="quiz-feedback"></div>
  `;
  quizState.answered = false;
}

function selectChoice(choiceIndex) {
  if (quizState.answered) return;
  quizState.answered = true;
  const current = quizState.questions[quizState.index];
  const buttons = document.querySelectorAll('#quiz-question-card .choice-btn');
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === current.correctIndex) btn.classList.add('correct');
    else if (i === choiceIndex) btn.classList.add('incorrect');
  });

  const isCorrect = choiceIndex === current.correctIndex;
  if (isCorrect) quizState.score += 1;

  const feedback = document.getElementById('quiz-feedback');
  feedback.innerHTML = `
    <p style="margin-top:12px;">
      ${isCorrect ? '正解!' : '不正解'} —
      正解: ${escapeHtml(current.correctAnswer)}${current.correctReading ? `(${escapeHtml(current.correctReading)})` : ''}
    </p>
    <button class="btn" data-action="next-question">
      ${quizState.index + 1 < quizState.questions.length ? '次の問題へ' : '結果を見る'}
    </button>
  `;
}

function nextQuestion() {
  quizState.index += 1;
  if (quizState.index < quizState.questions.length) {
    renderQuizQuestion();
  } else {
    renderQuizResult();
  }
}

function renderQuizResult() {
  showScreen('screen-quiz-result');
  const total = quizState.questions.length;
  document.getElementById('quiz-result-body').innerHTML = `
    <div class="card">
      <h2>結果: ${quizState.score} / ${total} 問正解</h2>
    </div>
    <button class="btn" data-action="back-to-top">トップへ戻る</button>
  `;
}
```

- [ ] **Step 2: クリックハンドラにクイズ関連アクションを追加する**

既存の `document.addEventListener('click', ...)` 内、`open-quiz-setup` の分岐を以下のように差し替える(クイズ開始ボタンの処理を追加):

```js
  } else if (action === 'open-quiz-setup') {
    const categoryId = document.getElementById('phrase-grid').dataset.categoryId;
    document.getElementById('screen-quiz-setup').dataset.categoryId = categoryId;
    showScreen('screen-quiz-setup');
  } else if (action === 'start-quiz-ja2pl') {
    startQuiz(document.getElementById('screen-quiz-setup').dataset.categoryId, 'ja2pl');
  } else if (action === 'start-quiz-pl2ja') {
    startQuiz(document.getElementById('screen-quiz-setup').dataset.categoryId, 'pl2ja');
  } else if (action === 'select-choice') {
    selectChoice(Number(target.dataset.choiceIndex));
  } else if (action === 'next-question') {
    nextQuestion();
  }
```

- [ ] **Step 3: ブラウザで一連の流れを確認する**

Claude Browser preview で `index.html` をリロードし、以下を確認する:
- カテゴリ詳細画面 →「このカテゴリのクイズに挑戦」→ 出題方向選択 →「日本語 → ポーランド語」を選ぶとクイズが始まる
- 4択の選択肢が表示され、正解/不正解が色分けされる。不正解時は正解の選択肢が緑色でハイライトされる
- 「次の問題へ」を押すと次の問題に進み、最終問題では「結果を見る」ボタンになる
- 結果画面にスコア(◯/◯問正解)が表示され、「トップへ戻る」でトップに戻れる
- 「ポーランド語 → 日本語」方向でも同様に動作する
- モバイル幅(375px)でクイズ画面が崩れずに操作できる
- ブラウザのコンソールにエラーが出ていない

- [ ] **Step 4: コミット**

```bash
git add js/app.js
git commit -m "feat: add quiz screen with scoring"
```

---

## Self-Review Notes

- **Spec coverage:** 文字パート(Task1,4)、8カテゴリ全フレーズ(Task1)、カテゴリ詳細画面の常時カタカナ表示+タップ開閉(Task3,5)、クイズ4択・同カテゴリ優先抽出(Task2,6)、拡張性(`data/content.js`のみで新カテゴリ反映、Task1のデータ構造をUIが動的読込)、レスポンシブ・配色(Task3)を各タスクでカバー。
- **Placeholder scan:** 全ステップに実コードを記載済み。TODO/TBDなし。
- **Type consistency:** `phrase = { pl, reading, ja, note }` はTask1〜6で一貫。`QuizLogic.buildQuizQuestions`の戻り値プロパティ名(`prompt`, `promptReading`, `correctAnswer`, `correctReading`, `choices`, `correctIndex`)はTask2のテストとTask6の`renderQuizQuestion`/`selectChoice`で一致させてある。
