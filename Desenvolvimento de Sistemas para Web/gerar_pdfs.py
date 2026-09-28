"""
Gera dois PDFs a partir do banco de questões:
- Questoes.pdf              (só perguntas, para resolver no papel)
- Questoes_Respondidas.pdf  (com resposta correta marcada e explicação)
"""

import json
import re
from fpdf import FPDF

QUESTIONS_PATH = "questions.json"

UNIT_TITLES = {
    "u1": "Unidade 1 — Python essencial",
    "u2": "Unidade 2 — HTTP, REST e http.server",
    "u3": "Unidade 3 — Flask e primeira aplicação",
    "u4": "Unidade 4 — Application Factory e Contexto",
}

LETTERS = ["A", "B", "C", "D", "E"]

# ---------- limpeza de HTML/entidades ----------
def clean_html(text: str) -> str:
    """Remove tags HTML e decodifica entidades básicas."""
    # <code>x</code> -> `x`
    text = re.sub(r"<code>(.*?)</code>", r"`\1`", text, flags=re.DOTALL)
    text = re.sub(r"<strong>(.*?)</strong>", r"\1", text, flags=re.DOTALL)
    text = re.sub(r"<em>(.*?)</em>", r"\1", text, flags=re.DOTALL)
    text = re.sub(r"<br\s*/?>", "\n", text)
    text = re.sub(r"<[^>]+>", "", text)
    # entidades
    text = text.replace("&lt;", "<").replace("&gt;", ">")
    text = text.replace("&amp;", "&").replace("&nbsp;", " ")
    text = text.replace("&quot;", '"').replace("&#39;", "'")
    return text.strip()

def sanitize(text: str) -> str:
    """Substitui caracteres unicode que a fonte helvetica não suporta."""
    replacements = {
        "≠": "!=", "→": "->", "←": "<-", "⇒": "=>", "⇐": "<=",
        "×": "x", "•": "-", "…": "...", "–": "-", "—": "-",
        "“": '"', "”": '"', "‘": "'", "’": "'",
        "✓": "OK", "✗": "X", "🎯": "", "📖": "",
    }
    for k, v in replacements.items():
        text = text.replace(k, v)
    # remover emojis genéricos remanescentes
    text = re.sub(r"[\U00010000-\U0010ffff]", "", text)
    return text


# ---------- PDF base ----------
class QuestPDF(FPDF):
    def __init__(self, title, subtitle):
        super().__init__(format="A4")
        self.title_text = title
        self.subtitle_text = subtitle
        self.set_auto_page_break(auto=True, margin=18)
        self.set_margins(left=18, top=18, right=18)

    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("Helvetica", "B", 9)
        self.set_text_color(120, 120, 120)
        self.cell(0, 6, sanitize(self.title_text), align="L")
        self.cell(0, 6, f"pág. {self.page_no()}", align="R")
        self.ln(8)
        self.set_draw_color(220, 220, 220)
        self.line(18, self.get_y(), 210 - 18, self.get_y())
        self.ln(4)
        self.set_text_color(0, 0, 0)

    def cover(self):
        self.add_page()
        self.set_fill_color(30, 30, 60)
        self.rect(0, 0, 210, 297, "F")
        self.set_text_color(255, 255, 255)
        # Título
        self.set_xy(18, 80)
        self.set_font("Helvetica", "B", 26)
        self.multi_cell(w=174, h=12, text=sanitize(self.title_text), align="C")
        self.ln(4)
        self.set_x(18)
        self.set_font("Helvetica", "", 13)
        self.multi_cell(w=174, h=8, text=sanitize(self.subtitle_text), align="C")
        self.ln(24)
        self.set_x(18)
        self.set_font("Helvetica", "", 12)
        self.multi_cell(w=174, h=7, text="Programacao Web Avancada", align="C")
        self.set_x(18)
        self.multi_cell(w=174, h=7, text="Universidade de Vila Velha", align="C")
        self.ln(28)
        self.set_x(18)
        self.set_font("Helvetica", "I", 10)
        self.multi_cell(w=174, h=6,
            text=("Este documento foi gerado a partir do banco de questoes\n"
                  "estruturado no site de estudos (index.html).\n"
                  "Cada questao traz o topico e a unidade correspondente."),
            align="C"
        )
        self.set_text_color(0, 0, 0)

    def unit_heading(self, unit_key):
        if self.get_y() > 230:
            self.add_page()
        self.set_x(18)
        self.ln(6)
        self.set_fill_color(139, 92, 246)
        self.set_text_color(255, 255, 255)
        self.set_font("Helvetica", "B", 14)
        title = sanitize(UNIT_TITLES[unit_key])
        self.set_x(18)
        self.cell(w=174, h=11, text="  " + title, fill=True)
        self.ln(15)
        self.set_text_color(0, 0, 0)

    def write_question(self, idx, q, show_answer=False):
        if self.get_y() > 240:
            self.add_page()

        self.set_x(18)
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(139, 92, 246)
        self.cell(12, 7, f"{idx}.")
        self.set_text_color(60, 60, 60)
        self.set_font("Helvetica", "", 8)
        topic = sanitize(q.get("topic", ""))
        self.cell(0, 7, f"[{topic}]", align="R")
        self.ln(6)

        self.set_x(18)
        self.set_text_color(0, 0, 0)
        self.set_font("Helvetica", "", 11)
        text = sanitize(clean_html(q["q"]))
        self.multi_cell(w=174, h=6, text=text)
        self.ln(2)

        for i, opt in enumerate(q["opts"]):
            letter = LETTERS[i]
            opt_text = sanitize(clean_html(opt))
            is_correct = show_answer and i == q["correct"]
            self.set_x(18)
            if is_correct:
                self.set_font("Helvetica", "B", 11)
                self.set_text_color(30, 130, 60)
                marker = f"( X ) {letter})"
            else:
                self.set_font("Helvetica", "", 11)
                self.set_text_color(0, 0, 0)
                marker = f"(   ) {letter})"
            self.cell(20, 6, marker)
            # texto da opção
            self.multi_cell(w=154, h=6, text=opt_text)
        self.set_text_color(0, 0, 0)

        if show_answer:
            self.ln(1)
            self.set_x(18)
            explain = sanitize(clean_html(q["explain"]))
            self.set_font("Helvetica", "I", 10)
            self.set_text_color(80, 80, 80)
            self.set_fill_color(240, 240, 250)
            self.multi_cell(w=174, h=5.5, text=f"Por que: {explain}", fill=True)
            self.set_text_color(0, 0, 0)

        self.ln(6)


