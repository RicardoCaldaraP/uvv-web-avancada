# UVV — Estudos

Site multi-matéria de estudos.

**Acesse:** [https://ricardocaldarap.github.io/uvv-web-avancada/](https://ricardocaldarap.github.io/uvv-web-avancada/)

## Matérias incluídas

### Desenvolvimento de Sistemas para Web (Programação Web Avançada)
6 unidades — Python, HTTP, REST, Flask, ORM.

### Estrutura de Dados II
6 unidades — Arquivos, Análise de Algoritmos, Recursividade, Ordenação em memória externa,
Árvores (ABB → AVL → árvore B), Indexação de string. Inclui simulado de prova.

## Como o site funciona

- **Home** — escolhe a matéria.
- **Home da matéria** — lista de aulas + botão pras questões.
- **Aula** — slides tela cheia. Setas do teclado, espaço ou clique. Tecla **T** abre o índice de tópicos.
- **Questões** — abas por unidade, MCQ com feedback imediato ou questões abertas com "ver solução".

## Estrutura de pastas

```
UVV/
├── site/                              # site (deployado)
│   ├── index.html
│   ├── css/style.css
│   └── js/{data.js, data-ed2.js, app.js}
├── Desenvolvimento de Sistemas para Web/
│   └── (PDFs originais, script gerar_pdfs.py, PDFs de questões)
└── Estrutura de Dados II/
    ├── PlanoDisciplina_*.pdf          # ementa
    ├── Prova/                         # fotos da prova
    └── Caderno/                       # anotações
```

## Rodar localmente

Basta abrir `site/index.html` no navegador. Não precisa de servidor.

## Deploy

O deploy acontece automaticamente a cada push em `main` via GitHub Actions
(veja `.github/workflows/pages.yml`).
