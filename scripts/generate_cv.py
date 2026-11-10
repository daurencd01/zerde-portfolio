"""Generate one-page monochrome resumes from verified portfolio facts."""

from pathlib import Path

from reportlab.lib.colors import black, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
PAGE_W, PAGE_H = A4
MARGIN = 50
WIDTH = PAGE_W - 2 * MARGIN

pdfmetrics.registerFont(TTFont("ResumeRegular", r"C:\Windows\Fonts\arial.ttf"))
pdfmetrics.registerFont(TTFont("ResumeBold", r"C:\Windows\Fonts\arialbd.ttf"))

RESUMES = [
    {
        "output": ROOT / "public" / "cv-zerde-kanat.pdf",
        "name": "ЗЕРДЕ КАНАТ",
        "role": "Будущий преподаватель химии и биологии",
        "location": "Семей, Казахстан",
        "profile_title": "ПРОФИЛЬ",
        "profile": (
            "Студентка 4 курса программы «Химия-Биология» Shakarim University. "
            "Прошла педагогическую практику в школах Семея: проводила занятия "
            "по химии и биологии, работала с учащимися и готовила методические материалы."
        ),
        "education_title": "ОБРАЗОВАНИЕ",
        "university": "Shakarim University, Семей",
        "program": "6B01509 «Химия-Биология» · бакалавриат, педагогическое направление",
        "period": "2023 - настоящее время · 4 курс",
        "gpa": "Академический GPA: 3.12 / 4.0",
        "practice_title": "ПЕДАГОГИЧЕСКАЯ ПРАКТИКА",
        "practice": [
            (
                "Гимназия №6, Семей",
                "12 января - 13 февраля 2026",
                "Проводила уроки химии и биологии, взаимодействовала с учащимися.",
            ),
            (
                "Школа №16 имени Т. Айманова, Семей",
                "21 - 27 апреля 2025",
                "Участвовала в учебном процессе и готовила методические материалы.",
            ),
        ],
        "skills_title": "ПРОФЕССИОНАЛЬНЫЕ НАВЫКИ",
        "skills": [
            "Проведение занятий по химии и биологии",
            "Подготовка методических материалов",
            "Взаимодействие с учащимися во время школьной практики",
        ],
        "languages_title": "ЯЗЫКИ И СЕРТИФИКАТ",
        "languages": "Казахский - родной · Русский - A1 · Турецкий - B1",
        "certificate": "Сертификат по турецкому языку (B1) доступен в портфолио.",
    },
    {
        "output": ROOT / "public" / "cv-zerde-kanat-kz.pdf",
        "name": "ЗЕРДЕ ҚАНАТ",
        "role": "Болашақ химия және биология мұғалімі",
        "location": "Семей, Қазақстан",
        "profile_title": "ҚЫСҚАША МӘЛІМЕТ",
        "profile": (
            "Шәкәрім университетінің 6B01509 «Химия-Биология» білім беру "
            "бағдарламасының 4-курс студенті. Семей мектептерінде педагогикалық тәжірибеден өтті: "
            "химия және биология сабақтарын өткізді, оқушылармен жұмыс істеді және "
            "әдістемелік материалдар дайындады."
        ),
        "education_title": "БІЛІМІ",
        "university": "Шәкәрім университеті, Семей",
        "program": "6B01509 «Химия-Биология» · педагогика бакалавриаты",
        "period": "2023 - қазіргі уақыт · 4-курс",
        "gpa": "Академиялық GPA: 3.12 / 4.0",
        "practice_title": "ПЕДАГОГИКАЛЫҚ ТӘЖІРИБЕ",
        "practice": [
            (
                "Семей қаласының №6 гимназиясы",
                "2026 жылғы 12 қаңтар - 13 ақпан",
                "Химия және биология сабақтарын өткізіп, оқушылармен жұмыс істеді.",
            ),
            (
                "Т. Айманов атындағы №16 мектеп, Семей",
                "2025 жылғы 21 - 27 сәуір",
                "Оқу процесіне қатысып, әдістемелік материалдар дайындады.",
            ),
        ],
        "skills_title": "КӘСІБИ ДАҒДЫЛАР",
        "skills": [
            "Химия және биология сабақтарын өткізу",
            "Әдістемелік материалдар дайындау",
            "Мектептегі тәжірибе кезінде оқушылармен жұмыс істеу",
        ],
        "languages_title": "ТІЛДЕР ЖӘНЕ СЕРТИФИКАТ",
        "languages": "Қазақ тілі - ана тілі · Орыс тілі - A1 · Түрік тілі - B1",
        "certificate": "Түрік тілінің B1 сертификаты портфолиода қолжетімді.",
    },
]