def gerar_pdf(questions, path, title, subtitle, show_answers):
    pdf = QuestPDF(title=title, subtitle=subtitle)
    pdf.cover()

    # Índice/resumo simples na página 2
    pdf.add_page()
    pdf.set_xy(18, 20)
    pdf.set_font("Helvetica", "B", 16)
    pdf.multi_cell(w=174, h=10, text=sanitize("Sumario"))
    pdf.ln(2)
    pdf.set_font("Helvetica", "", 11)
    for uk in ["u1", "u2", "u3", "u4"]:
        count = sum(1 for q in questions if q["unit"] == uk)
        pdf.set_x(18)
        pdf.multi_cell(w=174, h=7, text=sanitize(f"- {UNIT_TITLES[uk]}  ({count} questoes)"))
    pdf.ln(4)
    pdf.set_font("Helvetica", "I", 10)
    pdf.set_text_color(90, 90, 90)
    pdf.set_x(18)
    if show_answers:
        pdf.multi_cell(w=174, h=6, text=sanitize(
            "Este e o gabarito. A resposta correta esta marcada com (X) e ha uma "
            "explicacao curta abaixo. Use apos tentar responder por conta propria."))
    else:
        pdf.multi_cell(w=174, h=6, text=sanitize(
            "Este e o caderno de questoes. Marque suas respostas nas caixas ( ). "
            "Depois, confira no arquivo com gabarito."))
    pdf.set_text_color(0, 0, 0)

    idx = 0
    current_unit = None
    for q in questions:
        if q["unit"] != current_unit:
            current_unit = q["unit"]
            pdf.unit_heading(current_unit)
            idx_in_unit = 0
        idx += 1
        idx_in_unit += 1
        pdf.write_question(idx_in_unit, q, show_answer=show_answers)

    pdf.output(path)
    print(f"Gerado: {path}")


def main():
    with open(QUESTIONS_PATH, "r", encoding="utf-8") as f:
        questions = json.load(f)

    # Ordenar por unidade
    order = {"u1": 0, "u2": 1, "u3": 2, "u4": 3}
    questions.sort(key=lambda q: (order[q["unit"]], q["id"]))

    gerar_pdf(
        questions,
        path="Questoes.pdf",
        title="Questões — Programação Web Avançada",
        subtitle="Caderno de questões (sem gabarito)",
        show_answers=False,
    )
    gerar_pdf(
        questions,
        path="Questoes_Respondidas.pdf",
        title="Questões Respondidas — Programação Web Avançada",
        subtitle="Gabarito comentado",
        show_answers=True,
    )


if __name__ == "__main__":
    main()
