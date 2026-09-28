/* =========================================================
   Estrutura de Dados II — aulas + questões
   Todo material é original: explicações, exemplos, ilustrações
   e questões escritos do zero, baseados na ementa da matéria.
   ========================================================= */

/* ---------- helper para código C ---------- */
function c(str) {
  const kw = ['int','char','float','double','void','struct','typedef','if','else','while','for','do','return','break','continue','switch','case','default','static','const','sizeof','NULL','printf','scanf','malloc','free','#define','#include'];
  const tokens = [];
  const stash = (h) => { tokens.push(h); return `\x00T${tokens.length - 1}\x00`; };
  let s = str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  s = s.replace(/(\/\/[^\n]*)/g, m => stash(`<span class="tok-com">${m}</span>`));
  s = s.replace(/(\/\*[\s\S]*?\*\/)/g, m => stash(`<span class="tok-com">${m}</span>`));
  s = s.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, m => stash(`<span class="tok-str">${m}</span>`));
  s = s.replace(/\b(\d+\.?\d*)\b/g, m => stash(`<span class="tok-num">${m}</span>`));
  kw.forEach(k => {
    s = s.replace(new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}\\b`, 'g'), m => stash(`<span class="tok-kw">${m}</span>`));
  });
  s = s.replace(/\x00T(\d+)\x00/g, (_, i) => tokens[+i]);
  return `<pre><code>${s}</code></pre>`;
}


/* =========================================================
   SVGs para ED2
   ========================================================= */

const SVG_ED2 = {

  memoria: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <g>
      <rect x="30" y="50" width="180" height="140" rx="10" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <text x="120" y="80" text-anchor="middle" fill="#4ade80" font-size="14" font-weight="700">Memória Primária</text>
      <text x="120" y="100" text-anchor="middle" fill="#a0a0aa" font-size="11">(RAM)</text>
      <text x="120" y="135" text-anchor="middle" fill="#f0f0f5" font-size="12">⚡ rápida</text>
      <text x="120" y="155" text-anchor="middle" fill="#f0f0f5" font-size="12">💰 cara</text>
      <text x="120" y="175" text-anchor="middle" fill="#f0f0f5" font-size="12">📉 pequena</text>
    </g>
    <g>
      <rect x="290" y="50" width="180" height="140" rx="10" fill="#1c1c25" stroke="#fbbf24" stroke-width="2"/>
      <text x="380" y="80" text-anchor="middle" fill="#fbbf24" font-size="14" font-weight="700">Memória Secundária</text>
      <text x="380" y="100" text-anchor="middle" fill="#a0a0aa" font-size="11">(disco / SSD)</text>
      <text x="380" y="135" text-anchor="middle" fill="#f0f0f5" font-size="12">🐢 lenta</text>
      <text x="380" y="155" text-anchor="middle" fill="#f0f0f5" font-size="12">🪙 barata</text>
      <text x="380" y="175" text-anchor="middle" fill="#f0f0f5" font-size="12">📈 gigante</text>
    </g>
    <text x="250" y="220" text-anchor="middle" fill="#a0a0aa" font-size="12">arquivos vivem no disco — o custo de acessá-los pesa muito</text>
  </svg>`,

  blocagem: `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <text x="130" y="30" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="700">SEM blocagem</text>
    <text x="370" y="30" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="700">COM blocagem</text>

    <g>
      <rect x="20" y="60" width="30" height="30" rx="3" fill="#1c1c25" stroke="#ef4444"/>
      <rect x="55" y="60" width="30" height="30" rx="3" fill="#1c1c25" stroke="#ef4444"/>
      <rect x="90" y="60" width="30" height="30" rx="3" fill="#1c1c25" stroke="#ef4444"/>
      <rect x="125" y="60" width="30" height="30" rx="3" fill="#1c1c25" stroke="#ef4444"/>
      <rect x="160" y="60" width="30" height="30" rx="3" fill="#1c1c25" stroke="#ef4444"/>
      <rect x="195" y="60" width="30" height="30" rx="3" fill="#1c1c25" stroke="#ef4444"/>
      <text x="35" y="80" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">R</text>
      <text x="70" y="80" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">R</text>
      <text x="105" y="80" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">R</text>
      <text x="140" y="80" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">R</text>
      <text x="175" y="80" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">R</text>
      <text x="210" y="80" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">R</text>
      <text x="130" y="125" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="700">6 seeks</text>
      <text x="130" y="145" text-anchor="middle" fill="#a0a0aa" font-size="11">1 disco/registro</text>
    </g>

    <g>
      <rect x="270" y="60" width="90" height="30" rx="3" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <rect x="365" y="60" width="90" height="30" rx="3" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <text x="285" y="80" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="11">R R R</text>
      <text x="380" y="80" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="11">R R R</text>
      <text x="315" y="105" text-anchor="middle" fill="#4ade80" font-size="9">bloco</text>
      <text x="410" y="105" text-anchor="middle" fill="#4ade80" font-size="9">bloco</text>
      <text x="370" y="140" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="700">2 seeks</text>
      <text x="370" y="158" text-anchor="middle" fill="#a0a0aa" font-size="11">1 disco/bloco (3 regs)</text>
    </g>

    <text x="250" y="205" text-anchor="middle" fill="#a0a0aa" font-size="12">agrupar registros em blocos → menos idas ao disco</text>
  </svg>`,

  complexidade: `<svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <!-- eixos -->
    <line x1="50" y1="220" x2="470" y2="220" stroke="#a0a0aa" stroke-width="1.5"/>
    <line x1="50" y1="220" x2="50" y2="30" stroke="#a0a0aa" stroke-width="1.5"/>
    <text x="470" y="240" fill="#a0a0aa" font-size="11" text-anchor="end">n</text>
    <text x="35" y="35" fill="#a0a0aa" font-size="11">t</text>

    <!-- O(1) -->
    <line x1="50" y1="210" x2="460" y2="210" stroke="#4ade80" stroke-width="2"/>
    <text x="465" y="215" fill="#4ade80" font-size="11">O(1)</text>

    <!-- O(log n) -->
    <path d="M 50 200 Q 200 170 460 155" stroke="#7c9cff" fill="none" stroke-width="2"/>
    <text x="330" y="150" fill="#7c9cff" font-size="11">O(log n)</text>

    <!-- O(n) -->
    <line x1="50" y1="215" x2="450" y2="60" stroke="#fbbf24" stroke-width="2"/>
    <text x="460" y="65" fill="#fbbf24" font-size="11">O(n)</text>

    <!-- O(n²) -->
    <path d="M 50 220 Q 200 210 300 130 Q 360 70 380 35" stroke="#ef4444" fill="none" stroke-width="2"/>
    <text x="390" y="40" fill="#ef4444" font-size="11">O(n²)</text>

    <text x="250" y="250" text-anchor="middle" fill="#a0a0aa" font-size="12">quanto mais alto no gráfico, pior escalabilidade</text>
  </svg>`,

  casos: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <g>
      <rect x="20" y="50" width="140" height="110" rx="8" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <text x="90" y="75" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">Melhor caso</text>
      <text x="90" y="105" text-anchor="middle" fill="#a0a0aa" font-size="11">elemento é</text>
      <text x="90" y="123" text-anchor="middle" fill="#a0a0aa" font-size="11">o 1º da lista</text>
      <text x="90" y="150" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="13">1 comparação</text>
    </g>
    <g>
      <rect x="180" y="50" width="140" height="110" rx="8" fill="#1c1c25" stroke="#fbbf24" stroke-width="2"/>
      <text x="250" y="75" text-anchor="middle" fill="#fbbf24" font-size="13" font-weight="700">Caso médio</text>
      <text x="250" y="105" text-anchor="middle" fill="#a0a0aa" font-size="11">esperado se</text>
      <text x="250" y="123" text-anchor="middle" fill="#a0a0aa" font-size="11">acontece por acaso</text>
      <text x="250" y="150" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="13">(n+1)/2</text>
    </g>
    <g>
      <rect x="340" y="50" width="140" height="110" rx="8" fill="#1c1c25" stroke="#ef4444" stroke-width="2"/>
      <text x="410" y="75" text-anchor="middle" fill="#ef4444" font-size="13" font-weight="700">Pior caso</text>
      <text x="410" y="105" text-anchor="middle" fill="#a0a0aa" font-size="11">elemento é o</text>
      <text x="410" y="123" text-anchor="middle" fill="#a0a0aa" font-size="11">último ou não existe</text>
      <text x="410" y="150" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="13">n comparações</text>
    </g>
  </svg>`,

  pilha_recursao: `<svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
    <text x="250" y="25" text-anchor="middle" fill="#f0f0f5" font-family="Inter" font-size="14" font-weight="600">pilha de chamadas — fat(3)</text>

    <g>
      <rect x="130" y="50" width="240" height="34" rx="4" fill="#1c1c25" stroke="#7c9cff" stroke-width="1.5"/>
      <text x="145" y="72" fill="#f0f0f5" font-size="13">fat(1) → 1</text>
      <text x="360" y="72" text-anchor="end" fill="#a0a0aa" font-size="10">base</text>
    </g>
    <g>
      <rect x="130" y="90" width="240" height="34" rx="4" fill="#1c1c25" stroke="#7c9cff"/>
      <text x="145" y="112" fill="#f0f0f5" font-size="13">fat(2) → 2 * fat(1)</text>
    </g>
    <g>
      <rect x="130" y="130" width="240" height="34" rx="4" fill="#1c1c25" stroke="#7c9cff"/>
      <text x="145" y="152" fill="#f0f0f5" font-size="13">fat(3) → 3 * fat(2)</text>
      <text x="360" y="152" text-anchor="end" fill="#a0a0aa" font-size="10">topo</text>
    </g>

    <path d="M 250 170 L 250 200" stroke="#4ade80" stroke-width="2" marker-end="url(#ap)"/>
    <text x="270" y="188" fill="#4ade80" font-family="Inter" font-size="12">volta desempilhando: 1 → 2 → 6</text>

    <text x="250" y="240" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="12">cada chamada empilha um frame; retorno desempilha</text>

    <defs><marker id="ap" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4ade80"/></marker></defs>
  </svg>`,

  cauda: `<svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <text x="130" y="30" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="700">NÃO É cauda</text>
    <text x="370" y="30" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="700">É cauda</text>

    <g>
      <rect x="30" y="50" width="200" height="140" rx="8" fill="#1c1c25" stroke="#ef4444"/>
      <text x="45" y="80" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">int soma(v, n) {</text>
      <text x="60" y="102" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">if (n==0) return 0;</text>
      <text x="60" y="124" fill="#ef4444" font-family="JetBrains Mono, monospace" font-size="12">return v[n-1] +</text>
      <text x="80" y="142" fill="#ef4444" font-family="JetBrains Mono, monospace" font-size="12">soma(v, n-1);</text>
      <text x="45" y="164" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">}</text>
      <text x="130" y="183" text-anchor="middle" fill="#a0a0aa" font-size="10">soma antes de retornar</text>
    </g>

    <g>
      <rect x="270" y="50" width="210" height="140" rx="8" fill="#1c1c25" stroke="#4ade80"/>
      <text x="285" y="80" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="11">int soma(v, n, acc) {</text>
      <text x="300" y="102" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="11">if (n==0) return acc;</text>
      <text x="300" y="124" fill="#4ade80" font-family="JetBrains Mono, monospace" font-size="11">return soma(v, n-1,</text>
      <text x="325" y="142" fill="#4ade80" font-family="JetBrains Mono, monospace" font-size="11">acc + v[n-1]);</text>
      <text x="285" y="164" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="11">}</text>
      <text x="375" y="183" text-anchor="middle" fill="#a0a0aa" font-size="10">chamada é a última coisa</text>
    </g>

    <text x="250" y="230" text-anchor="middle" fill="#a0a0aa" font-size="12">quando a chamada recursiva é a última operação — não precisa "guardar" nada</text>
  </svg>`,

  intercalacao: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
    <text x="250" y="25" text-anchor="middle" fill="#f0f0f5" font-family="Inter" font-size="14" font-weight="600">Intercalação — f = 2 caminhos</text>

    <g>
      <rect x="30" y="60" width="160" height="30" rx="4" fill="#1c1c25" stroke="#7c9cff"/>
      <text x="45" y="80" fill="#f0f0f5" font-size="12">1  4  7  10</text>
      <text x="45" y="53" fill="#a0a0aa" font-size="10" font-family="Inter">fita A</text>
    </g>
    <g>
      <rect x="30" y="100" width="160" height="30" rx="4" fill="#1c1c25" stroke="#7c9cff"/>
      <text x="45" y="120" fill="#f0f0f5" font-size="12">2  5  8  11</text>
      <text x="45" y="93" fill="#a0a0aa" font-size="10" font-family="Inter">fita B</text>
    </g>

    <path d="M 200 100 L 280 100" stroke="#4ade80" stroke-width="2" marker-end="url(#am)"/>
    <text x="240" y="93" text-anchor="middle" fill="#4ade80" font-family="Inter" font-size="11">merge</text>

    <g>
      <rect x="290" y="80" width="190" height="40" rx="4" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <text x="305" y="105" fill="#f0f0f5" font-size="12">1 2 4 5 7 8 10 11</text>
      <text x="305" y="73" fill="#a0a0aa" font-size="10" font-family="Inter">fita saída (ordenada)</text>
    </g>

    <text x="250" y="180" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="12">compara topo das f fitas, escreve o menor, avança essa fita</text>
    <text x="250" y="200" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="12">passadas: P = ⌈log_f (N/m)⌉ + 1</text>

    <defs><marker id="am" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4ade80"/></marker></defs>
  </svg>`,

  abb: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
    <text x="130" y="25" text-anchor="middle" fill="#4ade80" font-family="Inter" font-size="12" font-weight="700">ABB balanceada</text>
    <text x="370" y="25" text-anchor="middle" fill="#ef4444" font-family="Inter" font-size="12" font-weight="700">ABB degenerada</text>

    <g>
      <circle cx="130" cy="60" r="18" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <text x="130" y="66" text-anchor="middle" fill="#f0f0f5" font-size="12">10</text>
      <line x1="115" y1="75" x2="80" y2="110" stroke="#a0a0aa"/>
      <line x1="145" y1="75" x2="180" y2="110" stroke="#a0a0aa"/>

      <circle cx="80" cy="125" r="18" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <text x="80" y="131" text-anchor="middle" fill="#f0f0f5" font-size="12">5</text>
      <circle cx="180" cy="125" r="18" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <text x="180" y="131" text-anchor="middle" fill="#f0f0f5" font-size="12">15</text>

      <line x1="65" y1="140" x2="45" y2="170" stroke="#a0a0aa"/>
      <line x1="95" y1="140" x2="115" y2="170" stroke="#a0a0aa"/>
      <circle cx="40" cy="185" r="16" fill="#1c1c25" stroke="#4ade80"/>
      <text x="40" y="190" text-anchor="middle" fill="#f0f0f5" font-size="11">2</text>
      <circle cx="120" cy="185" r="16" fill="#1c1c25" stroke="#4ade80"/>
      <text x="120" y="190" text-anchor="middle" fill="#f0f0f5" font-size="11">7</text>

      <text x="130" y="220" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="11">busca ≈ log n</text>
    </g>

    <g>
      <circle cx="290" cy="60" r="18" fill="#1c1c25" stroke="#ef4444" stroke-width="2"/>
      <text x="290" y="66" text-anchor="middle" fill="#f0f0f5" font-size="12">1</text>
      <line x1="305" y1="75" x2="325" y2="95" stroke="#ef4444"/>
      <circle cx="335" cy="105" r="16" fill="#1c1c25" stroke="#ef4444" stroke-width="2"/>
      <text x="335" y="110" text-anchor="middle" fill="#f0f0f5" font-size="11">2</text>
      <line x1="348" y1="118" x2="368" y2="138" stroke="#ef4444"/>
      <circle cx="378" cy="148" r="16" fill="#1c1c25" stroke="#ef4444" stroke-width="2"/>
      <text x="378" y="153" text-anchor="middle" fill="#f0f0f5" font-size="11">3</text>
      <line x1="391" y1="161" x2="411" y2="181" stroke="#ef4444"/>
      <circle cx="421" cy="191" r="16" fill="#1c1c25" stroke="#ef4444" stroke-width="2"/>
      <text x="421" y="196" text-anchor="middle" fill="#f0f0f5" font-size="11">4</text>

      <text x="370" y="230" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="11">busca ≈ n (pior)</text>
    </g>
  </svg>`,

  arvoreB: `<svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
    <text x="250" y="25" text-anchor="middle" fill="#f0f0f5" font-family="Inter" font-size="14" font-weight="600">Árvore B — ordem 4</text>

    <!-- raiz -->
    <g>
      <rect x="200" y="60" width="100" height="34" rx="4" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <line x1="233" y1="60" x2="233" y2="94" stroke="#7c9cff"/>
      <line x1="266" y1="60" x2="266" y2="94" stroke="#7c9cff"/>
      <text x="216" y="82" text-anchor="middle" fill="#f0f0f5" font-size="14">30</text>
      <text x="250" y="82" text-anchor="middle" fill="#f0f0f5" font-size="14">60</text>
      <text x="283" y="82" text-anchor="middle" fill="#a0a0aa" font-size="12">·</text>
    </g>

    <line x1="216" y1="94" x2="80" y2="140" stroke="#a0a0aa"/>
    <line x1="250" y1="94" x2="230" y2="140" stroke="#a0a0aa"/>
    <line x1="283" y1="94" x2="390" y2="140" stroke="#a0a0aa"/>

    <!-- folha 1 -->
    <g>
      <rect x="30" y="140" width="100" height="34" rx="4" fill="#1c1c25" stroke="#4ade80"/>
      <line x1="63" y1="140" x2="63" y2="174" stroke="#4ade80"/>
      <line x1="96" y1="140" x2="96" y2="174" stroke="#4ade80"/>
      <text x="46" y="162" text-anchor="middle" fill="#f0f0f5" font-size="13">10</text>
      <text x="80" y="162" text-anchor="middle" fill="#f0f0f5" font-size="13">20</text>
      <text x="113" y="162" text-anchor="middle" fill="#a0a0aa" font-size="12">·</text>
    </g>

    <!-- folha 2 -->
    <g>
      <rect x="180" y="140" width="100" height="34" rx="4" fill="#1c1c25" stroke="#4ade80"/>
      <line x1="213" y1="140" x2="213" y2="174" stroke="#4ade80"/>
      <line x1="246" y1="140" x2="246" y2="174" stroke="#4ade80"/>
      <text x="196" y="162" text-anchor="middle" fill="#f0f0f5" font-size="13">40</text>
      <text x="230" y="162" text-anchor="middle" fill="#f0f0f5" font-size="13">50</text>
      <text x="263" y="162" text-anchor="middle" fill="#a0a0aa" font-size="12">·</text>
    </g>

    <!-- folha 3 -->
    <g>
      <rect x="340" y="140" width="100" height="34" rx="4" fill="#1c1c25" stroke="#4ade80"/>
      <line x1="373" y1="140" x2="373" y2="174" stroke="#4ade80"/>
      <line x1="406" y1="140" x2="406" y2="174" stroke="#4ade80"/>
      <text x="356" y="162" text-anchor="middle" fill="#f0f0f5" font-size="13">70</text>
      <text x="390" y="162" text-anchor="middle" fill="#f0f0f5" font-size="13">80</text>
      <text x="423" y="162" text-anchor="middle" fill="#a0a0aa" font-size="12">·</text>
    </g>

    <text x="250" y="215" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="12">ordem m = 4 → cada nó: até m-1 chaves (3) e m filhos (4)</text>
    <text x="250" y="235" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="12">balanceada, ideal para disco (cada nó = 1 bloco)</text>
  </svg>`,

  split: `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
    <text x="250" y="25" text-anchor="middle" fill="#f0f0f5" font-family="Inter" font-size="14" font-weight="600">particionamento — nó cheio, chega uma chave</text>

    <text x="130" y="55" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="11">nó cheio (ordem 4)</text>
    <g>
      <rect x="60" y="65" width="140" height="34" rx="4" fill="#1c1c25" stroke="#fbbf24" stroke-width="2"/>
      <line x1="95" y1="65" x2="95" y2="99" stroke="#fbbf24"/>
      <line x1="130" y1="65" x2="130" y2="99" stroke="#fbbf24"/>
      <line x1="165" y1="65" x2="165" y2="99" stroke="#fbbf24"/>
      <text x="77" y="87" text-anchor="middle" fill="#f0f0f5" font-size="13">10</text>
      <text x="112" y="87" text-anchor="middle" fill="#f0f0f5" font-size="13">20</text>
      <text x="147" y="87" text-anchor="middle" fill="#f0f0f5" font-size="13">30</text>
      <text x="182" y="87" text-anchor="middle" fill="#fbbf24" font-size="13">+35</text>
    </g>

    <path d="M 250 82 L 300 82" stroke="#a0a0aa" stroke-width="2" marker-end="url(#asp)"/>
    <text x="275" y="75" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="10">promove</text>

    <!-- resultado -->
    <g>
      <rect x="330" y="65" width="60" height="34" rx="4" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="360" y="87" text-anchor="middle" fill="#f0f0f5" font-size="13">20</text>
    </g>
    <line x1="345" y1="99" x2="330" y2="130" stroke="#a0a0aa"/>
    <line x1="375" y1="99" x2="390" y2="130" stroke="#a0a0aa"/>

    <g>
      <rect x="290" y="130" width="80" height="34" rx="4" fill="#1c1c25" stroke="#4ade80"/>
      <text x="330" y="152" text-anchor="middle" fill="#f0f0f5" font-size="13">10</text>
    </g>
    <g>
      <rect x="380" y="130" width="100" height="34" rx="4" fill="#1c1c25" stroke="#4ade80"/>
      <line x1="413" y1="130" x2="413" y2="164" stroke="#4ade80"/>
      <text x="396" y="152" text-anchor="middle" fill="#f0f0f5" font-size="13">30</text>
      <text x="447" y="152" text-anchor="middle" fill="#f0f0f5" font-size="13">35</text>
    </g>

    <text x="250" y="215" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="11">1) coloca a nova chave em ordem: 10 20 30 35</text>
    <text x="250" y="233" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="11">2) pega o do MEIO (20), sobe pro pai</text>
    <text x="250" y="251" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="11">3) resto vira dois nós: [10] e [30, 35]</text>

    <defs><marker id="asp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#a0a0aa"/></marker></defs>
  </svg>`,

  trie: `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
    <text x="250" y="25" text-anchor="middle" fill="#f0f0f5" font-family="Inter" font-size="14" font-weight="600">Trie — {casa, caso, cão}</text>

    <!-- raiz -->
    <circle cx="250" cy="55" r="16" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
    <text x="250" y="60" text-anchor="middle" fill="#a0a0aa" font-size="10">·</text>

    <line x1="245" y1="70" x2="180" y2="100" stroke="#a0a0aa"/>
    <text x="205" y="88" fill="#7c9cff" font-size="11">c</text>

    <!-- c -->
    <circle cx="170" cy="115" r="16" fill="#1c1c25" stroke="#7c9cff"/>
    <text x="170" y="120" text-anchor="middle" fill="#f0f0f5" font-size="11">c</text>

    <line x1="160" y1="128" x2="120" y2="155" stroke="#a0a0aa"/>
    <text x="135" y="144" fill="#7c9cff" font-size="11">a</text>
    <line x1="180" y1="128" x2="220" y2="155" stroke="#a0a0aa"/>
    <text x="205" y="144" fill="#7c9cff" font-size="11">ã</text>

    <!-- ca -->
    <circle cx="110" cy="170" r="16" fill="#1c1c25" stroke="#7c9cff"/>
    <text x="110" y="175" text-anchor="middle" fill="#f0f0f5" font-size="11">a</text>
    <!-- cã -->
    <circle cx="230" cy="170" r="16" fill="#1c1c25" stroke="#7c9cff"/>
    <text x="230" y="175" text-anchor="middle" fill="#f0f0f5" font-size="11">ã</text>

    <line x1="115" y1="184" x2="140" y2="210" stroke="#a0a0aa"/>
    <text x="132" y="200" fill="#7c9cff" font-size="11">s</text>

    <line x1="230" y1="186" x2="230" y2="215" stroke="#a0a0aa"/>
    <text x="238" y="205" fill="#7c9cff" font-size="11">o</text>

    <!-- cas -->
    <circle cx="150" cy="225" r="16" fill="#1c1c25" stroke="#7c9cff"/>
    <text x="150" y="230" text-anchor="middle" fill="#f0f0f5" font-size="11">s</text>

    <line x1="140" y1="238" x2="115" y2="260" stroke="#a0a0aa"/>
    <text x="115" y="252" fill="#7c9cff" font-size="10">a</text>
    <line x1="160" y1="238" x2="185" y2="260" stroke="#a0a0aa"/>
    <text x="180" y="252" fill="#7c9cff" font-size="10">o</text>

    <!-- casa -->
    <circle cx="105" cy="270" r="10" fill="#4ade80"/>
    <text x="105" y="273" text-anchor="middle" fill="#0c0c11" font-size="9" font-weight="700">✓</text>
    <!-- caso -->
    <circle cx="195" cy="270" r="10" fill="#4ade80"/>
    <text x="195" y="273" text-anchor="middle" fill="#0c0c11" font-size="9" font-weight="700">✓</text>
    <!-- cão -->
    <circle cx="230" cy="230" r="10" fill="#4ade80"/>
    <text x="230" y="233" text-anchor="middle" fill="#0c0c11" font-size="9" font-weight="700">✓</text>

    <text x="380" y="150" fill="#a0a0aa" font-family="Inter" font-size="11">✓ marca fim</text>
    <text x="380" y="167" fill="#a0a0aa" font-family="Inter" font-size="11">de palavra</text>
  </svg>`,

  recorrencia: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <g>
      <rect x="30" y="60" width="200" height="80" rx="8" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="130" y="85" text-anchor="middle" fill="#7c9cff" font-size="13" font-weight="700">1. Caso base</text>
      <text x="130" y="112" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="13">fat(0) = 1</text>
      <text x="130" y="132" text-anchor="middle" fill="#a0a0aa" font-size="11">o "chão" — sem recursão</text>
    </g>
    <g>
      <rect x="270" y="60" width="200" height="80" rx="8" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <text x="370" y="85" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">2. Passo indutivo</text>
      <text x="370" y="112" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">fat(n) = n · fat(n-1)</text>
      <text x="370" y="132" text-anchor="middle" fill="#a0a0aa" font-size="11">reduz para instância menor</text>
    </g>
    <text x="250" y="180" text-anchor="middle" fill="#a0a0aa" font-size="12">definição por recorrência: base + passo que aproxima da base</text>
  </svg>`,

  arquivo: `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
    <text x="250" y="25" text-anchor="middle" fill="#f0f0f5" font-family="Inter" font-size="14" font-weight="600">Arquivo = sequência de registros</text>

    <g>
      <rect x="40" y="60" width="420" height="60" rx="6" fill="#1c1c25" stroke="#7c9cff"/>
      <line x1="140" y1="60" x2="140" y2="120" stroke="#7c9cff"/>
      <line x1="240" y1="60" x2="240" y2="120" stroke="#7c9cff"/>
      <line x1="340" y1="60" x2="340" y2="120" stroke="#7c9cff"/>
      <line x1="440" y1="60" x2="440" y2="120" stroke="#7c9cff"/>

      <text x="90" y="85" text-anchor="middle" fill="#7c9cff" font-size="11">registro 1</text>
      <text x="90" y="105" text-anchor="middle" fill="#a0a0aa" font-size="10">Ana | 25</text>
      <text x="190" y="85" text-anchor="middle" fill="#7c9cff" font-size="11">registro 2</text>
      <text x="190" y="105" text-anchor="middle" fill="#a0a0aa" font-size="10">Bob | 30</text>
      <text x="290" y="85" text-anchor="middle" fill="#7c9cff" font-size="11">registro 3</text>
      <text x="290" y="105" text-anchor="middle" fill="#a0a0aa" font-size="10">Carla | 22</text>
      <text x="390" y="85" text-anchor="middle" fill="#7c9cff" font-size="11">registro 4</text>
      <text x="390" y="105" text-anchor="middle" fill="#a0a0aa" font-size="10">Dan | 41</text>
    </g>

    <text x="250" y="155" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="12">cada registro tem campos; um deles pode ser a chave</text>
    <text x="250" y="175" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="12">no disco: acesso caro; queremos minimizar idas ao HD</text>
  </svg>`,

  bigo: `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <text x="250" y="30" text-anchor="middle" fill="#f0f0f5" font-size="14" font-weight="600">notação O — cota superior</text>

    <g>
      <rect x="60" y="60" width="380" height="130" rx="10" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="250" y="95" text-anchor="middle" fill="#7c9cff" font-family="JetBrains Mono, monospace" font-size="16">f(n) = O(g(n))</text>
      <text x="80" y="125" fill="#f0f0f5" font-size="13">"a partir de certo n, f não passa</text>
      <text x="80" y="145" fill="#f0f0f5" font-size="13">de <strong>uma constante vezes g(n)</strong>"</text>
      <text x="80" y="175" fill="#a0a0aa" font-size="12">existe c > 0 e n₀ tal que:</text>
    </g>

    <text x="250" y="212" text-anchor="middle" fill="#4ade80" font-family="JetBrains Mono, monospace" font-size="14">0 ≤ f(n) ≤ c · g(n)  para todo n ≥ n₀</text>
  </svg>`

};

