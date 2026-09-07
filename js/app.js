const CATEGORY_ICONS = {
  greetings: '👋', fillers: '💬', feelings: '❤️', questions: '❓',
  requests: '🙏', answers: '✅', family: '🏠', numbers: '🔢',
  colors: '🎨', weather: '☀️', impressions: '😋'
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
  const searchCard = `
    <div class="card category-card" data-action="open-search">
      <div class="icon">🔍</div>
      <div class="title">フレーズを検索</div>
    </div>`;
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
  grid.innerHTML = searchCard + alphabetCard + categoryCards;
}

function renderSearchResults(query) {
  const trimmed = query.trim();
  const resultsEl = document.getElementById('search-results');

  if (!trimmed) {
    resultsEl.innerHTML = '<p class="search-hint">日本語でフレーズを入力すると、登録されているポーランド語フレーズを検索できます。</p>';
    return;
  }

  const matches = [];
  POLISH_DATA.categories.forEach(category => {
    category.phrases.forEach(phrase => {
      if (phrase.ja.includes(trimmed)) {
        matches.push({ category, phrase });
      }
    });
  });

  if (matches.length === 0) {
    resultsEl.innerHTML = '<p class="search-hint">見つかりませんでした。</p>';
    return;
  }

  resultsEl.innerHTML = matches.map(({ category, phrase }) => `
    <div class="card phrase-card">
      <div class="search-result-category">${escapeHtml(category.title)}</div>
      <div class="pl-row">
        <div class="pl">${escapeHtml(phrase.pl)}</div>
        <button class="speak-btn" data-action="speak" data-text="${escapeHtml(phrase.pl)}" aria-label="発音を再生">🔊</button>
      </div>
      <div class="reading">${escapeHtml(phrase.reading)}</div>
      <div class="details">
        <div class="ja">${escapeHtml(phrase.ja)}</div>
        ${phrase.note ? `<div class="note">${escapeHtml(phrase.note)}</div>` : ''}
      </div>
    </div>`).join('');
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

function speakPolish(text) {
  if (!('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pl-PL';
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function renderCategoryScreen(categoryId) {
  const category = POLISH_DATA.categories.find(c => c.id === categoryId);
  document.getElementById('category-title').textContent = category.title;
  const grid = document.getElementById('phrase-grid');
  grid.innerHTML = category.phrases.map((phrase, index) => `
    <div class="card phrase-card" data-index="${index}">
      <div class="pl-row">
        <div class="pl">${escapeHtml(phrase.pl)}</div>
        <button class="speak-btn" data-action="speak" data-text="${escapeHtml(phrase.pl)}" aria-label="発音を再生">🔊</button>
      </div>
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

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;

  if (action === 'back-to-top') {
    showScreen('screen-top');
  } else if (action === 'open-search') {
    showScreen('screen-search');
    renderSearchResults(document.getElementById('search-input').value);
    document.getElementById('search-input').focus();
  } else if (action === 'open-alphabet') {
    renderAlphabetScreen();
    showScreen('screen-alphabet');
  } else if (action === 'open-category') {
    renderCategoryScreen(target.dataset.categoryId);
    showScreen('screen-category');
  } else if (action === 'speak') {
    speakPolish(target.dataset.text);
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
});

document.getElementById('search-input').addEventListener('input', (event) => {
  renderSearchResults(event.target.value);
});

document.addEventListener('DOMContentLoaded', () => {
  renderTopScreen();
  showScreen('screen-top');
});
