/* =========================================================
   Componentes interativos — Árvore B, Ordenação externa, Recursão
   ========================================================= */

const INTERACTIVE = {};


/* =========================================================
   1) ÁRVORE B INTERATIVA
   ========================================================= */

class BTree {
  constructor(order) {
    this.order = order;                                 // m
    this.root = { keys: [], children: [] };
    this.maxKeys = order - 1;
  }

  isLeaf(node) { return node.children.length === 0; }

  contains(key) { return this._find(this.root, key); }
  _find(node, key) {
    if (!node) return false;
    let i = 0;
    while (i < node.keys.length && node.keys[i] < key) i++;
    if (i < node.keys.length && node.keys[i] === key) return true;
    if (this.isLeaf(node)) return false;
    return this._find(node.children[i], key);
  }

  insert(key) {
    if (this.contains(key)) return { duplicate: true };
    const log = [];
    const result = this._ins(this.root, key, log);
    if (result.split) {
      this.root = {
        keys: [result.middleKey],
        children: [result.left, result.right]
      };
      log.push(`Raiz também estava cheia → nova raiz [${result.middleKey}] criada. Altura da árvore aumentou.`);
    }
    return { log };
  }

  _ins(node, key, log) {
    if (this.isLeaf(node)) {
      let i = 0;
      while (i < node.keys.length && node.keys[i] < key) i++;
      node.keys.splice(i, 0, key);
      log.push(`Inseriu ${this._fmt(key)} na folha → [${node.keys.map(k=>this._fmt(k)).join(', ')}]`);
      if (node.keys.length > this.maxKeys) return this._split(node, log);
      return { split: false };
    }
    let i = 0;
    while (i < node.keys.length && node.keys[i] < key) i++;
    const result = this._ins(node.children[i], key, log);
    if (result.split) {
      node.keys.splice(i, 0, result.middleKey);
      node.children[i] = result.left;
      node.children.splice(i + 1, 0, result.right);
      log.push(`Promoveu ${this._fmt(result.middleKey)} pra pai → [${node.keys.map(k=>this._fmt(k)).join(', ')}]`);
      if (node.keys.length > this.maxKeys) return this._split(node, log);
    }
    return { split: false };
  }

  _split(node, log) {
    // node tem order keys → estourou. usa meio-esquerda (⌊n/2⌋)
    const midIdx = Math.floor((node.keys.length - 1) / 2);
    const middleKey = node.keys[midIdx];
    const left = {
      keys: node.keys.slice(0, midIdx),
      children: node.children.length ? node.children.slice(0, midIdx + 1) : []
    };
    const right = {
      keys: node.keys.slice(midIdx + 1),
      children: node.children.length ? node.children.slice(midIdx + 1) : []
    };
    log.push(`Nó cheio → split. Sobe ${this._fmt(middleKey)}. Esq=[${left.keys.map(k=>this._fmt(k)).join(', ')}], Dir=[${right.keys.map(k=>this._fmt(k)).join(', ')}]`);
    return { split: true, middleKey, left, right };
  }

  _fmt(k) { return k; }