/* combinar SVGs originais com os de ED2 */
Object.assign(SVG, SVG_ED2);


/* =========================================================
   AULAS DE ED2 — cada slide tem title, illustration, body, code, note
   ========================================================= */

const LESSONS_ED2 = {

  /* ============ UNIDADE I — ARQUIVOS ============ */
  u1: {
    title: 'Arquivos',
    slides: [
      { type:'title', kicker:'Unidade I', title:'Arquivos e memória externa',
        body:'Estruturas de dados não vivem só na RAM. Aqui você entende como manipular grandes volumes que ficam no disco — e por que cada acesso conta.' },

      { title:'Memória primária vs secundária', illustration: SVG.memoria,
        body:'A RAM é <strong>rápida mas pequena</strong>. O disco é <strong>gigante mas lento</strong>. Um acesso ao disco pode ser milhares de vezes mais devagar que um acesso à RAM.',
        note:'Isso muda tudo: quando você programa com arquivos, o objetivo principal é <em>minimizar acessos ao disco</em>.' },

      { title:'Arquivo = sequência de registros', illustration: SVG.arquivo,
        body:'Um <strong>arquivo</strong> é uma sequência de <strong>registros</strong>. Cada registro tem <strong>campos</strong> (nome, idade, saldo...). Um dos campos costuma ser a <strong>chave</strong>, que identifica o registro.',
        code:`typedef struct {
    int id;              // chave
    char nome[50];
    int idade;
} Registro;` },

      { title:'Custo do acesso: o "seek"',
        body:'Todo acesso a disco tem um custo alto chamado <strong>seek time</strong> — o tempo pra o cabeçote do HD se posicionar. Em SSDs é menor, mas ainda existe.',
        note:'É por isso que ler <em>um bloco de 4KB</em> custa quase o mesmo que ler <em>um byte</em>: o custo dominante é o <em>seek</em>, não o tamanho.' },

      { title:'Blocagem — a estratégia chave', illustration: SVG.blocagem,
        body:'Como o custo por acesso é fixo, agrupamos vários registros em um <strong>bloco</strong>. Uma leitura traz o bloco inteiro pra RAM — ganho enorme.',
        note:'Se um bloco cabe 100 registros, ler 1000 registros custa 10 seeks em vez de 1000. Redução de 100×.' },

      { title:'Organização de arquivos',
        body:'Formas comuns de organizar:',
        html:`<table class="slide-table">
          <tr><th>Tipo</th><th>Como</th><th>Bom para</th></tr>
          <tr><td>Sequencial</td><td>registros um depois do outro, na ordem de inserção</td><td>varreduras totais</td></tr>
          <tr><td>Sequencial ordenado</td><td>ordenados por chave</td><td>busca binária no arquivo</td></tr>
          <tr><td>Direto (hash)</td><td>posição calculada a partir da chave</td><td>busca por chave em O(1)</td></tr>
          <tr><td>Indexado</td><td>arquivo + índice separado apontando pra posições</td><td>equilíbrio busca × inserção</td></tr>
        </table>` },

      { title:'Operações típicas em arquivos',
        body:'Todo arquivo suporta um conjunto pequeno de operações:',
        code:`FILE *fp = fopen("dados.dat", "rb+");
fread(&reg, sizeof(Registro), 1, fp);   // ler
fseek(fp, pos * sizeof(Registro), SEEK_SET);  // posicionar
fwrite(&reg, sizeof(Registro), 1, fp);  // gravar
fclose(fp);`,
        note:'<code>fseek</code> é justamente onde o "seek" acontece — cuidado com ele em loops apertados.' },

      { title:'Fim da Unidade I',
        body:'Arquivos vivem no disco. Acesso é caro. Blocagem é o antídoto principal. Organização escolhida depende do padrão de uso (só ler? buscar por chave? intervalos?).',
        note:'Isso prepara o terreno pra estruturas como árvore B na Unidade V, feitas <em>especificamente</em> pra memória externa.' }
    ]
  },

  /* ============ UNIDADE II — ANÁLISE DE ALGORITMOS ============ */
  u2: {
    title: 'Análise de algoritmos',
    slides: [
      { type:'title', kicker:'Unidade II', title:'Análise de algoritmos',
        body:'Como comparar dois algoritmos que resolvem o mesmo problema? Cronometrar não basta — depende do computador. Precisamos de uma medida <em>independente</em> de máquina.' },

      { title:'O problema',
        body:'Dois algoritmos resolvem o mesmo problema. Um roda em 2 segundos numa máquina rápida. Outro em 5 segundos numa máquina lenta. <strong>Qual é melhor?</strong>',
        note:'Não dá pra responder cronometrando. A resposta vem de contar operações em função do tamanho da entrada.' },

      { title:'Eficiência = operações em função de n',
        body:'Analisar um algoritmo é <strong>expressar a quantidade de operações em função do tamanho da entrada</strong> (n). Isso vale para qualquer máquina.',
        code:`// busca sequencial
for (int i = 0; i < n; i++) {   // n iterações
    if (v[i] == alvo) return i; // 1 comparação por iteração
}
return -1;
// Total: até n comparações` },

      { title:'Melhor, pior e caso médio', illustration: SVG.casos,
        body:'A mesma entrada pode se comportar de formas diferentes. Analisamos <strong>três casos</strong>:',
        note:'Pra decisões críticas, o pior caso é o que importa (garantia). O caso médio serve pra escolher entre algoritmos "na média".' },

      { title:'Comportamento assintótico',
        body:'Quando n é grande, o que domina o tempo? Uma constante e termos menores <strong>somem</strong> no gráfico. Sobra o termo dominante.',
        code:`f(n) = 3n² + 500n + 1000
        │
        └─→ para n grande, tudo que importa é n²`,
        note:'Ex: pra n=10000, 3n² = 300 milhões; 500n = 5 milhões; 1000 = insignificante.' },

      { title:'Notação O (Big-O)', illustration: SVG.bigo,
        body:'Formalmente: <code>f(n) = O(g(n))</code> quer dizer que existe uma constante <em>c</em> e um <em>n₀</em> tal que <strong>a partir de n₀, f(n) ≤ c · g(n)</strong>.',
        note:'Em português: "f não cresce mais rápido que g, ignorando constantes e valores pequenos".' },

      { title:'As classes que você vai encontrar', illustration: SVG.complexidade,
        body:'Do melhor pro pior, comparando escalabilidade:',
        html:`<table class="slide-table">
          <tr><th>Classe</th><th>Exemplo</th><th>Comportamento</th></tr>
          <tr><td>O(1)</td><td>acessar v[i]</td><td>constante — não cresce</td></tr>
          <tr><td>O(log n)</td><td>busca binária</td><td>divide o problema pela metade</td></tr>
          <tr><td>O(n)</td><td>varrer lista</td><td>linear — dobra n, dobra o tempo</td></tr>
          <tr><td>O(n log n)</td><td>merge sort</td><td>muito bom para ordenação</td></tr>
          <tr><td>O(n²)</td><td>bubble sort</td><td>ruim quando n cresce</td></tr>
          <tr><td>O(2ⁿ)</td><td>força bruta em subconjuntos</td><td>impraticável rápido</td></tr>
        </table>` },

      { title:'Regras práticas',
        body:'Pra achar o O de um trecho de código, algumas regras rápidas:',
        html:`<ul class="slide-list">
          <li>Sequência de operações → soma; o maior domina</li>
          <li>Loop de 0 a n → multiplica por n</li>
          <li>Loops aninhados → multiplica</li>
          <li>Divisão do problema pela metade → log n</li>
          <li>Ignore constantes: O(3n) = O(n)</li>
        </ul>` },

      { title:'Fim da Unidade II',
        body:'Análise assintótica te dá uma medida objetiva de qualidade do algoritmo. Big-O ignora constantes e mostra a escalabilidade.',
        note:'Você vai usar isso o tempo todo pra defender escolhas: "use árvore B, não busca linear — O(log n) vs O(n)".' }
    ]
  },

  /* ============ UNIDADE III — RECURSIVIDADE ============ */
  u3: {
    title: 'Recursividade',
    slides: [
      { type:'title', kicker:'Unidade III', title:'Recursividade',
        body:'Uma função chamando a si mesma. Poderoso pra problemas que se dividem naturalmente em subproblemas menores.' },

      { title:'Definição por recorrência', illustration: SVG.recorrencia,
        body:'Uma <strong>definição recorrente</strong> tem <strong>duas partes obrigatórias</strong>:',
        code:`// fatorial:
fat(0) = 1                    ← caso base
fat(n) = n · fat(n-1)         ← passo indutivo`,
        note:'Sem o caso base, a recursão nunca para → estouro de pilha.' },

      { title:'Traduzindo pra código C',
        body:'A mesma ideia vira uma função:',
        code:`int fat(int n) {
    if (n == 0) return 1;         // caso base
    return n * fat(n - 1);        // passo recursivo
}` },

      { title:'A pilha de chamadas', illustration: SVG.pilha_recursao,
        body:'Cada chamada recursiva <strong>empilha um frame</strong> na pilha da função (com variáveis locais, endereço de retorno). Só desempilha quando o caso base é atingido e os retornos "voltam".',
        note:'Muitas chamadas = pilha grande = risco de <em>stack overflow</em>. É o custo escondido da recursividade.' },

      { title:'Tipos de recursão',
        body:'A ementa classifica em três:',
        html:`<table class="slide-table">
          <tr><th>Tipo</th><th>Como</th></tr>
          <tr><td>Direta</td><td>a função invoca a si mesma diretamente</td></tr>
          <tr><td>Indireta</td><td>f₁ chama f₂ que chama f₃ que ... chama f₁</td></tr>
          <tr><td>De cauda</td><td>a chamada recursiva é a <strong>última</strong> instrução</td></tr>
        </table>` },

      { title:'Recursão de cauda — o que é', illustration: SVG.cauda,
        body:'É de cauda quando, depois da chamada recursiva, <strong>não há mais nada pra fazer</strong> — nem soma, nem multiplicação, nem operação nenhuma.',
        note:'O <code>return v[n-1] + soma(v, n-1)</code> NÃO é cauda: depois de <code>soma</code> retornar, ainda tem uma soma pra fazer.' },

      { title:'Convertendo pra cauda com acumulador',
        body:'Truque: passar o <strong>resultado parcial</strong> como parâmetro extra (acumulador).',
        code:`// versão comum
int soma(int v[], int n) {
    if (n == 0) return 0;
    return v[n-1] + soma(v, n-1);   // NÃO é cauda
}

// versão de cauda (com acumulador)
int soma_ac(int v[], int n, int acc) {
    if (n == 0) return acc;
    return soma_ac(v, n-1, acc + v[n-1]);   // É cauda
}

int soma(int v[], int n) {
    return soma_ac(v, n, 0);
}` },

      { title:'Por que cauda importa',
        body:'Um compilador que sabe otimizar <strong>reaproveita o frame</strong> em vez de empilhar um novo (Tail Call Optimization).',
        note:'Resultado: recursão de cauda com N chamadas consome memória <strong>constante</strong> em vez de O(N). Vira praticamente um loop.' },

      { title:'Quando usar recursividade',
        body:'É elegante em problemas com estrutura auto-similar: árvores, listas encadeadas, divisão e conquista.',
        html:`<ul class="slide-list">
          <li>Percorrer árvore (pré/em/pós-ordem)</li>
          <li>Merge sort, quicksort</li>
          <li>Busca binária</li>
          <li>Backtracking (n-rainhas, sudoku)</li>
          <li>Fractais</li>
        </ul>`,
        note:'Cuidado com problemas onde <em>subchamadas se repetem</em> — fibonacci recursivo é exponencial. Nesses casos, use memoização ou versão iterativa.' },

      { title:'Fim da Unidade III',
        body:'Recursão = base + passo. Pilha empilha frames a cada chamada. Cauda permite otimização pra loop.',
        note:'Recursão de cauda cai muito em prova. Saiba identificar e converter.' }
    ]
  },

  /* ============ UNIDADE IV — ORDENAÇÃO EXTERNA ============ */
  u4: {
    title: 'Busca e ordenação em memória externa',
    slides: [
      { type:'title', kicker:'Unidade IV', title:'Ordenação externa',
        body:'E se o arquivo é maior que a RAM? Você não consegue nem carregar tudo. Precisamos de algoritmos que <em>orquestram</em> disco e RAM.' },

      { title:'O problema',
        body:'Cenário: arquivo com 10 bilhões de registros. RAM tem espaço pra 1 milhão. <strong>Como ordenar?</strong> Quicksort direto no arquivo? Impossível — cada troca custa um seek.',
        note:'A solução clássica: <strong>intercalação balanceada</strong>. Divide, ordena por pedaços, junta.' },

      { title:'Estratégia geral',
        body:'Duas fases:',
        html:`<ol class="slide-list numbered">
          <li><strong>Geração de blocos ordenados (runs):</strong> carrega o que cabe na RAM (m registros), ordena com algoritmo interno rápido (ex: quicksort), grava de volta no disco</li>
          <li><strong>Intercalação (merge):</strong> junta os blocos ordenados até sobrar um único arquivo ordenado</li>
        </ol>` },

      { title:'Intercalação balanceada', illustration: SVG.intercalacao,
        body:'Junta <strong>f fitas</strong> ordenadas em uma nova fita ordenada. A cada passo, escolhe o menor entre os topos das f fitas e escreve na saída.',
        note:'Precisamos de <strong>2f fitas no total</strong> (f de entrada + f de saída), porque na próxima passada os papéis se invertem.' },

      { title:'Contando as passadas',
        body:'Fórmula clássica pro número de passadas até tudo ficar em uma única run:',
        code:`P = ⌈log_f (N/m)⌉ + 1

onde:
  N = número total de registros
  m = registros que cabem na RAM (tamanho da run inicial)
  f = número de caminhos de merge (quantas fitas juntar por vez)`,
        note:'Cada passada percorre TODO o arquivo — quanto menos passadas, mais rápido.' },

      { title:'Exemplo numérico',
        body:'Arquivo com 12 registros, RAM cabe 3, intercalação de 4 caminhos (f=4):',
        code:`P = ⌈log_4 (12/3)⌉ + 1
  = ⌈log_4 (4)⌉ + 1
  = ⌈1⌉ + 1
  = 2 passadas

// Passada 1: gera runs de tamanho 3
// Passada 2: intercala as 4 runs em uma só` },

      { title:'Seleção por substituição',
        body:'Truque pra <strong>runs iniciais maiores</strong> que o tamanho da RAM. Em vez de ordenar m e cuspir, mantém um <em>heap</em> ativo:',
        html:`<ul class="slide-list">
          <li>Enche a RAM com m registros → mini-heap</li>
          <li>Escreve o menor pra fita atual, lê próximo do arquivo</li>
          <li>Se o novo é ≥ que o último escrito → entra no heap dessa run</li>
          <li>Se é menor → vai pro heap da PRÓXIMA run</li>
          <li>Quando heap zera na run atual, começa nova run</li>
        </ul>`,
        note:'Em média gera runs de tamanho <strong>2m</strong> — metade das passadas de intercalação.' },

      { title:'Fim da Unidade IV',
        body:'Ordenação externa = gerar runs + intercalar. Mais caminhos (f maior) = menos passadas. Seleção por substituição gera runs maiores.',
        note:'O critério de avaliação principal é <strong>número de passadas</strong>, porque cada passada implica ler+escrever o arquivo inteiro.' }
    ]
  },

  /* ============ UNIDADE V — ESTRUTURAS NÃO LINEARES ============ */
  u5: {
    title: 'Árvores — de ABB a árvore B',
    slides: [
      { type:'title', kicker:'Unidade V', title:'Árvores',
        body:'Da árvore binária de busca até a árvore B, projetada pra memória externa. Aqui está o coração da matéria e da prova.' },

      { title:'Árvore Binária de Busca (ABB)', illustration: SVG.abb,
        body:'Cada nó tem no máximo 2 filhos. Regra: <strong>filho esquerdo &lt; pai &lt; filho direito</strong>. Busca segue a regra: menor esquerda, maior direita.',
        note:'Se inserida em ordem crescente, degenera em lista — busca vira O(n).' },

      { title:'O problema do desbalanceamento',
        body:'Inserir 1, 2, 3, 4, 5 numa ABB vazia:',
        code:`     1
      \\
       2
        \\
         3
          \\
           4     ← altura = n, busca O(n)
            \\
             5`,
        note:'Solução clássica: <strong>AVL</strong> — mantém balanceamento reorganizando em cada inserção. Custo: mais operações por inserção.' },

      { title:'AVL — árvore auto-balanceada',
        body:'Árvore ABB com uma regra extra: <strong>a diferença de altura entre subárvores esquerda e direita de qualquer nó é no máximo 1</strong>.',
        code:`|altura(esq) - altura(dir)| ≤ 1  ← fator de balanceamento

Se romper, aplica rotações (simples ou duplas) para consertar.`,
        note:'Garante busca em O(log n) sempre. Mas para memória externa, ainda não é ideal — cada nó = 2 acessos ao disco no pior caso.' },

      { title:'O salto conceitual: árvore B',
        body:'ABB e AVL são feitas pra <strong>RAM</strong>. Pra <strong>disco</strong> queremos árvores <em>largas e baixas</em>: cada nó com muitas chaves, altura pequena.',
        note:'Ideia: cada nó da árvore B ocupa <em>um bloco do disco</em>. Uma leitura carrega dezenas de chaves de uma vez.' },

      { title:'Árvore B — definição', illustration: SVG.arvoreB,
        body:'Árvore B de <strong>ordem m</strong>: cada nó tem no máximo <strong>m-1 chaves</strong> e <strong>m filhos</strong>. Chaves ordenadas dentro do nó. Todas as folhas no mesmo nível.',
        html:`<table class="slide-table">
          <tr><th>Ordem</th><th>Máx chaves</th><th>Máx filhos</th></tr>
          <tr><td>3</td><td>2</td><td>3</td></tr>
          <tr><td>4</td><td>3</td><td>4</td></tr>
          <tr><td>5</td><td>4</td><td>5</td></tr>
        </table>` },

      { title:'Lendo uma struct de nó em C',
        body:'Uma implementação típica usa:',
        code:`#define M 4
struct no {
    int contador;         // quantas chaves preenchidas
    int chaves[M-1];      // até M-1 chaves
    struct no *filhos[M]; // até M filhos
};`,
        note:'Uma pegadinha comum: se o código define <code>chaves[2*K-1]</code> e <code>filhos[2*K]</code> com <code>K=4</code>, temos <strong>7 chaves e 8 filhos</strong> → <strong>ordem 8</strong>.' },

      { title:'Busca na árvore B',
        body:'Semelhante à ABB, mas em vez de decidir esquerda/direita, você <strong>percorre as chaves do nó</strong> e desce pro filho correto:',
        code:`no = raiz;
enquanto (no != NULL) {
    i = 0;
    // avança até achar chave ≥ alvo, ou fim do nó
    enquanto (i < no.contador && no.chaves[i] < alvo)
        i++;
    if (i < no.contador && no.chaves[i] == alvo)
        return achou;
    no = no.filhos[i];   // desce pro filho da posição i
}
return não achou;` },

      { title:'Inserção — o particionamento', illustration: SVG.split,
        body:'Regra: sempre inserir em folha. Se a folha está cheia, <strong>divide em duas</strong> e <strong>promove a chave do meio</strong> pro pai.',
        note:'Se o pai também estava cheio, ele também divide, promove pra avô, e assim por diante. No limite, cria uma nova raiz — é assim que a árvore cresce em altura.' },

      { title:'Simulando: inserir 55 numa árvore B ordem 4',
        body:'Estado antes (ordem 4 = máx 3 chaves por nó):',
        code:`raiz:        [30, 60]
              /   |   \\
         [10 20] [35 40 50] [70 80]

Inserir 55 → cai na folha [35, 40, 50]
Folha cheia! (já tem 3 chaves = máx)
Ordenar com 55: [35, 40, 50, 55]
Meio = 50 (ou 40, depende do critério)
Promove 50 pra raiz

raiz:      [30, 50, 60]
           /   |    |   \\
       [10 20] [35 40] [55] [70 80]`,
        note:'Detalhe crítico: o "meio" para 4 itens é o 2º (índice ⌈m/2⌉). Diferentes livros usam critérios ligeiramente diferentes.' },

      { title:'Árvore B+ — variação para arquivos',
        body:'Extensão comum:',
        html:`<ul class="slide-list">
          <li>Chaves duplicadas em nós internos <strong>e</strong> em folhas</li>
          <li>Só as folhas guardam ponteiros pra dados reais</li>
          <li>Folhas são <strong>ligadas em lista</strong> — varredura em ordem é O(n)</li>
        </ul>`,
        note:'É o que a maioria dos bancos de dados usa em índices (PostgreSQL, MySQL, SQLite...).' },

      { title:'Fim da Unidade V',
        body:'ABB é boa em RAM se balanceada. AVL garante isso. Árvore B leva o balanceamento pra memória externa, com nós largos que combinam com blocos de disco.',
        note:'Prova costuma ter: inserção em árvore B com particionamento, e cálculo de ordem a partir da struct.' }
    ]
  },

  /* ============ UNIDADE VI — INDEXAÇÃO DE STRING ============ */
  u6: {
    title: 'Indexação de string',
    slides: [
      { type:'title', kicker:'Unidade VI', title:'Indexação de string',
        body:'Estruturas para buscar padrões em textos gigantes: procurar palavras num dicionário, autocompletar, buscar em livros. Introdução aos tries e árvores de sufixo.' },

      { title:'O problema',
        body:'Você tem um texto gigante (Wikipédia inteira). Alguém digita "pyth" e quer <strong>todas as palavras que começam com pyth</strong>. Como fazer isso rápido?',
        note:'Solução ingênua (varrer o texto todo por palavra) é lenta demais para produção. Precisamos de índice.' },

      { title:'Trie — árvore de prefixos', illustration: SVG.trie,
        body:'Cada nó representa um <strong>caractere</strong>. Uma palavra é um caminho da raiz até um nó marcado como "fim de palavra".',
        note:'Palavras com prefixo comum <em>compartilham</em> o caminho. Isso economiza espaço quando há muitas palavras parecidas.' },

      { title:'Operações num trie',
        body:'Todas em O(m), onde m é o tamanho da <strong>palavra</strong> — independente do número de palavras armazenadas!',
        html:`<table class="slide-table">
          <tr><th>Operação</th><th>Custo</th></tr>
          <tr><td>Inserir palavra</td><td>O(m)</td></tr>
          <tr><td>Buscar palavra completa</td><td>O(m)</td></tr>
          <tr><td>Buscar palavras com prefixo P</td><td>O(m + saída)</td></tr>
          <tr><td>Autocompletar</td><td>desce pelo prefixo, coleta descendentes</td></tr>
        </table>` },

      { title:'Trocando espaço por tempo',
        body:'Trie usa mais memória que uma lista de palavras, mas a busca é imbatível para prefixos.',
        code:`// Nó de trie (simplificado)
struct no {
    struct no *filhos[26];   // um filho por letra
    int fim_de_palavra;
};` },

      { title:'Suffix tree — busca por substring',
        body:'E se você quer achar <strong>qualquer substring</strong>, não só prefixos? Ideia: colocar <strong>todos os sufixos</strong> do texto num trie.',
        code:`texto = "banana"

sufixos:
  banana$
  anana$
  nana$
  ana$
  na$
  a$
  $                ← $ marca fim

Colocando todos num trie → suffix tree`,
        note:'Buscar substring vira busca por prefixo na suffix tree. O(m) onde m = tamanho do padrão.' },

      { title:'Aplicações práticas',
        body:'Onde você vê isso funcionando:',
        html:`<ul class="slide-list">
          <li>Autocompletar do Google, editores de código, IDEs</li>
          <li>Corretores ortográficos</li>
          <li>Bioinformática (busca em genoma)</li>
          <li>Índices de bancos de dados full-text</li>
          <li>Compressão de dados (LZ77 usa árvores de sufixo)</li>
        </ul>` },

      { title:'Fim da Unidade VI',
        body:'Tries e suffix trees trocam espaço por velocidade em buscas de string. Custo depende do <em>padrão</em>, não do <em>texto</em>.',
        note:'Introdução leve — a matéria completa vai a variantes comprimidas (radix trees, suffix arrays), fora do escopo desta prova.' }
    ]
  }
};