def draw_text(pdf, value, x, y, width=WIDTH, font="ResumeRegular", size=10, leading=15):
    pdf.setFont(font, size)
    for line in simpleSplit(value, font, size, width):
        pdf.drawString(x, y, line)
        y -= leading
    return y


def draw_section(pdf, title, y):
    pdf.setLineWidth(0.6)
    pdf.line(MARGIN, y + 8, PAGE_W - MARGIN, y + 8)
    pdf.setFont("ResumeBold", 9)
    pdf.drawString(MARGIN, y - 6, title)
    return y - 31


def draw_resume(pdf, data):
    pdf.setFillColor(white)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    pdf.setFillColor(black)
    pdf.setStrokeColor(black)

    pdf.setFont("ResumeBold", 22)
    pdf.drawString(MARGIN, PAGE_H - 65, data["name"])
    pdf.setFont("ResumeRegular", 11)
    pdf.drawString(MARGIN, PAGE_H - 89, data["role"])

    contact_y = PAGE_H - 119
    pdf.setFont("ResumeRegular", 9.5)
    pdf.drawString(MARGIN, contact_y, data["location"])
    pdf.drawRightString(PAGE_W - MARGIN, contact_y, "+7 707 828 7473")
    pdf.drawString(MARGIN, contact_y - 17, "asoltankazy@gmail.com")
    pdf.drawRightString(PAGE_W - MARGIN, contact_y - 17, "zerde-portfolio.vercel.app")
    pdf.linkURL("mailto:asoltankazy@gmail.com", (MARGIN, contact_y - 20, 220, contact_y - 6), relative=0)
    pdf.linkURL("https://zerde-portfolio.vercel.app", (PAGE_W - 240, contact_y - 20, PAGE_W - MARGIN, contact_y - 6), relative=0)

    y = draw_section(pdf, data["profile_title"], PAGE_H - 176)
    y = draw_text(pdf, data["profile"], MARGIN, y, size=10, leading=16) - 22

    y = draw_section(pdf, data["education_title"], y)
    y = draw_text(pdf, data["university"], MARGIN, y, font="ResumeBold", size=10.5, leading=16)
    y = draw_text(pdf, data["program"], MARGIN, y, size=10, leading=16)
    y = draw_text(pdf, data["period"], MARGIN, y, size=9.5, leading=15)
    y = draw_text(pdf, data["gpa"], MARGIN, y, size=9.5, leading=15) - 21

    y = draw_section(pdf, data["practice_title"], y)
    for school, period, detail in data["practice"]:
        y = draw_text(pdf, school, MARGIN, y, font="ResumeBold", size=10.5, leading=16)
        y = draw_text(pdf, period, MARGIN, y, size=9.5, leading=15)
        y = draw_text(pdf, detail, MARGIN, y, size=10, leading=16) - 13

    y = draw_section(pdf, data["skills_title"], y)
    for skill in data["skills"]:
        pdf.setFont("ResumeRegular", 10)
        pdf.drawString(MARGIN + 2, y, "•")
        y = draw_text(pdf, skill, MARGIN + 17, y, WIDTH - 17, size=10, leading=17)
    y -= 15

    y = draw_section(pdf, data["languages_title"], y)
    y = draw_text(pdf, data["languages"], MARGIN, y, size=10, leading=16)
    y = draw_text(pdf, data["certificate"], MARGIN, y - 2, size=9.5, leading=15)

    if y < MARGIN:
        raise ValueError(f"Resume exceeds one A4 page: remaining y={y:.1f}")
    pdf.showPage()


def main():
    for data in RESUMES:
        output = data["output"]
        output.parent.mkdir(parents=True, exist_ok=True)
        pdf = canvas.Canvas(str(output), pagesize=A4, pageCompression=1)
        pdf.setTitle(f"{data['name']} - Resume")
        pdf.setAuthor(data["name"])
        draw_resume(pdf, data)
        pdf.save()
        print(output)


if __name__ == "__main__":
    main()
