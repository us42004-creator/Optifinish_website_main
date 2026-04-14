from pathlib import Path
import re

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import ListFlowable, ListItem, PageBreak, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path("/Users/utkarshsharma/Desktop/Optifinish_website_main")
SOURCE = ROOT / "documentation" / "optifinish-website-master-report.md"
OUTPUT = ROOT / "documentation" / "optifinish-website-master-report.pdf"


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="ReportTitle",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=26,
            spaceAfter=12,
            textColor=colors.HexColor("#111111"),
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ReportSubtitle",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            spaceAfter=10,
            textColor=colors.HexColor("#333333"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="ReportH1",
            parent=styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=16,
            leading=20,
            spaceBefore=16,
            spaceAfter=8,
            textColor=colors.HexColor("#111111"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="ReportH2",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=17,
            spaceBefore=12,
            spaceAfter=6,
            textColor=colors.HexColor("#111111"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="ReportH3",
            parent=styles["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=15,
            spaceBefore=10,
            spaceAfter=5,
            textColor=colors.HexColor("#222222"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="ReportBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=10.5,
            leading=15,
            spaceAfter=7,
            textColor=colors.HexColor("#222222"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="ReportCode",
            parent=styles["Code"],
            fontName="Courier",
            fontSize=8.7,
            leading=11,
            leftIndent=8,
            rightIndent=8,
            spaceBefore=4,
            spaceAfter=8,
            backColor=colors.HexColor("#F5F5F5"),
        )
    )
    return styles


def format_inline(text: str) -> str:
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    text = re.sub(r"`([^`]+)`", r"<font name='Courier'>\1</font>", text)
    return text


def parse_markdown(path: Path, styles):
    lines = path.read_text().splitlines()
    story = []
    in_code = False
    code_lines = []
    bullet_buffer = []

    def flush_bullets():
        nonlocal bullet_buffer
        if not bullet_buffer:
            return
        items = [
            ListItem(Paragraph(format_inline(item), styles["ReportBody"]))
            for item in bullet_buffer
        ]
        story.append(
            ListFlowable(
                items,
                bulletType="bullet",
                start="circle",
                leftIndent=16,
                bulletFontName="Helvetica",
            )
        )
        story.append(Spacer(1, 4))
        bullet_buffer = []

    def flush_code():
        nonlocal code_lines
        if not code_lines:
            return
        code = "<br/>".join(format_inline(line) for line in code_lines)
        story.append(Paragraph(code, styles["ReportCode"]))
        code_lines = []

    for line in lines:
        stripped = line.strip()

        if stripped.startswith("```"):
            flush_bullets()
            if in_code:
                flush_code()
                in_code = False
            else:
                in_code = True
            continue

        if in_code:
            code_lines.append(line.rstrip())
            continue

        if stripped == "---":
            flush_bullets()
            story.append(Spacer(1, 6))
            continue

        if not stripped:
            flush_bullets()
            story.append(Spacer(1, 4))
            continue

        if stripped.startswith("- "):
            bullet_buffer.append(stripped[2:].strip())
            continue

        flush_bullets()

        if stripped.startswith("# "):
            story.append(Paragraph(format_inline(stripped[2:]), styles["ReportTitle"]))
        elif stripped.startswith("## "):
            story.append(Paragraph(format_inline(stripped[3:]), styles["ReportH1"]))
        elif stripped.startswith("### "):
            story.append(Paragraph(format_inline(stripped[4:]), styles["ReportH2"]))
        elif stripped.startswith("#### "):
            story.append(Paragraph(format_inline(stripped[5:]), styles["ReportH3"]))
        elif re.match(r"^\d+\.\s+", stripped):
            story.append(Paragraph(format_inline(stripped), styles["ReportBody"]))
        else:
            story.append(Paragraph(format_inline(stripped), styles["ReportBody"]))

    flush_bullets()
    flush_code()
    return story


def add_page_number(canvas, doc):
    canvas.setFont("Helvetica", 9)
    canvas.setFillColor(colors.HexColor("#666666"))
    canvas.drawRightString(doc.pagesize[0] - 18 * mm, 12 * mm, f"Page {doc.page}")


def main():
    styles = build_styles()
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title="OptiFinish Website Master Report",
        author="OpenAI Codex",
    )
    story = parse_markdown(SOURCE, styles)
    doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
    print(OUTPUT)


if __name__ == "__main__":
    main()
