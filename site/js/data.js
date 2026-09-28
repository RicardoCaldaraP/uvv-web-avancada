/* =========================================================
   Dados do site — aulas em slides + questões dos PDFs
   ========================================================= */

/* ---------- helper: highlight Python simples ---------- */
function py(str) {
  const kw = ['def','class','return','if','elif','else','for','while','in','not','and','or','from','import','as','with','try','except','finally','raise','pass','True','False','None','lambda','yield','global','nonlocal','is','self','cls','print'];
  const bi = ['len','range','type','isinstance','list','dict','set','tuple','str','int','float','bool','frozenset','open','enumerate','next','max','min','sum','sorted','map','filter','input','abs','round'];

  const tokens = [];
  // placeholder com prefixo "T" para não casar com \b\d+\b (fica sem word-boundary no início)
  const stash = (html) => { tokens.push(html); return `\x00T${tokens.length - 1}\x00`; };

  // 1) escapa entidades HTML antes de qualquer coisa
  let s = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // 2) comentários e strings (prioridade — para não colorir palavra-chave dentro deles)
  s = s.replace(/(#[^\n]*)/g, (m) => stash(`<span class="tok-com">${m}</span>`));
  s = s.replace(/("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
    (m) => stash(`<span class="tok-str">${m}</span>`));

  // 3) decoradores e números — também guardados em stash para não conflitar
  s = s.replace(/(@[\w.]+)/g, (m) => stash(`<span class="tok-fn">${m}</span>`));
  s = s.replace(/\b(\d+\.?\d*)\b/g, (m) => stash(`<span class="tok-num">${m}</span>`));

  // 4) palavras-chave e built-ins — usa stash para não recorrer dentro de spans já criados
  kw.forEach(k => {
    s = s.replace(new RegExp(`\\b${k}\\b`, 'g'), (m) => stash(`<span class="tok-kw">${m}</span>`));
  });
  bi.forEach(k => {
    s = s.replace(new RegExp(`\\b${k}\\b`, 'g'), (m) => stash(`<span class="tok-fn">${m}</span>`));
  });

  // 5) restaura todos os marcadores no final
  s = s.replace(/\x00T(\d+)\x00/g, (_, i) => tokens[+i]);

  return `<pre><code>${s}</code></pre>`;
}


/* ---------- ILUSTRAÇÕES SVG ---------- */
/* Todas usam paleta consistente: acento #7c9cff, surface #16161d, borda #262631 */

const SVG = {

  variavel: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="120" y="60" width="160" height="90" rx="8" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
    <text x="200" y="115" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="32" font-weight="600">25</text>
    <line x1="200" y1="40" x2="200" y2="60" stroke="#7c9cff" stroke-width="2"/>
    <rect x="150" y="18" width="100" height="26" rx="4" fill="#7c9cff"/>
    <text x="200" y="36" text-anchor="middle" fill="#0c0c11" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">idade</text>
    <text x="200" y="180" text-anchor="middle" fill="#a0a0aa" font-size="14" font-style="italic">a etiqueta "idade" está colada no valor 25</text>
  </svg>`,

  equalsVsCompare: `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg">
    <g>
      <text x="125" y="35" text-anchor="middle" fill="#7c9cff" font-family="JetBrains Mono, monospace" font-size="24" font-weight="700">=</text>
      <text x="125" y="55" text-anchor="middle" fill="#a0a0aa" font-size="12">ATRIBUI</text>
      <rect x="35" y="80" width="180" height="60" rx="8" fill="#1c1c25" stroke="#262631"/>
      <text x="70" y="118" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="18">x = 10</text>
      <text x="125" y="170" text-anchor="middle" fill="#a0a0aa" font-size="13">cola a etiqueta</text>
    </g>
    <line x1="250" y1="20" x2="250" y2="200" stroke="#262631" stroke-width="1"/>
    <g>
      <text x="375" y="35" text-anchor="middle" fill="#fbbf24" font-family="JetBrains Mono, monospace" font-size="24" font-weight="700">==</text>
      <text x="375" y="55" text-anchor="middle" fill="#a0a0aa" font-size="12">COMPARA</text>
      <rect x="285" y="80" width="180" height="60" rx="8" fill="#1c1c25" stroke="#262631"/>
      <text x="315" y="118" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="18">x == 10</text>
      <text x="375" y="170" text-anchor="middle" fill="#a0a0aa" font-size="13">pergunta se é igual</text>
    </g>
  </svg>`,

  tipos: `<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
    <g>
      <rect x="20" y="40" width="120" height="100" rx="10" fill="#1c1c25" stroke="#7c9cff"/>
      <text x="80" y="80" text-anchor="middle" fill="#7c9cff" font-size="12" font-weight="600">int</text>
      <text x="80" y="115" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="22">42</text>
      <text x="80" y="165" text-anchor="middle" fill="#a0a0aa" font-size="12">inteiro</text>
    </g>
    <g>
      <rect x="160" y="40" width="120" height="100" rx="10" fill="#1c1c25" stroke="#7c9cff"/>
      <text x="220" y="80" text-anchor="middle" fill="#7c9cff" font-size="12" font-weight="600">float</text>
      <text x="220" y="115" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="22">3.14</text>
      <text x="220" y="165" text-anchor="middle" fill="#a0a0aa" font-size="12">decimal</text>
    </g>
    <g>
      <rect x="300" y="40" width="120" height="100" rx="10" fill="#1c1c25" stroke="#7c9cff"/>
      <text x="360" y="80" text-anchor="middle" fill="#7c9cff" font-size="12" font-weight="600">str</text>
      <text x="360" y="115" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="18">"olá"</text>
      <text x="360" y="165" text-anchor="middle" fill="#a0a0aa" font-size="12">texto</text>
    </g>
    <g>
      <rect x="440" y="40" width="120" height="100" rx="10" fill="#1c1c25" stroke="#7c9cff"/>
      <text x="500" y="80" text-anchor="middle" fill="#7c9cff" font-size="12" font-weight="600">bool</text>
      <text x="500" y="115" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="18">True</text>
      <text x="500" y="165" text-anchor="middle" fill="#a0a0aa" font-size="12">verdadeiro/falso</text>
    </g>
  </svg>`,

  precedencia: `<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
    <g>
      <rect x="140" y="30" width="220" height="42" rx="6" fill="#7c9cff"/>
      <text x="250" y="57" text-anchor="middle" fill="#0c0c11" font-family="JetBrains Mono, monospace" font-size="16" font-weight="700">( ) — parênteses</text>
    </g>
    <g>
      <rect x="120" y="90" width="260" height="42" rx="6" fill="#6b8afd" opacity="0.9"/>
      <text x="250" y="117" text-anchor="middle" fill="#0c0c11" font-family="JetBrains Mono, monospace" font-size="16" font-weight="700">** — potência</text>
    </g>
    <g>
      <rect x="90" y="150" width="320" height="42" rx="6" fill="#5b78e8" opacity="0.85"/>
      <text x="250" y="177" text-anchor="middle" fill="#0c0c11" font-family="JetBrains Mono, monospace" font-size="16" font-weight="700">* / // % — multi/div</text>
    </g>
    <g>
      <rect x="60" y="210" width="380" height="42" rx="6" fill="#4b66d3" opacity="0.8"/>
      <text x="250" y="237" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="16" font-weight="700">+ - — soma/subtração</text>
    </g>
    <text x="250" y="285" text-anchor="middle" fill="#a0a0aa" font-size="13">Python calcula do topo para baixo</text>
  </svg>`,

  funcao: `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg">
    <rect x="150" y="60" width="200" height="100" rx="12" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
    <text x="250" y="100" text-anchor="middle" fill="#7c9cff" font-family="JetBrains Mono, monospace" font-size="18" font-weight="600">soma()</text>
    <text x="250" y="130" text-anchor="middle" fill="#a0a0aa" font-size="13">processa</text>

    <!-- entrada -->
    <path d="M 40 110 L 150 110" stroke="#a0a0aa" stroke-width="2" marker-end="url(#arrow)"/>
    <rect x="20" y="90" width="50" height="40" rx="6" fill="#16161d" stroke="#262631"/>
    <text x="45" y="115" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="14">3, 7</text>
    <text x="45" y="75" text-anchor="middle" fill="#a0a0aa" font-size="12">entrada</text>

    <!-- saída -->
    <path d="M 350 110 L 460 110" stroke="#4ade80" stroke-width="2" marker-end="url(#arrowGreen)"/>
    <rect x="430" y="90" width="50" height="40" rx="6" fill="#16161d" stroke="#4ade80"/>
    <text x="455" y="115" text-anchor="middle" fill="#4ade80" font-family="JetBrains Mono, monospace" font-size="14">10</text>
    <text x="455" y="75" text-anchor="middle" fill="#a0a0aa" font-size="12">saída</text>

    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#a0a0aa"/>
      </marker>
      <marker id="arrowGreen" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#4ade80"/>
      </marker>
    </defs>
  </svg>`,

  argsKwargs: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">
    <g>
      <text x="125" y="30" text-anchor="middle" fill="#7c9cff" font-family="JetBrains Mono, monospace" font-size="18" font-weight="700">*args</text>
      <text x="125" y="50" text-anchor="middle" fill="#a0a0aa" font-size="12">sacola de posicionais → tupla</text>
      <path d="M 50 90 Q 50 190 200 190 Q 200 90 200 90 Q 125 65 50 90 Z" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <circle cx="90" cy="130" r="18" fill="#16161d" stroke="#262631"/>
      <text x="90" y="136" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="14">1</text>
      <circle cx="140" cy="150" r="18" fill="#16161d" stroke="#262631"/>
      <text x="140" y="156" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="14">2</text>
      <circle cx="170" cy="120" r="18" fill="#16161d" stroke="#262631"/>
      <text x="170" y="126" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="14">3</text>
    </g>
    <line x1="260" y1="20" x2="260" y2="230" stroke="#262631"/>
    <g>
      <text x="380" y="30" text-anchor="middle" fill="#fbbf24" font-family="JetBrains Mono, monospace" font-size="18" font-weight="700">**kwargs</text>
      <text x="380" y="50" text-anchor="middle" fill="#a0a0aa" font-size="12">envelope de nomeados → dict</text>
      <rect x="290" y="80" width="180" height="120" rx="6" fill="#1c1c25" stroke="#fbbf24" stroke-width="2"/>
      <text x="380" y="110" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="13">nome = "Ana"</text>
      <text x="380" y="140" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="13">idade = 28</text>
      <text x="380" y="170" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="13">ativo = True</text>
    </g>
  </svg>`,

  mainBlock: `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg">
    <!-- porta 1: executar direto -->
    <g>
      <rect x="60" y="40" width="140" height="140" rx="8" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <rect x="80" y="60" width="100" height="100" rx="4" fill="#16161d"/>
      <circle cx="170" cy="110" r="4" fill="#4ade80"/>
      <text x="130" y="200" text-anchor="middle" fill="#4ade80" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600">python arquivo.py</text>
      <text x="130" y="30" text-anchor="middle" fill="#f0f0f5" font-size="13" font-weight="600">executar direto</text>
      <text x="130" y="105" text-anchor="middle" fill="#4ade80" font-size="24">✓</text>
      <text x="130" y="128" text-anchor="middle" fill="#a0a0aa" font-size="11">bloco roda</text>
    </g>

    <!-- porta 2: importar -->
    <g>
      <rect x="300" y="40" width="140" height="140" rx="8" fill="#1c1c25" stroke="#a0a0aa" stroke-width="2"/>
      <rect x="320" y="60" width="100" height="100" rx="4" fill="#16161d"/>
      <circle cx="410" cy="110" r="4" fill="#a0a0aa"/>
      <text x="370" y="200" text-anchor="middle" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600">import arquivo</text>
      <text x="370" y="30" text-anchor="middle" fill="#f0f0f5" font-size="13" font-weight="600">importado por outro</text>
      <text x="370" y="105" text-anchor="middle" fill="#a0a0aa" font-size="24">×</text>
      <text x="370" y="128" text-anchor="middle" fill="#a0a0aa" font-size="11">bloco não roda</text>
    </g>
  </svg>`,

  lista: `<svg viewBox="0 0 500 180" xmlns="http://www.w3.org/2000/svg">
    <g font-family="JetBrains Mono, monospace">
      <rect x="30" y="60" width="80" height="80" rx="6" fill="#1c1c25" stroke="#7c9cff"/>
      <text x="70" y="105" text-anchor="middle" fill="#f0f0f5" font-size="24">10</text>
      <text x="70" y="45" text-anchor="middle" fill="#a0a0aa" font-size="14">[0]</text>

      <rect x="120" y="60" width="80" height="80" rx="6" fill="#1c1c25" stroke="#7c9cff"/>
      <text x="160" y="105" text-anchor="middle" fill="#f0f0f5" font-size="24">20</text>
      <text x="160" y="45" text-anchor="middle" fill="#a0a0aa" font-size="14">[1]</text>

      <rect x="210" y="60" width="80" height="80" rx="6" fill="#1c1c25" stroke="#7c9cff"/>
      <text x="250" y="105" text-anchor="middle" fill="#f0f0f5" font-size="24">30</text>
      <text x="250" y="45" text-anchor="middle" fill="#a0a0aa" font-size="14">[2]</text>

      <rect x="300" y="60" width="80" height="80" rx="6" fill="#1c1c25" stroke="#7c9cff"/>
      <text x="340" y="105" text-anchor="middle" fill="#f0f0f5" font-size="24">40</text>
      <text x="340" y="45" text-anchor="middle" fill="#a0a0aa" font-size="14">[3]</text>

      <rect x="390" y="60" width="80" height="80" rx="6" fill="#1c1c25" stroke="#7c9cff" stroke-dasharray="4,3"/>
      <text x="430" y="105" text-anchor="middle" fill="#a0a0aa" font-size="24">…</text>
      <text x="430" y="45" text-anchor="middle" fill="#a0a0aa" font-size="14">[n]</text>
    </g>
    <text x="250" y="170" text-anchor="middle" fill="#a0a0aa" font-size="14">ordenada • mutável • índice numérico</text>
  </svg>`,

  tupla: `<svg viewBox="0 0 500 180" xmlns="http://www.w3.org/2000/svg">
    <g font-family="JetBrains Mono, monospace">
      <rect x="90" y="60" width="80" height="80" rx="6" fill="#1c1c25" stroke="#a0a0aa"/>
      <text x="130" y="105" text-anchor="middle" fill="#f0f0f5" font-size="22">3.0</text>

      <rect x="180" y="60" width="80" height="80" rx="6" fill="#1c1c25" stroke="#a0a0aa"/>
      <text x="220" y="105" text-anchor="middle" fill="#f0f0f5" font-size="22">4.0</text>

      <rect x="270" y="60" width="80" height="80" rx="6" fill="#1c1c25" stroke="#a0a0aa"/>
      <text x="310" y="105" text-anchor="middle" fill="#f0f0f5" font-size="22">5.0</text>

      <!-- cadeado -->
      <g transform="translate(360, 60)">
        <rect x="0" y="20" width="40" height="30" rx="4" fill="#fbbf24"/>
        <path d="M 8 20 Q 8 5 20 5 Q 32 5 32 20" fill="none" stroke="#fbbf24" stroke-width="4"/>
        <circle cx="20" cy="35" r="3" fill="#0c0c11"/>
      </g>
      <text x="380" y="130" text-anchor="middle" fill="#fbbf24" font-size="12">imutável</text>
    </g>
    <text x="250" y="170" text-anchor="middle" fill="#a0a0aa" font-size="14">a vírgula é que define a tupla — parênteses são opcionais</text>
  </svg>`,

  dicionario: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">
    <g font-family="JetBrains Mono, monospace">
      <rect x="70" y="30" width="360" height="180" rx="10" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>

      <rect x="90" y="50" width="140" height="40" rx="6" fill="#0c0c11"/>
      <text x="105" y="76" fill="#7c9cff" font-size="14">"nome"</text>
      <text x="215" y="76" text-anchor="end" fill="#a0a0aa" font-size="14">→</text>
      <rect x="250" y="50" width="160" height="40" rx="6" fill="#0c0c11"/>
      <text x="330" y="76" text-anchor="middle" fill="#f0f0f5" font-size="14">"Ana"</text>

      <rect x="90" y="100" width="140" height="40" rx="6" fill="#0c0c11"/>
      <text x="105" y="126" fill="#7c9cff" font-size="14">"idade"</text>
      <text x="215" y="126" text-anchor="end" fill="#a0a0aa" font-size="14">→</text>
      <rect x="250" y="100" width="160" height="40" rx="6" fill="#0c0c11"/>
      <text x="330" y="126" text-anchor="middle" fill="#f0f0f5" font-size="14">28</text>

      <rect x="90" y="150" width="140" height="40" rx="6" fill="#0c0c11"/>
      <text x="105" y="176" fill="#7c9cff" font-size="14">"ativo"</text>
      <text x="215" y="176" text-anchor="end" fill="#a0a0aa" font-size="14">→</text>
      <rect x="250" y="150" width="160" height="40" rx="6" fill="#0c0c11"/>
      <text x="330" y="176" text-anchor="middle" fill="#f0f0f5" font-size="14">True</text>
    </g>
    <text x="250" y="230" text-anchor="middle" fill="#a0a0aa" font-size="14">chave → valor</text>
  </svg>`,

  set: `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="250" cy="110" rx="180" ry="80" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
    <g font-family="JetBrains Mono, monospace">
      <circle cx="140" cy="90" r="26" fill="#0c0c11" stroke="#7c9cff"/>
      <text x="140" y="96" text-anchor="middle" fill="#f0f0f5" font-size="16">"maçã"</text>

      <circle cx="230" cy="130" r="30" fill="#0c0c11" stroke="#7c9cff"/>
      <text x="230" y="136" text-anchor="middle" fill="#f0f0f5" font-size="14">"banana"</text>

      <circle cx="330" cy="80" r="26" fill="#0c0c11" stroke="#7c9cff"/>
      <text x="330" y="86" text-anchor="middle" fill="#f0f0f5" font-size="14">"uva"</text>

      <circle cx="360" cy="140" r="26" fill="#0c0c11" stroke="#7c9cff"/>
      <text x="360" y="146" text-anchor="middle" fill="#f0f0f5" font-size="14">"pera"</text>
    </g>
    <text x="250" y="210" text-anchor="middle" fill="#a0a0aa" font-size="14">sem ordem • sem duplicatas</text>
  </svg>`,

  classe: `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg">
    <!-- Molde -->
    <rect x="30" y="60" width="140" height="100" rx="10" fill="#1c1c25" stroke="#7c9cff" stroke-width="3" stroke-dasharray="6,3"/>
    <text x="100" y="115" text-anchor="middle" fill="#7c9cff" font-family="JetBrains Mono, monospace" font-size="16" font-weight="700">Molde</text>
    <text x="100" y="45" text-anchor="middle" fill="#a0a0aa" font-size="13">classe</text>

    <!-- seta -->
    <path d="M 180 110 L 210 110" stroke="#a0a0aa" stroke-width="2" marker-end="url(#a2)"/>
    <defs><marker id="a2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#a0a0aa"/></marker></defs>

    <!-- Cookies produzidos -->
    <g>
      <circle cx="260" cy="90" r="26" fill="#7c9cff" opacity="0.6"/>
      <circle cx="332" cy="90" r="26" fill="#7c9cff" opacity="0.6"/>
      <circle cx="404" cy="90" r="26" fill="#7c9cff" opacity="0.6"/>
      <circle cx="296" cy="140" r="26" fill="#7c9cff" opacity="0.6"/>
      <circle cx="368" cy="140" r="26" fill="#7c9cff" opacity="0.6"/>
      <text x="260" y="96" text-anchor="middle" fill="#0c0c11" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700">obj</text>
      <text x="332" y="96" text-anchor="middle" fill="#0c0c11" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700">obj</text>
      <text x="404" y="96" text-anchor="middle" fill="#0c0c11" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700">obj</text>
      <text x="296" y="146" text-anchor="middle" fill="#0c0c11" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700">obj</text>
      <text x="368" y="146" text-anchor="middle" fill="#0c0c11" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700">obj</text>
    </g>
    <text x="335" y="200" text-anchor="middle" fill="#a0a0aa" font-size="13">instâncias criadas a partir do molde</text>
  </svg>`,

  heranca: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
    <!-- Pai -->
    <rect x="180" y="20" width="140" height="60" rx="8" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
    <text x="250" y="50" text-anchor="middle" fill="#7c9cff" font-size="15" font-weight="700">Documento</text>
    <text x="250" y="70" text-anchor="middle" fill="#a0a0aa" font-size="12">numero, resumo</text>

    <!-- Linha -->
    <line x1="250" y1="80" x2="250" y2="120" stroke="#a0a0aa" stroke-width="2"/>
    <line x1="120" y1="120" x2="380" y2="120" stroke="#a0a0aa" stroke-width="2"/>
    <line x1="120" y1="120" x2="120" y2="150" stroke="#a0a0aa" stroke-width="2"/>
    <line x1="380" y1="120" x2="380" y2="150" stroke="#a0a0aa" stroke-width="2"/>

    <!-- Filhos -->
    <rect x="40" y="150" width="160" height="70" rx="8" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
    <text x="120" y="180" text-anchor="middle" fill="#4ade80" font-size="14" font-weight="700">OficioCircular</text>
    <text x="120" y="200" text-anchor="middle" fill="#a0a0aa" font-size="11">+ destinatarios</text>

    <rect x="300" y="150" width="160" height="70" rx="8" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
    <text x="380" y="180" text-anchor="middle" fill="#4ade80" font-size="14" font-weight="700">Contrato</text>
    <text x="380" y="200" text-anchor="middle" fill="#a0a0aa" font-size="11">+ partes</text>
  </svg>`,

  decorator: `<svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <!-- pão superior -->
    <path d="M 130 40 Q 250 20 370 40 L 370 80 L 130 80 Z" fill="#e0a458" stroke="#c48342"/>
    <text x="250" y="66" text-anchor="middle" fill="#0c0c11" font-size="14" font-weight="700">before(); func();</text>

    <!-- recheio -->
    <rect x="130" y="90" width="240" height="80" fill="#7c9cff" opacity="0.7"/>
    <text x="250" y="120" text-anchor="middle" fill="#0c0c11" font-size="16" font-weight="700">função original</text>
    <text x="250" y="145" text-anchor="middle" fill="#0c0c11" font-family="JetBrains Mono, monospace" font-size="14">hamburguer()</text>

    <!-- pão inferior -->
    <path d="M 130 180 L 370 180 L 370 220 Q 250 240 130 220 Z" fill="#e0a458" stroke="#c48342"/>
    <text x="250" y="207" text-anchor="middle" fill="#0c0c11" font-size="14" font-weight="700">after(); return result</text>

    <text x="250" y="253" text-anchor="middle" fill="#a0a0aa" font-size="13">o decorator é o "pão" — envelopa a função</text>
  </svg>`,

  clienteServidor: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">
    <!-- Cliente (laptop) -->
    <g transform="translate(30, 70)">
      <rect x="0" y="30" width="120" height="80" rx="6" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <rect x="10" y="40" width="100" height="60" rx="2" fill="#0c0c11"/>
      <rect x="-15" y="115" width="150" height="8" rx="2" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="60" y="145" text-anchor="middle" fill="#7c9cff" font-size="14" font-weight="700">Cliente</text>
      <text x="60" y="163" text-anchor="middle" fill="#a0a0aa" font-size="12">(navegador)</text>
    </g>

    <!-- Setas -->
    <g>
      <path d="M 170 100 L 340 100" stroke="#7c9cff" stroke-width="2.5" marker-end="url(#arr1)"/>
      <text x="255" y="93" text-anchor="middle" fill="#f0f0f5" font-size="13" font-weight="600">requisição</text>
      <text x="255" y="108" text-anchor="middle" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="11">GET /pagina</text>

      <path d="M 340 150 L 170 150" stroke="#4ade80" stroke-width="2.5" marker-end="url(#arr2)"/>
      <text x="255" y="167" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="600">resposta</text>
      <text x="255" y="182" text-anchor="middle" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="11">200 OK + HTML</text>
    </g>

    <!-- Servidor -->
    <g transform="translate(350, 70)">
      <rect x="0" y="20" width="120" height="110" rx="6" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <rect x="15" y="35" width="90" height="12" rx="2" fill="#0c0c11"/>
      <circle cx="95" cy="41" r="2" fill="#4ade80"/>
      <rect x="15" y="55" width="90" height="12" rx="2" fill="#0c0c11"/>
      <circle cx="95" cy="61" r="2" fill="#4ade80"/>
      <rect x="15" y="75" width="90" height="12" rx="2" fill="#0c0c11"/>
      <circle cx="95" cy="81" r="2" fill="#a0a0aa"/>
      <rect x="15" y="95" width="90" height="12" rx="2" fill="#0c0c11"/>
      <circle cx="95" cy="101" r="2" fill="#a0a0aa"/>
      <text x="60" y="150" text-anchor="middle" fill="#4ade80" font-size="14" font-weight="700">Servidor</text>
    </g>

    <defs>
      <marker id="arr1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7c9cff"/></marker>
      <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4ade80"/></marker>
    </defs>
  </svg>`,

  reqEnvelope: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
    <rect x="80" y="40" width="340" height="170" rx="8" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
    <line x1="80" y1="80" x2="420" y2="80" stroke="#262631"/>
    <line x1="80" y1="150" x2="420" y2="150" stroke="#262631" stroke-dasharray="4,3"/>

    <text x="100" y="65" fill="#7c9cff" font-size="13" font-weight="700">GET</text>
    <text x="140" y="65" fill="#f0f0f5" font-size="13">/api/users/42</text>
    <text x="300" y="65" fill="#a0a0aa" font-size="13">HTTP/1.1</text>

    <text x="90" y="105" fill="#a0a0aa" font-size="10">HEADERS</text>
    <text x="100" y="125" fill="#f0f0f5" font-size="12">Host: localhost:8000</text>
    <text x="100" y="142" fill="#f0f0f5" font-size="12">Accept: application/json</text>

    <text x="90" y="175" fill="#a0a0aa" font-size="10">BODY</text>
    <text x="100" y="195" fill="#a0a0aa" font-size="12" font-style="italic">(vazio para GET)</text>

    <text x="250" y="230" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="14">método + URI + versão, headers, corpo</text>
  </svg>`,

  statusColors: `<svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <g>
      <circle cx="80" cy="50" r="24" fill="#a0a0aa"/>
      <text x="80" y="56" text-anchor="middle" fill="#0c0c11" font-family="JetBrains Mono, monospace" font-size="16" font-weight="700">1xx</text>
      <text x="130" y="45" fill="#f0f0f5" font-size="15" font-weight="600">Informativa</text>
      <text x="130" y="63" fill="#a0a0aa" font-size="13">raramente usado</text>
    </g>
    <g>
      <circle cx="80" cy="100" r="24" fill="#4ade80"/>
      <text x="80" y="106" text-anchor="middle" fill="#0c0c11" font-family="JetBrains Mono, monospace" font-size="16" font-weight="700">2xx</text>
      <text x="130" y="95" fill="#f0f0f5" font-size="15" font-weight="600">Sucesso</text>
      <text x="130" y="113" fill="#a0a0aa" font-size="13">deu certo — 200, 201, 204</text>
    </g>
    <g>
      <circle cx="80" cy="150" r="24" fill="#7c9cff"/>
      <text x="80" y="156" text-anchor="middle" fill="#0c0c11" font-family="JetBrains Mono, monospace" font-size="16" font-weight="700">3xx</text>
      <text x="130" y="145" fill="#f0f0f5" font-size="15" font-weight="600">Redirecionamento</text>
      <text x="130" y="163" fill="#a0a0aa" font-size="13">vai pra outro lugar — 301, 302</text>
    </g>
    <g>
      <circle cx="80" cy="200" r="24" fill="#fbbf24"/>
      <text x="80" y="206" text-anchor="middle" fill="#0c0c11" font-family="JetBrains Mono, monospace" font-size="16" font-weight="700">4xx</text>
      <text x="130" y="195" fill="#f0f0f5" font-size="15" font-weight="600">Erro do cliente</text>
      <text x="130" y="213" fill="#a0a0aa" font-size="13">você errou — 400, 401, 404</text>
    </g>
    <g>
      <circle cx="80" cy="250" r="24" fill="#ef4444"/>
      <text x="80" y="256" text-anchor="middle" fill="#0c0c11" font-family="JetBrains Mono, monospace" font-size="16" font-weight="700">5xx</text>
      <text x="130" y="245" fill="#f0f0f5" font-size="15" font-weight="600">Erro do servidor</text>
      <text x="130" y="263" fill="#a0a0aa" font-size="13">o servidor errou — 500, 503</text>
    </g>
  </svg>`,

  restResource: `<svg viewBox="0 0 500 230" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
    <!-- Prateleira -->
    <line x1="40" y1="180" x2="460" y2="180" stroke="#a0a0aa" stroke-width="3"/>

    <!-- Caixas na prateleira -->
    <g>
      <rect x="60" y="100" width="90" height="80" rx="4" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="105" y="135" text-anchor="middle" fill="#7c9cff" font-size="13" font-weight="600">user 1</text>
      <text x="105" y="155" text-anchor="middle" fill="#a0a0aa" font-size="11">/users/1</text>
    </g>
    <g>
      <rect x="170" y="100" width="90" height="80" rx="4" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="215" y="135" text-anchor="middle" fill="#7c9cff" font-size="13" font-weight="600">user 2</text>
      <text x="215" y="155" text-anchor="middle" fill="#a0a0aa" font-size="11">/users/2</text>
    </g>
    <g>
      <rect x="280" y="100" width="90" height="80" rx="4" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="325" y="135" text-anchor="middle" fill="#7c9cff" font-size="13" font-weight="600">user 3</text>
      <text x="325" y="155" text-anchor="middle" fill="#a0a0aa" font-size="11">/users/3</text>
    </g>
    <g>
      <rect x="390" y="100" width="60" height="80" rx="4" fill="#1c1c25" stroke="#a0a0aa" stroke-dasharray="4,3"/>
      <text x="420" y="145" text-anchor="middle" fill="#a0a0aa" font-size="20">…</text>
    </g>

    <text x="250" y="50" text-anchor="middle" fill="#f0f0f5" font-family="Inter" font-size="17" font-weight="600">/users — coleção</text>
    <text x="250" y="75" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="14">/users/1 — recurso individual</text>
    <text x="250" y="215" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="13">cada URI identifica um recurso</text>
  </svg>`,

  restMetodos: `<svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
    <g>
      <rect x="20" y="30" width="220" height="42" rx="6" fill="#4ade80" opacity="0.85"/>
      <text x="40" y="57" fill="#0c0c11" font-size="15" font-weight="700">GET</text>
      <text x="130" y="57" fill="#0c0c11" font-size="13">obter recurso</text>
    </g>
    <g>
      <rect x="20" y="82" width="220" height="42" rx="6" fill="#7c9cff" opacity="0.85"/>
      <text x="40" y="109" fill="#0c0c11" font-size="15" font-weight="700">POST</text>
      <text x="130" y="109" fill="#0c0c11" font-size="13">criar novo</text>
    </g>
    <g>
      <rect x="20" y="134" width="220" height="42" rx="6" fill="#fbbf24" opacity="0.85"/>
      <text x="40" y="161" fill="#0c0c11" font-size="15" font-weight="700">PUT</text>
      <text x="130" y="161" fill="#0c0c11" font-size="13">substituir</text>
    </g>
    <g>
      <rect x="20" y="186" width="220" height="42" rx="6" fill="#ef4444" opacity="0.85"/>
      <text x="40" y="213" fill="#0c0c11" font-size="15" font-weight="700">DELETE</text>
      <text x="130" y="213" fill="#0c0c11" font-size="13">remover</text>
    </g>

    <g font-family="Inter, sans-serif">
      <text x="270" y="57" fill="#a0a0aa" font-size="14">→ GET /users/42</text>
      <text x="270" y="109" fill="#a0a0aa" font-size="14">→ POST /users</text>
      <text x="270" y="161" fill="#a0a0aa" font-size="14">→ PUT /users/42</text>
      <text x="270" y="213" fill="#a0a0aa" font-size="14">→ DELETE /users/42</text>
    </g>
  </svg>`,

  framework: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <!-- Estrutura framework -->
    <rect x="60" y="40" width="380" height="160" rx="12" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
    <text x="250" y="70" text-anchor="middle" fill="#7c9cff" font-size="16" font-weight="700">Framework (esqueleto pronto)</text>

    <rect x="90" y="90" width="80" height="80" rx="6" fill="#0c0c11" stroke="#262631"/>
    <text x="130" y="125" text-anchor="middle" fill="#a0a0aa" font-size="11">roteamento</text>

    <rect x="180" y="90" width="80" height="80" rx="6" fill="#0c0c11" stroke="#262631"/>
    <text x="220" y="125" text-anchor="middle" fill="#a0a0aa" font-size="11">HTTP</text>

    <rect x="270" y="90" width="80" height="80" rx="6" fill="#0c0c11" stroke="#262631"/>
    <text x="310" y="125" text-anchor="middle" fill="#a0a0aa" font-size="11">templates</text>

    <rect x="360" y="90" width="60" height="80" rx="6" fill="#7c9cff"/>
    <text x="390" y="125" text-anchor="middle" fill="#0c0c11" font-size="11" font-weight="700">seu código</text>

    <text x="250" y="225" text-anchor="middle" fill="#a0a0aa" font-size="13">peças prontas + você só encaixa a sua lógica</text>
  </svg>`,

  venv: `<svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <!-- Sistema -->
    <rect x="20" y="30" width="460" height="200" rx="12" fill="none" stroke="#262631" stroke-width="2" stroke-dasharray="6,4"/>
    <text x="35" y="55" fill="#a0a0aa" font-size="13">sistema operacional</text>

    <!-- Projeto A -->
    <g>
      <ellipse cx="130" cy="140" rx="80" ry="60" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="130" y="115" text-anchor="middle" fill="#7c9cff" font-size="13" font-weight="700">projeto A</text>
      <text x="130" y="140" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="11">Flask 3.0</text>
      <text x="130" y="158" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="11">requests 2.31</text>
      <text x="130" y="205" text-anchor="middle" fill="#a0a0aa" font-size="11">venv isolada</text>
    </g>

    <!-- Projeto B -->
    <g>
      <ellipse cx="360" cy="140" rx="80" ry="60" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <text x="360" y="115" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">projeto B</text>
      <text x="360" y="140" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="11">Flask 2.0</text>
      <text x="360" y="158" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="11">django 4.2</text>
      <text x="360" y="205" text-anchor="middle" fill="#a0a0aa" font-size="11">venv isolada</text>
    </g>
  </svg>`,

  blueprint: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <!-- App principal -->
    <rect x="150" y="30" width="200" height="60" rx="8" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
    <text x="250" y="65" text-anchor="middle" fill="#7c9cff" font-size="16" font-weight="700">app (Flask)</text>

    <!-- Blueprints -->
    <g>
      <line x1="200" y1="90" x2="120" y2="130" stroke="#a0a0aa" stroke-width="1.5"/>
      <rect x="40" y="140" width="160" height="70" rx="6" fill="#1c1c25" stroke="#4ade80"/>
      <text x="120" y="168" text-anchor="middle" fill="#4ade80" font-size="14" font-weight="600">auth</text>
      <text x="120" y="188" text-anchor="middle" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="11">/login /logout</text>
    </g>
    <g>
      <line x1="250" y1="90" x2="250" y2="130" stroke="#a0a0aa" stroke-width="1.5"/>
      <rect x="170" y="140" width="160" height="70" rx="6" fill="#1c1c25" stroke="#4ade80"/>
      <text x="250" y="168" text-anchor="middle" fill="#4ade80" font-size="14" font-weight="600">api</text>
      <text x="250" y="188" text-anchor="middle" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="11">/api/users</text>
    </g>
    <g>
      <line x1="300" y1="90" x2="380" y2="130" stroke="#a0a0aa" stroke-width="1.5"/>
      <rect x="300" y="140" width="160" height="70" rx="6" fill="#1c1c25" stroke="#4ade80"/>
      <text x="380" y="168" text-anchor="middle" fill="#4ade80" font-size="14" font-weight="600">admin</text>
      <text x="380" y="188" text-anchor="middle" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="11">/admin/*</text>
    </g>
  </svg>`,

  factory: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <!-- Função factory -->
    <rect x="60" y="60" width="180" height="120" rx="10" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
    <text x="150" y="90" text-anchor="middle" fill="#7c9cff" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">create_app()</text>
    <text x="150" y="115" text-anchor="middle" fill="#a0a0aa" font-size="11">carrega config</text>
    <text x="150" y="132" text-anchor="middle" fill="#a0a0aa" font-size="11">registra blueprints</text>
    <text x="150" y="149" text-anchor="middle" fill="#a0a0aa" font-size="11">inicia extensões</text>
    <text x="150" y="200" text-anchor="middle" fill="#a0a0aa" font-size="12">receita da aplicação</text>

    <!-- Seta -->
    <path d="M 250 120 L 300 120" stroke="#a0a0aa" stroke-width="2" marker-end="url(#a3)"/>
    <defs><marker id="a3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#a0a0aa"/></marker></defs>

    <!-- Apps produzidas -->
    <g>
      <rect x="320" y="40" width="150" height="45" rx="6" fill="#1c1c25" stroke="#4ade80"/>
      <text x="395" y="68" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="600">dev</text>
    </g>
    <g>
      <rect x="320" y="100" width="150" height="45" rx="6" fill="#1c1c25" stroke="#fbbf24"/>
      <text x="395" y="128" text-anchor="middle" fill="#fbbf24" font-size="13" font-weight="600">produção</text>
    </g>
    <g>
      <rect x="320" y="160" width="150" height="45" rx="6" fill="#1c1c25" stroke="#a0a0aa"/>
      <text x="395" y="188" text-anchor="middle" fill="#a0a0aa" font-size="13" font-weight="600">teste</text>
    </g>
  </svg>`,

  importCircular: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
    <!-- app.py -->
    <rect x="60" y="60" width="140" height="120" rx="8" fill="#1c1c25" stroke="#ef4444" stroke-width="2"/>
    <text x="130" y="90" text-anchor="middle" fill="#ef4444" font-size="14" font-weight="700">app.py</text>
    <text x="130" y="120" text-anchor="middle" fill="#a0a0aa" font-size="11">precisa das</text>
    <text x="130" y="138" text-anchor="middle" fill="#a0a0aa" font-size="11">rotas de</text>
    <text x="130" y="158" text-anchor="middle" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="11">views.py</text>

    <!-- views.py -->
    <rect x="300" y="60" width="140" height="120" rx="8" fill="#1c1c25" stroke="#ef4444" stroke-width="2"/>
    <text x="370" y="90" text-anchor="middle" fill="#ef4444" font-size="14" font-weight="700">views.py</text>
    <text x="370" y="120" text-anchor="middle" fill="#a0a0aa" font-size="11">precisa do</text>
    <text x="370" y="138" text-anchor="middle" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="11">app</text>
    <text x="370" y="158" text-anchor="middle" fill="#a0a0aa" font-size="11">de app.py</text>

    <!-- Setas circulares -->
    <path d="M 200 100 Q 250 60 300 100" fill="none" stroke="#ef4444" stroke-width="2" marker-end="url(#ac)"/>
    <path d="M 300 140 Q 250 180 200 140" fill="none" stroke="#ef4444" stroke-width="2" marker-end="url(#ac)"/>
    <defs><marker id="ac" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ef4444"/></marker></defs>

    <text x="250" y="220" text-anchor="middle" fill="#ef4444" font-family="Inter" font-size="14" font-weight="600">deadlock — nenhum consegue carregar</text>
  </svg>`,

  contextos: `<svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <!-- Camada externa: Setup -->
    <rect x="30" y="30" width="440" height="200" rx="12" fill="#1c1c25" stroke="#a0a0aa" stroke-width="2"/>
    <text x="50" y="55" fill="#a0a0aa" font-size="13" font-weight="600">1. SETUP</text>
    <text x="50" y="72" fill="#a0a0aa" font-size="11">config, blueprints, extensões</text>

    <!-- Camada média: App Context -->
    <rect x="70" y="90" width="360" height="130" rx="10" fill="#0c0c11" stroke="#7c9cff" stroke-width="2"/>
    <text x="90" y="115" fill="#7c9cff" font-size="13" font-weight="600">2. APPLICATION CONTEXT</text>
    <text x="90" y="132" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="12">current_app · g</text>

    <!-- Camada interna: Request Context -->
    <rect x="110" y="150" width="280" height="60" rx="8" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
    <text x="130" y="175" fill="#4ade80" font-size="13" font-weight="600">3. REQUEST CONTEXT</text>
    <text x="130" y="195" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="12">request · session</text>

    <text x="250" y="252" text-anchor="middle" fill="#a0a0aa" font-size="13">requisição empilha os contextos; ao final, desempilha</text>
  </svg>`,

  duckTyping: `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <!-- Pato -->
    <g>
      <ellipse cx="130" cy="130" rx="55" ry="40" fill="#fbbf24"/>
      <circle cx="100" cy="100" r="22" fill="#fbbf24"/>
      <polygon points="80,100 65,105 80,110" fill="#e0a458"/>
      <circle cx="95" cy="95" r="3" fill="#0c0c11"/>
      <text x="130" y="200" text-anchor="middle" fill="#f0f0f5" font-size="14">Pato</text>
    </g>

    <!-- Balão de fala 1 -->
    <path d="M 200 90 Q 200 60 240 60 L 300 60 Q 340 60 340 90 Q 340 120 300 120 L 260 120 L 250 135 L 245 120 L 240 120 Q 200 120 200 90 Z" fill="#1c1c25" stroke="#7c9cff"/>
    <text x="270" y="98" text-anchor="middle" fill="#7c9cff" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">quack!</text>

    <!-- Cachorro (representado como caixa) -->
    <g>
      <rect x="370" y="100" width="90" height="70" rx="10" fill="#1c1c25" stroke="#a0a0aa"/>
      <circle cx="395" cy="120" r="4" fill="#f0f0f5"/>
      <circle cx="435" cy="120" r="4" fill="#f0f0f5"/>
      <path d="M 400 145 Q 415 155 430 145" stroke="#f0f0f5" fill="none" stroke-width="2"/>
      <text x="415" y="200" text-anchor="middle" fill="#f0f0f5" font-size="14">Cachorro</text>
    </g>

    <!-- balão do cachorro -->
    <path d="M 320 160 Q 320 140 350 140 L 370 140 Q 400 140 400 160 Q 400 180 370 180 L 355 180 L 348 195 L 348 180 Q 320 180 320 160 Z" fill="#1c1c25" stroke="#4ade80"/>
    <text x="360" y="166" text-anchor="middle" fill="#4ade80" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700">quack!</text>

    <text x="250" y="30" text-anchor="middle" fill="#a0a0aa" font-size="14">se anda como pato e faz "quack", é aceito como pato</text>
  </svg>`,

  propertySlide: `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <!-- Aparência: atributo -->
    <rect x="60" y="60" width="150" height="110" rx="10" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
    <text x="135" y="90" text-anchor="middle" fill="#7c9cff" font-size="13" font-weight="600">Aparência</text>
    <text x="135" y="120" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="15">p.preco</text>
    <text x="135" y="145" text-anchor="middle" fill="#a0a0aa" font-size="12">parece atributo</text>

    <path d="M 220 115 L 280 115" stroke="#a0a0aa" stroke-width="2" marker-end="url(#ap)"/>
    <defs><marker id="ap" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#a0a0aa"/></marker></defs>

    <!-- Realidade: método -->
    <rect x="290" y="60" width="150" height="110" rx="10" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
    <text x="365" y="90" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="600">Realidade</text>
    <text x="365" y="120" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="13">get_preco()</text>
    <text x="365" y="145" text-anchor="middle" fill="#a0a0aa" font-size="12">é método executado</text>

    <text x="250" y="205" text-anchor="middle" fill="#a0a0aa" font-size="13">controla leitura/escrita sem quebrar a interface</text>
  </svg>`,

  api: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <!-- App usuária -->
    <g>
      <rect x="30" y="80" width="120" height="80" rx="8" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="90" y="115" text-anchor="middle" fill="#7c9cff" font-size="13" font-weight="700">Seu App</text>
      <text x="90" y="135" text-anchor="middle" fill="#a0a0aa" font-size="11">precisa de clima</text>
    </g>

    <!-- API no meio -->
    <g>
      <rect x="200" y="60" width="100" height="120" rx="8" fill="#7c9cff"/>
      <text x="250" y="105" text-anchor="middle" fill="#0c0c11" font-size="15" font-weight="700">API</text>
      <text x="250" y="125" text-anchor="middle" fill="#0c0c11" font-size="11">contrato</text>
      <text x="250" y="142" text-anchor="middle" fill="#0c0c11" font-size="11">entre programas</text>
    </g>

    <!-- Serviço externo -->
    <g>
      <rect x="350" y="80" width="120" height="80" rx="8" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <text x="410" y="115" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">Serviço</text>
      <text x="410" y="135" text-anchor="middle" fill="#a0a0aa" font-size="11">tem os dados</text>
    </g>

    <!-- Setas -->
    <path d="M 155 120 L 195 120" stroke="#a0a0aa" stroke-width="2" marker-end="url(#aa)"/>
    <path d="M 305 120 L 345 120" stroke="#a0a0aa" stroke-width="2" marker-end="url(#aa)"/>
    <defs><marker id="aa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#a0a0aa"/></marker></defs>

    <text x="250" y="215" text-anchor="middle" fill="#a0a0aa" font-size="13">API = "Application Programming Interface"</text>
  </svg>`,

  http: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
    <text x="250" y="35" text-anchor="middle" fill="#f0f0f5" font-family="Inter" font-size="16" font-weight="600">HTTP — protocolo da conversa</text>

    <!-- Envelope 1 -->
    <g>
      <rect x="40" y="70" width="180" height="60" rx="6" fill="#1c1c25" stroke="#7c9cff"/>
      <text x="60" y="95" fill="#7c9cff" font-size="12">GET /pagina</text>
      <text x="60" y="115" fill="#a0a0aa" font-size="11">"me dá essa página"</text>
    </g>

    <path d="M 230 100 L 270 100" stroke="#a0a0aa" stroke-width="2" marker-end="url(#h1)"/>

    <!-- Envelope 2 -->
    <g>
      <rect x="280" y="70" width="180" height="60" rx="6" fill="#1c1c25" stroke="#4ade80"/>
      <text x="300" y="95" fill="#4ade80" font-size="12">200 OK + HTML</text>
      <text x="300" y="115" fill="#a0a0aa" font-size="11">"aqui está"</text>
    </g>

    <defs><marker id="h1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#a0a0aa"/></marker></defs>

    <text x="250" y="180" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="14">um pergunta, o outro responde — todo request é assim</text>
  </svg>`,

  ioc: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <text x="130" y="30" text-anchor="middle" fill="#ef4444" font-size="13" font-weight="700">ANTES (ruim)</text>
    <text x="370" y="30" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">DEPOIS (bom)</text>

    <!-- Antes: views busca app -->
    <g>
      <rect x="40" y="60" width="90" height="50" rx="6" fill="#1c1c25" stroke="#ef4444"/>
      <text x="85" y="90" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">views</text>

      <rect x="180" y="60" width="90" height="50" rx="6" fill="#1c1c25" stroke="#ef4444"/>
      <text x="225" y="90" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">app</text>

      <path d="M 130 85 L 178 85" stroke="#ef4444" stroke-width="2" marker-end="url(#ai1)"/>
      <text x="155" y="130" text-anchor="middle" fill="#a0a0aa" font-size="11">views busca app</text>
    </g>

    <line x1="290" y1="20" x2="290" y2="220" stroke="#262631"/>

    <!-- Depois: app injeta em views -->
    <g>
      <rect x="310" y="60" width="90" height="50" rx="6" fill="#1c1c25" stroke="#4ade80"/>
      <text x="355" y="90" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">app</text>

      <rect x="440" y="60" width="50" height="50" rx="6" fill="#1c1c25" stroke="#4ade80"/>
      <text x="465" y="90" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="10">views</text>

      <path d="M 400 85 L 438 85" stroke="#4ade80" stroke-width="2" marker-end="url(#ai2)"/>
      <text x="420" y="130" text-anchor="middle" fill="#a0a0aa" font-size="11">app injeta em views</text>
    </g>

    <defs>
      <marker id="ai1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ef4444"/></marker>
      <marker id="ai2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4ade80"/></marker>
    </defs>

    <text x="250" y="195" text-anchor="middle" fill="#a0a0aa" font-size="12">chama-se "injeção de dependência"</text>
  </svg>`,

  proxies: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
    <g>
      <rect x="20" y="40" width="220" height="80" rx="8" fill="#0c0c11" stroke="#7c9cff" stroke-width="2"/>
      <text x="130" y="65" text-anchor="middle" fill="#7c9cff" font-family="Inter" font-size="12" font-weight="700">APPLICATION CONTEXT</text>
      <text x="130" y="90" text-anchor="middle" fill="#f0f0f5" font-size="13">current_app</text>
      <text x="130" y="108" text-anchor="middle" fill="#f0f0f5" font-size="13">g</text>
    </g>
    <g>
      <rect x="260" y="40" width="220" height="80" rx="8" fill="#0c0c11" stroke="#4ade80" stroke-width="2"/>
      <text x="370" y="65" text-anchor="middle" fill="#4ade80" font-family="Inter" font-size="12" font-weight="700">REQUEST CONTEXT</text>
      <text x="370" y="90" text-anchor="middle" fill="#f0f0f5" font-size="13">request</text>
      <text x="370" y="108" text-anchor="middle" fill="#f0f0f5" font-size="13">session</text>
    </g>

    <text x="250" y="175" text-anchor="middle" fill="#f0f0f5" font-family="Inter" font-size="14" font-weight="600">Regra de ouro</text>
    <text x="250" y="195" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="13">todo Request Context → carrega um App Context</text>
    <text x="250" y="213" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="13">o inverso NÃO vale</text>
  </svg>`,

  /* ==== Unidade 5 ==== */

  script_vs_pacote: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <g>
      <text x="125" y="30" text-anchor="middle" fill="#a0a0aa" font-size="13" font-weight="700">SCRIPT SOLTO</text>
      <rect x="40" y="50" width="170" height="150" rx="8" fill="#1c1c25" stroke="#a0a0aa" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="125" y="85" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="13">app.py</text>
      <text x="125" y="120" text-anchor="middle" fill="#a0a0aa" font-size="11">só roda</text>
      <text x="125" y="138" text-anchor="middle" fill="#a0a0aa" font-size="11">nesta pasta</text>
      <text x="125" y="170" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="600">✗ não é instalável</text>
    </g>
    <line x1="250" y1="30" x2="250" y2="220" stroke="#262631"/>
    <g>
      <text x="375" y="30" text-anchor="middle" fill="#7c9cff" font-size="13" font-weight="700">PACOTE INSTALÁVEL</text>
      <rect x="290" y="50" width="170" height="150" rx="8" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="375" y="85" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="13">taskflow/</text>
      <text x="375" y="103" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">pyproject.toml</text>
      <text x="375" y="138" text-anchor="middle" fill="#a0a0aa" font-size="11">roda em qualquer</text>
      <text x="375" y="156" text-anchor="middle" fill="#a0a0aa" font-size="11">ambiente Python</text>
      <text x="375" y="185" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="600">✓ instala com pip</text>
    </g>
  </svg>`,

  syspath: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
    <text x="250" y="30" text-anchor="middle" fill="#f0f0f5" font-family="Inter" font-size="15" font-weight="600">import x → Python procura em cada pasta:</text>

    <g>
      <rect x="60" y="60" width="380" height="34" rx="6" fill="#1c1c25" stroke="#262631"/>
      <text x="80" y="83" fill="#7c9cff" font-size="13">1. pasta atual</text>
    </g>
    <g>
      <rect x="60" y="105" width="380" height="34" rx="6" fill="#1c1c25" stroke="#262631"/>
      <text x="80" y="128" fill="#7c9cff" font-size="13">2. PYTHONPATH (variável de ambiente)</text>
    </g>
    <g>
      <rect x="60" y="150" width="380" height="34" rx="6" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="80" y="173" fill="#4ade80" font-size="13">3. site-packages ← onde o pip instala</text>
    </g>
    <text x="250" y="215" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="12">se seu projeto está em site-packages, pode ser importado de qualquer lugar</text>
  </svg>`,

  editable: `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <g>
      <rect x="30" y="70" width="150" height="80" rx="8" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="105" y="105" text-anchor="middle" fill="#7c9cff" font-family="JetBrains Mono, monospace" font-size="13">seu projeto/</text>
      <text x="105" y="130" text-anchor="middle" fill="#a0a0aa" font-size="11">onde você edita</text>
    </g>

    <g>
      <path d="M 185 110 L 305 110" stroke="#4ade80" stroke-width="2" stroke-dasharray="4,3" marker-end="url(#aedit)"/>
      <text x="245" y="100" text-anchor="middle" fill="#4ade80" font-size="12" font-weight="600">atalho</text>
      <text x="245" y="130" text-anchor="middle" fill="#a0a0aa" font-size="11">-e não copia</text>
    </g>

    <g>
      <rect x="310" y="70" width="160" height="80" rx="8" fill="#1c1c25" stroke="#262631"/>
      <text x="390" y="105" text-anchor="middle" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="12">site-packages/</text>
      <text x="390" y="125" text-anchor="middle" fill="#a0a0aa" font-size="10">taskflow ➜ atalho</text>
    </g>

    <defs><marker id="aedit" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4ade80"/></marker></defs>

    <text x="250" y="195" text-anchor="middle" fill="#a0a0aa" font-size="13">edita local → funciona no ambiente todo, sem reinstalar</text>
  </svg>`,

  semver: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
    <text x="250" y="35" text-anchor="middle" fill="#f0f0f5" font-size="42" font-weight="700">1 . 4 . 2</text>

    <g>
      <path d="M 145 55 L 145 100" stroke="#ef4444" stroke-width="2"/>
      <text x="145" y="120" text-anchor="middle" fill="#ef4444" font-family="Inter" font-size="13" font-weight="700">MAJOR</text>
      <text x="145" y="140" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="11">quebra compat.</text>
      <text x="145" y="158" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="11">1.x → 2.x</text>
    </g>

    <g>
      <path d="M 240 55 L 240 100" stroke="#fbbf24" stroke-width="2"/>
      <text x="240" y="120" text-anchor="middle" fill="#fbbf24" font-family="Inter" font-size="13" font-weight="700">MINOR</text>
      <text x="240" y="140" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="11">features novas</text>
      <text x="240" y="158" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="11">compatível</text>
    </g>

    <g>
      <path d="M 335 55 L 335 100" stroke="#4ade80" stroke-width="2"/>
      <text x="335" y="120" text-anchor="middle" fill="#4ade80" font-family="Inter" font-size="13" font-weight="700">PATCH</text>
      <text x="335" y="140" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="11">correções</text>
      <text x="335" y="158" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="11">de bugs</text>
    </g>

    <text x="250" y="210" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="13">"Semantic Versioning" — a versão comunica o que mudou</text>
  </svg>`,

  test_assert: `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <g>
      <rect x="60" y="50" width="180" height="120" rx="8" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <text x="150" y="75" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">TESTE PASSA</text>
      <text x="150" y="110" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="13">assert 1+1 == 2</text>
      <text x="150" y="145" text-anchor="middle" fill="#4ade80" font-size="26">✓</text>
    </g>
    <g>
      <rect x="260" y="50" width="180" height="120" rx="8" fill="#1c1c25" stroke="#ef4444" stroke-width="2"/>
      <text x="350" y="75" text-anchor="middle" fill="#ef4444" font-size="13" font-weight="700">TESTE FALHA</text>
      <text x="350" y="110" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="13">assert 1+1 == 3</text>
      <text x="350" y="145" text-anchor="middle" fill="#ef4444" font-size="26">✗</text>
    </g>
    <text x="250" y="200" text-anchor="middle" fill="#a0a0aa" font-size="13">assert = "isso é verdade?" — se não for, o teste falha</text>
  </svg>`,

  /* ==== Unidade 6 ==== */

  orm: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <g>
      <text x="120" y="30" text-anchor="middle" fill="#7c9cff" font-size="13" font-weight="700">OBJETO (Python)</text>
      <rect x="30" y="50" width="180" height="150" rx="8" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="45" y="80" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">class User:</text>
      <text x="60" y="105" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="11">id: int</text>
      <text x="60" y="125" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="11">username: str</text>
      <text x="60" y="145" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="11">email: str</text>
      <text x="60" y="175" fill="#4ade80" font-family="JetBrains Mono, monospace" font-size="11">u = User(...)</text>
    </g>

    <g>
      <text x="250" y="115" text-anchor="middle" fill="#4ade80" font-family="JetBrains Mono, monospace" font-size="24" font-weight="700">↔</text>
      <text x="250" y="135" text-anchor="middle" fill="#4ade80" font-family="Inter" font-size="11" font-weight="600">ORM</text>
    </g>

    <g>
      <text x="380" y="30" text-anchor="middle" fill="#fbbf24" font-size="13" font-weight="700">TABELA (banco)</text>
      <rect x="290" y="50" width="180" height="150" rx="8" fill="#1c1c25" stroke="#fbbf24" stroke-width="2"/>
      <text x="380" y="80" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">users</text>
      <line x1="300" y1="90" x2="460" y2="90" stroke="#262631"/>
      <text x="305" y="112" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="11">id | username | email</text>
      <line x1="300" y1="125" x2="460" y2="125" stroke="#262631"/>
      <text x="305" y="147" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="11">1  | ana      | a@x</text>
      <text x="305" y="167" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="11">2  | bob      | b@x</text>
    </g>
  </svg>`,

  entidades: `<svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <g>
      <rect x="30" y="40" width="130" height="70" rx="8" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="95" y="70" text-anchor="middle" fill="#7c9cff" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">User</text>
      <text x="95" y="90" text-anchor="middle" fill="#a0a0aa" font-size="11">quem usa</text>
    </g>

    <g>
      <rect x="340" y="40" width="130" height="70" rx="8" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="405" y="70" text-anchor="middle" fill="#7c9cff" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700">Project</text>
      <text x="405" y="90" text-anchor="middle" fill="#a0a0aa" font-size="11">o que é feito</text>
    </g>

    <g>
      <rect x="180" y="140" width="140" height="60" rx="8" fill="#1c1c25" stroke="#fbbf24" stroke-width="2"/>
      <text x="250" y="163" text-anchor="middle" fill="#fbbf24" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700">ProjectMember</text>
      <text x="250" y="183" text-anchor="middle" fill="#a0a0aa" font-size="10">quem participa</text>
    </g>

    <g>
      <rect x="340" y="200" width="130" height="50" rx="8" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <text x="405" y="221" text-anchor="middle" fill="#4ade80" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700">Task</text>
      <text x="405" y="238" text-anchor="middle" fill="#a0a0aa" font-size="10">o que fazer</text>
    </g>

    <!-- Linhas de relacionamento -->
    <line x1="160" y1="75" x2="180" y2="160" stroke="#a0a0aa" stroke-width="1.5"/>
    <line x1="340" y1="75" x2="320" y2="160" stroke="#a0a0aa" stroke-width="1.5"/>
    <line x1="405" y1="110" x2="405" y2="200" stroke="#a0a0aa" stroke-width="1.5"/>
    <line x1="160" y1="75" x2="340" y2="225" stroke="#a0a0aa" stroke-width="1" stroke-dasharray="3,3"/>
  </svg>`,

  onemany: `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <text x="250" y="25" text-anchor="middle" fill="#f0f0f5" font-size="15" font-weight="600">1 : N (um para muitos)</text>

    <g>
      <rect x="40" y="70" width="100" height="60" rx="6" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="90" y="95" text-anchor="middle" fill="#7c9cff" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700">Project</text>
      <text x="90" y="115" text-anchor="middle" fill="#a0a0aa" font-size="11">1</text>
    </g>

    <line x1="145" y1="100" x2="330" y2="60" stroke="#a0a0aa" stroke-width="1.5" marker-end="url(#oa)"/>
    <line x1="145" y1="100" x2="330" y2="100" stroke="#a0a0aa" stroke-width="1.5" marker-end="url(#oa)"/>
    <line x1="145" y1="100" x2="330" y2="140" stroke="#a0a0aa" stroke-width="1.5" marker-end="url(#oa)"/>

    <g>
      <rect x="330" y="40" width="130" height="40" rx="6" fill="#1c1c25" stroke="#4ade80"/>
      <text x="395" y="65" text-anchor="middle" fill="#4ade80" font-family="JetBrains Mono, monospace" font-size="12">Task A</text>
    </g>
    <g>
      <rect x="330" y="85" width="130" height="40" rx="6" fill="#1c1c25" stroke="#4ade80"/>
      <text x="395" y="110" text-anchor="middle" fill="#4ade80" font-family="JetBrains Mono, monospace" font-size="12">Task B</text>
    </g>
    <g>
      <rect x="330" y="130" width="130" height="40" rx="6" fill="#1c1c25" stroke="#4ade80"/>
      <text x="395" y="155" text-anchor="middle" fill="#4ade80" font-family="JetBrains Mono, monospace" font-size="12">Task C</text>
    </g>

    <defs><marker id="oa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#a0a0aa"/></marker></defs>

    <text x="250" y="190" text-anchor="middle" fill="#a0a0aa" font-size="12">1 projeto pode ter muitas tarefas; cada tarefa pertence a 1 projeto</text>
  </svg>`,

  createdVsAssigned: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <g>
      <rect x="180" y="30" width="140" height="60" rx="8" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <text x="250" y="55" text-anchor="middle" fill="#4ade80" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700">Task</text>
      <text x="250" y="75" text-anchor="middle" fill="#a0a0aa" font-size="11">"consertar bug"</text>
    </g>

    <!-- created_by -->
    <path d="M 200 90 L 100 170" stroke="#7c9cff" stroke-width="2" marker-end="url(#ca)"/>
    <text x="130" y="130" fill="#7c9cff" font-family="JetBrains Mono, monospace" font-size="11">created_by</text>
    <text x="130" y="145" fill="#a0a0aa" font-size="10">obrigatório</text>

    <g>
      <rect x="30" y="170" width="140" height="60" rx="8" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="100" y="195" text-anchor="middle" fill="#7c9cff" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700">Ana</text>
      <text x="100" y="215" text-anchor="middle" fill="#a0a0aa" font-size="10">quem CRIOU</text>
    </g>

    <!-- assigned_to -->
    <path d="M 300 90 L 400 170" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4,3" marker-end="url(#ca2)"/>
    <text x="380" y="130" fill="#fbbf24" font-family="JetBrains Mono, monospace" font-size="11">assigned_to</text>
    <text x="395" y="145" fill="#a0a0aa" font-size="10">opcional</text>

    <g>
      <rect x="330" y="170" width="140" height="60" rx="8" fill="#1c1c25" stroke="#fbbf24" stroke-width="2"/>
      <text x="400" y="195" text-anchor="middle" fill="#fbbf24" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700">Carlos</text>
      <text x="400" y="215" text-anchor="middle" fill="#a0a0aa" font-size="10">quem FAZ agora</text>
    </g>

    <defs>
      <marker id="ca" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7c9cff"/></marker>
      <marker id="ca2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#fbbf24"/></marker>
    </defs>
  </svg>`,

  cascade: `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <!-- Pai -->
    <g>
      <rect x="180" y="30" width="140" height="50" rx="6" fill="#1c1c25" stroke="#ef4444" stroke-width="2"/>
      <text x="250" y="60" text-anchor="middle" fill="#ef4444" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700">Project X</text>
      <text x="330" y="55" fill="#ef4444" font-size="20">×</text>
    </g>

    <!-- Setas -->
    <line x1="230" y1="82" x2="150" y2="130" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3"/>
    <line x1="250" y1="82" x2="250" y2="130" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3"/>
    <line x1="270" y1="82" x2="350" y2="130" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3"/>

    <!-- Filhos deletados -->
    <g opacity="0.4">
      <rect x="80" y="130" width="140" height="40" rx="6" fill="#1c1c25" stroke="#a0a0aa"/>
      <text x="150" y="155" text-anchor="middle" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="12">Task 1 ×</text>
    </g>
    <g opacity="0.4">
      <rect x="180" y="130" width="140" height="40" rx="6" fill="#1c1c25" stroke="#a0a0aa"/>
      <text x="250" y="155" text-anchor="middle" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="12">Task 2 ×</text>
    </g>
    <g opacity="0.4">
      <rect x="280" y="130" width="140" height="40" rx="6" fill="#1c1c25" stroke="#a0a0aa"/>
      <text x="350" y="155" text-anchor="middle" fill="#a0a0aa" font-family="JetBrains Mono, monospace" font-size="12">Task 3 ×</text>
    </g>

    <text x="250" y="200" text-anchor="middle" fill="#a0a0aa" font-size="12">cascade="all, delete-orphan" — apagar o pai apaga os filhos junto</text>
  </svg>`,

  taskflow: `<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <!-- Backend -->
    <g>
      <rect x="30" y="60" width="170" height="120" rx="10" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="115" y="90" text-anchor="middle" fill="#7c9cff" font-size="14" font-weight="700">Backend</text>
      <text x="115" y="110" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">Flask</text>
      <text x="115" y="130" text-anchor="middle" fill="#a0a0aa" font-size="11">API REST</text>
      <text x="115" y="155" text-anchor="middle" fill="#a0a0aa" font-size="11">+ banco de dados</text>
    </g>

    <!-- Setas -->
    <path d="M 210 105 L 290 105" stroke="#a0a0aa" stroke-width="2" marker-end="url(#tf)"/>
    <path d="M 290 145 L 210 145" stroke="#a0a0aa" stroke-width="2" marker-end="url(#tf)"/>
    <text x="250" y="98" text-anchor="middle" fill="#a0a0aa" font-size="10">JSON</text>
    <text x="250" y="160" text-anchor="middle" fill="#a0a0aa" font-size="10">HTTP</text>

    <!-- Frontend -->
    <g>
      <rect x="300" y="60" width="170" height="120" rx="10" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <text x="385" y="90" text-anchor="middle" fill="#4ade80" font-size="14" font-weight="700">Frontend</text>
      <text x="385" y="110" text-anchor="middle" fill="#f0f0f5" font-family="JetBrains Mono, monospace" font-size="12">Vue 3</text>
      <text x="385" y="130" text-anchor="middle" fill="#a0a0aa" font-size="11">interface</text>
      <text x="385" y="155" text-anchor="middle" fill="#a0a0aa" font-size="11">quadro Kanban</text>
    </g>

    <defs><marker id="tf" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#a0a0aa"/></marker></defs>

    <text x="250" y="215" text-anchor="middle" fill="#f0f0f5" font-size="13" font-weight="600">TaskFlow — plataforma de gestão de projetos</text>
  </svg>`,

  backPop: `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
    <g>
      <rect x="40" y="70" width="150" height="80" rx="8" fill="#1c1c25" stroke="#7c9cff" stroke-width="2"/>
      <text x="115" y="100" text-anchor="middle" fill="#7c9cff" font-size="13" font-weight="700">Project</text>
      <text x="115" y="125" text-anchor="middle" fill="#a0a0aa" font-size="10">.tasks</text>
      <text x="115" y="140" text-anchor="middle" fill="#a0a0aa" font-size="10">= [Task, Task, ...]</text>
    </g>

    <path d="M 195 100 L 305 100" stroke="#7c9cff" stroke-width="2" marker-end="url(#bp1)"/>
    <path d="M 305 130 L 195 130" stroke="#4ade80" stroke-width="2" marker-end="url(#bp2)"/>

    <g>
      <rect x="310" y="70" width="150" height="80" rx="8" fill="#1c1c25" stroke="#4ade80" stroke-width="2"/>
      <text x="385" y="100" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">Task</text>
      <text x="385" y="125" text-anchor="middle" fill="#a0a0aa" font-size="10">.project</text>
      <text x="385" y="140" text-anchor="middle" fill="#a0a0aa" font-size="10">= Project</text>
    </g>

    <defs>
      <marker id="bp1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7c9cff"/></marker>
      <marker id="bp2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4ade80"/></marker>
    </defs>

    <text x="250" y="190" text-anchor="middle" fill="#a0a0aa" font-family="Inter" font-size="13">back_populates="tasks" ↔ back_populates="project"</text>
  </svg>`,

};


/* =========================================================
   AULAS — cada slide tem: title, illustration, body, notes
   ========================================================= */

const LESSONS = {

  /* ============ UNIDADE 1 — PYTHON ============ */
  u1: {
    title: 'Python básico',
    slides: [
      { type:'title', kicker:'Unidade 1', title:'Python do zero',
        body:'Antes de web, framework, servidor — a linguagem. Aqui você vai entender variáveis, funções, classes e as armadilhas que pegam quem começa.' },

      { title:'O que é uma variável?', illustration: SVG.variavel,
        body:'É uma <strong>etiqueta que você cola em um valor</strong>. Depois, quando você diz o nome da etiqueta, o Python vai buscar o que ela guarda.' },

      { title:'Como criar',
        body:'Escolha um nome, use <code>=</code>, escreva o valor. O Python descobre o tipo sozinho.',
        code:`idade = 25
nome = "João"
altura = 1.78
ativo = True`,
        note:'Não precisa dizer "isso é um número" ou "isso é texto". O Python olha e entende.' },

      { title:'A armadilha mais comum: <code>=</code> vs <code>==</code>', illustration: SVG.equalsVsCompare,
        body:'Um sinal <strong>cola</strong> a etiqueta. Dois sinais <strong>perguntam</strong> se é igual.',
        note:'Trocar isso num <code>if</code> gera erro de sintaxe. Grave: um <code>=</code> atribui, dois <code>==</code> comparam.' },

      { title:'Os 4 tipos que você mais vai usar', illustration: SVG.tipos,
        body:'<strong>int</strong> (número inteiro), <strong>float</strong> (decimal), <strong>str</strong> (texto entre aspas), <strong>bool</strong> (True ou False).',
        code:`idade = 25              # int
altura = 1.78           # float
nome = "Ana"            # str  — pode usar aspas simples também: 'Ana'
ativo = True            # bool — só True ou False, com T e F maiúsculo

# você pode descobrir o tipo com type():
print(type(idade))      # <class 'int'>
print(type(altura))     # <class 'float'>`,
        note:'Truque útil: <code>type(x)</code> te mostra o tipo de qualquer valor — bom pra debugar quando algo dá errado sem motivo aparente.' },

      { title:'Operadores',
        body:'Os básicos são iguais aos da matemática. Prestar atenção em dois:',
        code:`a + b       # soma
a - b       # subtração
a * b       # multiplicação
a / b       # divisão real (sempre retorna float)
a // b      # divisão inteira (arredonda pra baixo)
a % b       # resto da divisão
a ** b      # potência (2 ** 10 = 1024)`,
        note:'<code>10 / 2</code> dá <code>5.0</code>, não <code>5</code>. Se quer inteiro, use <code>//</code>.' },

      { title:'Ordem de precedência', illustration: SVG.precedencia,
        body:'Do topo pra baixo: parênteses primeiro, depois potência, depois multi/div, por último soma/sub.',
        note:'Exemplo: <code>10 + 3 * 4 ** 2</code> = <code>10 + 3 * 16</code> = <code>10 + 48</code> = <strong>58</strong>.' },

      { title:'O que é uma função?', illustration: SVG.funcao,
        body:'Uma <strong>caixa mágica</strong>. Você joga alguma coisa dentro (entrada), ela processa e devolve alguma coisa (saída).' },

      { title:'Criando função',
        body:'Palavra <code>def</code>, nome, parênteses, dois pontos. Corpo indentado com 4 espaços.',
        code:`def soma(x, y):
    return x + y

resultado = soma(3, 7)   # 10`,
        note:'Sem <code>return</code>, a função devolve <code>None</code> — parece que não devolveu nada, mas devolveu.' },

      { title:'Valor padrão de parâmetro',
        body:'Se o valor não for passado, usa o padrão.',
        code:`def saudacao(nome, horario="dia"):
    return f"Bom {horario}, {nome}!"

saudacao("Ana")            # "Bom dia, Ana!"
saudacao("Ana", "noite")   # "Bom noite, Ana!"`,
        note:'Parâmetros com padrão vêm <strong>depois</strong> dos sem padrão. Nunca ao contrário.' },

      { title:'O problema que <code>*args</code> resolve',
        body:'Suponha que você quer uma função que <strong>some qualquer quantidade</strong> de números. Sem <code>*args</code>, você teria que criar uma versão pra cada caso:',
        code:`def soma_dois(a, b):
    return a + b

def soma_tres(a, b, c):
    return a + b + c

def soma_quatro(a, b, c, d):
    return a + b + c + d

# ... e se forem 10 números? 100?`,
        note:'Isso é chato e não escala. Precisamos de uma forma de aceitar <strong>qualquer quantidade</strong> de argumentos.' },

      { title:'<code>*args</code> — argumentos posicionais variáveis',
        body:'Adicione <code>*</code> antes do nome do parâmetro. Todos os argumentos posicionais viram uma <strong>tupla</strong> dentro da função.',
        code:`def soma(*numeros):
    print(numeros)          # é uma tupla
    total = 0
    for n in numeros:
        total += n
    return total

soma(1, 2)            # numeros = (1, 2)         → 3
soma(1, 2, 3)         # numeros = (1, 2, 3)      → 6
soma(1, 2, 3, 4, 5)   # numeros = (1,2,3,4,5)    → 15
soma()                # numeros = ()              → 0`,
        note:'O nome não precisa ser "args". Poderia ser <code>*numeros</code>, <code>*coisas</code>, <code>*x</code>. O que importa é o <code>*</code>.' },

      { title:'<code>**kwargs</code> — argumentos NOMEADOS variáveis', illustration: SVG.argsKwargs,
        body:'Mesma ideia, mas para argumentos com <strong>nome</strong> (<code>chave=valor</code>). Adicione <code>**</code>. Vira um <strong>dicionário</strong>.',
        code:`def criar_usuario(**dados):
    print(dados)         # é um dict

criar_usuario(nome="Ana", idade=28)
# dados = {'nome': 'Ana', 'idade': 28}

criar_usuario(nome="Bob", cidade="SP", ativo=True)
# dados = {'nome': 'Bob', 'cidade': 'SP', 'ativo': True}`,
        note:'"kwargs" vem de <em>keyword arguments</em> — argumentos com palavra-chave.' },

      { title:'Combinando os dois',
        body:'Você pode ter <strong>parâmetros normais + <code>*args</code> + <code>**kwargs</code></strong> na mesma função. A ordem é sempre essa:',
        code:`def log(mensagem, *args, **kwargs):
    print(f"MSG: {mensagem}")
    print(f"extras posicionais: {args}")
    print(f"extras nomeados:   {kwargs}")

log("Erro", 500, "timeout", severidade="alta", origem="db")
# MSG: Erro
# extras posicionais: (500, 'timeout')
# extras nomeados:   {'severidade': 'alta', 'origem': 'db'}`,
        note:'Você vai ver essa combinação MUITO em decorators: <code>def wrapper(*args, **kwargs): return func(*args, **kwargs)</code>. É como o wrapper "passa adiante" tudo que recebe, sem se importar com o formato.' },

      { title:'<code>if __name__ == "__main__":</code>', illustration: SVG.mainBlock,
        body:'Duas portas: se você <strong>roda o arquivo direto</strong>, o bloco executa. Se alguém <strong>importa</strong> o arquivo, o bloco não executa.',
        note:'Serve pra que o mesmo arquivo funcione como programa (execute algo) e como biblioteca (só empresta funções).' },

      { title:'Lista', illustration: SVG.lista,
        body:'Uma sequência de valores, ordenada, com índices numéricos. Você pode adicionar, remover, trocar.',
        code:`notas = [8.5, 7.0, 9.2]
notas.append(10)        # [8.5, 7.0, 9.2, 10]
notas[0]                # 8.5
notas[-1]               # 10 (último)
notas[0:2]              # [8.5, 7.0] (fatia)`, },

      { title:'Tupla', illustration: SVG.tupla,
        body:'Uma lista <strong>imutável</strong>. Depois de criada, não muda mais.',
        code:`ponto = (3, 4)
x, y = ponto           # desempacota: x=3, y=4

# atenção: o que faz a tupla é a vírgula
tupla_de_um = (42,)    # tupla! (vírgula obrigatória)
so_um_int  = (42)     # NÃO é tupla, é só o int 42`,
        note:'Tuplas servem quando você quer garantir que ninguém vai bagunçar os dados.' },

      { title:'Dicionário', illustration: SVG.dicionario,
        body:'Guarda pares <strong>chave → valor</strong>. Você acessa pela chave, não pela posição.',
        code:`pessoa = {"nome": "Ana", "idade": 28}
pessoa["nome"]                  # "Ana"
pessoa["altura"] = 1.65         # adiciona
pessoa.get("email", "sem")      # "sem" (default se não existir)`,
        note:'Desde Python 3.7 o dicionário <strong>preserva a ordem de inserção</strong>.' },

      { title:'Set (conjunto)', illustration: SVG.set,
        body:'Coleção <strong>sem ordem e sem duplicatas</strong>. Ideal pra remover repetidos ou fazer operações de conjunto.',
        code:`frutas = {"maca", "banana", "maca"}
# {"maca", "banana"} — duplicata some

a = {1, 2, 3}
b = {2, 3, 4}
a | b        # união:      {1,2,3,4}
a & b        # interseção: {2,3}
a - b        # diferença:  {1}`, },

      { title:'Classe = o molde', illustration: SVG.classe,
        body:'Uma classe é o <strong>molde</strong>. Uma instância é o <strong>objeto</strong> criado a partir do molde.',
        code:`class Produto:
    def __init__(self, nome, preco):
        self.nome = nome
        self.preco = preco

p = Produto("Notebook", 3500.0)
p.nome     # "Notebook"`, },

      { title:'O que é <code>self</code>',
        body:'É o <strong>crachá</strong> que cada instância carrega. Todo método recebe <code>self</code> como primeiro parâmetro — é assim que ele sabe de qual objeto está falando.',
        code:`class Contador:
    def __init__(self):
        self.n = 0

    def incrementar(self):
        self.n += 1    # SEU próprio n, não de outra instância

c1 = Contador()
c2 = Contador()
c1.incrementar()
# c1.n == 1, c2.n == 0`, },

      { title:'Herança', illustration: SVG.heranca,
        body:'Uma classe pode <strong>herdar</strong> de outra: pega tudo dela e acrescenta coisas novas.',
        code:`class Documento:
    def __init__(self, numero, resumo):
        self.numero = numero
        self.resumo = resumo

class OficioCircular(Documento):
    def __init__(self, numero, resumo, destinatarios):
        super().__init__(numero, resumo)   # chama o pai
        self.destinatarios = destinatarios`,
        note:'<code>super()</code> chama o método da classe pai. Sem ele, o pai não seria construído.' },

      { title:'<code>@property</code>', illustration: SVG.propertySlide,
        body:'Faz um método <strong>parecer atributo</strong>. Ótimo pra validar quando o valor é alterado.',
        code:`class Produto:
    def __init__(self, preco):
        self.preco = preco   # chama o setter

    @property
    def preco(self):
        return self._preco

    @preco.setter
    def preco(self, valor):
        if valor <= 0:
            raise ValueError("preço deve ser positivo")
        self._preco = valor

p = Produto(100)
p.preco = 200      # OK
p.preco = -5       # ValueError`, },

      { title:'<code>@classmethod</code> vs <code>@staticmethod</code>',
        body:'Duas variações de método:',
        code:`class Contador:
    total = 0

    def __init__(self):
        Contador.total += 1

    @classmethod                  # recebe a classe (cls)
    def quantos(cls):
        return cls.total

    @staticmethod                 # não recebe nem self nem cls
    def mensagem():
        return "Sistema online"`,
        note:'<strong>@classmethod</strong>: quando o método mexe com a classe inteira. <strong>@staticmethod</strong>: função comum que "mora" na classe por organização.' },

      { title:'Decorator = sanduíche', illustration: SVG.decorator,
        body:'Um decorator é uma <strong>função que envelopa outra função</strong>. Executa algo antes, chama a original, executa algo depois.',
        code:`def registrar(func):
    def wrapper(*args, **kwargs):
        print(f"chamando {func.__name__}")
        resultado = func(*args, **kwargs)
        print(f"terminou {func.__name__}")
        return resultado
    return wrapper

@registrar
def soma(a, b):
    return a + b

soma(2, 3)
# chamando soma
# terminou soma`,
        note:'<code>@registrar</code> em cima de <code>soma</code> é o mesmo que <code>soma = registrar(soma)</code>. É a base do <code>@app.route</code> do Flask.' },

      { title:'Duck Typing', illustration: SVG.duckTyping,
        body:'"Se anda como pato e faz quack, é aceito como pato". Python <strong>não pergunta o tipo do objeto</strong>, só se ele sabe fazer o que você precisa.',
        code:`def fazer_barulho(bicho):
    bicho.quack()

class Pato:
    def quack(self): print("Quack!")

class Cachorro:
    def quack(self): print("(latido, mas quack)")

fazer_barulho(Pato())       # ok
fazer_barulho(Cachorro())   # ok — o Python nem liga que não é pato`, },

      { title:'Fim da Unidade 1',
        body:'Você viu variáveis, tipos, operadores, funções, listas/tuplas/dicts/sets, classes, herança, decorators. É a base pra tudo que vem.',
        note:'Vá para a página <strong>Questões</strong> e faça os exercícios da Unidade 1. Cada um tem "ver solução comentada".' }
    ]
  },

  /* ============ UNIDADE 2 — HTTP e REST ============ */
  u2: {
    title: 'HTTP, APIs e REST',
    slides: [
      { type:'title', kicker:'Unidade 2', title:'HTTP, APIs e REST',
        body:'Antes de framework, o protocolo. O que acontece exatamente quando você digita um endereço no navegador?' },

      { title:'O que é uma API?', illustration: SVG.api,
        body:'API = <strong>Application Programming Interface</strong>. É um <strong>contrato</strong> entre programas: "se você me pedir assim, eu respondo assim".',
        note:'Você não precisa saber como o programa funciona por dentro. Só como conversar com ele.' },

      { title:'Cliente e servidor', illustration: SVG.clienteServidor,
        body:'Toda comunicação web tem dois lados. O <strong>cliente</strong> pede. O <strong>servidor</strong> responde.',
        note:'Cliente pode ser navegador, app celular, script Python, curl. Servidor é o programa que fica ouvindo pedidos e devolvendo dados.' },

      { title:'HTTP é o "idioma"', illustration: SVG.http,
        body:'HTTP = <strong>HyperText Transfer Protocol</strong>. É como cliente e servidor conversam: uma mensagem pergunta, outra responde.',
        note:'Toda página que você abre, toda API que você chama — é HTTP por baixo dos panos.' },

      { title:'Requisição HTTP', illustration: SVG.reqEnvelope,
        body:'A mensagem que o cliente manda tem: <strong>método + endereço + versão</strong>, cabeçalhos, e às vezes um corpo.',
        code:`GET /api/users/42 HTTP/1.1
Host: localhost:8000
Accept: application/json` },

      { title:'Resposta HTTP',
        body:'A resposta tem: <strong>versão + código de status + mensagem</strong>, cabeçalhos, linha em branco, corpo.',
        code:`HTTP/1.1 200 OK
Content-Type: application/json

{"id": 42, "name": "Alice"}`,
        note:'Linha em branco separa cabeçalhos do corpo. Isso importa quando você constrói a resposta na mão.' },

      { title:'Métodos HTTP', illustration: SVG.restMetodos,
        body:'São os <strong>verbos</strong> da requisição. Não descrevem o que o servidor <em>faz</em>, mas a <strong>intenção</strong> do cliente sobre o recurso.',
        html:`<table class="slide-table">
          <tr><th>Verbo</th><th>Intenção</th><th>Idempotente?</th></tr>
          <tr><td><code>GET</code></td><td>Ler / obter uma representação</td><td>Sim (repetir dá mesmo resultado)</td></tr>
          <tr><td><code>POST</code></td><td>Criar recurso subordinado / processar dados</td><td>Não (repetir cria vários)</td></tr>
          <tr><td><code>PUT</code></td><td>Substituir totalmente o recurso identificado</td><td>Sim</td></tr>
          <tr><td><code>DELETE</code></td><td>Remover o recurso</td><td>Sim</td></tr>
        </table>`,
        note:'"Idempotente" = repetir a chamada não muda o resultado depois da primeira vez. GET puxando <code>/users/42</code> mil vezes retorna a mesma coisa. Mas POST em <code>/users</code> mil vezes cria mil usuários.' },

      { title:'Códigos de status: as 5 classes', illustration: SVG.statusColors,
        body:'O primeiro dígito diz o tipo. Decore só isso e você já sabe interpretar qualquer código novo.',
        note:'Mnemônico: <strong>1-INFO, 2-OK, 3-VAI-PRA-LÁ, 4-VOCÊ-ERROU, 5-EU-ERREI</strong>.' },

      { title:'Os códigos que caem em prova',
        body:'Os que você precisa saber de cor:',
        html: `<table class="slide-table">
          <tr><th>Código</th><th>Significa</th></tr>
          <tr><td><code>200 OK</code></td><td>Deu certo, aqui está o resultado</td></tr>
          <tr><td><code>201 Created</code></td><td>Deu certo e criou um novo recurso</td></tr>
          <tr><td><code>204 No Content</code></td><td>Deu certo, mas sem corpo (típico de DELETE)</td></tr>
          <tr><td><code>400 Bad Request</code></td><td>Sua requisição em si está mal formada</td></tr>
          <tr><td><code>401 Unauthorized</code></td><td>Você precisa autenticar</td></tr>
          <tr><td><code>404 Not Found</code></td><td>O recurso não existe</td></tr>
          <tr><td><code>500 Internal Server Error</code></td><td>O servidor quebrou</td></tr>
        </table>`,
        note:'<strong>Armadilha: 400 ≠ 404.</strong> Pedir <code>/users/abc</code> = 400 (id inválido). Pedir <code>/users/999</code> que não existe = 404.' },

      { title:'O que é REST?',
        body:'REST = <strong>Representational State Transfer</strong>. É um <strong>estilo de arquitetura</strong> — um conjunto de regras sobre como cliente e servidor devem conversar via HTTP.',
        html:`<table class="slide-table">
          <tr><th></th><th>É</th><th>NÃO é</th></tr>
          <tr><td>REST</td><td>Um estilo arquitetural com 6 regras</td><td>Um protocolo, framework ou biblioteca</td></tr>
          <tr><td>HTTP</td><td>O protocolo (o "idioma")</td><td>REST</td></tr>
        </table>`,
        note:'Analogia: HTTP é o idioma português. REST é um <strong>estilo de escrever</strong> (formal, direto, sem gírias). Você pode falar português sem seguir esse estilo, mas seguir facilita entendimento entre falantes.' },

      { title:'As 6 restrições REST',
        body:'O que uma API precisa ter pra ser "RESTful":',
        html: `<ul class="slide-list numbered">
          <li>Cliente-Servidor separados</li>
          <li>Stateless — sem sessão implícita no servidor</li>
          <li>Cache — respostas indicam se podem ser cacheadas</li>
          <li>Interface uniforme — URIs, métodos padronizados</li>
          <li>Sistema em camadas — proxies, gateways transparentes</li>
          <li>Código sob demanda — <strong>opcional</strong> (envio de código para cliente)</li>
        </ul>`,
        note:'Só a 6ª é opcional. As outras 5 são obrigatórias.' },

      { title:'Recurso vs Representação', illustration: SVG.restResource,
        body:'<strong>Recurso</strong> = o conceito (o usuário 42). <strong>Representação</strong> = a forma de transferir (JSON, XML, HTML). <strong>URI</strong> = o endereço do recurso.',
        note:'O mesmo recurso pode ser representado de várias formas. O servidor decide qual mandar (via Content-Type).' },

      { title:'API REST na prática',
        body:'Padrão típico de endpoints:',
        html: `<table class="slide-table">
          <tr><th>Ação</th><th>Verbo</th><th>URI</th><th>Retorno</th></tr>
          <tr><td>Listar usuários</td><td><code>GET</code></td><td><code>/api/users</code></td><td>200 + array</td></tr>
          <tr><td>Ler um</td><td><code>GET</code></td><td><code>/api/users/1</code></td><td>200 + objeto</td></tr>
          <tr><td>Criar</td><td><code>POST</code></td><td><code>/api/users</code></td><td>201 + Location</td></tr>
          <tr><td>Substituir</td><td><code>PUT</code></td><td><code>/api/users/1</code></td><td>200</td></tr>
          <tr><td>Remover</td><td><code>DELETE</code></td><td><code>/api/users/1</code></td><td>204</td></tr>
        </table>` },

      { title:'Fim da Unidade 2',
        body:'Você agora sabe: como cliente e servidor conversam (HTTP), o que significam os códigos, os métodos e o que REST propõe.',
        note:'Vá para <strong>Questões</strong> e responda as 7 perguntas conceituais do desafio da Unidade 2.' }
    ]
  },

  /* ============ UNIDADE 3 — FLASK ============ */
  u3: {
    title: 'Flask e Blueprints',
    slides: [
      { type:'title', kicker:'Unidade 3', title:'Flask — sua primeira aplicação',
        body:'Agora com HTTP entendido, o Flask parece bem menos mágico. Você vai ver que ele só automatiza o que a Unidade 2 explicou.' },

      { title:'O que é um framework?', illustration: SVG.framework,
        body:'Um <strong>esqueleto pronto</strong>. Vem com as peças chatas resolvidas (roteamento, HTTP, templates). Você só encaixa a sua lógica de negócio.',
        note:'<strong>Biblioteca vs framework:</strong> na biblioteca <em>você</em> chama o código dela quando precisa. No framework, é o contrário — <em>ele</em> chama seu código quando uma requisição chega. Isso é conhecido como "Inversão de Controle".' },

      { title:'Flask é "micro"',
        body:'"Micro" não significa "pequeno demais". Significa <strong>núcleo enxuto</strong>: só o essencial. Você escolhe o resto (banco, autenticação, forms).',
        note:'Django é o oposto: já vem com tudo. Flask te dá liberdade — e responsabilidade.' },

      { title:'As 5 dependências do Flask',
        body:'Quando você instala Flask, ele traz 5 amigos junto:',
        html: `<table class="slide-table">
          <tr><td><code>Werkzeug</code></td><td>WSGI, roteamento de URL, debugger</td></tr>
          <tr><td><code>Jinja2</code></td><td>Templates HTML com escape automático</td></tr>
          <tr><td><code>Click</code></td><td>CLI (comando <code>flask run</code>)</td></tr>
          <tr><td><code>ItsDangerous</code></td><td>Assinatura de cookies de sessão</td></tr>
          <tr><td><code>Blinker</code></td><td>Sinais (eventos do ciclo de vida)</td></tr>
        </table>`,
        note:'<strong>SQLAlchemy NÃO é dependência do Flask.</strong> É extensão popular, mas separada.' },

      { title:'Ambiente virtual (venv) — por quê?', illustration: SVG.venv,
        body:'Cada projeto Python fica <strong>isolado</strong>. Assim, projeto A pode usar Flask 3.0 e projeto B pode usar Flask 2.0 sem se atrapalharem.',
        note:'Instalar pacote no Python do sistema é sinônimo de dor de cabeça. Sempre venv.' },

      { title:'Criar e ativar venv',
        body:'',
        code:`# criar
python3 -m venv venv

# ativar — Linux/macOS:
source venv/bin/activate

# ativar — Windows CMD:
venv\\Scripts\\activate.bat

# ativar — Windows PowerShell:
.\\venv\\Scripts\\Activate.ps1

# instalar Flask
pip install flask

# sair
deactivate`,
        note:'Quando ativo, aparece <code>(venv)</code> no início do prompt.' },

      { title:'Primeira aplicação — 5 linhas',
        body:'',
        code:`from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Olá, mundo!"`,
        note:'Rode com <code>flask --app arquivo.py run --debug</code>. Acesse <code>http://127.0.0.1:5000/</code>.' },

      { title:'O que é uma rota?',
        body:'É a <strong>ligação entre uma URL e uma função Python</strong>. Quando alguém acessa <code>/</code>, Flask chama <code>index()</code>.',
        code:`@app.route("/sobre")
def sobre():
    return "Página sobre"

@app.route("/")
@app.route("/index")     # múltiplas URLs para a mesma função
def home():
    return "Home"` },

      { title:'Rotas dinâmicas',
        body:'Parte da URL entre <code>&lt;...&gt;</code> vira <strong>variável</strong> que a função recebe.',
        code:`@app.route("/user/<name>")
def user(name):
    return f"Olá, {name}!"

# acessando /user/Ana → "Olá, Ana!"`,
        note:'Você pode restringir o tipo: <code>&lt;int:id&gt;</code>, <code>&lt;float:x&gt;</code>, <code>&lt;path:p&gt;</code> (aceita "/"), <code>&lt;uuid:u&gt;</code>.' },

      { title:'O que é um Blueprint?', illustration: SVG.blueprint,
        body:'Um <strong>módulo isolado de rotas</strong>. Em vez de 500 rotas no <code>app.py</code>, você divide por assunto: <code>auth</code>, <code>api</code>, <code>admin</code>. Cada um vira um blueprint.',
        html:`<table class="slide-table">
          <tr><th>Sem blueprint</th><th>Com blueprint</th></tr>
          <tr>
            <td><code>app.py</code> com 500 rotas todas juntas — cozinha, quarto e banheiro na mesma sala</td>
            <td>Cada área da aplicação em seu próprio arquivo — separadas mas conectadas ao mesmo app principal</td>
          </tr>
        </table>`,
        note:'Vantagens práticas: seu <code>app.py</code> fica pequeno e legível; a equipe consegue trabalhar em módulos diferentes sem dar conflito no git; e você pode reaproveitar um blueprint em outro projeto.' },

      { title:'Blueprint na prática',
        body:'',
        code:`# calculadora/rotas.py
from flask import Blueprint, jsonify

calc_bp = Blueprint('calculadora', __name__)

@calc_bp.route('/soma/<int:a>/<int:b>')
def soma(a, b):
    return jsonify({'resultado': a + b})

# app.py
from flask import Flask
from calculadora.rotas import calc_bp

app = Flask(__name__)
app.register_blueprint(calc_bp, url_prefix='/calc')
# rota final: /calc/soma/7/3`,
        note:'Repare em <code>@calc_bp.route</code>, não <code>@app.route</code>.' },

      { title:'Application Factory', illustration: SVG.factory,
        body:'Em vez de criar o <code>app</code> como variável global, você <strong>encapsula a criação dentro de uma função</strong> chamada <code>create_app()</code>.',
        code:`# em vez disto (variável global):
app = Flask(__name__)

# você faz isto (função que constrói):
def create_app():
    app = Flask(__name__)
    app.config.from_object('config.DevConfig')
    app.register_blueprint(auth_bp)
    return app`,
        note:'Assim você pode criar várias versões da aplicação (dev, prod, teste) só chamando <code>create_app("prod")</code>, sem duplicar código. Detalhes profundos disso vêm na Unidade 4.' },

      { title:'Estrutura profissional',
        body:'Padrão típico de projeto Flask:',
        code:`UVV/
├── app.py                  # entry point
├── config.py               # classes de config
├── app/                    # pacote principal
│   ├── __init__.py         # create_app() vive aqui
│   └── main/
│       ├── __init__.py     # cria o Blueprint
│       └── routes.py       # as views
└── venv/                   # (não versionar)`,
        note:'O arquivo <code>__init__.py</code> transforma a pasta em pacote Python.' },

      { title:'Modo debug',
        body:'Ativa duas coisas úteis: <strong>reloader</strong> (reinicia ao salvar) + <strong>debugger</strong> interativo no navegador quando dá erro.',
        code:`# forma moderna:
flask run --debug

# ou variável de ambiente:
export FLASK_DEBUG=1
flask run`,
        note:'<strong>Nunca em produção.</strong> O debugger permite executar código Python remoto no seu servidor — falha de segurança gigante.' },

      { title:'FLASK_APP',
        body:'A variável de ambiente que diz ao Flask <strong>onde está sua aplicação</strong>:',
        code:`# opção 1: arquivo
export FLASK_APP=app.py

# opção 2: com factory
export FLASK_APP="app:create_app('dev')"

# depois:
flask run --debug`,
        note:'Se o arquivo se chama <code>app.py</code> ou <code>wsgi.py</code>, o Flask detecta sozinho.' },

      { title:'Fim da Unidade 3',
        body:'Você viu: venv, o que é Flask, primeira aplicação, rotas, blueprints e a ideia de Application Factory.',
        note:'Vá para <strong>Questões</strong>. As 10 perguntas de múltipla escolha da Unidade 3 estão lá.' }
    ]
  },

  /* ============ UNIDADE 4 — FACTORY & CONTEXTO ============ */
  u4: {
    title: 'Application Factory e Contexto',
    slides: [
      { type:'title', kicker:'Unidade 4', title:'Application Factory & Contexto',
        body:'A parte que separa "hello world" de aplicação profissional. Import circular, injeção de dependência, e os 3 contextos do Flask.' },

      { title:'O problema: import circular', illustration: SVG.importCircular,
        body:'<code>app.py</code> importa as rotas de <code>views.py</code>. Mas <code>views.py</code> importa o <code>app</code>. Deadlock. Nenhum consegue carregar.',
        note:'Erro típico: <code>ImportError: cannot import name \'app\' from partially initialized module</code>.' },

      { title:'A "gambiarra" ruim',
        body:'Solução preguiçosa: <strong>mover o import para o fim do arquivo</strong>. Funciona mecanicamente, mas viola PEP 8 e mascara acoplamento.',
        code:`# app.py (jeito ruim)
from flask import Flask
app = Flask(__name__)

from views import index   # <-- import no fim`,
        note:'É um "code smell". Linter reclama. Mantém o acoplamento ruim, só disfarça.' },

      { title:'Eager vs Lazy — a chave da solução',
        body:'Existem duas formas de o código "acontecer": <strong>eager</strong> (imediato, na hora que o Python lê) e <strong>lazy</strong> (adiado, só quando alguém pede).',
        code:`# EAGER — cria o app assim que o Python lê essa linha
app = Flask(__name__)

# LAZY — não cria nada agora, só define a receita
def create_app():
    return Flask(__name__)
    # o Flask só é criado quando ALGUÉM chamar create_app()`,
        note:'No modo eager, importar o arquivo <strong>já executa</strong> a criação — e é aí que a importação circular explode. No modo lazy, importar o arquivo apenas <em>define</em> a função. A criação real só acontece depois, sob controle.' },

      { title:'Application Factory', illustration: SVG.factory,
        body:'Padrão: criar uma <strong>função</strong> que constrói a app inteira, com config, extensões, blueprints. Chame quando quiser.',
        code:`# app/__init__.py
from flask import Flask

def create_app(config='development'):
    app = Flask(__name__)
    app.config.from_object(f'config.{config.title()}Config')

    from .main import main as main_bp
    app.register_blueprint(main_bp)

    return app` },

      { title:'Injeção de Dependência', illustration: SVG.ioc,
        body:'Antes: as rotas <strong>buscavam</strong> o app. Depois: o app <strong>injeta</strong> ele mesmo nas rotas via parâmetro. Inversão de controle.',
        code:`# views.py — não importa app!
def init_app(app):
    @app.route("/")
    def index():
        return "Olá"

# app.py
from views import init_app

def create_app():
    app = Flask(__name__)
    init_app(app)     # injeta
    return app`, },

      { title:'3 fases do ciclo de vida do Flask', illustration: SVG.contextos,
        body:'Toda aplicação Flask tem 3 momentos distintos. Confundi-los é o erro conceitual mais comum.',
        note:'De fora pra dentro: Setup → Application Context → Request Context.' },

      { title:'Fase 1 — Setup',
        body:'Momento em que o app é <strong>configurado</strong>. Servidor ainda não recebe requisições.',
        code:`app = Flask(__name__)
app.config['SECRET_KEY'] = '...'
app.register_blueprint(auth_bp)
db.init_app(app)

@app.before_request
def antes():
    pass`,
        note:'Aqui você registra rotas, configurações, hooks. Uma vez só, no boot.' },

      { title:'Fase 2 — Application Context',
        body:'Estado ativo que <strong>vincula o código a uma aplicação específica</strong>. Aparece a cada requisição, e também em scripts/CLI/testes.',
        code:`from flask import current_app, g

@app.route("/config")
def ver_config():
    modo = current_app.config['DEBUG']
    g.usuario = "Ana"  # storage temporário
    return str(modo)`,
        note:'<code>current_app</code>: proxy da app ativa. <code>g</code>: caixinha temporária pra guardar coisas durante a requisição.' },

      { title:'Fase 3 — Request Context',
        body:'Camada mais interna. Ativa <strong>a cada requisição HTTP</strong>. Contém os dados do cliente.',
        code:`from flask import request, session

@app.route("/login", methods=["POST"])
def login():
    user = request.json.get("username")
    session["user_id"] = user
    return {"status": "ok"}`,
        note:'<code>request</code>: o que o cliente mandou. <code>session</code>: dicionário assinado que persiste entre requisições via cookie.' },

      { title:'Os 4 proxies do Flask', illustration: SVG.proxies,
        body:'Cada contexto expõe seus objetos. Você usa como se fossem globais, mas cada thread/requisição enxerga o seu próprio.' },

      { title:'Regra de ouro',
        body:'',
        html:`<div class="slide-body" style="font-size:22px;">Todo <strong>Request Context</strong> carrega um <strong>App Context</strong>.<br>Mas nem todo App Context tem um Request Context.</div>
        <table class="slide-table">
          <tr><th>Cenário</th><th>App Context?</th><th>Request Context?</th></tr>
          <tr><td>Usuário acessa uma página no navegador</td><td>✓ sim</td><td>✓ sim</td></tr>
          <tr><td>Script de migração de banco</td><td>✓ sim</td><td>✗ não</td></tr>
          <tr><td>Tarefa cron rodando manutenção</td><td>✓ sim</td><td>✗ não</td></tr>
          <tr><td>Teste unitário automatizado</td><td>✓ sim</td><td>✗ não</td></tr>
          <tr><td>Nenhuma app carregada</td><td>✗ não</td><td>✗ não</td></tr>
        </table>`,
        note:'Cai muito em prova: "todo Request Context tem App Context" → verdadeiro. "Todo App Context tem Request Context" → falso.' },

      { title:'Fora de contexto',
        body:'Se você tentar usar <code>current_app</code> em um script isolado:',
        code:`# script solto:
from flask import current_app
print(current_app.config['DEBUG'])
# RuntimeError: Working outside of application context.`,
        note:'Solução: envolver em <code>with app.app_context():</code> — assim você ativa o contexto manualmente.' },

      { title:'Monólito modular vs microsserviços',
        body:'A Application Factory é padrão de <strong>monólito modular</strong>: um processo só, código organizado em blueprints. <strong>Não</strong> é microsserviço.',
        note:'Docker e Redis não mudam isso. Docker empacota. Redis é cache. Continua monólito. Microsserviço é separação física — processos distintos, deploys independentes.' },

      { title:'Fim da Unidade 4',
        body:'Você viu import circular, Application Factory, injeção de dependência, os 3 contextos e os 4 proxies.',
        note:'Última etapa: 11 questões de múltipla escolha na aba <strong>Questões</strong>.' }
    ]
  },

  /* ============ UNIDADE 5 — EMPACOTAMENTO, DEPS E TESTES ============ */
  u5: {
    title: 'Empacotamento, dependências e testes',
    slides: [
      { type:'title', kicker:'Unidade 5', title:'Empacotamento e testes',
        body:'Como transformar seu projeto Flask num pacote profissional: instalável com <code>pip</code>, com dependências declaradas, tarefas automatizadas e testes que garantem que nada quebrou.' },

      { title:'Script solto vs pacote instalável', illustration: SVG.script_vs_pacote,
        body:'Enquanto seu projeto tem 3 arquivos, rodar direto funciona. Mas quando cresce — outros devs, servidores, testes automatizados, deploy — você precisa que ele vire um <strong>pacote Python instalável</strong>.',
        note:'Vantagens: instala do mesmo jeito em qualquer ambiente, dependências resolvidas automaticamente, dá pra rodar de qualquer pasta.' },

      { title:'Como o Python acha os módulos', illustration: SVG.syspath,
        body:'Quando você faz <code>import taskflow</code>, o Python procura em uma lista de pastas chamada <code>sys.path</code>. Se seu projeto está no <code>site-packages</code> (via pip), pode ser importado de qualquer lugar.',
        code:`import sys
print(sys.path)
# ['', '/usr/lib/python3', '.../site-packages', ...]` },

      { title:'pyproject.toml — o arquivo central',
        body:'Arquivo único que descreve <strong>tudo</strong> sobre o pacote: como compilar, metadados, dependências. Substitui o antigo <code>setup.py</code>.',
        code:`[build-system]
requires = ["setuptools>=70.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "taskflow"
version = "0.1.0"
description = "Plataforma de gestão de projetos"
requires-python = ">=3.10"
dependencies = [
    "Flask>=3.0",
]`,
        note:'Padronizado pelas PEPs 517, 518 e 621. Ferramentas modernas (pip, build, poetry, flit) todas entendem esse formato.' },

      { title:'[build-system] — quem monta o pacote',
        body:'A primeira seção do pyproject define <strong>qual ferramenta</strong> será usada pra construir o pacote.',
        code:`[build-system]
requires = ["setuptools>=70.0", "wheel"]
build-backend = "setuptools.build_meta"`,
        note:'<code>requires</code>: o que precisa pra construir. <code>build-backend</code>: qual motor faz o serviço. Aqui usamos o <code>setuptools</code>, mas poderia ser <code>poetry</code>, <code>flit</code>, <code>hatchling</code>...' },

      { title:'Semantic Versioning (SemVer)', illustration: SVG.semver,
        body:'A versão do seu pacote comunica <em>o que mudou</em>. <strong>MAJOR</strong> quebra compatibilidade. <strong>MINOR</strong> adiciona funcionalidade (compatível). <strong>PATCH</strong> só conserta bugs.',
        note:'Ex: se você depende de <code>Flask&gt;=3.0</code>, uma atualização pra 3.1 é segura (features novas, compatível). Mas 4.0 pode quebrar seu código.' },

      { title:'Dependências normais',
        body:'Bibliotecas que sua aplicação <strong>precisa pra funcionar</strong> em produção. Ficam em <code>[project].dependencies</code>.',
        code:`[project]
dependencies = [
    "Flask>=3.0",
    "flask-sqlalchemy>=3.0",
    "python-dotenv",
]` },

      { title:'Dependências opcionais',
        body:'Extras que só alguns cenários precisam. Ex: ferramentas de dev, ferramentas de teste. Fica em <code>[project.optional-dependencies]</code>.',
        code:`[project.optional-dependencies]
dev = [
    "ipython",
    "black",
    "flake8",
    "invoke",
]
test = [
    "pytest>=8.3",
    "pytest-cov>=5.0",
    "pytest-flask",
]`,
        note:'Assim produção instala só o essencial (aplicação enxuta) e você, dev, instala tudo (com ferramentas).' },

      { title:'pip install -e . (modo editable)', illustration: SVG.editable,
        body:'O <code>-e</code> é <strong>editable install</strong>. Em vez de copiar o código pro site-packages, o pip cria um "atalho" que aponta pro seu projeto. Você edita local, funciona em todo lugar.',
        code:`# instalar em modo editable
pip install -e .

# instalar editable + extras dev e test
pip install -e ".[dev,test]"`,
        note:'Sem <code>-e</code>, qualquer alteração no código exigiria reinstalar o pacote. Com <code>-e</code>, você salva o arquivo e já vale a mudança.' },

      { title:'Invoke — automação de tarefas',
        body:'Você tem comandos que repete o dia inteiro: <code>flask run</code>, <code>pytest</code>, <code>flake8</code>. O <strong>Invoke</strong> deixa você declarar essas tarefas em Python e chamá-las com um comando curto.',
        code:`# tasks.py
from invoke import task

@task
def install(c):
    c.run('pip install -e ".[dev,test]"')

@task
def test(c):
    c.run("pytest -v")

@task
def run(c):
    c.run("flask run")`,
        note:'Depois: <code>invoke install</code>, <code>invoke test</code>, <code>invoke run</code>. Padroniza os comandos entre a equipe.' },

      { title:'Por que testes automatizados?',
        body:'Você escreve o código, roda, funciona. Beleza. Mas amanhã você mexe em outra coisa e sem querer quebra o de ontem — como saber? <strong>Testes automatizados</strong> descobrem antes.',
        note:'Um projeto sem testes é como um checkpoint sem save: qualquer mudança pode destruir o que já funcionava, e você só descobre em produção.' },

      { title:'PyTest — o framework padrão',
        body:'Framework mais popular de testes em Python. Sintaxe simples: escreva funções que começam com <code>test_</code> e use <code>assert</code>.',
        code:`# tests/test_matematica.py
def test_soma():
    assert 1 + 1 == 2

def test_multi():
    assert 3 * 4 == 12`,
        note:'Rode com <code>pytest -v</code>. Ele acha automaticamente todos os arquivos <code>test_*.py</code> e roda cada função.' },

      { title:'O que é <code>assert</code>', illustration: SVG.test_assert,
        body:'É a checagem do teste. <strong>Você afirma que algo é verdade.</strong> Se for, o teste passa silenciosamente. Se não for, o teste falha e o PyTest te mostra o que deu errado.',
        code:`assert 1 + 1 == 2       # passa (silêncio)
assert 1 + 1 == 3       # falha: AssertionError` },

      { title:'Fixtures e conftest.py',
        body:'Uma <strong>fixture</strong> é um objeto que vários testes reutilizam (uma app Flask, uma conexão de banco, um usuário fake). Você declara uma vez em <code>conftest.py</code>, os testes recebem automaticamente.',
        code:`# tests/conftest.py
import pytest
from app import create_app

@pytest.fixture
def app():
    return create_app()

# tests/test_rotas.py — recebe "client" automagicamente
def test_health(client):
    response = client.get("/api/health")
    assert response.status_code == 200`,
        note:'O <code>pytest-flask</code> gera o <code>client</code> a partir da fixture <code>app</code>. Você simula requisições HTTP sem subir servidor de verdade.' },

      { title:'Cobertura de testes',
        body:'Não basta ter testes — tem que testar as partes certas. O <code>pytest-cov</code> mede <strong>quanto do seu código os testes exercitam</strong>.',
        code:`pytest --cov=app

# relatório mostra:
# app/rotas.py       92%  ← muito coberto
# app/services.py    45%  ← precisa de mais testes
# app/models.py      100% ← 100% coberto`,
        note:'Cobertura de 100% não é sinônimo de "sem bugs". Mas cobertura baixa é sinal de problema: você tem código não testado — mudanças ali são cegas.' },

      { title:'Fim da Unidade 5',
        body:'Você viu: como transformar seu projeto em pacote instalável (pyproject.toml), separar dependências (dev/test/prod), automatizar tarefas repetitivas (invoke) e garantir qualidade com testes (pytest).',
        note:'Vá para <strong>Questões</strong> e pratique. Essa unidade é muito prática — codificar reforça 10× mais que ler.' }
    ]
  },

  /* ============ UNIDADE 6 — MODELOS E ORM ============ */
  u6: {
    title: 'Modelos, ORM e persistência',
    slides: [
      { type:'title', kicker:'Unidade 6', title:'Modelos e persistência',
        body:'Chegou a hora do banco de dados. Como transformar entidades do seu domínio (User, Project, Task) em tabelas e vice-versa — sem escrever SQL na mão.' },

      { title:'O projeto: TaskFlow', illustration: SVG.taskflow,
        body:'Nesta unidade construímos o <strong>backend do TaskFlow</strong>: uma plataforma de gestão de projetos (estilo Trello/Taiga). Flask + banco de dados no back; Vue 3 no front (mais adiante).',
        note:'Backend expõe API REST. Frontend consome. Separação clara — a mesma lição da Unidade 2.' },

      { title:'O que é ORM?', illustration: SVG.orm,
        body:'ORM = <strong>Object-Relational Mapping</strong>. É a ponte entre <em>objetos Python</em> (seu código) e <em>tabelas SQL</em> (seu banco). Você trabalha com classes; o ORM traduz pra INSERT/SELECT/UPDATE por baixo.',
        note:'Sem ORM: você escreveria SQL na mão em cada consulta. Com ORM: <code>User.query.filter_by(email="a@x").first()</code> e pronto.' },

      { title:'Correspondência objeto ↔ tabela',
        body:'A correspondência é direta:',
        html:`<table class="slide-table">
          <tr><th>Aplicação Python</th><th>Banco relacional</th></tr>
          <tr><td>Classe <code>User</code></td><td>Tabela <code>users</code></td></tr>
          <tr><td>Atributo <code>username</code></td><td>Coluna <code>username</code></td></tr>
          <tr><td>Atributo <code>id</code></td><td>Chave primária <code>id</code></td></tr>
          <tr><td>Uma instância <code>u = User(...)</code></td><td>Uma linha na tabela</td></tr>
          <tr><td>Relacionamento entre objetos</td><td>Chave estrangeira</td></tr>
        </table>`,
        note:'ORM não elimina o banco relacional. As tabelas, chaves primárias e chaves estrangeiras continuam existindo — só ficam "escondidas" atrás das classes Python.' },

      { title:'Flask-SQLAlchemy',
        body:'É a <strong>extensão</strong> que integra o SQLAlchemy (o ORM Python padrão) ao Flask. Fornece o objeto <code>db</code> que você vai usar em toda a aplicação.',
        code:`# taskflow/ext/db/__init__.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()          # instância global, "vazia"

def init_app(app):
    db.init_app(app)       # liga tardiamente na factory`,
        note:'Lembra do padrão da Unidade 4? Criar o objeto global sem app, e chamar <code>init_app(app)</code> dentro da factory. Mesmo padrão aqui.' },

      { title:'As 4 entidades do TaskFlow', illustration: SVG.entidades,
        body:'O modelo básico tem 4 classes principais: <strong>User</strong> (quem usa), <strong>Project</strong> (o que é feito), <strong>ProjectMember</strong> (quem participa de qual projeto), <strong>Task</strong> (o que fazer).',
        note:'Cada uma vira uma tabela no banco. As setas entre elas viram chaves estrangeiras.' },

      { title:'Relacionamento 1 : N', illustration: SVG.onemany,
        body:'Um projeto pode ter <strong>várias tarefas</strong>. Cada tarefa pertence a <strong>um único projeto</strong>. Isso é uma relação "um para muitos" (1:N).',
        code:`class Task(db.Model):
    project_id = mapped_column(
        db.Integer,
        db.ForeignKey("projects.id"),
        nullable=False
    )`,
        note:'A "chave estrangeira" <code>project_id</code> na tabela Task aponta pro <code>id</code> na tabela Project. É como um número de identidade linkando os dois.' },

      { title:'Um usuário, dois papéis diferentes', illustration: SVG.createdVsAssigned,
        body:'Uma tarefa tem <strong>quem criou</strong> (<code>created_by</code>, obrigatório) e <strong>quem está fazendo</strong> (<code>assigned_to</code>, opcional). São a mesma tabela <code>users</code>, mas semânticas diferentes.',
        code:`class Task(db.Model):
    created_by_id: Mapped[int] = mapped_column(
        db.ForeignKey("users.id"),
        nullable=False    # sempre tem criador
    )
    assigned_to_id: Mapped[Optional[int]] = mapped_column(
        db.ForeignKey("users.id"),
        nullable=True     # pode não ter atribuído
    )`,
        note:'Se Ana criou a tarefa e depois Carlos assumiu, <code>created_by_id</code> continua sendo Ana. O histórico do criador não se perde.' },

      { title:'Anatomia de uma classe modelo',
        body:'Exemplo simplificado do modelo <code>User</code>. Cada atributo Python vira uma coluna do banco.',
        code:`from sqlalchemy.orm import Mapped, mapped_column
from taskflow.ext.db import db

class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        db.Integer, primary_key=True
    )
    username: Mapped[str] = mapped_column(
        db.String(50), nullable=False, index=True
    )
    email: Mapped[str] = mapped_column(
        db.String(255), nullable=False, unique=True
    )
    is_active: Mapped[bool] = mapped_column(
        db.Boolean, default=True
    )`,
        note:'<code>Mapped[int]</code> é a anotação de tipo (dá autocomplete). <code>mapped_column(...)</code> descreve como a coluna se comporta no banco (tipo, tamanho, restrições).' },

      { title:'Atributos importantes de <code>mapped_column</code>',
        body:'Cada opção altera o comportamento da coluna no banco:',
        html:`<table class="slide-table">
          <tr><th>Opção</th><th>Efeito</th></tr>
          <tr><td><code>primary_key=True</code></td><td>Essa coluna é a chave primária (identifica cada linha)</td></tr>
          <tr><td><code>nullable=False</code></td><td>Não pode ser vazio (NOT NULL)</td></tr>
          <tr><td><code>unique=True</code></td><td>Valor único na tabela toda (dois emails iguais → erro)</td></tr>
          <tr><td><code>index=True</code></td><td>Cria índice para busca rápida nessa coluna</td></tr>
          <tr><td><code>default=X</code></td><td>Valor padrão se não passar nada</td></tr>
          <tr><td><code>server_default=db.func.now()</code></td><td>Padrão gerado pelo banco (ex: timestamp atual)</td></tr>
        </table>` },

      { title:'relationship() e back_populates', illustration: SVG.backPop,
        body:'Aqui você define os <strong>relacionamentos entre classes</strong>. <code>back_populates</code> mantém as duas pontas em sincronia — mexer numa reflete na outra automaticamente.',
        code:`class Project(db.Model):
    tasks: Mapped[List["Task"]] = relationship(
        "Task",
        back_populates="project"     # ↕
    )

class Task(db.Model):
    project: Mapped["Project"] = relationship(
        "Project",
        back_populates="tasks"       # ↕
    )

# uso:
projeto.tasks       # lista de Task
tarefa.project      # o Project daquela tarefa`, },

      { title:'cascade — deletar em cascata', illustration: SVG.cascade,
        body:'<code>cascade="all, delete-orphan"</code> diz: "quando o pai for apagado, apaga todos os filhos junto". Evita registros órfãos no banco.',
        code:`class Project(db.Model):
    tasks: Mapped[List["Task"]] = relationship(
        "Task",
        back_populates="project",
        cascade="all, delete-orphan"
    )

# apagar projeto → apaga todas as tasks dele`,
        note:'Sem cascade, apagar um Project deixaria as Tasks apontando pra um ID que não existe mais — bug clássico de integridade referencial.' },

      { title:'db.create_all() — nasce o banco',
        body:'Depois de definir os modelos, você precisa <strong>criar as tabelas de verdade</strong> no banco. Uma vez, no início.',
        code:`# dentro do contexto da app:
with app.app_context():
    db.create_all()

# cria todas as tabelas (users, projects,
# project_members, tasks) baseado nas classes`,
        note:'Ok para dev/protótipo. Em produção, use <strong>Alembic</strong> (via Flask-Migrate) — que faz "migrações" versionadas do esquema.' },

      { title:'flask shell — laboratório interativo',
        body:'Comando que abre um Python interativo <strong>já com o contexto da app carregado</strong>. Você pode importar modelos, criar registros, testar consultas.',
        code:`$ flask --app app.py shell

>>> from taskflow.ext.db import db
>>> from taskflow.auth.models import User

>>> u = User(username="ana", email="a@x.com",
...          full_name="Ana", password_hash="...")
>>> db.session.add(u)
>>> db.session.commit()

>>> User.query.all()
[<User id=1 username='ana' email='a@x.com'>]`,
        note:'Perfeito pra explorar dados, testar relacionamentos, criar dados fake — sem escrever rota nem subir servidor.' },

      { title:'Application Factory + register_models',
        body:'Juntando tudo: a factory carrega config, inicializa o db e chama <code>register_models()</code> pra garantir que todas as classes foram lidas pelo SQLAlchemy.',
        code:`# taskflow/__init__.py
from flask import Flask
from .ext.db import init_app as init_db, register_models

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    init_db(app)              # liga o db à app
    register_models()         # importa todos os models

    return app`,
        note:'Por que <code>register_models()</code>? Porque o SQLAlchemy só "vê" uma tabela quando a classe é importada. Se ninguém importar, o db não conhece.' },

      { title:'Fim da Unidade 6',
        body:'Você viu: o que é ORM, as 4 entidades do TaskFlow, chave primária e estrangeira, relacionamentos 1:N, dois papéis pro mesmo usuário, cascade, flask shell.',
        note:'Vá para <strong>Questões</strong> pra praticar modelagem.' }
    ]
  }
};


/* =========================================================
   QUESTÕES — SÓ AS DOS PDFs ORIGINAIS
   ========================================================= */

/* Cada questão tem:
   type: 'code' (Unidade 1) | 'reflection' (Unidade 2) | 'mcq' (Unidades 3/4)
   ref: identificação original (P.1.1 etc)
   q: enunciado
   opts, correct, explain (mcq)
   solution (code / reflection)
*/

const QUESTOES = {

  /* ============ UNIDADE 1 — EXERCÍCIOS DE CÓDIGO (dos PDFs) ============ */
  u1: [
    // P.1.1 a P.1.36
    { ref:'P.1.1', type:'code',
      q:`Crie três variáveis: <code>produto</code>, <code>preco</code> e <code>quantidade</code>. Atribua valores (ex: "mouse", 89.90, 5) e imprima com f-string algo como: "O produto mouse custa R$89.90 e temos 5 unidades em estoque."`,
      solution:`${py(`produto = "mouse"
preco = 89.90
quantidade = 5

print(f"O produto {produto} custa R\${preco} e temos {quantidade} unidades em estoque.")
# Saída: O produto mouse custa R$89.9 e temos 5 unidades em estoque.`)}
<p><strong>Truque:</strong> use <code>:.2f</code> dentro da f-string para forçar 2 casas decimais: <code>R\${preco:.2f}</code>.</p>` },

    { ref:'P.1.2', type:'code',
      q:`Preveja o resultado das comparações (mentalmente antes de rodar):
      <br>(a) <code>10 == 10</code>
      <br>(b) <code>"python" == "Python"</code>
      <br>(c) <code>3.0 == 3</code>
      <br>(d) <code>True == 1</code>
      <br>(e) <code>True == "True"</code>`,
      solution:`<p><strong>Respostas:</strong></p>
      <p>(a) <code>True</code> — inteiros iguais.</p>
      <p>(b) <code>False</code> — strings com case diferente.</p>
      <p>(c) <code>True</code> — Python compara valor numérico entre int e float.</p>
      <p>(d) <code>True</code> — em Python, <code>True</code> é numericamente 1 e <code>False</code> é 0.</p>
      <p>(e) <code>False</code> — bool comparado com string, tipos incompatíveis.</p>` },

    { ref:'P.1.3', type:'code',
      q:`Escreva uma única linha que troque os valores das variáveis <code>x</code> e <code>y</code> sem usar uma terceira variável auxiliar.`,
      solution:`${py(`x, y = y, x`)}
<p>Python permite <strong>múltipla atribuição via tupla</strong>. O lado direito vira uma tupla implícita, e o lado esquerdo desempacota.</p>` },

    { ref:'P.1.4', type:'code',
      q:`(Bônus) Crie uma variável <code>usuario</code> que receba, em uma única linha de atribuição múltipla, os valores <code>"Wanderson"</code>, <code>30</code>, <code>"Serra"</code>. Depois imprima uma frase usando f-string.`,
      solution:`${py(`nome, idade, cidade = "Wanderson", 30, "Serra"
print(f"{nome} tem {idade} anos e mora em {cidade}.")
# Wanderson tem 30 anos e mora em Serra.`)}` },

    { ref:'P.1.5', type:'code',
      q:`Sem calculadora: qual o resultado de <code>5 + 4 * 3 ** 2</code>?`,
      solution:`<p><strong>Resultado: 41</strong></p>
      <p>Passo a passo (ordem de precedência):</p>
      <ol><li><code>3 ** 2</code> = 9</li>
      <li><code>4 * 9</code> = 36</li>
      <li><code>5 + 36</code> = 41</li></ol>` },

    { ref:'P.1.6', type:'code',
      q:`Qual o resultado de <code>50 // 6</code> e <code>50 % 6</code>? O que cada um significa na prática?`,
      solution:`<p><code>50 // 6</code> = <strong>8</strong> — divisão inteira (quantas vezes 6 cabe em 50).</p>
      <p><code>50 % 6</code> = <strong>2</strong> — resto (o que sobra depois de 6×8=48).</p>
      <p><strong>Prática:</strong> úteis para saber se um número é par (<code>n % 2 == 0</code>), agrupar em lotes, formatar horas/minutos etc.</p>` },

    { ref:'P.1.7', type:'code',
      q:`Escreva uma expressão que use parênteses para forçar que a soma seja feita antes da multiplicação no exemplo <code>5 + 4 * 3 ** 2</code>.`,
      solution:`${py(`(5 + 4) * 3 ** 2   # 9 * 9 = 81`)}
      <p>Parênteses têm prioridade máxima. Você força a ordem que quiser.</p>` },

    { ref:'P.1.8', type:'code',
      q:`Abra seu editor, crie um arquivo <code>python_intro.py</code>, cole o código abaixo, salve e execute com <code>python python_intro.py</code>:
      <pre><code>if __name__ == "__main__":
    print("Olá, mundo!")</code></pre>`,
      solution:`<p>Passos:</p>
      <ol>
        <li>Abra o editor de texto (VS Code, Notepad++...).</li>
        <li>Cole o código e salve como <code>python_intro.py</code>.</li>
        <li>No terminal, navegue até a pasta com <code>cd</code>.</li>
        <li>Execute: <code>python python_intro.py</code>.</li>
      </ol>
      <p><strong>Saída esperada:</strong> <code>Olá, mundo!</code></p>
      <p>Se você importar o arquivo em outro (<code>import python_intro</code>), o print NÃO roda — porque o <code>__name__</code> vira "python_intro", não "__main__".</p>` },

    { ref:'P.1.15', type:'code',
      q:`Escreva uma função <code>eh_par(n: int) -> bool</code> que retorne <code>True</code> se o número for par.`,
      solution:`${py(`def eh_par(n: int) -> bool:
    """Retorna True se n for par."""
    return n % 2 == 0

print(eh_par(4))    # True
print(eh_par(7))    # False`)}
      <p>Um número é par se o resto da divisão por 2 é zero.</p>` },

    { ref:'P.1.16', type:'code',
      q:`Crie <code>contar_vogais(texto: str) -> int</code> que conte vogais (a, e, i, o, u), ignorando maiúsculas/minúsculas.`,
      solution:`${py(`def contar_vogais(texto: str) -> int:
    """Conta vogais no texto, case-insensitive."""
    vogais = "aeiou"
    return sum(1 for c in texto.lower() if c in vogais)

print(contar_vogais("Programação"))   # 4
print(contar_vogais("Python"))        # 1`)}
      <p>Trocamos tudo pra minúsculo com <code>.lower()</code>, depois somamos 1 pra cada caractere que está no conjunto de vogais.</p>` },

    { ref:'P.1.17', type:'code',
      q:`Escreva <code>media_notas(notas: list[float]) -> float</code> que calcule a média. Se a lista estiver vazia, retorne <code>0.0</code>.`,
      solution:`${py(`def media_notas(notas: list[float]) -> float:
    """Média das notas. Retorna 0.0 se vazia."""
    if not notas:
        return 0.0
    return sum(notas) / len(notas)

print(media_notas([8.5, 7.0, 9.2]))   # 8.233...
print(media_notas([]))                # 0.0`)}
      <p><code>not notas</code> é True quando a lista está vazia. Isso evita <code>ZeroDivisionError</code>.</p>` },

    { ref:'P.1.18', type:'code',
      q:`Crie <code>formatar_produto(prod: dict) -> str</code> que receba um dicionário como <code>{"nome": "teclado", "preco": 189.90, "estoque": 42}</code> e retorne: "O produto teclado custa R$189.90 e temos 42 unidades em estoque."`,
      solution:`${py(`def formatar_produto(prod: dict) -> str:
    """Formata dicionário de produto em string legível."""
    return (
        f"O produto {prod['nome']} custa R\${prod['preco']} "
        f"e temos {prod['estoque']} unidades em estoque."
    )

p = {"nome": "teclado", "preco": 189.90, "estoque": 42}
print(formatar_produto(p))`)}
      <p>Acessamos os valores do dict com <code>prod['chave']</code>.</p>` },

    { ref:'P.1.19', type:'code',
      q:`(Bônus) Escreva uma função com <code>**kwargs</code> chamada <code>registrar_log</code> que imprima "Log: [mensagem]" e todos os kwargs extras como <code>chave=valor</code>.`,
      solution:`${py(`def registrar_log(mensagem, **kwargs):
    """Registra um log com detalhes extras."""
    print(f"Log: {mensagem}")
    for chave, valor in kwargs.items():
        print(f"  {chave}={valor}")

registrar_log("Usuário logado", user="Ana", ip="192.168.0.1")
# Log: Usuário logado
#   user=Ana
#   ip=192.168.0.1`)}
      <p><code>**kwargs</code> agrupa todos os argumentos nomeados extras num dict.</p>` },

    { ref:'P.1.21', type:'code',
      q:`Crie uma tupla com 4 elementos sem usar parênteses e faça unpacking em variáveis <code>a</code>, <code>b</code>, <code>*c</code>.`,
      solution:`${py(`t = 10, 20, 30, 40         # tupla sem parênteses
a, b, *c = t
print(a)    # 10
print(b)    # 20
print(c)    # [30, 40]  (o resto vira lista)`)}
      <p>O <code>*c</code> captura o "resto" dos elementos. Sempre vira uma lista, mesmo em unpacking de tupla.</p>` },

    { ref:'P.1.22', type:'code',
      q:`Explique por que <code>x = 99</code> resulta em int enquanto <code>x = 99,</code> resulta em tuple.`,
      solution:`<p>Porque <strong>o que define uma tupla é a vírgula</strong>, não os parênteses.</p>
      ${py(`x = 99
print(type(x))     # <class 'int'>

x = 99,
print(type(x))     # <class 'tuple'>
print(x)           # (99,)`)}
      <p>Isso é uma característica fundamental do Python: <code>a, b = 1, 2</code> funciona porque <code>1, 2</code> é uma tupla implícita.</p>` },

    { ref:'P.1.23', type:'code',
      q:`Escreva uma função que retorne 3 valores sem usar parênteses explícitos no <code>return</code>.`,
      solution:`${py(`def coordenadas():
    return 10, 20, 30      # retorna tupla (10, 20, 30)

x, y, z = coordenadas()
print(x, y, z)   # 10 20 30`)}
      <p>O <code>return</code> devolve automaticamente uma tupla quando você separa por vírgulas.</p>` },

    { ref:'P.1.24', type:'code',
      q:`Crie uma <code>@dataclass(frozen=True)</code> chamada <code>Coordenada</code> com campos <code>lat: float</code> e <code>lon: float</code>.`,
      solution:`${py(`from dataclasses import dataclass

@dataclass(frozen=True)
class Coordenada:
    lat: float
    lon: float

c = Coordenada(-20.15, -40.30)
print(c)          # Coordenada(lat=-20.15, lon=-40.3)
print(c.lat)      # -20.15

# c.lat = 0     # FrozenInstanceError — imutável`)}
      <p><code>@dataclass</code> gera <code>__init__</code>, <code>__repr__</code>, <code>__eq__</code> automaticamente. <code>frozen=True</code> torna a instância imutável.</p>` },

    { ref:'P.1.26', type:'code',
      q:`Crie uma tupla com 5 elementos heterogêneos e faça desempacotamento com <code>*</code>.`,
      solution:`${py(`t = "Ana", 28, 1.65, True, "SP"

nome, *meio, cidade = t
print(nome)     # Ana
print(meio)     # [28, 1.65, True]
print(cidade)   # SP`)}
      <p>O <code>*meio</code> captura tudo entre o primeiro e o último.</p>` },

    { ref:'P.1.27', type:'code',
      q:`Use um dicionário para contar a frequência de palavras em uma frase.`,
      solution:`${py(`frase = "python é bom python é legal python roda em tudo"
contagem = {}

for palavra in frase.split():
    contagem[palavra] = contagem.get(palavra, 0) + 1

print(contagem)
# {'python': 3, 'é': 2, 'bom': 1, 'legal': 1, 'roda': 1, 'em': 1, 'tudo': 1}`)}
      <p><code>.get(chave, 0)</code> retorna 0 se a chave não existir — evita <code>KeyError</code> e simplifica o código.</p>` },

    { ref:'P.1.28', type:'code',
      q:`Remova duplicatas de uma lista usando um set, depois converta de volta preservando a ordem original.`,
      solution:`${py(`lista = [3, 1, 2, 3, 1, 4, 2]

# forma tradicional (perde ordem)
sem_dup_desord = list(set(lista))     # [1, 2, 3, 4] ou outra ordem

# forma preservando ordem (dict.fromkeys)
sem_dup = list(dict.fromkeys(lista))
print(sem_dup)     # [3, 1, 2, 4]`)}
      <p><code>dict.fromkeys</code> cria um dict com essas chaves na ordem que apareceram. Como dict preserva ordem de inserção (≥3.7), funciona.</p>` },

    { ref:'P.1.29', type:'code',
      q:`Crie um <code>@dataclass</code> chamado <code>Produto</code> com campos <code>nome: str</code>, <code>preco: float</code>, <code>estoque: int = 0</code>, com <code>frozen=True</code>.`,
      solution:`${py(`from dataclasses import dataclass

@dataclass(frozen=True)
class Produto:
    nome: str
    preco: float
    estoque: int = 0

p1 = Produto("Notebook", 3500.0, 10)
p2 = Produto("Mouse", 90.0)         # estoque=0 por padrão

print(p1)   # Produto(nome='Notebook', preco=3500.0, estoque=10)`)}
      <p>Campos com default vêm depois dos sem default.</p>` },

    { ref:'P.1.30', type:'code',
      q:`(Bônus) Implemente uma função que receba dois conjuntos e retorne se um é subconjunto do outro.`,
      solution:`${py(`def eh_subconjunto(a: set, b: set) -> bool:
    """True se todos os elementos de a estão em b."""
    return a <= b     # ou a.issubset(b)

print(eh_subconjunto({1, 2}, {1, 2, 3}))    # True
print(eh_subconjunto({1, 4}, {1, 2, 3}))    # False`)}
      <p>O operador <code>&lt;=</code> em sets significa "é subconjunto de". <code>&lt;</code> significa "subconjunto próprio" (subconjunto e diferente).</p>` },

    { ref:'P.1.31', type:'code',
      q:`Crie um decorator <code>tempo_execucao</code> que imprima o tempo gasto pela função.`,
      solution:`${py(`import time
from functools import wraps

def tempo_execucao(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        inicio = time.perf_counter()
        resultado = func(*args, **kwargs)
        fim = time.perf_counter()
        print(f"{func.__name__} levou {fim - inicio:.4f}s")
        return resultado
    return wrapper

@tempo_execucao
def somar_muito():
    return sum(range(10_000_000))

somar_muito()
# somar_muito levou 0.2143s`)}
      <p><code>time.perf_counter()</code> é o timer mais preciso pra medir intervalos curtos.</p>` },

    { ref:'P.1.32', type:'code',
      q:`Escreva um decorator <code>log</code> que registra a chamada da função com seus argumentos.`,
      solution:`${py(`from functools import wraps

def log(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        args_str = ", ".join(str(a) for a in args)
        kwargs_str = ", ".join(f"{k}={v}" for k, v in kwargs.items())
        todos = ", ".join(filter(None, [args_str, kwargs_str]))
        print(f"chamando {func.__name__}({todos})")
        return func(*args, **kwargs)
    return wrapper

@log
def soma(a, b):
    return a + b

soma(3, 4)
# chamando soma(3, 4)`)}` },

    { ref:'P.1.34', type:'code',
      q:`Crie uma classe <code>Produto</code> com atributos <code>nome</code>, <code>preco</code> e <code>estoque</code>. Adicione uma property <code>preco_com_desconto</code>.`,
      solution:`${py(`class Produto:
    def __init__(self, nome, preco, estoque):
        self.nome = nome
        self.preco = preco
        self.estoque = estoque

    @property
    def preco_com_desconto(self):
        """Aplica 10% de desconto."""
        return self.preco * 0.9

p = Produto("Notebook", 3500.0, 5)
print(p.preco)                    # 3500.0
print(p.preco_com_desconto)       # 3150.0`)}
      <p>Note que <code>preco_com_desconto</code> é chamado <strong>sem parênteses</strong>, como um atributo.</p>` },

    { ref:'P.1.35', type:'code',
      q:`Implemente um setter para <code>preco</code> que não aceite valores negativos.`,
      solution:`${py(`class Produto:
    def __init__(self, nome, preco):
        self.nome = nome
        self.preco = preco       # chama o setter

    @property
    def preco(self):
        return self._preco

    @preco.setter
    def preco(self, valor):
        if valor < 0:
            raise ValueError("Preço não pode ser negativo")
        self._preco = valor

p = Produto("Mouse", 90.0)
p.preco = 100.0     # OK
p.preco = -5        # ValueError: Preço não pode ser negativo`)}
      <p>Note que dentro dos métodos usamos <code>self._preco</code> (com underscore) para o storage real, já que <code>self.preco</code> chama o property.</p>` },

    { ref:'P.1.36', type:'code',
      q:`(Bônus) Crie um mixin <code>Logavel</code> com um método <code>log(mensagem)</code> que imprime "[LOG] mensagem".`,
      solution:`${py(`class Logavel:
    def log(self, mensagem):
        print(f"[LOG] {mensagem}")

class Servico(Logavel):
    def executar(self):
        self.log("Iniciando serviço...")
        # faz coisa
        self.log("Serviço finalizado.")

s = Servico()
s.executar()
# [LOG] Iniciando serviço...
# [LOG] Serviço finalizado.`)}
      <p>Um "mixin" é uma classe que adiciona funcionalidade a outras via herança múltipla.</p>` },

    // Exercícios finais (Lista 1.1 a 1.10)
    { ref:'1.1', type:'code',
      q:`Converta as expressões para o interpretador Python:
      <br>(a) 10 + 20 × 30
      <br>(b) 42 ÷ 30
      <br>(c) (94 + 2) ÷ 6 − 1`,
      solution:`${py(`# (a)
print(10 + 20 * 30)      # 610

# (b)
print(42 / 30)           # 1.4

# (c)
print((94 + 2) / 6 - 1)  # 15.0`)}
      <p>Em Python: <code>×</code> vira <code>*</code>, <code>÷</code> vira <code>/</code> (float) ou <code>//</code> (inteiro).</p>` },

    { ref:'1.2', type:'code',
      q:`Resolva no Python (e no papel também): <code>10 % 3 × 10² + 1 − 10 × 4 / 2</code>. O resultado esperado é <strong>81.0</strong>.`,
      solution:`${py(`print(10 % 3 * 10**2 + 1 - 10 * 4 / 2)
# = (10%3) * (10**2) + 1 - (10*4/2)
# =  1     *  100    + 1 -  20
# =  100 + 1 - 20 = 81.0`)}
      <p>Ordem: <code>**</code> primeiro → <code>* / // %</code> → <code>+ -</code>. O <code>/</code> força resultado float.</p>` },

    { ref:'1.3', type:'code',
      q:`Faça um programa que resolva a soma de três variáveis e imprima o resultado.`,
      solution:`${py(`a = 10
b = 20
c = 30

soma = a + b + c
print(f"Soma: {soma}")
# Soma: 60`)}` },

    { ref:'1.4', type:'code',
      q:`Considerando um salário de R$ 750,00, determine numericamente um aumento de 15%.`,
      solution:`${py(`salario = 750.00
aumento = salario * 0.15
novo_salario = salario + aumento

print(f"Aumento: R\${aumento:.2f}")           # Aumento: R$112.50
print(f"Novo salário: R\${novo_salario:.2f}") # Novo salário: R$862.50`)}
      <p>15% = 0.15. Multiplique pelo valor original.</p>` },

    { ref:'1.5', type:'code',
      q:`Escreva um programa que, a partir de dias, horas, minutos e segundos, calcule o tempo total em segundos.`,
      solution:`${py(`dias = int(input("Dias: "))
horas = int(input("Horas: "))
minutos = int(input("Minutos: "))
segundos = int(input("Segundos: "))

total = (
    dias * 86400 +      # 24 * 60 * 60
    horas * 3600 +      # 60 * 60
    minutos * 60 +
    segundos
)

print(f"Total em segundos: {total}")`)}
      <p>Conversões: 1 dia = 86400s, 1 hora = 3600s, 1 min = 60s.</p>` },

    { ref:'1.6', type:'code',
      q:`Escreva um programa que pergunte três números ao usuário e devolva o maior deles.`,
      solution:`${py(`a = float(input("1º número: "))
b = float(input("2º número: "))
c = float(input("3º número: "))

# opção 1: built-in
maior = max(a, b, c)

# opção 2: if manual
if a >= b and a >= c:
    maior = a
elif b >= c:
    maior = b
else:
    maior = c

print(f"Maior: {maior}")`)}
      <p><code>max()</code> aceita vários argumentos ou um iterável.</p>` },

    { ref:'1.7', type:'code',
      q:`Escreva um programa em Python que verifique se um número é primo.`,
      solution:`${py(`def eh_primo(n: int) -> bool:
    """Verifica se n é primo."""
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    # testa divisores ímpares até raiz de n
    for i in range(3, int(n ** 0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

n = int(input("Número: "))
print(f"{n} é primo? {eh_primo(n)}")`)}
      <p>Otimização: só precisa testar até <code>√n</code>. Se não achou divisor até lá, é primo.</p>` },

    { ref:'1.8', type:'code',
      q:`Volume de uma esfera: <code>V = (4/3) × π × r³</code>. Defina <code>sphere_volume(r)</code> usando <code>π ≈ 3.14159</code>. Documente a função. Teste dentro de <code>if __name__ == "__main__"</code>.`,
      solution:`${py(`def sphere_volume(r: float) -> float:
    """Retorna o volume de uma esfera de raio r.

    Args:
        r: raio da esfera (mesma unidade do resultado ao cubo)
    Returns:
        volume calculado com pi ≈ 3.14159
    """
    pi = 3.14159
    return (4/3) * pi * r ** 3

if __name__ == "__main__":
    print(sphere_volume(1))     # 4.18879...
    print(sphere_volume(5))     # 523.598...`)}
      <p>Dica: você poderia usar <code>math.pi</code> importando <code>math</code> para maior precisão.</p>` },

    { ref:'1.9', type:'code',
      q:`Escreva <code>isolate()</code> que aceite 5 argumentos. Imprima os 3 primeiros separados por 5 espaços, e os 2 últimos com 1 espaço entre eles.`,
      solution:`${py(`def isolate(a, b, c, d, e):
    """Imprime primeiros 3 com 5 espaços, últimos 2 com 1 espaço."""
    print(a, b, c, sep="     ", end=" ")
    print(d, e, sep=" ")

isolate(1, 2, 3, 4, 5)
# 1     2     3 4 5`)}
      <p><code>sep</code> define o separador entre argumentos. <code>end</code> define o que vem depois do último (default: quebra de linha).</p>` },

    { ref:'1.10', type:'code',
      q:`Escreva duas funções:
      <br>(a) <code>first_half(s)</code> retorna a primeira metade da string (excluindo o meio se ímpar).
      <br>(b) <code>backward(s)</code> retorna a string invertida usando fatiamento.`,
      solution:`${py(`def first_half(s: str) -> str:
    """Retorna a primeira metade da string."""
    return s[:len(s) // 2]

def backward(s: str) -> str:
    """Retorna a string invertida."""
    return s[::-1]

print(first_half("python"))    # "pyt"
print(first_half("olá"))       # "o"
print(backward("python"))      # "nohtyp"`)}
      <p><code>s[::-1]</code> é o truque clássico: passo -1 percorre de trás pra frente.</p>` }
  ],

  /* ============ UNIDADE 2 — REFLEXÕES DO DESAFIO ============ */
  u2: [
    { ref:'U2.1', type:'reflection',
      q:`Por que <code>/api/books/1</code> representa um recurso diferente de <code>/api/books</code>?`,
      solution:`<p><code>/api/books</code> representa a <strong>coleção</strong> de todos os livros — é um recurso "container".</p>
      <p><code>/api/books/1</code> representa <strong>um recurso individual</strong> — o livro com id 1.</p>
      <p>Cada URI identifica um recurso distinto. Operações sobre a coleção (listar, criar) são diferentes das operações sobre o item (obter aquele específico, atualizar, remover).</p>` },

    { ref:'U2.2', type:'reflection',
      q:`Por que o método <code>GET</code> é utilizado para consultar livros?`,
      solution:`<p>Porque a <strong>semântica</strong> do GET é justamente essa: obter uma representação de um recurso, sem causar efeito colateral no servidor.</p>
      <p>GET é seguro (não altera estado) e idempotente (pode ser repetido sem consequência). Ideal para leitura.</p>
      <p>Isso permite que navegadores, proxies e caches assumam essas propriedades e tratem a requisição adequadamente (por exemplo, cachear a resposta).</p>` },

    { ref:'U2.3', type:'reflection',
      q:`Por que o método <code>POST</code> é utilizado para criar um novo livro?`,
      solution:`<p>Porque POST tem a semântica de <strong>"enviar dados para processamento"</strong>, tipicamente resultando na criação de um recurso subordinado à URI-alvo.</p>
      <p>No caso, <code>POST /api/books</code> significa "envie estes dados para a coleção de livros; o servidor decide o id e cria o recurso".</p>
      <p>POST não é idempotente: repetir cria múltiplos recursos. Isso o diferencia do PUT, que substitui um recurso específico.</p>` },

    { ref:'U2.4', type:'reflection',
      q:`Qual é a diferença entre <code>400 Bad Request</code> e <code>404 Not Found</code>?`,
      solution:`<p><strong>400 Bad Request</strong> — a requisição em si está mal formada. Ex: JSON inválido, id com formato errado (<code>/books/abc</code>), campos obrigatórios ausentes.</p>
      <p><strong>404 Not Found</strong> — a requisição está bem formada, mas o <em>recurso</em> não existe. Ex: <code>/books/999</code> quando não existe livro com id 999.</p>
      <p>Regra: se o erro é <strong>no que o cliente enviou</strong>, use 400. Se é <strong>no que ele pediu</strong> (recurso ausente), use 404.</p>` },

    { ref:'U2.5', type:'reflection',
      q:`Por que uma exclusão realizada com sucesso pode retornar <code>204 No Content</code>?`,
      solution:`<p>Porque a operação foi concluída (sucesso) mas <strong>não há conteúdo relevante para retornar no corpo</strong>. O recurso foi apagado; enviar uma representação dele não faz sentido.</p>
      <p>O código 204 comunica exatamente isso: "deu certo, e não estou mandando corpo, não fique esperando".</p>
      <p><strong>Cuidado:</strong> ao usar 204, o corpo da resposta DEVE estar vazio. Não envie JSON de confirmação.</p>` },

    { ref:'U2.6', type:'reflection',
      q:`O que aconteceria com os livros cadastrados se o servidor fosse encerrado?`,
      solution:`<p>Seriam <strong>perdidos</strong>. A implementação do desafio mantém a lista de livros apenas na memória do processo Python (variável em memória RAM).</p>
      <p>Quando o processo termina — seja por Ctrl+C, crash, reboot — toda a memória do processo é liberada pelo sistema operacional. Não há persistência em disco.</p>
      <p>Para persistir, seria necessário salvar em arquivo (JSON, SQLite) ou banco de dados (PostgreSQL, MongoDB) a cada alteração.</p>` },

    { ref:'U2.7', type:'reflection',
      q:`Quais limitações existem em uma aplicação que mantém seus dados exclusivamente em memória?`,
      solution:`<p><strong>Principais limitações:</strong></p>
      <ul>
        <li><strong>Sem persistência</strong> — reinício apaga tudo.</li>
        <li><strong>Não escala horizontalmente</strong> — múltiplas instâncias do servidor teriam memórias independentes (dados incoerentes entre elas).</li>
        <li><strong>Capacidade limitada</strong> — dados só cabem até o limite da RAM.</li>
        <li><strong>Sem transações</strong> — não há garantia de atomicidade em alterações simultâneas.</li>
        <li><strong>Sem consultas complexas</strong> — filtragem, ordenação, joins ficam por conta do código Python.</li>
        <li><strong>Vulnerável a inconsistência em concorrência</strong> — múltiplas threads escrevendo ao mesmo tempo podem corromper dados sem locks.</li>
      </ul>
      <p>Por isso, aplicações reais usam banco de dados como camada de persistência.</p>` }
  ],

  /* ============ UNIDADE 3 — MCQ (dos PDFs) ============ */
  u3: [
    { ref:'3.1', type:'mcq',
      q:`Qual das alternativas abaixo melhor descreve a função de um ambiente virtual em Python?`,
      opts:[
        'Permitir executar o Flask sem o uso do terminal.',
        'Aumentar o desempenho do interpretador Python.',
        'Executar múltiplas aplicações Flask simultaneamente.',
        'Proteger o código contra falhas de segurança.',
        'Isolar dependências e evitar conflitos entre projetos.'
      ], correct: 4,
      explain:`Ambiente virtual isola as dependências de cada projeto. Assim, o projeto A pode usar Flask 3.0 e o projeto B pode usar Flask 2.0 sem se atrapalharem.` },

    { ref:'3.2', type:'mcq',
      q:`Qual comando cria um ambiente virtual chamado <code>venv</code>?`,
      opts:[
        '<code>flask create venv</code>',
        '<code>python3 venv create</code>',
        '<code>python3 -m venv venv</code>',
        '<code>pip install venv</code>',
        '<code>python -m flask new-env</code>'
      ], correct: 2,
      explain:`<code>python3 -m venv venv</code> — o <code>-m</code> executa o módulo <code>venv</code>, e o segundo <code>venv</code> é o nome da pasta criada.` },

    { ref:'3.3', type:'mcq',
      q:`No padrão Application Factory, qual é o papel da função <code>create_app()</code>?`,
      opts:[
        'Registrar as rotas diretamente em app.py.',
        'Criar e retornar uma instância configurada do Flask.',
        'Instalar o Flask e suas dependências.',
        'Criar automaticamente um ambiente virtual.',
        'Executar o servidor Flask em produção.'
      ], correct: 1,
      explain:`<code>create_app()</code> encapsula a criação da aplicação: instancia o Flask, aplica config, inicializa extensões, registra blueprints, e retorna o app pronto.` },

    { ref:'3.4', type:'mcq',
      q:`Qual é o nome da variável de ambiente usada para indicar o ponto de entrada da aplicação Flask?`,
      opts:['<code>FLASK_APP</code>','<code>FLASK_DEBUG</code>','<code>FLASK_RUN</code>','<code>FLASK_ENTRY</code>','<code>APP_FLASK</code>'],
      correct: 0,
      explain:`<code>FLASK_APP</code> diz ao Flask onde está a aplicação — pode ser um arquivo (<code>app.py</code>) ou uma factory (<code>app:create_app("dev")</code>).` },

    { ref:'3.5', type:'mcq',
      q:`O que são blueprints no contexto do Flask?`,
      opts:[
        'Um tipo especial de template HTML.',
        'Um sistema de cache para acelerar o Flask.',
        'Um comando para automatizar a instalação do Flask.',
        'Um modo de debug para aplicações complexas.',
        'Um mecanismo para separar funcionalidades em módulos reutilizáveis.'
      ], correct: 4,
      explain:`Blueprint permite dividir a aplicação em módulos coesos (auth, api, admin...) que são registrados na app principal com <code>app.register_blueprint()</code>.` },

    { ref:'3.6', type:'mcq',
      q:`Qual biblioteca abaixo NÃO é uma dependência principal do Flask?`,
      opts:['Werkzeug','Jinja2','Click','SQLAlchemy','Nenhuma das anteriores'],
      correct: 3,
      explain:`As 5 dependências que o Flask puxa são: Werkzeug, Jinja2, Click, ItsDangerous e Blinker. SQLAlchemy é uma extensão popular, mas separada.` },

    { ref:'3.7', type:'mcq',
      q:`Em qual arquivo deve ser definida a função <code>create_app()</code>, segundo a estrutura modular do projeto?`,
      opts:['<code>app/__init__.py</code>','<code>config.py</code>','<code>app.py</code>','<code>main/routes.py</code>','<code>venv/__init__.py</code>'],
      correct: 0,
      explain:`Convenção do padrão: <code>app/__init__.py</code>. O arquivo <code>__init__.py</code> transforma a pasta <code>app/</code> em pacote Python e é o local natural da factory.` },

    { ref:'3.8', type:'mcq',
      q:`Qual das alternativas corresponde a uma rota registrada corretamente em um blueprint chamado <code>main</code>?`,
      opts:["<code>@app.route('/')</code>","<code>@route.main('/')</code>","<code>@main.route('/')</code>","<code>@flask.route('/')</code>","<code>@Blueprint.route('/')</code>"],
      correct: 2,
      explain:`Em blueprint, o decorator usa o nome do próprio blueprint: <code>@main.route('/')</code>, e não <code>@app.route</code>.` },

    { ref:'3.9', type:'mcq',
      q:`Para ativar o ambiente virtual <code>venv</code> no Linux ou macOS, qual comando deve ser utilizado?`,
      opts:['<code>activate venv</code>','<code>venv/activate.sh</code>','<code>run venv</code>','<code>bash activate venv</code>','<code>source venv/bin/activate</code>'],
      correct: 4,
      explain:`<code>source venv/bin/activate</code>. No Windows: <code>venv\\Scripts\\activate.bat</code> (CMD) ou <code>.\\venv\\Scripts\\Activate.ps1</code> (PowerShell).` },

    { ref:'3.10', type:'mcq',
      q:`O que a seguinte linha de código faz no <code>routes.py</code>?<br><code>ambiente = current_app.config.get("CONFIG_NAME", "desconhecido")</code>`,
      opts:[
        'Cria um novo ambiente virtual.',
        'Recupera o nome do ambiente de configuração ativo.',
        'Define o nome do blueprint.',
        'Obtém a variável de ambiente do sistema operacional.',
        'Importa o nome do pacote principal.'
      ], correct: 1,
      explain:`<code>current_app</code> é o proxy da aplicação ativa. <code>.config.get(chave, default)</code> lê a config; se a chave não existir, retorna o default (<code>"desconhecido"</code>).` }
  ],

  /* ============ UNIDADE 4 — MCQ (dos PDFs) ============ */
  u4: [
    { ref:'4.1', type:'mcq',
      q:`Do ponto de vista arquitetural, qual é o principal objetivo do uso do padrão Application Factory em aplicações Flask?`,
      opts:[
        'Melhorar a performance do servidor HTTP',
        'Evitar a criação de rotas dinâmicas',
        'Reduzir acoplamento e evitar importações circulares',
        'Substituir o uso de Blueprints',
        'Eliminar a necessidade de configuração'
      ], correct: 2,
      explain:`A factory encapsula a criação da aplicação numa função. Isso quebra o acoplamento com uma variável global e resolve o loop de importação circular.` },

    { ref:'4.2', type:'mcq',
      q:`Considere: <code>app.py</code> importa <code>init_app</code> de <code>views.py</code>, e <code>views.py</code> faz <code>from app import app</code>. Qual é o problema estrutural mais provável dessa arquitetura?`,
      opts:[
        'Sobrecarga de memória',
        'Falha na renderização de templates',
        'Erro de tipagem dinâmica',
        'Incompatibilidade com WSGI',
        'Dependência circular entre módulos'
      ], correct: 4,
      explain:`É o cenário clássico de importação circular. Quando <code>views.py</code> tenta importar <code>app</code>, essa variável ainda não foi criada no <code>app.py</code>.` },

    { ref:'4.3', type:'mcq',
      q:`Analise:<pre><code>def create_app():
    app = Flask(__name__)
    return app</code></pre>Por que dizemos que esse padrão usa inicialização preguiçosa (lazy initialization)?`,
      opts:[
        'Porque a aplicação é criada apenas quando a função é invocada',
        'Porque o Flask executa todas as rotas antecipadamente',
        'Porque as extensões são removidas da aplicação',
        'Porque o Python adia a compilação do código',
        'Porque o servidor executa em modo assíncrono'
      ], correct: 0,
      explain:`Ao importar o módulo, só a definição da função é carregada. Nenhum objeto Flask é instanciado até <code>create_app()</code> ser explicitamente chamada.` },

    { ref:'4.4', type:'mcq',
      q:`Em projetos Flask estruturados com factories, qual prática é considerada uma boa regra de arquitetura?`,
      opts:[
        'Importar o objeto app em todos os módulos',
        'Declarar o app como variável global obrigatória',
        'Criar múltiplos objetos Flask globais',
        'Evitar importar diretamente o objeto app nos módulos da aplicação',
        'Substituir o app por variáveis de ambiente'
      ], correct: 3,
      explain:`Módulos não devem importar diretamente o <code>app</code> global. Recebem-no via injeção de dependência (parâmetro em <code>init_app(app)</code>) ou acessam pelo proxy <code>current_app</code>.` },

    { ref:'4.5', type:'mcq',
      q:`Qual é a principal função do padrão <code>init_app(app)</code>?`,
      opts:[
        'Criar múltiplas instâncias do Flask',
        'Registrar componentes na aplicação de forma desacoplada',
        'Executar requisições HTTP automaticamente',
        'Substituir o uso de decorators',
        'Configurar o servidor WSGI'
      ], correct: 1,
      explain:`<code>init_app(app)</code> é o padrão para extensões e módulos <em>receberem</em> a app como parâmetro, em vez de importá-la. Chama-se injeção de dependência.` },

    { ref:'4.6', type:'mcq',
      q:`Considere o uso de:<pre><code>from flask import current_app
valor = current_app.config["DEBUG"]</code></pre>Esse código só funciona corretamente quando:`,
      opts:[
        'O servidor está em modo debug',
        'O banco de dados está conectado',
        'O Flask está rodando com Gunicorn',
        'Existe um contexto de aplicação ativo',
        'O arquivo config.py foi importado'
      ], correct: 3,
      explain:`<code>current_app</code> é um proxy que só resolve quando há Application Context ativo. Fora dele: <code>RuntimeError: Working outside of application context</code>.` },

    { ref:'4.7', type:'mcq',
      q:`Qual das opções descreve corretamente o Request Context?`,
      opts:[
        'Estado global permanente da aplicação',
        'Contexto criado apenas durante a compilação',
        'Contexto criado a cada requisição HTTP',
        'Contexto exclusivo do banco de dados',
        'Substituto do Application Factory'
      ], correct: 2,
      explain:`Request Context é ativado a cada requisição HTTP, empilhado sobre o Application Context, e expõe <code>request</code> e <code>session</code>.` },

    { ref:'4.8', type:'mcq',
      q:`Objetos como <code>request</code>, <code>current_app</code> e <code>g</code> são classificados como:`,
      opts:[
        'Variáveis globais estáticas',
        'Middlewares HTTP',
        'Decoradores de rota',
        'Objetos WSGI diretos',
        'Proxies de contexto (context-local proxies)'
      ], correct: 4,
      explain:`São context-local proxies (baseados no Werkzeug). Cada thread/requisição enxerga o seu próprio, mesmo compartilhando o nome global.` },

    { ref:'4.9', type:'mcq',
      q:`Durante a fase de configuração (setup) de uma aplicação Flask, qual ação é considerada adequada?`,
      opts:[
        'Acessar dados do objeto request',
        'Processar formulários HTTP',
        'Registrar blueprints e extensões',
        'Manipular sessões de usuário',
        'Executar queries de requisição ativa'
      ], correct: 2,
      explain:`Setup é o momento antes das requisições. Aqui você define <code>app.config</code>, registra blueprints, inicializa extensões, define hooks (<code>@app.before_request</code>).` },

    { ref:'4.10', type:'mcq',
      q:`Sobre a relação entre Application Context e Request Context, assinale a alternativa correta:`,
      opts:[
        'Todo Application Context possui obrigatoriamente um Request Context',
        'Todo Request Context possui um Application Context associado',
        'Ambos são criados apenas na inicialização do servidor',
        'O Request Context existe antes do Application Context',
        'Eles são independentes e não se relacionam'
      ], correct: 1,
      explain:`Regra de ouro: todo Request Context cria um Application Context. O inverso não vale — existe App Context sem Request (scripts, CLI, testes, cron).` },

    { ref:'4.11', type:'mcq',
      q:`Considere que o projeto possui apenas:<pre><code>def create_app():
    app = Flask(__name__)
    return app</code></pre>Por convenção, o que o comando <code>flask run</code> fará ao encontrar essa estrutura?`,
      opts:[
        'Executar automaticamente a função create_app',
        'Criar um servidor sem contexto',
        'Ignorar a aplicação por não existir variável global app',
        'Exigir obrigatoriamente um arquivo run.py',
        'Compilar a aplicação antes de executar'
      ], correct: 0,
      explain:`O CLI do Flask reconhece automaticamente factories chamadas <code>create_app()</code> ou <code>make_app()</code>. Ele invoca a função e usa o retorno como app.` }
  ],

  /* ============ UNIDADE 5 — EMPACOTAMENTO E TESTES ============ */
  /* Atividades práticas — os PDFs não trazem lista formal, então formulamos
     exercícios/reflexões alinhados diretamente ao conteúdo apresentado. */
  u5: [
    { ref:'U5.1', type:'reflection',
      q:`Qual a diferença entre executar seu projeto como <strong>script solto</strong> e como <strong>pacote instalado</strong>? Cite duas vantagens práticas da segunda abordagem.`,
      solution:`<p><strong>Script solto:</strong> você roda com <code>python arquivo.py</code> e depende de estar naquela pasta. Não é reconhecido pelo Python como algo importável em outros lugares.</p>
      <p><strong>Pacote instalado (via pyproject.toml + pip install):</strong> vira parte do ambiente Python, indexado em <code>site-packages</code>. Pode ser importado de qualquer lugar; dependências são resolvidas automaticamente.</p>
      <p><strong>Vantagens práticas:</strong></p>
      <ul>
        <li>Testes automatizados funcionam sem gambiarra de <code>sys.path</code>.</li>
        <li>Deploy em produção é padronizado — o mesmo comando (<code>pip install .</code>) funciona em qualquer servidor.</li>
        <li>Dependências são declaradas e reproduzíveis entre máquinas.</li>
      </ul>` },

    { ref:'U5.2', type:'code',
      q:`Escreva um <code>pyproject.toml</code> mínimo para um projeto chamado <strong>agenda</strong>, versão 0.1.0, que precisa de Python 3.10+ e depende do Flask.`,
      solution:`${py(`# pyproject.toml
[build-system]
requires = ["setuptools>=70.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "agenda"
version = "0.1.0"
description = "App de agenda pessoal"
requires-python = ">=3.10"
dependencies = [
    "Flask>=3.0",
]`)}
      <p><strong>Explicando:</strong></p>
      <ul>
        <li><code>[build-system]</code> — como construir o pacote (setuptools + wheel).</li>
        <li><code>[project]</code> — metadados: nome, versão, descrição.</li>
        <li><code>requires-python</code> — versão mínima do interpretador.</li>
        <li><code>dependencies</code> — o que o projeto precisa pra rodar.</li>
      </ul>` },

    { ref:'U5.3', type:'reflection',
      q:`O que significa <strong>Semantic Versioning</strong> e por que ele importa? Se sua aplicação depende de <code>Flask>=3.0</code>, o Flask lança versão 3.1 — devo me preocupar? E se sair Flask 4.0?`,
      solution:`<p>Semantic Versioning (SemVer) usa <strong>MAJOR.MINOR.PATCH</strong>, e cada número comunica o tipo de mudança:</p>
      <ul>
        <li><strong>MAJOR</strong>: quebra compatibilidade. Código pode parar de funcionar.</li>
        <li><strong>MINOR</strong>: adiciona features novas, mantendo compatibilidade.</li>
        <li><strong>PATCH</strong>: só correções de bugs, comportamento inalterado.</li>
      </ul>
      <p><strong>Flask 3.0 → 3.1:</strong> tranquilo. Só adicionou funcionalidades ou corrigiu bugs. Seu código continua rodando.</p>
      <p><strong>Flask 3.0 → 4.0:</strong> risco. Mudança de MAJOR pode ter quebrado APIs que você usa. Precisa ler o changelog, testar, provavelmente ajustar código.</p>` },

    { ref:'U5.4', type:'code',
      q:`Adicione duas seções de dependências opcionais no seu <code>pyproject.toml</code>: uma <strong>dev</strong> (ipython, black, flake8) e uma <strong>test</strong> (pytest, pytest-flask). Depois mostre o comando pra instalar tudo.`,
      solution:`${py(`[project.optional-dependencies]
dev = [
    "ipython",
    "black",
    "flake8",
]
test = [
    "pytest>=8.3",
    "pytest-flask",
]`)}
      <p>Instalar apenas dependências normais:</p>
      ${py(`pip install -e .`)}
      <p>Instalar com extras dev e test:</p>
      ${py(`pip install -e ".[dev,test]"`)}
      <p><strong>Por que separar?</strong> No servidor de produção você não precisa de ipython nem pytest. Isso deixa o ambiente enxuto, mais rápido de instalar, menos coisa pra dar problema.</p>` },

    { ref:'U5.5', type:'reflection',
      q:`O que faz a flag <code>-e</code> no comando <code>pip install -e .</code>? Por que é útil durante o desenvolvimento?`,
      solution:`<p><code>-e</code> = <strong>editable install</strong>. Em vez de copiar o código do seu projeto para <code>site-packages</code>, o pip cria um "atalho" (via arquivo <code>.pth</code>) que aponta pra pasta do seu projeto.</p>
      <p><strong>Consequência prática:</strong> qualquer alteração no código-fonte é <strong>refletida imediatamente</strong>. Você não precisa desinstalar/reinstalar a cada mudança.</p>
      <p>Sem <code>-e</code>: código é copiado. Se você edita, tem que reinstalar pra ver a mudança. Péssimo durante desenvolvimento.</p>
      <p>Em produção, use sem <code>-e</code> — a versão instalada é congelada, não muda por acidente.</p>` },

    { ref:'U5.6', type:'code',
      q:`Crie um <code>tasks.py</code> com 3 tarefas do Invoke: <strong>install</strong> (instala em modo editable com deps dev/test), <strong>test</strong> (roda pytest), <strong>lint</strong> (roda flake8 na pasta app/).`,
      solution:`${py(`# tasks.py
from invoke import task

@task
def install(c):
    """Instala o projeto em modo editable com deps dev e test."""
    c.run('pip install -e ".[dev,test]"', echo=True)

@task
def test(c):
    """Executa os testes automatizados."""
    c.run("pytest -v", echo=True)

@task
def lint(c):
    """Verifica estilo de código com flake8."""
    c.run("flake8 app", echo=True)`)}
      <p>Uso no terminal:</p>
      ${py(`invoke install
invoke test
invoke lint`)}
      <p><strong>Vantagens:</strong> padroniza comandos entre a equipe (todo mundo roda a mesma coisa), evita erros de digitação, funciona igual em Windows/Linux/macOS.</p>` },

    { ref:'U5.7', type:'code',
      q:`Escreva 3 testes simples usando PyTest para uma função <code>somar(a, b)</code>. Teste: soma normal, com zeros, e com negativos.`,
      solution:`${py(`# app/matematica.py
def somar(a, b):
    return a + b

# tests/test_matematica.py
from app.matematica import somar

def test_somar_normal():
    assert somar(2, 3) == 5

def test_somar_zeros():
    assert somar(0, 0) == 0
    assert somar(5, 0) == 5

def test_somar_negativos():
    assert somar(-2, -3) == -5
    assert somar(10, -3) == 7`)}
      <p>Rode com <code>pytest -v</code>. Se todos passarem, você vê algo tipo:</p>
      ${py(`test_matematica.py::test_somar_normal PASSED
test_matematica.py::test_somar_zeros PASSED
test_matematica.py::test_somar_negativos PASSED`)}
      <p><strong>Ponto chave:</strong> o nome da função DEVE começar com <code>test_</code>. Senão o PyTest não roda.</p>` },

    { ref:'U5.8', type:'reflection',
      q:`O que é uma <strong>fixture</strong> no PyTest? Qual o papel do arquivo <code>conftest.py</code>?`,
      solution:`<p><strong>Fixture</strong> = um objeto ou estado <strong>preparado antes do teste</strong> que vários testes reutilizam. Ex: uma instância da app Flask, uma conexão de banco, um usuário de teste.</p>
      <p>Em vez de cada teste construir a app do zero, você declara uma fixture uma vez, e os testes recebem via parâmetro.</p>
      ${py(`import pytest
from app import create_app

@pytest.fixture
def app():
    return create_app()

def test_algo(app):    # PyTest injeta a fixture automaticamente
    assert app is not None`)}
      <p><strong><code>conftest.py</code></strong> é o arquivo onde você coloca fixtures que vários arquivos de teste vão usar. O PyTest carrega automaticamente — <strong>você não precisa importar</strong>.</p>
      <p>No caso do <code>pytest-flask</code>: se você define a fixture <code>app</code> no <code>conftest.py</code>, ele te dá a fixture <code>client</code> de graça, pra fazer requisições HTTP simuladas.</p>` },

    { ref:'U5.9', type:'code',
      q:`Escreva um teste que verifica se a rota <code>/api/health</code> da sua app Flask retorna status 200. Use o <code>client</code> do pytest-flask.`,
      solution:`${py(`# tests/conftest.py
import pytest
from app import create_app

@pytest.fixture
def app():
    app = create_app()
    app.config["TESTING"] = True
    return app

# tests/test_rotas.py
def test_health_check(client):
    response = client.get("/api/health")
    assert response.status_code == 200

def test_rota_inexistente(client):
    response = client.get("/api/nao-existe")
    assert response.status_code == 404`)}
      <p><strong>O que acontece:</strong></p>
      <ul>
        <li><code>client</code> vem automaticamente do <code>pytest-flask</code> (baseado na fixture <code>app</code>).</li>
        <li><code>client.get(url)</code> simula uma requisição HTTP <strong>sem subir servidor de verdade</strong>.</li>
        <li><code>response.status_code</code> te dá o código HTTP retornado.</li>
      </ul>` },

    { ref:'U5.10', type:'reflection',
      q:`O que a <strong>cobertura de testes</strong> mede? Uma cobertura de 100% garante que o código não tem bugs? Justifique.`,
      solution:`<p>Cobertura mede <strong>quanto do código-fonte é executado durante os testes</strong>. Ex: se seu código tem 100 linhas e os testes rodam 80, a cobertura é 80%.</p>
      <p>Rodar com <code>pytest --cov=app</code> gera relatório dizendo quais linhas foram tocadas e quais não.</p>
      <p><strong>100% de cobertura NÃO garante ausência de bugs.</strong> Por quê?</p>
      <ul>
        <li>Cobertura mede se a linha <em>rodou</em>, não se ela foi <em>testada corretamente</em>. Um teste vazio (<code>def test_x(): pass</code>) pode rodar linhas sem verificar nada.</li>
        <li>Casos-limite (números negativos, entradas vazias, concorrência) podem não estar cobertos mesmo com 100%.</li>
        <li>Bugs de integração (várias partes juntas) não aparecem em testes unitários.</li>
      </ul>
      <p>Cobertura baixa é red flag (código não testado). Cobertura alta é <em>necessária, mas não suficiente</em>.</p>` }
  ],

  /* ============ UNIDADE 6 — MODELOS E ORM ============ */
  u6: [
    { ref:'U6.1', type:'reflection',
      q:`O que é um <strong>ORM</strong>? Cite duas vantagens de usar Flask-SQLAlchemy em vez de escrever SQL puro.`,
      solution:`<p>ORM = <strong>Object-Relational Mapping</strong>. É a camada de tradução entre objetos Python (classes, instâncias) e o banco de dados relacional (tabelas, linhas, SQL).</p>
      <p>Você trabalha com classes; o ORM gera SQL por baixo.</p>
      <p><strong>Vantagens:</strong></p>
      <ul>
        <li><strong>Independência de banco:</strong> mesmo código funciona em SQLite, PostgreSQL, MySQL — só troca a URL de conexão.</li>
        <li><strong>Menos SQL manual:</strong> menos chance de erro de sintaxe, de SQL injection, de escapar aspas erradas.</li>
        <li><strong>Relacionamentos como atributos:</strong> <code>projeto.tasks</code> em vez de <code>SELECT * FROM tasks WHERE project_id = ?</code>.</li>
        <li><strong>Autocomplete e checagem de tipos</strong> no editor.</li>
      </ul>
      <p><strong>Desvantagem:</strong> abstração pode esconder queries ineficientes. Você precisa entender o que ele gera pra evitar problemas de performance.</p>` },

    { ref:'U6.2', type:'code',
      q:`Complete a classe abaixo modelando uma <strong>Category</strong> (categoria) com: <code>id</code> (chave primária), <code>name</code> (string 100, obrigatório e único), <code>created_at</code> (timestamp, default now do banco).`,
      solution:`${py(`from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column
from taskflow.ext.db import db

class Category(db.Model):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(
        db.Integer,
        primary_key=True
    )

    name: Mapped[str] = mapped_column(
        db.String(100),
        nullable=False,
        unique=True
    )

    created_at: Mapped[datetime] = mapped_column(
        db.DateTime,
        nullable=False,
        server_default=db.func.now()
    )`)}
      <p><strong>Detalhes:</strong></p>
      <ul>
        <li><code>__tablename__</code> — nome da tabela no banco (recomendo sempre em plural).</li>
        <li><code>primary_key=True</code> — identifica cada linha.</li>
        <li><code>nullable=False</code> + <code>unique=True</code> — não pode ser vazio nem repetido.</li>
        <li><code>server_default=db.func.now()</code> — o próprio banco gera o timestamp na hora do INSERT (evita problema de fuso horário da aplicação).</li>
      </ul>` },

    { ref:'U6.3', type:'reflection',
      q:`No modelo Task, existem duas chaves estrangeiras apontando pra tabela users: <code>created_by_id</code> e <code>assigned_to_id</code>. Por que separar essas duas coisas? Não seria mais simples ter só uma?`,
      solution:`<p>Porque elas representam <strong>relações semanticamente diferentes</strong>:</p>
      <ul>
        <li><strong><code>created_by_id</code></strong>: quem criou a tarefa. É <strong>histórico permanente</strong>. Uma vez definido, não muda.</li>
        <li><strong><code>assigned_to_id</code></strong>: quem está fazendo a tarefa <em>agora</em>. Pode mudar várias vezes durante a vida da tarefa. Pode até ser <code>NULL</code> (tarefa sem responsável).</li>
      </ul>
      <p><strong>Exemplo:</strong> Ana criou a tarefa "revisar contrato". Inicialmente atribuída a Carlos. Depois passa pra Maria. Depois volta pra Ana.</p>
      <ul>
        <li><code>created_by_id</code> = Ana (nunca muda)</li>
        <li><code>assigned_to_id</code> = Carlos → Maria → Ana (histórico dinâmico)</li>
      </ul>
      <p>Se houvesse só um campo "owner", seria ambíguo: significa criador ou responsável atual? Perderíamos informação. A separação preserva a semântica.</p>` },

    { ref:'U6.4', type:'code',
      q:`Modele o relacionamento 1:N entre <strong>Category</strong> e <strong>Task</strong> (uma categoria tem muitas tasks; cada task pertence a uma categoria). Mostre as duas classes com <code>relationship()</code> e <code>back_populates</code>.`,
      solution:`${py(`from typing import List, Optional
from sqlalchemy.orm import Mapped, mapped_column, relationship
from taskflow.ext.db import db

class Category(db.Model):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(
        db.Integer, primary_key=True
    )
    name: Mapped[str] = mapped_column(
        db.String(100), nullable=False, unique=True
    )

    # LADO "UM" — coleção de tarefas
    tasks: Mapped[List["Task"]] = relationship(
        "Task",
        back_populates="category",
        cascade="all, delete-orphan"
    )


class Task(db.Model):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(
        db.Integer, primary_key=True
    )
    title: Mapped[str] = mapped_column(
        db.String(255), nullable=False
    )

    # CHAVE ESTRANGEIRA
    category_id: Mapped[int] = mapped_column(
        db.Integer,
        db.ForeignKey("categories.id"),
        nullable=False
    )

    # LADO "N" — referência ao pai
    category: Mapped["Category"] = relationship(
        "Category",
        back_populates="tasks"
    )`)}
      <p>Depois disso:</p>
      ${py(`cat.tasks           # lista de todas as Tasks dessa categoria
task.category       # a Category dessa task
# apagar uma Category apaga todas as Tasks junto (cascade)`)}` },

    { ref:'U6.5', type:'reflection',
      q:`O que é <code>cascade="all, delete-orphan"</code>? Dê um exemplo prático de por que isso é importante.`,
      solution:`<p><code>cascade</code> controla o que acontece com os "filhos" quando o "pai" muda. O valor <code>"all, delete-orphan"</code> significa:</p>
      <ul>
        <li><strong>all</strong> — todas as operações (save, delete, merge) propagam pros filhos.</li>
        <li><strong>delete-orphan</strong> — se um filho for "desassociado" do pai, ele é apagado também (não fica órfão).</li>
      </ul>
      <p><strong>Exemplo prático:</strong> um Project tem 20 Tasks associadas via relacionamento com cascade.</p>
      <ul>
        <li><strong>Sem cascade:</strong> apagar o Project → as 20 Tasks continuam no banco, apontando pra um <code>project_id</code> que não existe mais. Registros órfãos, bug de integridade.</li>
        <li><strong>Com cascade:</strong> apagar o Project → as 20 Tasks são apagadas junto, automaticamente. Banco fica limpo.</li>
      </ul>
      <p>Cuidado: cascade é comportamento perigoso. Você <em>quer</em> que aconteça, mas se aplicar errado, uma delete inocente pode limpar meia base sem querer.</p>` },

    { ref:'U6.6', type:'code',
      q:`Escreva o código que, dentro do <code>flask shell</code>, cria um usuário Ana, salva no banco, e depois busca ele pelo email.`,
      solution:`${py(`# no flask shell:
$ flask --app app.py shell

>>> from taskflow.ext.db import db
>>> from taskflow.auth.models import User

# CRIAR
>>> ana = User(
...     username="ana",
...     email="ana@taskflow.com",
...     full_name="Ana Silva",
...     password_hash="fake_hash_por_enquanto"
... )
>>> db.session.add(ana)
>>> db.session.commit()

>>> print(ana.id)
1  # o banco gerou automaticamente

# BUSCAR
>>> u = User.query.filter_by(email="ana@taskflow.com").first()
>>> print(u.full_name)
"Ana Silva"

# BUSCAR TODOS
>>> User.query.all()
[<User id=1 username='ana' email='ana@taskflow.com'>]`)}
      <p><strong>Padrão de escrita:</strong> instanciar → <code>session.add()</code> → <code>session.commit()</code>. Sem o commit, nada é gravado.</p>` },

    { ref:'U6.7', type:'reflection',
      q:`Por que o objeto <code>db = SQLAlchemy()</code> é criado <strong>fora</strong> da função <code>create_app()</code>? Não seria mais simples criar tudo junto?`,
      solution:`<p>Porque queremos que a extensão seja acessível <strong>globalmente pelos módulos</strong> (models, services, blueprints), mas só seja <strong>vinculada à aplicação tardiamente</strong> dentro da factory.</p>
      <p><strong>Estrutura padrão:</strong></p>
      ${py(`# taskflow/ext/db/__init__.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()          # criado aqui, sem app

def init_app(app):
    db.init_app(app)       # ligado a uma app específica


# taskflow/auth/models.py
from taskflow.ext.db import db   # importa o mesmo db global

class User(db.Model):
    ...


# taskflow/__init__.py (factory)
def create_app():
    app = Flask(__name__)
    from .ext.db import init_app as init_db
    init_db(app)           # AGORA sim, liga db à app
    return app`)}
      <p><strong>Vantagens:</strong></p>
      <ul>
        <li>Evita <strong>importação circular</strong> — os models não precisam da app pra existir.</li>
        <li>Permite <strong>múltiplas instâncias</strong> — cria uma app pra teste, outra pra produção, ambas usando o mesmo <code>db</code>.</li>
        <li>Testes ficam limpos — cada teste cria a app com banco em memória, sem estado poluído.</li>
      </ul>` },

    { ref:'U6.8', type:'reflection',
      q:`Para que serve a função <code>register_models()</code>? Se ela não for chamada, o que acontece?`,
      solution:`<p>Ela <strong>força a importação de todos os módulos que contêm modelos</strong>, para que o SQLAlchemy os "veja" e registre no metadata interno.</p>
      ${py(`def register_models():
    """Importa todos os módulos com modelos."""
    import taskflow.auth.models
    import taskflow.projects.models
    import taskflow.tasks.models`)}
      <p><strong>Por que precisa?</strong> O SQLAlchemy só conhece uma tabela quando a classe é <strong>importada em algum lugar</strong>. Se ninguém importar <code>models.py</code>, a classe <code>User</code> nunca é lida, e o db não sabe que existe uma tabela "users".</p>
      <p><strong>O que acontece sem chamar:</strong></p>
      <ul>
        <li><code>db.create_all()</code> não cria as tabelas (ele só cria o que já foi registrado).</li>
        <li>Queries do tipo <code>User.query.all()</code> podem funcionar (o import na hora da query resolve), mas você fica dependendo do timing.</li>
        <li>Migrações (Alembic) ficam confusas — não veem tudo que existe.</li>
      </ul>
      <p>Chamar <code>register_models()</code> dentro da factory garante que <em>toda</em> a estrutura do banco é conhecida antes de qualquer operação.</p>` },

    { ref:'U6.9', type:'code',
      q:`Modele a restrição de que <strong>um usuário só pode ser membro de um projeto uma vez</strong>. Ou seja, na tabela ProjectMember, a combinação <code>(project_id, user_id)</code> deve ser única.`,
      solution:`${py(`from sqlalchemy import UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from taskflow.ext.db import db

class ProjectMember(db.Model):
    __tablename__ = "project_members"

    # Restrição composta de unicidade
    __table_args__ = (
        UniqueConstraint(
            "project_id",
            "user_id",
            name="uq_project_member_project_user"
        ),
    )

    id: Mapped[int] = mapped_column(
        db.Integer, primary_key=True
    )
    project_id: Mapped[int] = mapped_column(
        db.Integer,
        db.ForeignKey("projects.id"),
        nullable=False
    )
    user_id: Mapped[int] = mapped_column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )
    role: Mapped[str] = mapped_column(
        db.String(30),
        nullable=False,
        default="member"
    )`)}
      <p><strong>Como funciona:</strong> a <code>UniqueConstraint("project_id", "user_id")</code> diz ao banco: "a combinação desses dois campos precisa ser única na tabela toda".</p>
      <p>Se você tentar inserir Ana como membro do Projeto X duas vezes, o banco recusa com <code>IntegrityError</code>.</p>
      <p><strong>Nota:</strong> a tupla <code>__table_args__</code> precisa da vírgula final se tiver só um elemento, senão vira uma expressão comum, não uma tupla.</p>` },

    { ref:'U6.10', type:'reflection',
      q:`Qual a diferença entre <code>db.create_all()</code> e usar um sistema de <strong>migrações</strong> como o Alembic (via Flask-Migrate)? Em que situação usar cada um?`,
      solution:`<p><strong><code>db.create_all()</code></strong>: olha os modelos atuais e cria as tabelas <em>do zero</em>. Se a tabela já existe, ele <strong>ignora</strong> — não altera nada. É um "instalador inicial".</p>
      <p><strong>Alembic (Flask-Migrate)</strong>: gera arquivos de <strong>migração versionada</strong> a cada mudança no modelo. Cada migração descreve como sair do estado A para o estado B. Aplicável em ordem.</p>
      <p><strong>Quando usar <code>create_all()</code>:</strong></p>
      <ul>
        <li>Protótipos e projetos didáticos.</li>
        <li>Testes automatizados (banco em memória, criado do zero a cada teste).</li>
        <li>Primeira instalação em desenvolvimento.</li>
      </ul>
      <p><strong>Quando usar Alembic:</strong></p>
      <ul>
        <li>Produção — quando o banco JÁ tem dados que você não pode perder.</li>
        <li>Quando o modelo evolui e você precisa <em>alterar</em> tabelas existentes.</li>
        <li>Quando há vários ambientes (dev, staging, prod) que precisam evoluir em sincronia.</li>
      </ul>
      <p><strong>Motivo prático:</strong> <code>create_all()</code> não sabe <em>alterar</em> tabelas. Se você adicionar uma coluna nova, ele não cria a coluna em produção — só cria a tabela se ainda não existir. Alembic gera o <code>ALTER TABLE</code> específico.</p>` }
  ]
};


/* =========================================================
   REGISTRO DE MATÉRIAS
   Cada matéria expõe: name, slug, description, lessons, questions.
   ========================================================= */

const SUBJECTS = {
  web: {
    slug: 'web',
    name: 'Desenvolvimento de Sistemas para Web',
    short: 'Web Avançada',
    description: 'Python, HTTP, REST, Flask, ORM. 6 unidades — do zero até uma API estruturada.',
    color: '#7c9cff',
    lessons: LESSONS,
    questions: QUESTOES,
    // ordem das páginas na aba de questões
    questionTabs: [
      { key: 'u1', label: 'Unidade 1 — Python' },
      { key: 'u2', label: 'Unidade 2 — HTTP/REST' },
      { key: 'u3', label: 'Unidade 3 — Flask' },
      { key: 'u4', label: 'Unidade 4 — Factory/Contexto' },
      { key: 'u5', label: 'Unidade 5 — Empacotamento' },
      { key: 'u6', label: 'Unidade 6 — Modelos/ORM' }
    ],
    // ordem das aulas na home
    lessonList: [
      { key: 'u1', num: '1', title: 'Python básico', desc: 'Variáveis, funções, listas, classes, decorators.' },
      { key: 'u2', num: '2', title: 'HTTP, APIs e REST', desc: 'Cliente-servidor, métodos, status codes, REST.' },
      { key: 'u3', num: '3', title: 'Flask — primeira aplicação', desc: 'venv, rotas, blueprints, application factory.' },
      { key: 'u4', num: '4', title: 'Application Factory e Contexto', desc: 'Import circular, DI, 3 contextos, 4 proxies.' },
      { key: 'u5', num: '5', title: 'Empacotamento, deps e testes', desc: 'pyproject.toml, invoke, PyTest, cobertura.' },
      { key: 'u6', num: '6', title: 'Modelos, ORM e persistência', desc: 'Flask-SQLAlchemy, entidades, relacionamentos.' }
    ]
  }
  // 'ed2' é registrada em data-ed2.js
};

