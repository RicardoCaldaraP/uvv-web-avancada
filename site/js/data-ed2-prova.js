/* =========================================================
   PROVA ORIGINAL — LOCAL ONLY (não versionado no git)
   Estrutura de Dados II — 1º bimestre 2026/1 — Prof. Wayner M Marcelino
   Questões transcritas para uso pessoal de estudo.
   ========================================================= */

if (typeof SUBJECTS !== 'undefined' && SUBJECTS.ed2) {

  SUBJECTS.ed2.questionTabs.unshift({ key: 'prova_original', label: '📄 Prova original' });

  SUBJECTS.ed2.questions.prova_original = [

    {
      ref: 'Q1 (0,5 pt)', type: 'mcq',
      q: `Considere um sistema de armazenamento em disco que utiliza uma Árvore B de <strong>ordem 4</strong> para organizar chaves inteiras. O processo de inserção das chaves envolve a busca pelo nó onde deve ser inserida a chave e aplicação do método de particionamento e promoção, quando necessário.<br><br>
      A figura abaixo mostra o estado da árvore B após a inserção das chaves <strong>10, 20, 30, 35, 40, 60, 70, 80 e 50</strong> na ordem apresentada.
      <pre style="text-align:center; margin:12px auto;">        [30, 60]
       /    |    \\
  [10,20] [35,40,50] [70,80]</pre>
      Quais serão as chaves do <strong>nó raiz</strong> após a inserção de uma nova chave cujo valor é <strong>55</strong>?`,
      opts: ['30, 55, 60', '30, 60, 80', '30, 35, 60', '30, 50, 60'],
      correct: 3,
      explain: `55 cai na folha [35, 40, 50] (entre 30 e 60 na raiz). A folha estava cheia (3 chaves = máx pra ordem 4). Adicionando 55: [35, 40, 50, 55] — estouro. Meio (posição ⌊4/2⌋ = 2) = 50. Promove 50 pra raiz. Folha vira [35, 40] e [55]. Raiz vira <strong>[30, 50, 60]</strong>.`
    },

    {
      ref: 'Q2 (0,5 pt)', type: 'mcq',
      q: `Na implementação de uma árvore-B, o aluno definiu a constante K e o nó da árvore da seguinte forma:
      <pre style="margin:10px 0;">#define K 4

struct _no {
    int contator;
    int chaves[2*K - 1];
    struct _no *filhos[2*K];
}</pre>
      Assinale a alternativa que corresponde à <strong>ordem</strong> da árvore-B implementada.`,
      opts: ['3', '4', '7', '8'],
      correct: 3,
      explain: `A ordem de uma árvore B é o número máximo de filhos por nó = tamanho do array <code>filhos</code>. Como <code>filhos[2*K]</code> com K=4, temos <strong>filhos[8]</strong> → ordem <strong>8</strong>. Confirma: máx chaves = 8-1 = 7, batendo com <code>chaves[7]</code>.`
    },

    /* --- Q3, Q4, Q5, Q6: faltam fotos das páginas do meio da prova --- */
    {
      ref: 'Q3', type: 'reflection',
      q: `<em>[Enunciado não disponível — falta foto da página 2 da prova.]</em><br><br>Gabarito oficial: alternativa <strong>C</strong>.`,
      solution: `<p>Sem o enunciado, não dá pra montar a resolução. Se você tirar uma foto legível dessa questão, me manda que eu adiciono.</p>`
    },
    {
      ref: 'Q4', type: 'reflection',
      q: `<em>[Enunciado não disponível — falta foto da página 2 da prova.]</em><br><br>Gabarito oficial: alternativa <strong>B</strong>.`,
      solution: `<p>Sem o enunciado, não dá pra montar a resolução. Se você tirar uma foto legível dessa questão, me manda que eu adiciono.</p>`
    },
    {
      ref: 'Q5', type: 'reflection',
      q: `<em>[Enunciado não disponível — falta foto da página 2 da prova.]</em><br><br>Gabarito oficial: alternativa <strong>C</strong>.`,
      solution: `<p>Sem o enunciado, não dá pra montar a resolução. Se você tirar uma foto legível dessa questão, me manda que eu adiciono.</p>`
    },
    {
      ref: 'Q6', type: 'mcq',
      q: `<em>[Enunciado parcial — só a alternativa D foi visível na foto.]</em><br><br>Sobre estratégias para reduzir custo de acesso a arquivos em memória secundária, assinale a alternativa que descreve uma técnica eficaz.`,
      opts: [
        '<em>(alternativa A: enunciado não disponível)</em>',
        '<em>(alternativa B: enunciado não disponível — resposta correta segundo o gabarito)</em>',
        '<em>(alternativa C: enunciado não disponível)</em>',
        'Agrupar os registros em blocos fixos (blocagem) para reduzir o número de seeks.'
      ],
      correct: 1,
      explain: `Gabarito oficial marca B como correta. Sem o enunciado completo das alternativas A, B e C, não é possível justificar por que a D também não seria válida (blocagem é sim técnica válida). Provavelmente B trata de uma técnica ainda mais fundamental (indexação? organização em árvore B?). Precisa da foto pra confirmar.`
    },

    {
      ref: 'Q7 (2 pt)', type: 'code',
      q: `Considere a função recursiva em C apresentada a seguir:
      <pre style="margin:10px 0;">int soma(int v[], int n) {
    if (n == 0) return 0;
    return v[n-1] + soma(v, n-1);
}</pre>
      <strong>a)</strong> Identifique o caso base e o passo recursivo da função, explicando por que essa implementação <strong>não</strong> caracteriza uma recursão de cauda. <em>(0,5 ponto)</em><br><br>
      <strong>b)</strong> Reescreva a função apresentada utilizando recursão de cauda, mantendo o comportamento lógico. Explique brevemente qual é a principal vantagem dessa forma de recursão. <em>(1,5 ponto)</em>`,
      solution: `<h5>Parte (a)</h5>
      <p><strong>Caso base:</strong> <code>if (n == 0) return 0;</code> — quando o vetor "acabou", retorna 0 (elemento neutro da soma).</p>
      <p><strong>Passo recursivo:</strong> <code>return v[n-1] + soma(v, n-1);</code> — pega o último elemento do vetor e soma com o resultado da chamada recursiva para os n-1 primeiros elementos.</p>
      <p><strong>Por que NÃO é recursão de cauda:</strong> depois que a chamada <code>soma(v, n-1)</code> retorna, ainda é necessário executar uma <strong>soma</strong> com <code>v[n-1]</code>. Ou seja, existe trabalho pendente após a chamada recursiva — ela não é a última operação. Cada frame na pilha precisa "esperar" o retorno da chamada seguinte para completar a soma, então todos os n frames ficam empilhados simultaneamente.</p>

      <h5>Parte (b) — versão de cauda com acumulador</h5>
      <pre style="margin:10px 0;">int soma_aux(int v[], int n, int acc) {
    if (n == 0) return acc;
    return soma_aux(v, n - 1, acc + v[n-1]);
    /* chamada recursiva é a ÚLTIMA operação */
}

int soma(int v[], int n) {
    return soma_aux(v, n, 0);   /* acc começa em 0 (neutro da soma) */
}</pre>
      <p><strong>Principal vantagem:</strong> como a chamada recursiva é a última operação executada, um compilador que faz Tail Call Optimization (TCO) pode <strong>reaproveitar o mesmo frame de pilha</strong> em vez de empilhar um novo a cada chamada. Isso reduz o consumo de memória de O(n) para <strong>O(1)</strong>, permitindo recursões arbitrariamente grandes sem risco de <em>stack overflow</em>. Na prática, o compilador converte a recursão num loop.</p>`
    },

    {
      ref: 'Q8 (2 pt)', type: 'code',
      q: `Um sistema de processamento de dados utiliza ordenação externa para organizar registros armazenados em memória secundária. O arquivo A contém registros identificados pelas seguintes chaves numéricas:
      <pre style="margin:10px 0;">A: 50, 12, 8, 17, 65, 4, 65, 1, 12, 6, 7, 2, 41, 43, 91, 8, 33, 23, 25</pre>
      Faça o que se pede considerando que:
      <ul>
        <li>A memória principal comporta <strong>m = 3</strong> registros por vez;</li>
        <li>É utilizada intercalação balanceada de <strong>4 caminhos (f = 4)</strong>, com 2f fitas.</li>
      </ul>
      <strong>a)</strong> Calcule quantas passadas no arquivo serão necessárias até obter o arquivo totalmente ordenado. <em>(0,75 ponto)</em><br><br>
      <strong>b)</strong> Ordene o arquivo A empregando intercalação balanceada implementada com <strong>seleção por substituição</strong> para a geração das rodadas iniciais. <em>(0,75 ponto)</em><br><br>
      <strong>c)</strong> Compare as soluções obtidas nos itens (a) e (b) quanto ao número de passadas necessárias para a ordenação completa do arquivo. <em>(0,5 ponto)</em>`,
      solution: `<p>O arquivo A tem N = 19 registros (contando as chaves listadas).</p>

      <h5>Parte (a) — sem seleção por substituição</h5>
      <p>Com m = 3 e sem seleção por substituição, cada run inicial tem no máximo m = 3 registros.</p>
      <pre style="margin:10px 0;">Runs iniciais = ⌈N / m⌉ = ⌈19 / 3⌉ = 7 runs

Fórmula das passadas de merge:
  P = ⌈log_f (N/m)⌉ + 1
  P = ⌈log_4 (19/3)⌉ + 1
  P = ⌈log_4 (6,33)⌉ + 1
  P = ⌈1,33⌉ + 1
  P = 2 + 1 = <strong>3 passadas</strong></pre>
      <p><strong>Detalhamento das passadas:</strong></p>
      <ul>
        <li><strong>Passada 1 (geração):</strong> lê grupos de 3, ordena em RAM, grava. Resultado: 7 runs de tamanho 3 (a última com só 1 registro).</li>
        <li><strong>Passada 2 (merge):</strong> intercala as 7 runs em grupos de 4 → 2 runs (uma com 12 registros, outra com 7).</li>
        <li><strong>Passada 3 (merge):</strong> intercala as 2 runs restantes → 1 run com 19 registros ordenados.</li>
      </ul>

      <h5>Parte (b) — com seleção por substituição</h5>
      <p>Com seleção por substituição, as runs iniciais têm em média tamanho <strong>2m = 6</strong>.</p>
      <pre style="margin:10px 0;">Runs iniciais ≈ ⌈N / 2m⌉ = ⌈19 / 6⌉ = 4 runs

P = ⌈log_4 (19/6)⌉ + 1
P = ⌈log_4 (3,17)⌉ + 1
P = ⌈0,83⌉ + 1
P = 1 + 1 = <strong>2 passadas</strong></pre>
      <p><strong>Simulação da geração via seleção por substituição:</strong></p>
      <pre style="margin:10px 0;">Entrada: 50, 12, 8, 17, 65, 4, 65, 1, 12, 6, 7, 2, 41, 43, 91, 8, 33, 23, 25

Enche heap com {50, 12, 8}. Escreve 8. Lê 17 (≥8, entra).
Heap {50, 12, 17}. Escreve 12. Lê 65 (≥12, entra).
Heap {50, 17, 65}. Escreve 17. Lê 4 (< 17, congela p/ run 2).
Heap {50, 65}. Escreve 50. Lê 65 (≥50, entra). Escreve 65. Lê 1 (< 65, congela).
Heap {65}. Escreve 65. Run 1 = [8, 12, 17, 50, 65, 65]

Congelados {4, 1} viram heap ativo da run 2. E assim por diante.</pre>
      <p>Resultado aproximado: runs de tamanhos ~6, ~6, ~4, ~3 (4 runs no total).</p>

      <h5>Parte (c) — comparação</h5>
      <p>Sem seleção por substituição: <strong>3 passadas</strong>.<br>Com seleção por substituição: <strong>2 passadas</strong>.</p>
      <p>Economia de <strong>1 passada inteira</strong>, o que representa ler + escrever o arquivo todo uma vez a menos — redução de aproximadamente 33% no custo total de I/O. Essa é a razão pela qual seleção por substituição é uma técnica valiosa: aproveita ordem parcial dos dados de entrada pra gerar runs mais longas, reduzindo passadas de merge subsequentes.</p>`
    }
  ];

  console.log('[data-ed2-prova] Prova original carregada — %d questões',
              SUBJECTS.ed2.questions.prova_original.length);
}