  // ---------- LAYOUT ----------
  // Computes { positions: [{node, x, y, w}], edges: [{fromX, fromY, toX, toY}], width, height }
  layout(mode = 'numbers') {
    const CELL_W = mode === 'letters' ? 40 : 44;
    const CELL_H = 40;
    const LEVEL_GAP = 70;
    const NODE_GAP = 30;

    const measure = (node) => {
      const nodeW = Math.max(CELL_W, node.keys.length * CELL_W);
      if (this.isLeaf(node)) { node._w = nodeW; return nodeW; }
      let childW = 0;
      node.children.forEach((c, i) => {
        childW += measure(c);
        if (i > 0) childW += NODE_GAP;
      });
      node._w = Math.max(nodeW, childW);
      return node._w;
    };

    measure(this.root);

    const positions = [];
    const edges = [];
    let maxDepth = 0;

    const place = (node, x, y, depth) => {
      maxDepth = Math.max(maxDepth, depth);
      const nodeW = Math.max(CELL_W, node.keys.length * CELL_W);
      const nodeX = x + (node._w - nodeW) / 2;
      positions.push({ node, x: nodeX, y, w: nodeW, cellW: CELL_W, cellH: CELL_H, depth });

      if (!this.isLeaf(node)) {
        let cx = x;
        node.children.forEach((c, i) => {
          const childY = y + LEVEL_GAP;
          const childNodeW = Math.max(CELL_W, c.keys.length * CELL_W);
          const childX = cx + (c._w - childNodeW) / 2;
          // linha do canto inferior do pai (posição do filho i) até topo do filho
          const parentAnchorX = nodeX + (nodeW * (i + 0.5)) / (node.keys.length + 1);
          edges.push({
            fromX: parentAnchorX,
            fromY: y + CELL_H,
            toX: childX + childNodeW / 2,
            toY: childY
          });
          place(c, cx, childY, depth + 1);
          cx += c._w + NODE_GAP;
        });
      }
    };

    place(this.root, 0, 0, 0);
    const totalWidth = this.root._w;
    const totalHeight = (maxDepth + 1) * (CELL_H + LEVEL_GAP) - LEVEL_GAP + 10;
    return { positions, edges, width: totalWidth, height: totalHeight };
  }

  renderSVG(mode = 'numbers') {
    if (this.root.keys.length === 0) {
      return `<div class="tree-empty">Árvore vazia. Insira uma chave.</div>`;
    }
    const layout = this.layout(mode);
    const pad = 20;
    const W = layout.width + pad * 2;
    const H = layout.height + pad * 2;

    let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">`;

    // arestas
    layout.edges.forEach(e => {
      svg += `<path d="M ${e.fromX + pad} ${e.fromY + pad} L ${e.toX + pad} ${e.toY + pad}" stroke="#7c9cff" stroke-width="1.5" fill="none" opacity="0.6"/>`;
    });

    // nós
    layout.positions.forEach(p => {
      const isRoot = p.depth === 0;
      const isLeaf = this.isLeaf(p.node);
      const color = isRoot ? '#fbbf24' : (isLeaf ? '#4ade80' : '#7c9cff');
      svg += `<g>`;
      svg += `<rect x="${p.x + pad}" y="${p.y + pad}" width="${p.w}" height="${p.cellH}" rx="6" fill="#1c1c25" stroke="${color}" stroke-width="2"/>`;
      // linhas verticais entre chaves
      for (let i = 1; i < p.node.keys.length; i++) {
        const lx = p.x + pad + (i * p.w) / p.node.keys.length;
        svg += `<line x1="${lx}" y1="${p.y + pad}" x2="${lx}" y2="${p.y + pad + p.cellH}" stroke="${color}" stroke-width="1" opacity="0.5"/>`;
      }
      // chaves
      p.node.keys.forEach((k, i) => {
        const kx = p.x + pad + ((i + 0.5) * p.w) / p.node.keys.length;
        svg += `<text x="${kx}" y="${p.y + pad + p.cellH/2 + 5}" text-anchor="middle" fill="#f0f0f5" font-size="14" font-weight="600">${k}</text>`;
      });
      svg += `</g>`;
    });

    svg += `</svg>`;
    return svg;
  }
}