/* =========================================================
   QUESTÕES DE ED2
   Todas escritas do zero, cobrindo os temas da ementa.
   ========================================================= */

const QUESTOES_ED2 = {

  /* ===== SIMULADO DE PROVA (cobre o mesmo escopo da prova real) ===== */
  prova: [
    { ref:'Q1', type:'mcq',
      q:`Numa árvore B de <strong>ordem 5</strong>, qual é o número máximo de chaves e o número máximo de filhos por nó?`,
      opts:[
        '4 chaves e 5 filhos',
        '5 chaves e 6 filhos',
        '5 chaves e 5 filhos',
        '4 chaves e 4 filhos',
        '6 chaves e 5 filhos'
      ], correct: 0,
      explain:`Regra da árvore B: ordem m → no máximo <strong>m − 1 chaves</strong> e <strong>m filhos</strong>. Para m = 5: 4 chaves e 5 filhos.` },

    { ref:'Q2', type:'mcq',
      q:`Um aluno definiu a estrutura de um nó de árvore B assim:<br>
      <code>#define K 3</code><br>
      <code>struct no { int contador; int chaves[2*K-1]; struct no *filhos[2*K]; };</code><br>
      Qual é a ordem dessa árvore B?`,
      opts:['3', '5', '6', '7'], correct: 2,
      explain:`<code>filhos[2*K]</code> com K = 3 → 6 filhos. Como ordem = número máximo de filhos, a ordem é <strong>6</strong>.` },

    { ref:'Q3', type:'mcq',
      q:`Considere a árvore B de ordem 4 abaixo. Uma nova chave <strong>25</strong> será inserida. Qual folha ela vai ocupar?<br>
      <code>raiz:    [30, 60]</code><br>
      <code>       /    |    \\</code><br>
      <code>  [10 20] [35 50] [70 80]</code>`,
      opts:[
        'a folha [10, 20]',
        'a folha [35, 50]',
        'a folha [70, 80]',
        'a raiz [30, 60]'
      ], correct: 0,
      explain:`25 é menor que 30 (primeira chave da raiz) → desce pelo filho da <strong>esquerda</strong>. A folha [10, 20] ainda tem espaço (só 2 chaves de 3 permitidas), então cabe sem particionar.` },

    { ref:'Q4', type:'mcq',
      q:`Sobre <strong>recursão de cauda</strong>, qual afirmação está correta?`,
      opts:[
        'Toda função recursiva é de cauda por definição',
        'É quando a chamada recursiva é a última instrução executada na função',
        'Sempre gera stack overflow porque empilha muito',
        'Só existe em linguagens funcionais como Haskell'
      ], correct: 1,
      explain:`Recursão de cauda é caracterizada pela chamada recursiva ser a <strong>última operação</strong>. Se depois dela houver soma, multiplicação ou qualquer outra operação, não é cauda. Isso permite otimização (TCO) que evita empilhar novos frames.` },

    { ref:'Q5', type:'mcq',
      q:`Um arquivo tem 8 milhões de registros. A memória principal comporta 500 mil registros. Utilizando intercalação balanceada com <strong>f = 4 caminhos</strong>, quantas passadas de intercalação são necessárias?<br>
      <em>Dica: P = ⌈log_f (N/m)⌉ + 1</em>`,
      opts:['2 passadas', '3 passadas', '4 passadas', '5 passadas'], correct: 1,
      explain:`N/m = 8.000.000 / 500.000 = 16. log₄(16) = 2. Portanto P = ⌈2⌉ + 1 = <strong>3 passadas</strong>.` },

    { ref:'Q6', type:'mcq',
      q:`Qual estratégia é a mais eficaz para <strong>reduzir o número de seeks</strong> ao trabalhar com arquivos grandes?`,
      opts:[
        'Sempre usar SSD em vez de HD',
        'Comprimir os dados antes de gravar',
        'Usar um algoritmo de ordenação mais rápido em RAM',
        'Agrupar registros em blocos (blocagem) e ler bloco inteiro por vez'
      ], correct: 3,
      explain:`O custo dominante em acessos a disco é o <strong>seek</strong>. Como cada seek serve pra ler um bloco inteiro, agrupar registros em blocos maximiza a informação por seek. SSD ajuda, mas blocagem é a estratégia estrutural.` },

    { ref:'Q7', type:'code',
      q:`Considere a função recursiva abaixo:<br>
      <pre><code>int produto(int v[], int n) {
    if (n == 0) return 1;
    return v[n-1] * produto(v, n-1);
}</code></pre>
      <strong>(a)</strong> Identifique o caso base e o passo recursivo. Explique por que essa função <strong>não é</strong> recursão de cauda.<br>
      <strong>(b)</strong> Reescreva a função utilizando recursão de cauda. Explique a vantagem.`,
      solution:`<h5>Parte (a)</h5>
      <p><strong>Caso base:</strong> <code>if (n == 0) return 1;</code> — quando o vetor "acabou" (n zerou), retorna o elemento neutro da multiplicação, que é 1.</p>
      <p><strong>Passo recursivo:</strong> <code>return v[n-1] * produto(v, n-1);</code> — pega o último elemento do vetor (v[n-1]) e multiplica pelo produto dos n-1 anteriores.</p>
      <p><strong>Por que NÃO é cauda:</strong> depois que <code>produto(v, n-1)</code> retorna, ainda é necessário fazer a <strong>multiplicação por v[n-1]</strong>. Ou seja, a chamada recursiva não é a última operação — há trabalho pendente depois dela. Cada frame precisa ficar na pilha guardando v[n-1] pra multiplicar quando o retorno voltar.</p>

      <h5>Parte (b) — versão em cauda com acumulador</h5>
      ${c(`int produto_aux(int v[], int n, int acc) {
    if (n == 0) return acc;
    return produto_aux(v, n - 1, acc * v[n-1]);
    // ↑ chamada recursiva é a ÚLTIMA operação
}

int produto(int v[], int n) {
    return produto_aux(v, n, 1);   // começa acc = 1
}`)}
      <p><strong>Vantagem:</strong> como a chamada recursiva é a última instrução, um compilador que faz Tail Call Optimization (TCO) <strong>reaproveita o mesmo frame de pilha</strong> em vez de empilhar um novo a cada chamada. Isso reduz o consumo de memória de O(n) para <strong>O(1)</strong>, permitindo recursões enormes sem estourar a pilha. Vira, na prática, um loop.</p>` },

    { ref:'Q8', type:'code',
      q:`Um sistema utiliza <strong>ordenação externa</strong> por intercalação balanceada. O arquivo A contém <strong>21 registros</strong>. Sabendo que:<br>
      • A memória principal comporta <strong>m = 3</strong> registros por vez;<br>
      • É utilizada intercalação balanceada de <strong>4 caminhos</strong> (f = 4), com 2f fitas.<br><br>
      <strong>(a)</strong> Calcule quantas passadas serão necessárias até obter o arquivo totalmente ordenado.<br>
      <strong>(b)</strong> Descreva o número de runs iniciais geradas e o tamanho de cada uma.<br>
      <strong>(c)</strong> O que aconteceria se usássemos <strong>seleção por substituição</strong> na geração das runs iniciais? Compare o número de passadas.`,
      solution:`<h5>Parte (a)</h5>
      <p>Aplicando a fórmula:</p>
      ${c(`P = ⌈log_f (N/m)⌉ + 1
P = ⌈log_4 (21/3)⌉ + 1
P = ⌈log_4 (7)⌉ + 1
P = ⌈1.404⌉ + 1
P = 2 + 1 = 3 passadas`)}

      <h5>Parte (b)</h5>
      <p>Como m = 3 e N = 21:</p>
      <p>runs iniciais = ⌈21/3⌉ = <strong>7 runs</strong> de tamanho 3 cada.</p>
      <p>Passada 1 (geração): lê 3, ordena, grava 3, repete 7 vezes → 7 runs de 3 registros.</p>
      <p>Passada 2 (merge de 4 caminhos): junta 4 runs de 3 em 1 run de 12, e as 3 restantes em 1 run de 9. Resultado: 2 runs.</p>
      <p>Passada 3 (merge de 4 caminhos): junta as 2 restantes em 1 run de 21 → arquivo ordenado.</p>

      <h5>Parte (c) — comparação com seleção por substituição</h5>
      <p>A <strong>seleção por substituição</strong> gera runs iniciais de tamanho médio <strong>2m = 6</strong> (em vez de m = 3). Nesse caso:</p>
      ${c(`P = ⌈log_4 (21/6)⌉ + 1
P = ⌈log_4 (3.5)⌉ + 1
P = ⌈0.903⌉ + 1
P = 1 + 1 = 2 passadas`)}
      <p><strong>Redução de 3 para 2 passadas.</strong> Como cada passada percorre o arquivo inteiro (leitura + escrita), isso corresponde a uma economia de ~33% no tempo total de I/O.</p>` }
  ],

  /* ===== UNIDADE I — ARQUIVOS ===== */
  u1: [
    { ref:'U1.1', type:'reflection',
      q:`Por que um acesso a disco é considerado <strong>muito mais caro</strong> que um acesso à RAM? Quais componentes contribuem para esse custo?`,
      solution:`<p>O custo de um acesso a disco é dominado por <strong>três componentes</strong>:</p>
      <ul>
        <li><strong>Seek time</strong>: tempo pra o braço mecânico do HD posicionar o cabeçote na trilha correta. Da ordem de milissegundos.</li>
        <li><strong>Rotational latency</strong>: tempo pro disco girar até o setor correto passar debaixo do cabeçote.</li>
        <li><strong>Transfer time</strong>: tempo pra efetivamente transferir os bytes.</li>
      </ul>
      <p>Um acesso à RAM é da ordem de <strong>nanossegundos</strong>. Um seek de HD é da ordem de <strong>milissegundos</strong>. Diferença de aproximadamente <strong>100.000×</strong>.</p>
      <p>SSDs eliminam a parte mecânica (sem cabeçote, sem rotação), reduzindo latência pra microssegundos — ainda ~1000× mais lento que RAM.</p>` },

    { ref:'U1.2', type:'reflection',
      q:`Explique com suas palavras o que é <strong>blocagem</strong> e por que ela reduz o custo total de I/O.`,
      solution:`<p><strong>Blocagem</strong> é agrupar vários registros em um único bloco (unidade de leitura/escrita). Cada operação de I/O lê ou escreve um bloco inteiro, não um registro individual.</p>
      <p><strong>Por que reduz o custo:</strong> o custo dominante em um acesso a disco é o <strong>seek</strong> — um custo fixo, independente da quantidade lida. Se um seek serve pra trazer 100 registros de uma vez em vez de 1, você economiza 99 seeks.</p>
      <p><strong>Exemplo:</strong> ler 10.000 registros um a um custa 10.000 seeks. Se cada bloco tem 100 registros, custa 100 seeks — <strong>100× menos I/O</strong>.</p>
      <p>Efeito colateral positivo: sistemas operacionais e discos usam <strong>cache</strong> de blocos. Se você acessa um registro, o bloco inteiro fica em cache — próximos registros do mesmo bloco vêm de graça.</p>` },

    { ref:'U1.3', type:'code',
      q:`Escreva uma função em C que abre um arquivo binário de registros (<code>Pessoa</code> com id e nome), lê o <strong>n-ésimo registro</strong> e imprime na tela. Use <code>fseek</code>.`,
      solution:`${c(`#include <stdio.h>

typedef struct {
    int id;
    char nome[50];
} Pessoa;

void ler_nth(const char *arquivo, int n) {
    FILE *fp = fopen(arquivo, "rb");
    if (fp == NULL) {
        printf("erro ao abrir arquivo\\n");
        return;
    }

    // posiciona no início do n-ésimo registro
    // (índice 0-baseado)
    fseek(fp, n * sizeof(Pessoa), SEEK_SET);

    Pessoa p;
    if (fread(&p, sizeof(Pessoa), 1, fp) == 1) {
        printf("id=%d nome=%s\\n", p.id, p.nome);
    } else {
        printf("registro %d nao encontrado\\n", n);
    }

    fclose(fp);
}`)}
      <p><strong>Vantagem do binário:</strong> <code>fseek</code> pra <em>qualquer</em> registro é O(1) — não precisa varrer os anteriores. Todos os registros têm o mesmo tamanho (<code>sizeof(Pessoa)</code>).</p>
      <p>Isso não seria possível em arquivo texto com registros de tamanho variável.</p>` },

    { ref:'U1.4', type:'reflection',
      q:`Compare <strong>arquivo sequencial ordenado</strong> com <strong>arquivo indexado</strong>. Qual escolher se preciso de buscas rápidas por chave mas também inserções frequentes?`,
      solution:`<p><strong>Sequencial ordenado:</strong></p>
      <ul>
        <li>Busca binária no arquivo: O(log n) em número de comparações, mas cada comparação é um seek → caro na prática.</li>
        <li>Varrer em ordem é ótimo (leituras sequenciais).</li>
        <li>Inserção horrível: precisa <em>deslocar</em> todos os registros posteriores pra manter a ordem.</li>
      </ul>
      <p><strong>Indexado:</strong></p>
      <ul>
        <li>Dois arquivos: dados (podem estar sem ordem) + índice (chaves ordenadas apontando pra posição).</li>
        <li>Busca: procura no índice (pequeno, cabe em RAM) → seek único pro dado.</li>
        <li>Inserção: anexa dado no fim + atualiza índice (que é rápido de reorganizar).</li>
      </ul>
      <p><strong>Resposta:</strong> <strong>indexado</strong>. Ele equilibra bem busca (usa o índice) e inserção (não precisa deslocar dados). É o que bancos de dados fazem — dados na tabela, índices B-tree separados.</p>` }
  ],

  /* ===== UNIDADE II — ANÁLISE DE ALGORITMOS ===== */
  u2: [
    { ref:'U2.1', type:'reflection',
      q:`O que significa dizer que um algoritmo tem complexidade <strong>O(n²)</strong>? Por que ignoramos constantes na notação O?`,
      solution:`<p><code>O(n²)</code> significa que existe uma constante <em>c</em> e um valor <em>n₀</em> tais que, para todo <em>n ≥ n₀</em>, o tempo do algoritmo é <strong>no máximo c·n²</strong>.</p>
      <p>Traduzindo: <em>dobrar n faz o tempo aumentar em até 4×</em> (2² = 4). Triplicar n faz aumentar em até 9×. Escala mal.</p>
      <p><strong>Por que ignoramos constantes:</strong> a notação O quer expressar <strong>o comportamento assintótico</strong> — o crescimento quando n → ∞. Nesse limite:</p>
      <ul>
        <li>Constantes multiplicativas somem no gráfico: <code>3n²</code>, <code>100n²</code> e <code>n²</code> desenham a mesma curva, só com escala diferente.</li>
        <li>Constantes dependem de máquina (processador, cache, compilador). O que importa é a <em>forma</em> do crescimento.</li>
      </ul>
      <p>Isso torna a análise <strong>independente de hardware</strong>: um algoritmo O(n²) é pior que um O(n) em qualquer máquina, pra n grande.</p>` },

    { ref:'U2.2', type:'code',
      q:`Analise a complexidade dos códigos abaixo. Justifique cada resposta.<br>
      <strong>(a)</strong> <pre><code>for (i = 0; i &lt; n; i++)
    v[i] = i;</code></pre>
      <strong>(b)</strong> <pre><code>for (i = 0; i &lt; n; i++)
    for (j = 0; j &lt; n; j++)
        printf("%d\\n", v[i]+v[j]);</code></pre>
      <strong>(c)</strong> <pre><code>i = n;
while (i > 0) i = i / 2;</code></pre>`,
      solution:`<p><strong>(a) O(n)</strong> — um único loop de 0 a n-1. Faz n atribuições, cada uma O(1).</p>
      <p><strong>(b) O(n²)</strong> — dois loops aninhados, cada um de 0 a n-1. Total: n × n = n² iterações. O <code>printf</code> dentro é O(1), então o total é O(n²).</p>
      <p><strong>(c) O(log n)</strong> — a cada iteração <em>i</em> é dividido por 2. Começando em n, chega em 0 após aproximadamente log₂(n) iterações.</p>
      <p><strong>Regra geral</strong>: identifique o loop mais "profundo", conte quantas vezes ele executa em função de n, multiplique se houver aninhamento.</p>` },

    { ref:'U2.3', type:'mcq',
      q:`Qual das seguintes complexidades cresce <strong>mais devagar</strong> à medida que n aumenta?`,
      opts:['O(n)', 'O(log n)', 'O(n log n)', 'O(1)', 'O(n²)'],
      correct: 3,
      explain:`<code>O(1)</code> é a complexidade constante — não cresce com n. Depois vem <code>O(log n)</code>, <code>O(n)</code>, <code>O(n log n)</code> e por último <code>O(n²)</code>.` },

    { ref:'U2.4', type:'reflection',
      q:`Um algoritmo A tem complexidade O(n²) e leva 100ms para ordenar 1000 elementos. Outro algoritmo B tem complexidade O(n log n) e leva 200ms para os mesmos 1000 elementos. Para n = 1.000.000, qual algoritmo será mais rápido? Explique.`,
      solution:`<p>O que importa aqui é o <strong>crescimento assintótico</strong>, não o desempenho pontual em n pequeno.</p>
      <p><strong>Algoritmo A (O(n²)):</strong> multiplicando n por 1000 (de 1000 pra 1.000.000), o tempo cresce por um fator de 1000² = 1.000.000. Novo tempo: 100ms × 1.000.000 = <strong>100.000 segundos ≈ 27 horas</strong>.</p>
      <p><strong>Algoritmo B (O(n log n)):</strong> o fator de crescimento é aproximadamente 1000 × (log 10⁶ / log 10³) = 1000 × 2 = 2000. Novo tempo: 200ms × 2000 = <strong>400 segundos ≈ 6,7 minutos</strong>.</p>
      <p><strong>B é ~240× mais rápido pra n grande</strong>, apesar de ser 2× mais lento pra n pequeno. Essa é a lição da análise assintótica: uma constante alta pode dominar para pequenos n, mas o termo de crescimento sempre vence no limite.</p>` }
  ],

  /* ===== UNIDADE III — RECURSIVIDADE ===== */
  u3: [
    { ref:'U3.1', type:'reflection',
      q:`Toda função recursiva precisa de duas coisas obrigatoriamente. Quais são? O que acontece se uma delas faltar?`,
      solution:`<p>Toda função recursiva precisa de:</p>
      <ol>
        <li><strong>Caso base</strong>: uma condição de parada onde a função retorna sem se chamar. É o "chão" da recursão.</li>
        <li><strong>Passo recursivo</strong>: a chamada a si mesma, mas <em>com um problema menor</em>, que se aproxima progressivamente do caso base.</li>
      </ol>
      <p><strong>Sem caso base:</strong> a função nunca para de se chamar → cada chamada empilha um novo frame → estouro de pilha (<code>stack overflow</code>) e crash.</p>
      <p><strong>Sem passo recursivo:</strong> não é recursão, é só uma função comum. Não resolve o problema geral, só o caso trivial.</p>
      <p><strong>Passo que não se aproxima do caso base:</strong> ex: <code>fat(n) = n · fat(n)</code>. Também gera loop infinito → stack overflow.</p>` },

    { ref:'U3.2', type:'code',
      q:`Escreva uma função recursiva em C que calcula a soma dos elementos de um array. Depois converta para recursão de cauda.`,
      solution:`<h5>Versão recursiva comum:</h5>
      ${c(`int soma(int v[], int n) {
    if (n == 0) return 0;              // caso base
    return v[n-1] + soma(v, n-1);      // passo recursivo (NÃO é cauda)
}`)}
      <p>Não é cauda: depois de <code>soma(v, n-1)</code> retornar, precisa somar com <code>v[n-1]</code>.</p>

      <h5>Versão com recursão de cauda:</h5>
      ${c(`int soma_aux(int v[], int n, int acc) {
    if (n == 0) return acc;
    return soma_aux(v, n-1, acc + v[n-1]);  // É cauda
}

int soma(int v[], int n) {
    return soma_aux(v, n, 0);   // acumulador começa em 0
}`)}
      <p>Agora a chamada recursiva é a <strong>última operação</strong>. Se o compilador aplica TCO, o consumo de pilha é O(1).</p>` },

    { ref:'U3.3', type:'mcq',
      q:`Qual das funções abaixo é um exemplo de <strong>recursão de cauda</strong>?`,
      opts:[
        '<code>int f(int n) { if (n==0) return 1; return n * f(n-1); }</code>',
        '<code>int f(int n) { if (n==0) return 1; return f(n-1) + f(n-2); }</code>',
        '<code>int f(int n, int acc) { if (n==0) return acc; return f(n-1, acc*n); }</code>',
        '<code>int f(int n) { if (n==0) return 0; return 1 + f(n-1); }</code>'
      ], correct: 2,
      explain:`Na alternativa correta, a chamada recursiva <code>f(n-1, acc*n)</code> é a <strong>última operação</strong> — não há multiplicação, soma ou qualquer trabalho depois dela. As demais têm operações pendentes após o retorno da chamada recursiva.` },

    { ref:'U3.4', type:'reflection',
      q:`Explique a diferença entre recursão <strong>direta</strong> e <strong>indireta</strong>. Dê um exemplo de cada.`,
      solution:`<p><strong>Recursão direta</strong>: a função chama a si mesma diretamente.</p>
      ${c(`int fat(int n) {
    if (n == 0) return 1;
    return n * fat(n-1);   // fat chama fat → direta
}`)}
      <p><strong>Recursão indireta</strong>: a função A chama B, que chama C, que ... eventualmente chama A de volta. Há um <em>ciclo</em> de chamadas.</p>
      ${c(`int par(int n) {
    if (n == 0) return 1;
    return impar(n - 1);   // par chama impar
}

int impar(int n) {
    if (n == 0) return 0;
    return par(n - 1);     // impar chama par → ciclo
}`)}
      <p>Recursão indireta é usada, por exemplo, em parsers que reconhecem gramáticas mutuamente recursivas: uma expressão pode conter uma sub-expressão, que por sua vez usa a definição de expressão.</p>` }
  ],

  /* ===== UNIDADE IV — ORDENAÇÃO EXTERNA ===== */
  u4: [
    { ref:'U4.1', type:'reflection',
      q:`Por que <strong>não</strong> podemos simplesmente usar quicksort num arquivo grande (que não cabe na RAM)?`,
      solution:`<p>Quicksort assume acesso aleatório <strong>rápido</strong> a qualquer elemento — como acontece na RAM. Suas operações típicas envolvem:</p>
      <ul>
        <li>Trocar dois elementos em posições arbitrárias</li>
        <li>Escolher pivô e comparar com muitos outros</li>
        <li>Fazer partições que reorganizam a região</li>
      </ul>
      <p>Cada uma dessas operações, em um arquivo, <strong>vira um seek no disco</strong>. Como o quicksort faz O(n log n) operações, teríamos O(n log n) seeks — para arquivos grandes isso é impraticável.</p>
      <p>A ordenação externa (intercalação balanceada) resolve o problema:</p>
      <ul>
        <li>Fase 1 gera runs ordenadas usando quicksort/mergesort <strong>na RAM</strong> (só o que cabe).</li>
        <li>Fase 2 faz merge sequencial das runs — <strong>só leituras sequenciais</strong>, sem seeks aleatórios.</li>
      </ul>
      <p>Cada passada é linear e sequencial. Ganha na estrutura de acesso, não no algoritmo em si.</p>` },

    { ref:'U4.2', type:'code',
      q:`Um arquivo tem 1000 registros. A memória cabe 50 registros. Usando intercalação balanceada com f = 5 caminhos, calcule o número de passadas.`,
      solution:`<p>Aplicando a fórmula:</p>
      ${c(`P = ⌈log_f (N/m)⌉ + 1
P = ⌈log_5 (1000/50)⌉ + 1
P = ⌈log_5 (20)⌉ + 1
P = ⌈1.861⌉ + 1
P = 2 + 1
P = 3 passadas`)}
      <p><strong>Interpretação:</strong></p>
      <ul>
        <li>Passada 1: gera 1000/50 = 20 runs de 50 registros cada.</li>
        <li>Passada 2: intercala 4 grupos de 5 runs cada → 4 runs de 250 registros.</li>
        <li>Passada 3: intercala as 4 runs restantes → 1 run de 1000 (arquivo ordenado).</li>
      </ul>` },

    { ref:'U4.3', type:'mcq',
      q:`Aumentar o número de caminhos <strong>f</strong> na intercalação balanceada:`,
      opts:[
        'Aumenta o número de passadas',
        'Diminui o número de passadas',
        'Não afeta o número de passadas',
        'Aumenta o consumo de RAM linearmente'
      ], correct: 1,
      explain:`P = ⌈log_f (N/m)⌉ + 1. Como f está na base do log, aumentar f <strong>diminui</strong> o resultado do log e, portanto, o número de passadas. Trade-off: precisa mais fitas (2f no total) e mais espaço em RAM pros buffers das f fitas.` },

    { ref:'U4.4', type:'reflection',
      q:`Como a <strong>seleção por substituição</strong> gera runs iniciais maiores que o tamanho da RAM? Explique o algoritmo em passos.`,
      solution:`<p>Ideia: manter um <strong>heap ativo</strong> em RAM que ordena continuamente enquanto lê o arquivo.</p>
      <p><strong>Passos:</strong></p>
      <ol>
        <li>Carrega m registros na RAM e constrói um min-heap.</li>
        <li>Retira o menor do heap e escreve na fita de saída (chame de <code>último_escrito</code>).</li>
        <li>Lê o próximo registro do arquivo de entrada.</li>
        <li>Se o novo registro é <strong>≥ último_escrito</strong>: ainda pode entrar na run atual → insere no heap.</li>
        <li>Se é <strong>&lt; último_escrito</strong>: não pode ficar na run atual (violaria a ordem). Marca ele como "congelado" — fica na RAM, mas fora do heap ativo.</li>
        <li>Repete até o heap ativo esvaziar.</li>
        <li>Quando o heap zera, começa nova run com os registros congelados (reativa-os no heap).</li>
      </ol>
      <p><strong>Por que gera runs maiores?</strong> Se os dados já têm alguma ordem parcial (comum em dados reais), muitos registros lidos são &gt; que <code>último_escrito</code> e entram na run atual. Estatisticamente, isso gera runs de tamanho médio <strong>2m</strong>.</p>
      <p>Menos runs iniciais = menos passadas de intercalação depois.</p>` }
  ],

  /* ===== UNIDADE V — ÁRVORES ===== */
  u5: [
    { ref:'U5.1', type:'reflection',
      q:`Por que uma <strong>Árvore Binária de Busca</strong> não é adequada para armazenar índices em disco? O que a árvore B resolve?`,
      solution:`<p>Problemas da ABB em disco:</p>
      <ul>
        <li><strong>Nós pequenos</strong>: cada nó tem só uma chave e dois ponteiros. Um bloco de disco (geralmente 4KB) fica quase todo desperdiçado.</li>
        <li><strong>Altura alta</strong>: com poucos nós por nível, a árvore fica alta. Cada nível = 1 seek. Uma ABB com 10⁶ nós tem altura ≈ 20 seeks só pra uma busca.</li>
        <li><strong>Risco de desbalanceamento</strong>: sem balanceamento (AVL), pode degenerar em lista → n seeks no pior caso.</li>
      </ul>
      <p><strong>Como a árvore B resolve:</strong></p>
      <ul>
        <li>Cada nó tem <strong>muitas chaves</strong> (m-1) e <strong>muitos filhos</strong> (m). Um nó = um bloco cheio de informação.</li>
        <li>Como cada nó "dá mais galhos", a árvore fica <strong>baixa e larga</strong>. Uma árvore B de ordem 100 com 10⁶ chaves tem altura ~3.</li>
        <li>Balanceamento garantido pelo próprio algoritmo de inserção (particionamento).</li>
      </ul>
      <p>Resultado: buscas com <strong>2-4 seeks</strong> em vez de 20+.</p>` },

    { ref:'U5.2', type:'mcq',
      q:`Numa árvore B de ordem <strong>m</strong>, qual é o número máximo de <strong>chaves</strong> por nó?`,
      opts:['m', 'm − 1', 'm + 1', '2m', 'm / 2'], correct: 1,
      explain:`Por definição de árvore B: ordem m implica no máximo <strong>m − 1 chaves</strong> e m filhos por nó. É a regra fundamental.` },

    { ref:'U5.3', type:'code',
      q:`Simule a inserção das chaves <strong>10, 20, 30, 40, 50, 60, 70, 80, 90</strong> numa árvore B de <strong>ordem 4</strong> (máx 3 chaves por nó). Mostre o estado final.`,
      solution:`<p>Ordem 4 = máximo 3 chaves por nó. Vou usar critério do meio-esquerdo pra promoção.</p>

      ${c(`Inserindo 10: [10]

Inserindo 20: [10, 20]

Inserindo 30: [10, 20, 30]     ← nó cheio, próxima insere provoca split

Inserindo 40:
  Nó fica: [10, 20, 30, 40] → split
  Meio (2º elemento) = 20 sobe pra nova raiz
  Resultado:
                    [20]
                   /    \\
              [10]      [30, 40]

Inserindo 50:
  50 > 20, desce direita → [30, 40] tem espaço
                    [20]
                   /    \\
              [10]      [30, 40, 50]

Inserindo 60:
  60 > 20, desce direita → [30, 40, 50] cheio, insere e split
  Fica: [30, 40, 50, 60] → sobe 40
                  [20, 40]
                 /   |    \\
             [10]  [30]  [50, 60]

Inserindo 70:
  70 > 40, desce à direita → [50, 60] tem espaço
                  [20, 40]
                 /   |    \\
             [10]  [30]  [50, 60, 70]

Inserindo 80:
  80 > 40, desce → [50, 60, 70] cheio, split
  Fica: [50, 60, 70, 80] → sobe 60
  Raiz recebe: [20, 40, 60] (ainda cabe)
              [20, 40, 60]
              /   |   |    \\
           [10] [30] [50] [70, 80]

Inserindo 90:
  90 > 60, desce → [70, 80] tem espaço
              [20, 40, 60]
              /   |   |    \\
           [10] [30] [50] [70, 80, 90]`)}
      <p>Note que a raiz atingiu 3 chaves (cheia). A próxima inserção que force split em [70, 80, 90] vai fazer a raiz também dividir, criando um novo nível.</p>` },

    { ref:'U5.4', type:'reflection',
      q:`Qual é a diferença conceitual entre <strong>árvore B</strong> e <strong>árvore B+</strong>? Por que bancos de dados preferem B+?`,
      solution:`<p><strong>Árvore B:</strong> chaves armazenadas em <em>todos</em> os nós (raiz, internos e folhas). Um ponteiro pra dado real fica junto de cada chave, em qualquer nível.</p>
      <p><strong>Árvore B+:</strong></p>
      <ul>
        <li>Nós internos guardam <strong>apenas chaves de índice</strong> (pra navegação).</li>
        <li>Todos os dados reais ficam <strong>apenas nas folhas</strong>.</li>
        <li>Folhas são <strong>ligadas em lista</strong>, permitindo varredura em ordem sem precisar subir/descer na árvore.</li>
      </ul>
      <p><strong>Por que bancos preferem B+:</strong></p>
      <ol>
        <li><strong>Nós internos mais compactos</strong> → cabem mais chaves por bloco → árvore ainda mais baixa.</li>
        <li><strong>Varreduras em intervalo eficientes</strong>: <code>SELECT * FROM tabela WHERE id BETWEEN 100 AND 200</code> segue os ponteiros da lista de folhas → leitura sequencial no disco.</li>
        <li><strong>Comportamento previsível</strong>: buscas sempre chegam nas folhas (mesmo número de acessos pra qualquer chave), facilitando análise de performance.</li>
      </ol>
      <p>Postgres, MySQL (InnoDB), SQLite — todos usam B+ nos índices por padrão.</p>` }
  ],

  /* ===== UNIDADE VI — INDEXAÇÃO DE STRING ===== */
  u6: [
    { ref:'U6.1', type:'reflection',
      q:`O que é um <strong>trie</strong>? Qual é o custo de buscar uma palavra em um trie com N palavras armazenadas?`,
      solution:`<p><strong>Trie</strong> é uma árvore onde cada nó representa <strong>um caractere</strong>, e caminhos da raiz até um nó marcado como "fim de palavra" formam as palavras armazenadas.</p>
      <p>Palavras que compartilham prefixo compartilham o caminho, economizando espaço.</p>
      <p><strong>Custo de busca: O(m)</strong>, onde m é o tamanho da <strong>palavra buscada</strong> — <em>independente do número de palavras armazenadas</em>. Isso é notável: enquanto num hash você depende de bom espalhamento e numa BST depende do balanceamento e do número de itens, no trie o custo é linear no tamanho da chave.</p>
      <p>Esse é o motivo de tries serem populares em autocompletar: buscar "pyth" em 50 milhões de palavras leva 4 passos.</p>` },

    { ref:'U6.2', type:'mcq',
      q:`Qual é a principal vantagem de uma <strong>árvore de sufixo</strong> sobre um trie de palavras?`,
      opts:[
        'Ocupa menos memória',
        'Permite buscar qualquer substring, não apenas palavras completas',
        'Não precisa de caractere terminador',
        'É mais fácil de implementar'
      ], correct: 1,
      explain:`Suffix tree contém <strong>todos os sufixos</strong> do texto. Buscar por qualquer padrão P se torna busca por prefixo na suffix tree — o padrão pode aparecer em qualquer posição do texto, não só no início de palavras.` },

    { ref:'U6.3', type:'reflection',
      q:`Um autocompletar do Google guarda milhões de consultas. Explique por que um trie é uma boa escolha estrutural para isso.`,
      solution:`<p>O caso de uso do autocompletar tem características muito específicas:</p>
      <ul>
        <li>Usuário digita um prefixo curto (2-5 letras).</li>
        <li>Sistema precisa listar rapidamente as consultas populares que começam com esse prefixo.</li>
        <li>Ordenação por popularidade/frequência.</li>
      </ul>
      <p><strong>Por que trie é ideal:</strong></p>
      <ol>
        <li><strong>Prefixo é natural.</strong> Descer no trie pelo prefixo digitado é O(m), onde m é o tamanho do que o usuário digitou. Não depende do tamanho do dicionário.</li>
        <li><strong>Coleta de descendentes.</strong> Uma vez no nó do prefixo, DFS pelos descendentes lista todas as palavras compatíveis.</li>
        <li><strong>Compartilhamento de prefixos.</strong> "pytho" está armazenado uma vez, mesmo que sirva pra "python", "pythonic", "pythonista".</li>
        <li><strong>Extensível.</strong> Cada nó pode guardar metadados (frequência de uso, ranking) pra ordenar sugestões.</li>
      </ol>
      <p>Em produção, geralmente usam variantes comprimidas (radix tree) pra economizar memória, mas a ideia estrutural é a mesma.</p>` }
  ]
};


