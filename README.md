# Programação Web Avançada — UVV

Site de estudos da matéria de Desenvolvimento de Sistemas para Web na UVV.

**Acesse:** [https://ricardocaldarap.github.io/uvv-web-avancada/](https://ricardocaldarap.github.io/uvv-web-avancada/)

## O que tem aqui

- **6 aulas** em formato de slides (fullscreen, uma ideia por tela, com ilustrações SVG).
- **Questões** originais dos PDFs (Unidades 1–4) + atividades práticas (Unidades 5–6).
- **PDFs gerados** com as questões (só perguntas / com gabarito).

## Estrutura

```
UVV/
├── site/                      # site de estudos (deployado no Pages)
│   ├── index.html
│   ├── css/style.css
│   └── js/{data.js, app.js}
├── gerar_pdfs.py              # script que gera os PDFs de questões
├── questions.json             # banco de questões exportado
├── Questoes.pdf               # caderno em branco
└── Questoes_Respondidas.pdf   # com gabarito comentado
```

## Rodar localmente

Basta abrir `site/index.html` no navegador. Não precisa de servidor.

## Deploy

O deploy no GitHub Pages é automático via GitHub Actions
(veja `.github/workflows/pages.yml`) — a cada push em `main`
o site em `site/` é publicado.