/* --- Render do widget de árvore B --- */
INTERACTIVE.btree = function(container) {
  const state = {
    order: 4,
    mode: 'numbers',   // 'numbers' | 'letters'
    tree: new BTree(4),
    log: []
  };

  function nextValidInput() {
    if (state.mode === 'numbers') {
      return Math.floor(Math.random() * 90) + 10;   // 10-99
    } else {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return letters[Math.floor(Math.random() * letters.length)];
    }
  }

  function insertPreset(preset) {
    state.tree = new BTree(state.order);
    state.log = [];
    preset.forEach(k => {
      const r = state.tree.insert(k);
      if (r.log) state.log.push(...r.log.map(l => `[${k}] ${l}`));
    });
    render();
  }

  function insertKey(rawKey) {
    let key;
    if (state.mode === 'numbers') {
      key = parseInt(rawKey, 10);
      if (isNaN(key)) { alert('Digite um número.'); return; }
    } else {
      key = String(rawKey).toUpperCase().trim();
      if (!/^[A-Z]$/.test(key)) { alert('Digite uma letra de A a Z.'); return; }
    }
    const r = state.tree.insert(key);
    if (r.duplicate) {
      state.log.push(`[${key}] Chave já existe → ignorada.`);
    } else if (r.log) {
      state.log.push(...r.log.map(l => `[${key}] ${l}`));
    }
    render();
  }

  function reset() {
    state.tree = new BTree(state.order);
    state.log = [];
    render();
  }

  function changeOrder(m) {
    state.order = m;
    state.tree = new BTree(m);
    state.log = [];
    render();
  }

  function changeMode(mode) {
    state.mode = mode;
    state.tree = new BTree(state.order);
    state.log = [];
    render();
  }

  function render() {
    const presetsNum = {
      '4': [10, 20, 30, 40, 50, 60, 70, 80],
      '3': [1, 2, 3, 4, 5, 6, 7],
      '5': [10, 20, 5, 40, 30, 25, 45, 50, 60, 70],
      '6': [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    };
    const presetsLet = {
      '4': ['C','N','G','A','H','E','K','Q','M','F','W'],
      '3': ['B','A','C','D','E','F','G'],
      '5': ['M','A','R','C','O','P','L','E','B'],
      '6': ['A','B','C','D','E','F','G','H','I','J','K','L']
    };

    container.innerHTML = `
      <div class="itv-controls">
        <div class="itv-group">
          <label>Ordem m</label>
          <div class="itv-btns">
            ${[3,4,5,6].map(m => `<button class="itv-btn ${state.order===m?'active':''}" data-order="${m}">${m}</button>`).join('')}
          </div>
        </div>
        <div class="itv-group">
          <label>Modo</label>
          <div class="itv-btns">
            <button class="itv-btn ${state.mode==='numbers'?'active':''}" data-mode="numbers">Números</button>
            <button class="itv-btn ${state.mode==='letters'?'active':''}" data-mode="letters">Letras</button>
          </div>
        </div>
        <div class="itv-group">
          <label>Inserir chave</label>
          <div class="itv-input-row">
            <input type="text" id="itv-key-input" placeholder="${state.mode==='numbers'?'ex: 42':'ex: K'}" maxlength="${state.mode==='numbers'?3:1}"/>
            <button class="itv-btn primary" id="itv-insert">Inserir</button>
            <button class="itv-btn" id="itv-random">🎲 Aleatório</button>
          </div>
        </div>
        <div class="itv-group">
          <label>Ações</label>
          <div class="itv-btns">
            <button class="itv-btn" id="itv-preset">Exemplo pré-pronto</button>
            <button class="itv-btn danger" id="itv-reset">Limpar</button>
          </div>
        </div>
      </div>

      <div class="itv-info">
        Ordem ${state.order} → cada nó tem no máx <strong>${state.order-1} chaves</strong> e <strong>${state.order} filhos</strong>.
      </div>

      <div class="itv-canvas">
        ${state.tree.renderSVG(state.mode)}
      </div>

      <div class="itv-log">
        <div class="itv-log-title">Histórico de operações</div>
        <div class="itv-log-body">
          ${state.log.length ? state.log.slice(-8).map(l => `<div>${l}</div>`).join('') : '<div class="dim">Sem operações ainda.</div>'}
        </div>
      </div>
    `;

    // wire up
    container.querySelectorAll('[data-order]').forEach(b => {
      b.onclick = () => changeOrder(parseInt(b.dataset.order));
    });
    container.querySelectorAll('[data-mode]').forEach(b => {
      b.onclick = () => changeMode(b.dataset.mode);
    });
    container.querySelector('#itv-insert').onclick = () => {
      const inp = container.querySelector('#itv-key-input');
      if (inp.value.trim()) { insertKey(inp.value); inp.value = ''; inp.focus(); }
    };
    container.querySelector('#itv-random').onclick = () => insertKey(nextValidInput());
    container.querySelector('#itv-key-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') container.querySelector('#itv-insert').click();
    });
    container.querySelector('#itv-preset').onclick = () => {
      const p = state.mode === 'numbers' ? presetsNum[state.order] : presetsLet[state.order];
      insertPreset(p);
    };
    container.querySelector('#itv-reset').onclick = reset;
  }

  render();
};


