from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parent.parent


def make_icon(size: int) -> None:
    image = Image.new("RGB", (size, size), "#FBBF24")
    draw = ImageDraw.Draw(image)
    margin = round(size * 0.16)
    stroke = max(6, round(size * 0.045))
    navy = "#13213C"
    draw.rounded_rectangle((margin, margin, size - margin, size - margin), radius=round(size * 0.16), fill=navy)
    center = size / 2
    outer = size * 0.205
    inner = size * 0.072
    draw.ellipse((center - outer, center - outer, center + outer, center + outer), outline="#FBBF24", width=stroke)
    draw.ellipse((center - inner, center - inner, center + inner, center + inner), fill="#FFFDF7")
    image.save(ROOT / f"icon-{size}.png", optimize=True)


for icon_size in (192, 512):
    make_icon(icon_size)
