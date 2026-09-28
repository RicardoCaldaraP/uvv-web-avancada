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
      else if (k === 'style' && typeof v === 'object') Object.assign(e.style, v);
      else e.setAttribute(k, v);
    });
    (Array.isArray(kids) ? kids : [kids]).forEach(k => {
      if (k == null) return;
      if (typeof k === 'string') e.appendChild(document.createTextNode(k));
      else e.appendChild(k);
    });
    return e;
  }

  /* -------------- STATE + ROUTING -------------- */
  const state = {
    page: 'subjects',
    subject: null,      // 'web' | 'ed2'
    unit: null,         // 'u1' | ... | 'prova'
    slideIdx: 0,
    qTab: null          // aba ativa em questoes
  };

  function goTo(page, opts = {}) {
    state.page = page;
    if (opts.subject !== undefined) state.subject = opts.subject;
    if (opts.unit !== undefined) { state.unit = opts.unit; state.slideIdx = 0; }
    if (opts.qTab !== undefined) state.qTab = opts.qTab;

    $$('.page').forEach(p => p.classList.toggle('active', p.dataset.page === page));
    window.scrollTo(0, 0);
    closeIndex();

    updateCrumbs();

    if (page === 'subjects') renderSubjectsHome();
    if (page === 'subject-home') renderSubjectHome();
    if (page === 'aula') renderSlide();
    if (page === 'questoes') { if (!state.qTab) state.qTab = getSubject().questionTabs[0].key; renderQuestoes(); }
  }

  function getSubject() {
    return state.subject ? SUBJECTS[state.subject] : null;
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-nav]');
    if (t) { e.preventDefault(); goTo(t.dataset.nav); }
  });

  /* -------------- BREADCRUMBS -------------- */
  function updateCrumbs() {
    const cont = $('#crumbs');
    cont.innerHTML = '';
    if (state.page === 'subjects') return;

    const subj = getSubject();
    if (!subj) return;

    const sep = () => el('span', { className: 'sep' }, ['/']);
    const crumb = (text, target, current = false) => {
      const b = el('span', { className: 'crumb' + (current ? ' current' : ''), html: text });
      if (!current && target) b.onclick = target;
      return b;
    };

    cont.appendChild(sep());
    cont.appendChild(crumb(subj.short, () => goTo('subject-home')));

    if (state.page === 'aula' && state.unit) {
      const lesson = subj.lessons[state.unit];
      cont.appendChild(sep());
      cont.appendChild(crumb(lesson.title, null, true));
    } else if (state.page === 'questoes') {
      cont.appendChild(sep());
      cont.appendChild(crumb('Questões', null, true));
    }
  }

  /* -------------- HOME DE MATÉRIAS -------------- */
  function renderSubjectsHome() {
    const grid = $('#subjectGrid');
    grid.innerHTML = '';
    Object.values(SUBJECTS).forEach(subj => {
      const nLessons = Object.keys(subj.lessons).length;
      const nQuestions = Object.values(subj.questions).reduce((a, arr) => a + arr.length, 0);
      const card = el('div', { className: 'subject-card', style: { '--subject-color': subj.color } });
      card.style.setProperty('--subject-color', subj.color);
      card.innerHTML = `
        <div class="subject-short">${subj.short}</div>
        <h3>${subj.name}</h3>
        <p>${subj.description}</p>
        <div class="stats">
          <span><strong>${nLessons}</strong> aulas</span>
          <span><strong>${nQuestions}</strong> questões</span>
        </div>
      `;
      card.onclick = () => goTo('subject-home', { subject: subj.slug, unit: null });
      grid.appendChild(card);
    });
  }

  /* -------------- HOME DA MATÉRIA -------------- */
  function renderSubjectHome() {
    const subj = getSubject();
    if (!subj) return goTo('subjects');

    $('#subjectTitle').textContent = subj.name;
    $('#subjectDesc').textContent = subj.description;

    const list = $('#unitList');
    list.innerHTML = '';
    subj.lessonList.forEach(u => {
      const card = el('div', { className: 'unit-card', onclick: () => goTo('aula', { unit: u.key }) }, [
        el('div', { className: 'num' }, [u.num]),
        el('div', { className: 'info' }, [
          el('h3', {}, [u.title]),
          el('p', {}, [u.desc])
        ]),
        el('div', { className: 'arrow' }, ['→'])
      ]);
      list.appendChild(card);
    });
  }

  /* -------------- SLIDES -------------- */
  function currentLesson() {
    const subj = getSubject();
    return subj && state.unit ? subj.lessons[state.unit] : null;
  }

  function renderSlide() {
    const lesson = currentLesson();
    if (!lesson) return goTo('subject-home');

    const i = state.slideIdx;
    const slide = lesson.slides[i];
    const total = lesson.slides.length;

    $('#slideProgress').style.width = `${((i + 1) / total) * 100}%`;
    $('#slideMeta').textContent = lesson.title;
    $('#slideCounter').textContent = `${i + 1} / ${total}`;

    $('#slidePrev').disabled = i === 0;
    $('#slideNext').textContent = (i === total - 1) ? 'Concluir ✓' : '›';

    const container = $('#slideContainer');
    container.innerHTML = '';
    container.className = 'slide' + (slide.type === 'title' ? ' title-slide' : '');

    const inner = el('div', { className: 'slide-inner' });
    if (slide.kicker) inner.appendChild(el('div', { className: 'slide-kicker', html: slide.kicker }));
    if (slide.title) inner.appendChild(el('h2', { className: 'slide-title', html: slide.title }));
    if (slide.illustration) inner.appendChild(el('div', { className: 'slide-illustration', html: slide.illustration }));
    if (slide.body) inner.appendChild(el('div', { className: 'slide-body', html: slide.body }));
    if (slide.code) inner.appendChild(el('div', { html: py(slide.code) }));
    if (slide.html) inner.appendChild(el('div', { html: slide.html }));
    if (slide.note) {
      const cls = 'slide-note' + (slide.noteType ? ' ' + slide.noteType : '');
      inner.appendChild(el('div', { className: cls, html: slide.note }));
    }
    container.appendChild(inner);
  }

  function nextSlide() {
    const total = currentLesson().slides.length;
    if (state.slideIdx < total - 1) { state.slideIdx++; renderSlide(); }
    else goTo('subject-home');
  }
  function prevSlide() {
    if (state.slideIdx > 0) { state.slideIdx--; renderSlide(); }
  }
  function jumpSlide(idx) {
    const total = currentLesson().slides.length;
    if (idx >= 0 && idx < total) { state.slideIdx = idx; renderSlide(); closeIndex(); }
  }

  $('#slideNext').addEventListener('click', () => { nextSlide(); document.activeElement && document.activeElement.blur(); });
  $('#slidePrev').addEventListener('click', () => { prevSlide(); document.activeElement && document.activeElement.blur(); });

  /* trava anti-repique */
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
    if (e.repeat) return;

    const key = e.key;
    if (key === 'Escape') { if (isIndexOpen()) { closeIndex(); return; } goTo('subject-home'); return; }
    if (key === 't' || key === 'T') { e.preventDefault(); toggleIndex(); return; }

    if (isIndexOpen()) return;

    if (key === 'ArrowRight' || key === 'PageDown') { e.preventDefault(); tryNav(nextSlide); }
    else if (key === 'ArrowLeft' || key === 'PageUp') { e.preventDefault(); tryNav(prevSlide); }
    else if (key === ' ') {
      const ae = document.activeElement;
      if (ae && ae.tagName === 'BUTTON') return;
      e.preventDefault(); tryNav(nextSlide);
    }
  });

  /* -------------- MENU DE TÓPICOS -------------- */
  const indexEl = $('#slideIndex');
  const indexBackdrop = $('#slideIndexBackdrop');
  const indexList = $('#slideIndexList');

  function isIndexOpen() { return indexEl.classList.contains('open'); }
  function openIndex() {
    const lesson = currentLesson();
    if (!lesson) return;
    indexList.innerHTML = '';
    lesson.slides.forEach((s, i) => {
      const title = s.title || (s.type === 'title' ? '(capa)' : '(sem título)');
      const btn = el('button', { className: (i === state.slideIdx ? 'current' : ''), html: title });
      btn.onclick = () => jumpSlide(i);
      const li = el('li', {}, [btn]);
      indexList.appendChild(li);
    });
    indexEl.classList.add('open');
    indexBackdrop.classList.add('open');
    // scroll para o slide atual
    setTimeout(() => {
      const current = indexList.querySelector('.current');
      if (current) current.scrollIntoView({ block: 'center' });
    }, 100);
  }
  function closeIndex() {
    indexEl.classList.remove('open');
    indexBackdrop.classList.remove('open');
  }
  function toggleIndex() {
    if (isIndexOpen()) closeIndex(); else openIndex();
  }

  $('#openIndex').addEventListener('click', toggleIndex);
  $('#closeIndex').addEventListener('click', closeIndex);
  indexBackdrop.addEventListener('click', closeIndex);

  /* -------------- QUESTÕES -------------- */
  function renderQuestoes() {
    const subj = getSubject();
    if (!subj) return goTo('subjects');

    $('#questoesTitle').textContent = `${subj.name} — Questões`;
    $('#questoesLead').innerHTML = subj.slug === 'web'
      ? 'Unidades 1–4: questões dos PDFs originais. Unidades 5 e 6: atividades práticas baseadas no conteúdo.'
      : 'Aba <strong>Simulado</strong> cobre os temas mais frequentes em prova. Abas por unidade trazem atividades focadas por assunto.';

    const tabs = $('#unitTabs');
    tabs.innerHTML = '';
    subj.questionTabs.forEach(t => {
      const b = el('button', { html: t.label });
      if (t.key === state.qTab) b.classList.add('active');
      b.onclick = () => { state.qTab = t.key; renderQuestoes(); };
      tabs.appendChild(b);
    });

    renderQuestoesList();
  }

  function renderQuestoesList() {
    const subj = getSubject();
    const container = $('#questoesContent');
    container.innerHTML = '';
    const list = subj.questions[state.qTab] || [];

    const isMCQ = list.length > 0 && list.every(q => q.type === 'mcq');
    if (isMCQ) {
      container.appendChild(el('div', { className: 'score-bar', id: 'scoreBar' }));
      updateScoreBar();
    }

    list.forEach((q, i) => {
      const block = el('div', { className: 'q-block', 'data-qid': `${subj.slug}-${state.qTab}-${i}` });
      block.appendChild(el('div', { className: 'qnum', html: q.ref }));
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
        recordAnswer(state.subject, state.qTab, idx, isRight);
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

  const scores = {};
  function scoreKey() { return `${state.subject}-${state.qTab}`; }
  function recordAnswer(subject, tab, idx, right) {
    const key = `${subject}-${tab}`;
    if (!scores[key]) scores[key] = { right: 0, wrong: 0, answered: new Set() };
    const id = `${key}-${idx}`;
    if (scores[key].answered.has(id)) return;
    scores[key].answered.add(id);
    if (right) scores[key].right++; else scores[key].wrong++;
    updateScoreBar();
  }

  function updateScoreBar() {
    const bar = $('#scoreBar');
    if (!bar) return;
    const subj = getSubject();
    const s = scores[scoreKey()] || { right: 0, wrong: 0 };
    const total = (subj.questions[state.qTab] || []).length;
    const done = s.right + s.wrong;
    bar.innerHTML = `
      <span><strong>${done}</strong> / ${total} respondidas</span>
      <span class="badge-ok">✓ ${s.right} corretas</span>
      <span class="badge-err">✗ ${s.wrong} erradas</span>
    `;
  }

  /* -------------- INIT -------------- */
  document.addEventListener('DOMContentLoaded', () => {
    renderSubjectsHome();
    updateCrumbs();
  });
  renderSubjectsHome();
  updateCrumbs();

})();