/* =========================================================
   2) CALCULADORA DE ORDENAÇÃO EXTERNA
   ========================================================= */

INTERACTIVE.extsort = function(container) {
  const state = {
    N: 1000,
    m: 100,
    f: 4,
    selecao: false
  };

  function calc() {
    const effMin = state.selecao ? state.m * 2 : state.m;
    const runs = Math.ceil(state.N / effMin);
    let logRuns = runs;
    let passes = 0;
    const merges = [];
    while (logRuns > 1) {
      const next = Math.ceil(logRuns / state.f);
      merges.push({ from: logRuns, to: next });
      logRuns = next;
      passes++;
    }
    return { runs, passes: passes + 1, merges, totalRuns: passes };
  }

  function render() {
    const r = calc();
    container.innerHTML = `
      <div class="itv-controls">
        <div class="itv-group">
          <label>N — total de registros</label>
          <input type="range" min="100" max="100000" step="100" value="${state.N}" id="in-N"/>
          <div class="itv-value">${state.N.toLocaleString('pt-BR')}</div>
        </div>
        <div class="itv-group">
          <label>m — cabem na RAM</label>
          <input type="range" min="10" max="2000" step="10" value="${state.m}" id="in-m"/>
          <div class="itv-value">${state.m}</div>
        </div>
        <div class="itv-group">
          <label>f — caminhos (merge)</label>
          <input type="range" min="2" max="16" step="1" value="${state.f}" id="in-f"/>
          <div class="itv-value">${state.f}</div>
        </div>
        <div class="itv-group">
          <label>
            <input type="checkbox" id="in-selecao" ${state.selecao?'checked':''}/>
            Usar seleção por substituição
            <span class="dim" style="font-size:11px;display:block;margin-top:4px;">Runs iniciais viram ~2m em média</span>
          </label>
        </div>
      </div>

      <div class="itv-result">
        <div class="itv-metric">
          <div class="itv-metric-label">Runs iniciais</div>
          <div class="itv-metric-value">${r.runs}</div>
          <div class="itv-metric-sub">de ${state.selecao ? (state.m*2)+' regs cada (2m)' : state.m+' regs cada (m)'}</div>
        </div>
        <div class="itv-metric">
          <div class="itv-metric-label">Passadas totais</div>
          <div class="itv-metric-value big">${r.passes}</div>
          <div class="itv-metric-sub">${r.totalRuns} de merge + 1 de geração</div>
        </div>
      </div>

      <div class="itv-formula">
        <div class="itv-formula-title">Fórmula</div>
        <code>P = ⌈log_${state.f} (${state.N}/${state.selecao?state.m*2:state.m})⌉ + 1
  = ⌈log_${state.f} (${(state.N/(state.selecao?state.m*2:state.m)).toFixed(2)})⌉ + 1
  = ⌈${Math.log(state.N/(state.selecao?state.m*2:state.m))/Math.log(state.f)|0}⌉ + 1
  = <strong>${r.passes}</strong> passadas</code>
      </div>

      <div class="itv-formula">
        <div class="itv-formula-title">Evolução das runs a cada passada</div>
        <div class="itv-runs-viz">
          <div class="itv-run-step">
            <div class="itv-run-label">Geração</div>
            <div class="itv-run-bar" style="width:${Math.min(100, r.runs*4)}%;">${r.runs} runs</div>
          </div>
          ${r.merges.map((m, i) => `
            <div class="itv-run-step">
              <div class="itv-run-label">Merge ${i+1}</div>
              <div class="itv-run-bar" style="width:${Math.min(100, m.to*8)}%;">${m.from} → ${m.to} runs</div>
            </div>
          `).join('')}
          <div class="itv-run-step">
            <div class="itv-run-label">Final</div>
            <div class="itv-run-bar done" style="width:8%;">1 run</div>
          </div>
        </div>
      </div>
    `;

    ['N','m','f'].forEach(key => {
      const el = container.querySelector(`#in-${key}`);
      el.oninput = () => { state[key] = parseInt(el.value); render(); };
    });
    container.querySelector('#in-selecao').onchange = e => { state.selecao = e.target.checked; render(); };
  }
  render();
};