/* Registrar ED2 no objeto global de matérias */
SUBJECTS.ed2 = {
  slug: 'ed2',
  name: 'Estrutura de Dados II',
  short: 'ED II',
  description: 'Arquivos, análise de algoritmos, recursividade, ordenação externa, árvores B e indexação de string. 6 unidades + simulado de prova.',
  color: '#4ade80',
  lessons: LESSONS_ED2,
  questions: QUESTOES_ED2,
  questionTabs: [
    { key: 'prova', label: '📝 Simulado de prova' },
    { key: 'u1', label: 'Unidade I — Arquivos' },
    { key: 'u2', label: 'Unidade II — Análise de algoritmos' },
    { key: 'u3', label: 'Unidade III — Recursividade' },
    { key: 'u4', label: 'Unidade IV — Ordenação externa' },
    { key: 'u5', label: 'Unidade V — Árvores' },
    { key: 'u6', label: 'Unidade VI — Indexação de string' }
  ],
  lessonList: [
    { key: 'u1', num: 'I',   title: 'Arquivos',                             desc: 'Memória externa, blocos, seeks, organização de arquivos.' },
    { key: 'u2', num: 'II',  title: 'Análise de algoritmos',                desc: 'Melhor/pior/médio caso, notação O, comportamento assintótico.' },
    { key: 'u3', num: 'III', title: 'Recursividade',                        desc: 'Base + passo, tipos, pilha, recursão de cauda com acumulador.' },
    { key: 'u4', num: 'IV',  title: 'Busca e ordenação em memória externa', desc: 'Intercalação balanceada, passadas, seleção por substituição.' },
    { key: 'u5', num: 'V',   title: 'Árvores — de ABB à árvore B',          desc: 'ABB, AVL, árvore B, ordem, split, promoção, B+.' },
    { key: 'u6', num: 'VI',  title: 'Indexação de string',                  desc: 'Tries, árvores de sufixo, busca por prefixo e substring.' }
  ]
};

