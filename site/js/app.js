(function () {
  'use strict';

  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  function el(tag, props = {}, kids = []) {
    const e = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === 'className') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k === 'onclick') e.onclick = v;
      else e.setAttribute(k, v);
    });
    (Array.isArray(kids) ? kids : [kids]).forEach(k => {
      if (k == null) return;
      if (typeof k === 'string') e.appendChild(document.createTextNode(k));
      else e.appendChild(k);
    });
    return e;
  }

  /* ---------------- ROTEAMENTO ---------------- */
  const state = { page: 'home', unit: null, slideIdx: 0, currentUnitTab: 'u1' };

  function goTo(page, arg) {
    state.page = page;
    $$('.page').forEach(p => p.classList.toggle('active', p.dataset.page === page));
    $$('.topbar nav button').forEach(b => {
      b.classList.toggle('active', b.dataset.nav === page || (page === 'aula' && b.dataset.nav === 'home'));
    });
    window.scrollTo(0, 0);

    if (page === 'home') renderHome();
    if (page === 'aula') { state.unit = arg; state.slideIdx = 0; renderSlide(); }
    if (page === 'questoes') renderQuestoes();
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-nav]');
    if (t) { e.preventDefault(); goTo(t.dataset.nav); }
  });

  /* ---------------- HOME ---------------- */
  function renderHome() {
    const list = $('#unitList');
    list.innerHTML = '';
    const meta = [
      { key: 'u1', num: '1', title: 'Python básico', desc: 'Variáveis, funções, listas, classes, decorators. A base pra tudo que vem.' },
      { key: 'u2', num: '2', title: 'HTTP, APIs e REST', desc: 'Como cliente e servidor conversam. Métodos, códigos de status, o que é REST.' },
      { key: 'u3', num: '3', title: 'Flask — primeira aplicação', desc: 'Ambiente virtual, rotas, blueprints e a ideia de Application Factory.' },
      { key: 'u4', num: '4', title: 'Application Factory e Contexto', desc: 'Import circular, injeção de dependência, os 3 contextos e os 4 proxies.' },
      { key: 'u5', num: '5', title: 'Empacotamento, dependências e testes', desc: 'pyproject.toml, pip install editable, Invoke, PyTest, fixtures e cobertura.' },
      { key: 'u6', num: '6', title: 'Modelos, ORM e persistência', desc: 'Flask-SQLAlchemy, entidades TaskFlow, relacionamentos e cascade.' }
    ];
    meta.forEach(u => {
      const c = el('div', { className: 'unit-card', onclick: () => goTo('aula', u.key) }, [
        el('div', { className: 'num' }, [u.num]),
        el('div', { className: 'info' }, [
          el('h3', {}, [u.title]),
          el('p', {}, [u.desc])
        ]),
        el('div', { className: 'arrow' }, ['→'])
      ]);
      list.appendChild(c);
    });
  }

  /* ---------------- SLIDES ---------------- */
  function renderSlide() {
    const lesson = LESSONS[state.unit];
    if (!lesson) return;
    const i = state.slideIdx;
    const slide = lesson.slides[i];
    const total = lesson.slides.length;

    // progress
    $('#slideProgress').style.width = `${((i + 1) / total) * 100}%`;
    $('#slideMeta').textContent = lesson.title;
    $('#slideCounter').textContent = `${i + 1} / ${total}`;

    // botões
    $('#slidePrev').disabled = i === 0;
    $('#slideNext').textContent = (i === total - 1) ? 'Concluir ✓' : '›';

    // conteúdo
    const container = $('#slideContainer');
    container.innerHTML = '';
    container.className = 'slide' + (slide.type === 'title' ? ' title-slide' : '');

    const inner = el('div', { className: 'slide-inner' });

    if (slide.kicker) {
      inner.appendChild(el('div', { className: 'slide-kicker', html: slide.kicker }));
    }

    if (slide.title) {
      inner.appendChild(el('h2', { className: 'slide-title', html: slide.title }));
    }

    if (slide.illustration) {
      inner.appendChild(el('div', { className: 'slide-illustration', html: slide.illustration }));
    }

    if (slide.body) {
      inner.appendChild(el('div', { className: 'slide-body', html: slide.body }));
    }

    if (slide.code) {
      // usa a função py() do data.js pra envelopar em <pre><code> com highlight
      inner.appendChild(el('div', { html: py(slide.code) }));
    }

    if (slide.html) {
      inner.appendChild(el('div', { html: slide.html }));
    }

    if (slide.note) {
      const noteClass = 'slide-note' + (slide.noteType ? ' ' + slide.noteType : '');
      inner.appendChild(el('div', { className: noteClass, html: slide.note }));
    }

    container.appendChild(inner);
  }

  function nextSlide() {
    const total = LESSONS[state.unit].slides.length;
    if (state.slideIdx < total - 1) { state.slideIdx++; renderSlide(); }
    else goTo('home');
  }
  function prevSlide() {
    if (state.slideIdx > 0) { state.slideIdx--; renderSlide(); }
  }

  // clique nos botões: dispara nav e libera o foco (senão o botão continua reagindo a Enter/Espaço)
  $('#slideNext').addEventListener('click', () => { nextSlide(); document.activeElement && document.activeElement.blur(); });
  $('#slidePrev').addEventListener('click', () => { prevSlide(); document.activeElement && document.activeElement.blur(); });

  // trava anti-repique — impede dois avanços dentro de 250ms mesmo com autorepeat/duplo evento
  let _navLock = 0;
  function tryNav(fn) {
    const now = Date.now();
    if (now - _navLock < 250) return;
    _navLock = now;
    fn();
  }

  document.addEventListener('keydown', e => {
    if (state.page !== 'aula') return;
    if (e.target.matches('input, textarea')) return;
    if (e.repeat) return;                       // ignora autorepeat quando segura a tecla

    const key = e.key;
    if (key === 'ArrowRight' || key === 'PageDown') { e.preventDefault(); tryNav(nextSlide); }
    else if (key === 'ArrowLeft' || key === 'PageUp') { e.preventDefault(); tryNav(prevSlide); }
    else if (key === ' ') {
      // Espaço: se o foco está num botão, deixa o próprio botão processar (evita duplo disparo)
      const ae = document.activeElement;
      if (ae && ae.tagName === 'BUTTON') return;
      e.preventDefault(); tryNav(nextSlide);
    }
    else if (key === 'Escape') goTo('home');
  });

  /* ---------------- QUESTÕES ---------------- */
  $$('#unitTabs button').forEach(b => {
    b.addEventListener('click', () => {
      state.currentUnitTab = b.dataset.utab;
      $$('#unitTabs button').forEach(x => x.classList.toggle('active', x === b));
      renderQuestoesList();
    });
  });

  function renderQuestoes() {
    $$('#unitTabs button').forEach(x => x.classList.toggle('active', x.dataset.utab === state.currentUnitTab));
    renderQuestoesList();
  }

  function renderQuestoesList() {
    const container = $('#questoesContent');
    container.innerHTML = '';
    const list = QUESTOES[state.currentUnitTab] || [];

    // Placar apenas para MCQ (unidades 3 e 4)
    const isMCQ = list.every(q => q.type === 'mcq');
    if (isMCQ && list.length > 0) {
      const scoreBar = el('div', { className: 'score-bar', id: 'scoreBar' });
      container.appendChild(scoreBar);
      updateScoreBar();
    }

    list.forEach((q, i) => {
      const block = el('div', { className: 'q-block', 'data-qid': `${state.currentUnitTab}-${i}` });
      block.appendChild(el('div', { className: 'qnum', html: `${q.ref}` }));
      block.appendChild(el('div', { className: 'qtext', html: q.q }));

      if (q.type === 'mcq') renderMCQ(block, q, i);
      else renderRevealable(block, q, i);

      container.appendChild(block);
    });
  }

  function renderMCQ(container, q, idx) {
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const opts = el('div', { className: 'mcq-opts' });
    const buttons = [];
    let answered = false;

    q.opts.forEach((opt, i) => {
      const btn = el('button', { className: 'mcq-opt' });
      btn.innerHTML = `<span class="letter">${letters[i]}.</span> ${opt}`;
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const isRight = i === q.correct;
        buttons.forEach((b, j) => {
          b.disabled = true;
          if (j === q.correct) b.classList.add('correct');
          if (j === i && !isRight) b.classList.add('incorrect');
        });
        const fb = el('div', { className: 'q-feedback' });
        fb.innerHTML = `<strong>${isRight ? '✓ Correto.' : '✗ Errou.'}</strong> ${q.explain}`;
        container.appendChild(fb);

        // salvar resultado
        recordAnswer(state.currentUnitTab, idx, isRight);
      });
      buttons.push(btn);
      opts.appendChild(btn);
    });
    container.appendChild(opts);
  }

  function renderRevealable(container, q, idx) {
    const btn = el('button', { className: 'reveal-btn' }, [
      q.type === 'reflection' ? 'Ver resposta modelo' : 'Ver solução comentada'
    ]);
    btn.addEventListener('click', () => {
      btn.remove();
      const sol = el('div', { className: 'solution' });
      sol.appendChild(el('h5', {}, [q.type === 'reflection' ? 'Resposta modelo' : 'Solução comentada']));
      sol.innerHTML += q.solution;
      container.appendChild(sol);
    });
    container.appendChild(btn);
  }

  /* --- placar simples (só sessão atual) --- */
  const scores = {};
  function recordAnswer(unit, idx, right) {
    if (!scores[unit]) scores[unit] = { right: 0, wrong: 0, answered: new Set() };
    const key = `${unit}-${idx}`;
    if (scores[unit].answered.has(key)) return;
    scores[unit].answered.add(key);
    if (right) scores[unit].right++; else scores[unit].wrong++;
    updateScoreBar();
  }

  function updateScoreBar() {
    const bar = $('#scoreBar');
    if (!bar) return;
    const s = scores[state.currentUnitTab] || { right: 0, wrong: 0 };
    const list = QUESTOES[state.currentUnitTab] || [];
    const total = list.length;
    const done = s.right + s.wrong;
    bar.innerHTML = `
      <span><strong>${done}</strong> / ${total} respondidas</span>
      <span class="badge-ok">✓ ${s.right} corretas</span>
      <span class="badge-err">✗ ${s.wrong} erradas</span>
    `;
  }

  /* ---------------- INIT ---------------- */
  document.addEventListener('DOMContentLoaded', () => {
    renderHome();
  });

  // renderiza imediatamente também (script no fim do body)
  renderHome();

})();