/* =========================================================
   3) VISUALIZADOR DE RECURSÃO — pilha vs cauda
   ========================================================= */

INTERACTIVE.recursion = function(container) {
  const state = {
    n: 5,
    mode: 'comum'   // 'comum' | 'cauda'
  };

  function render() {
    const n = state.n;
    // Simula empilhamento
    const frames = [];
    for (let i = n; i >= 1; i--) frames.push(i);

    let stackHTML;
    if (state.mode === 'comum') {
      stackHTML = frames.map((v, i) => `
        <div class="rec-frame comum" style="opacity:${0.35 + (i * 0.1)}">
          <span>fat(${v})</span>
          <span class="rec-pending">= ${v} × fat(${v-1})</span>
        </div>
      `).reverse().join('');
    } else {
      stackHTML = `
        <div class="rec-frame cauda">
          <span>fat_aux(${n}, 1)</span>
          <span class="rec-pending">acumulando: ${1}</span>
        </div>
      `;
      // Show mutation of the same frame
      let acc = 1;
      const steps = [];
      for (let i = n; i >= 1; i--) {
        acc *= i;
        steps.push(`fat_aux(${i-1}, ${acc})`);
      }
      stackHTML += `
        <div class="rec-transitions">
          <div class="rec-transition-title">mesmo frame, parâmetros atualizados:</div>
          ${steps.map(s => `<div class="rec-transition">→ ${s}</div>`).join('')}
        </div>
      `;
    }

    // Compute the result
    let result = 1;
    for (let i = 1; i <= n; i++) result *= i;

    container.innerHTML = `
      <div class="itv-controls">
        <div class="itv-group">
          <label>Calcular fat(n)</label>
          <input type="range" min="1" max="10" value="${n}" id="rec-n"/>
          <div class="itv-value">n = ${n}</div>
        </div>
        <div class="itv-group">
          <label>Modo</label>
          <div class="itv-btns">
            <button class="itv-btn ${state.mode==='comum'?'active':''}" data-mode="comum">Recursão comum</button>
            <button class="itv-btn ${state.mode==='cauda'?'active':''}" data-mode="cauda">Recursão de cauda</button>
          </div>
        </div>
      </div>

      <div class="rec-viz">
        <div class="rec-stack-panel">
          <div class="rec-panel-title">${state.mode === 'comum' ? 'Pilha crescendo — O(n) memória' : 'Um único frame — O(1) memória'}</div>
          <div class="rec-stack">${stackHTML}</div>
        </div>
        <div class="rec-info-panel">
          <div class="rec-result">
            <div class="rec-result-label">fat(${n}) =</div>
            <div class="rec-result-value">${result.toLocaleString('pt-BR')}</div>
          </div>
          <div class="rec-explain">
            ${state.mode === 'comum'
              ? '<strong>Cada chamada empilha um novo frame</strong>. Só depois de todos empilharem, começa a desempilhar multiplicando. Para n grande, risco de stack overflow.'
              : '<strong>Um frame só, reaproveitado.</strong> A cada chamada, os parâmetros n e acc são atualizados. Como não há trabalho pendente após o return, o compilador substitui a chamada por um "salto" para o início da função. Vira essencialmente um loop.'
            }
          </div>
        </div>
      </div>
    `;

    container.querySelector('#rec-n').oninput = e => { state.n = parseInt(e.target.value); render(); };
    container.querySelectorAll('[data-mode]').forEach(b => {
      b.onclick = () => { state.mode = b.dataset.mode; render(); };
    });
  }
  render();
};
