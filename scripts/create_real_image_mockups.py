from pathlib import Path
import textwrap

from PIL import Image, ImageDraw, ImageFont, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "ui-mockups-real"
OUT.mkdir(exist_ok=True)

W = 1440
BG = "#FAFAF7"
WHITE = "#FFFFFF"
INK = "#111111"
TEXT = "#2A2A2A"
MUTED = "#6F6A64"
LINE = "#E8E3DC"
ORANGE = "#D96A21"
ORANGE_DARK = "#9E3F13"

FONT_JP = "/System/Library/Fonts/ヒラギノ角ゴシック W7.ttc"
FONT_SANS = "/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc"
FONT_EN = "/System/Library/Fonts/HelveticaNeue.ttc"


def font(size, bold=False, en=False):
    path = FONT_EN if en else (FONT_JP if bold else FONT_SANS)
    return ImageFont.truetype(path, size)


F = {
    "logo": font(18, bold=True, en=True),
    "nav": font(20, en=True),
    "h1": font(76, bold=True),
    "h2": font(42, bold=True),
    "h3": font(27, bold=True),
    "body": font(22),
    "small": font(16),
    "button": font(20, bold=True),
    "en": font(22, en=True),
    "en_small": font(16, en=True),
}


def img(name):
    return ROOT / name


ASSETS = {
    "logo": img("無題211_20250615015456 2のコピー.PNG"),
    "profile": img("IMG_4787のコピー.jpg"),
    "street": img("IMG_5698のコピー.jpg"),
    "mono": img("IMG_8688のコピー.jpg"),
    "live_blue": img("IMG_4781のコピー.jpg"),
    "live_red": img("IMG_4782のコピー.jpg"),
    "live_dark": img("IMG_4789のコピー.jpg"),
    "stage_1": img("DSC06663_Original 2のコピー.jpg"),
    "stage_2": img("DSC06792_Original 2のコピー.jpg"),
    "stage_3": img("DSC09383のコピー.JPEG"),
    "stage_4": img("DSC06830_Originalのコピー.jpg"),
}


PROFILE_TEXT = (
    "R-MANACは、大阪・堺を拠点に活動するアコギ・ループアーティスト。"
    "アコースティックギターとルーパーを使い、ギター、コーラス、パーカッションを"
    "その場で重ねながら、ひとりでバンドのような音像を作るライブスタイルで活動しています。\n\n"
    "パニック障害を経験し、一度は思うように動けない時期もありましたが、"
    "今は音楽を通して、自分の足で少しずつ表現を取り戻しています。\n\n"
    "音楽を競争や順位ではなく、聴く人と響き合うものとして届けたいと考えています。"
)


def canvas(h):
    im = Image.new("RGB", (W, h), BG)
    return im, ImageDraw.Draw(im)


def cover(path, size, focus=(0.5, 0.5)):
    src = Image.open(path).convert("RGB")
    sw, sh = src.size
    tw, th = size
    scale = max(tw / sw, th / sh)
    nw, nh = int(sw * scale), int(sh * scale)
    src = src.resize((nw, nh), Image.LANCZOS)
    fx, fy = focus
    left = max(0, min(nw - tw, int((nw - tw) * fx)))
    top = max(0, min(nh - th, int((nh - th) * fy)))
    return src.crop((left, top, left + tw, top + th))


def paste_cover(base, path, box, focus=(0.5, 0.5), dim=0):
    x, y, w, h = box
    crop = cover(path, (w, h), focus)
    if dim:
        overlay = Image.new("RGB", crop.size, (0, 0, 0))
        crop = Image.blend(crop, overlay, dim)
    base.paste(crop, (x, y))


def gradient_left(base, box, width=420):
    x, y, w, h = box
    grad = Image.new("RGBA", (width, h), (250, 250, 247, 0))
    gd = ImageDraw.Draw(grad)
    for i in range(width):
        a = int(255 * (1 - i / width))
        gd.line((i, 0, i, h), fill=(250, 250, 247, a))
    base.paste(grad, (x, y), grad)


def logo(draw, base, y=40):
    mark = Image.open(ASSETS["logo"]).convert("RGBA")
    mark.thumbnail((86, 86), Image.LANCZOS)
    base.paste(mark, (70, y - 16), mark)


def header(base, draw, active):
    draw.rectangle((0, 0, W, 118), fill=WHITE)
    logo(draw, base, 42)
    nav = ["Top", "Profile", "Music", "Live", "SNS", "Contact"]
    x = 760
    for item in nav:
        color = ORANGE if item == active else INK
        draw.text((x, 42), item, fill=color, font=F["nav"])
        if item == active:
            tw = draw.textbbox((x, 42), item, font=F["nav"])[2] - x
            draw.line((x, 78, x + tw, 78), fill=ORANGE, width=3)
        x += 108
    draw.line((0, 118, W, 118), fill=LINE, width=1)


def wrap_measured(draw, content, f, max_width):
    wrapped = []
    for para in content.split("\n"):
        if not para:
            wrapped.append("")
            continue
        line = ""
        for ch in para:
            test = line + ch
            if draw.textlength(test, font=f) <= max_width or not line:
                line = test
            else:
                wrapped.append(line)
                line = ch
        if line:
            wrapped.append(line)
    return "\n".join(wrapped)


def text(draw, xy, content, fill=TEXT, f=None, spacing=12, width=None):
    f = f or F["body"]
    x, y = xy
    if width:
        content = wrap_measured(draw, content, f, width)
    draw.multiline_text((x, y), content, fill=fill, font=f, spacing=spacing)


def section_label(draw, x, y, jp, en):
    draw.text((x, y), jp, fill=INK, font=F["h2"])
    draw.text((x, y + 58), en, fill=ORANGE, font=F["en"])
    draw.line((x, y + 102, x + 58, y + 102), fill=ORANGE, width=3)


def button(draw, box, label, filled=True):
    x, y, w, h = box
    fill = ORANGE if filled else BG
    outline = ORANGE if not filled else ORANGE
    draw.rounded_rectangle((x, y, x + w, y + h), radius=4, fill=fill, outline=outline, width=2)
    color = WHITE if filled else ORANGE_DARK
    tw = draw.textbbox((0, 0), label, font=F["button"])[2]
    th = draw.textbbox((0, 0), label, font=F["button"])[3]
    draw.text((x + (w - tw) / 2, y + (h - th) / 2 - 4), label, fill=color, font=F["button"])


def card(draw, box, fill=WHITE):
    x, y, w, h = box
    draw.rectangle((x, y, x + w, y + h), fill=fill, outline=LINE, width=1)


def footer(base, draw, y):
    draw.rectangle((0, y, W, y + 150), fill="#171717")
    mark = Image.open(ASSETS["logo"]).convert("RGBA").resize((76, 76), Image.LANCZOS)
    white = Image.new("RGBA", mark.size, (255, 255, 255, 0))
    white.putalpha(mark.split()[-1])
    base.paste(mark, (70, y + 38), mark)
    x = 480
    for item in ["Top", "Profile", "Music", "Live", "SNS", "Contact"]:
        draw.text((x, y + 64), item, fill=WHITE, font=F["small"])
        x += 110
    draw.text((1240, y + 58), "Instagram   X", fill=WHITE, font=F["body"])


def top_page():
    base, d = canvas(1080)
    header(base, d, "Top")
    hero_box = (540, 118, 900, 610)
    paste_cover(base, ASSETS["live_blue"], hero_box, (0.58, 0.42), dim=0.05)
    gradient_left(base, hero_box, 460)
    d.text((84, 248), "R-MANAC", fill=INK, font=font(84, bold=True, en=True))
    text(d, (84, 378), "ひとりで、\nバンドのような音像を。", INK, font(54, bold=True), spacing=20)
    text(d, (84, 520), "大阪・堺を拠点に活動する\nアコギ・ループアーティスト。", TEXT, F["body"], spacing=10)
    button(d, (84, 632, 200, 70), "ライブを見る")
    button(d, (320, 632, 200, 70), "音源を聴く", False)
    text(d, (1090, 610), "声とギターで、\n日常の奥にある熱を鳴らす。", WHITE, font(24, bold=True), spacing=14)
    d.line((1090, 690, 1360, 690), fill=ORANGE, width=3)

    y = 760
    items = [
        ("Profile", ASSETS["profile"], "アコギとルーパーで\nひとりでバンドのような音像を。"),
        ("Music", ASSETS["live_red"], "ライブ音源や演奏映像を\nご覧いただけます。"),
        ("Live", ASSETS["stage_3"], "ライブ情報や予約、\n過去のライブ記録。"),
    ]
    x = 80
    for title, p, body in items:
        paste_cover(base, p, (x, y, 280, 190), (0.5, 0.35))
        d.text((x + 310, y + 20), title, fill=INK, font=F["h3"])
        d.line((x + 310, y + 64, x + 350, y + 64), fill=ORANGE, width=3)
        text(d, (x + 310, y + 86), body, TEXT, F["small"], spacing=8)
        d.text((x + 310, y + 152), "→", fill=ORANGE, font=F["h3"])
        x += 450
    return base


def profile_page():
    base, d = canvas(1200)
    header(base, d, "Profile")
    paste_cover(base, ASSETS["profile"], (520, 118, 920, 330), (0.55, 0.25))
    gradient_left(base, (520, 118, 920, 330), 520)
    section_label(d, 90, 230, "プロフィール", "Profile")
    paste_cover(base, ASSETS["profile"], (150, 520, 420, 520), (0.48, 0.35))
    text(d, (670, 520), PROFILE_TEXT, INK, F["body"], spacing=14, width=620)
    card(d, (150, 1080, 1140, 82), BG)
    d.text((230, 1105), "活動拠点", fill=MUTED, font=F["small"])
    d.text((230, 1128), "大阪・堺", fill=INK, font=F["h3"])
    d.line((710, 1094, 710, 1150), fill=LINE, width=2)
    d.text((800, 1105), "Style", fill=MUTED, font=F["en_small"])
    d.text((800, 1128), "Acoustic Guitar / Looper", fill=INK, font=F["h3"])
    return base


def music_page():
    base, d = canvas(1900)
    header(base, d, "Music")
    paste_cover(base, ASSETS["live_blue"], (480, 118, 960, 600), (0.62, 0.45), dim=0.04)
    gradient_left(base, (480, 118, 960, 600), 560)
    section_label(d, 82, 250, "音楽", "Music")
    text(d, (82, 390), "アコースティックギターとルーパーで重ねる、\nひとりの音像。", INK, F["body"], spacing=12)
    d.line((82, 514, 430, 514), fill="#F3B37A", width=2)
    button(d, (82, 570, 180, 62), "音源を聴く")
    button(d, (292, 570, 180, 62), "映像を見る", False)

    d.text((82, 790), "Original Songs", fill=INK, font=F["h2"])
    d.line((82, 850, 128, 850), fill=ORANGE, width=3)
    text(d, (82, 885), "日常の奥にある熱やまなざしを、\nアコギとルーパーで重ねて鳴らす。", TEXT, F["body"], width=350)
    songs = [("夜明けの前に", "03:42", ASSETS["stage_1"]), ("光の残像", "04:18", ASSETS["stage_2"]), ("東京の呼吸", "03:56", ASSETS["stage_3"]), ("声にならない声", "04:02", ASSETS["mono"])]
    y = 780
    for title, dur, p in songs:
        paste_cover(base, p, (470, y, 86, 86), (0.5, 0.4))
        d.text((590, y + 10), title, fill=INK, font=F["body"])
        d.text((590, y + 44), "2024", fill=MUTED, font=F["small"])
        d.ellipse((850, y + 22, 898, y + 70), outline=ORANGE, width=2)
        d.polygon([(870, y + 35), (870, y + 57), (888, y + 46)], fill=ORANGE)
        d.line((950, y + 45, 1240, y + 45), fill=LINE, width=2)
        d.text((1280, y + 33), dur, fill=INK, font=F["small"])
        d.line((470, y + 110, 1340, y + 110), fill=LINE, width=1)
        y += 130

    d.text((82, 1350), "Live Session", fill=INK, font=F["h2"])
    d.line((82, 1410, 128, 1410), fill=ORANGE, width=3)
    text(d, (82, 1445), "ライブの空気をそのままに。\nR-MANACのライブ映像を掲載。", TEXT, F["body"], width=340)
    paste_cover(base, ASSETS["stage_2"], (410, 1340, 620, 350), (0.44, 0.45), dim=0.08)
    d.ellipse((675, 1480, 765, 1570), outline=WHITE, width=4)
    d.polygon([(710, 1506), (710, 1544), (742, 1525)], fill=WHITE)
    x = 1060
    for p in [ASSETS["stage_1"], ASSETS["stage_3"], ASSETS["live_dark"]]:
        paste_cover(base, p, (x, 1340, 230, 100), (0.5, 0.45), dim=0.02)
        x += 0
        d.text((1060, 1462 + (x-1060)//999), "", fill=INK, font=F["small"])
        y2 = 1465 if p == ASSETS["stage_1"] else (1585 if p == ASSETS["stage_3"] else 1705)
        paste_cover(base, p, (1060, y2, 230, 100), (0.5, 0.45), dim=0.02)
    footer(base, d, 1750)
    return base


def live_page():
    base, d = canvas(1700)
    header(base, d, "Live")
    paste_cover(base, ASSETS["stage_2"], (420, 118, 1020, 520), (0.56, 0.42), dim=0.03)
    gradient_left(base, (420, 118, 1020, 520), 560)
    section_label(d, 82, 280, "ライブ情報", "Live")
    text(d, (82, 430), "音楽が響き合う夜へ。", INK, F["body"])
    card(d, (82, 650, 1276, 300), WHITE)
    paste_cover(base, ASSETS["stage_3"], (122, 690, 360, 220), (0.5, 0.45))
    d.rectangle((545, 700, 635, 736), fill=ORANGE)
    d.text((565, 706), "次回ライブ", fill=WHITE, font=F["small"])
    d.text((545, 765), "2024.06.15（土）", fill=INK, font=font(46, bold=True, en=True))
    d.text((545, 840), "大阪・堺  Live House Pangea", fill=INK, font=F["body"])
    button(d, (1040, 785, 220, 68), "予約する")
    d.text((82, 1020), "ライブ予定", fill=INK, font=F["h2"])
    d.line((82, 1080, 130, 1080), fill=ORANGE, width=3)
    rows = [("2024.06.15（土）", "大阪・堺 / Live House Pangea", "18:30 / 19:00"), ("2024.07.21（日）", "大阪・心斎橋 / ANIMA", "17:30 / 18:00"), ("2024.08.10（土）", "堺・東区 / Music Spot 聖", "18:00 / 18:30"), ("2024.09.14（土）", "大阪・梅田 / Always", "17:30 / 18:00")]
    y = 1125
    for date, place, time in rows:
        d.text((100, y), date, fill=INK, font=F["body"])
        d.text((390, y), place, fill=TEXT, font=F["body"])
        d.text((820, y), time, fill=TEXT, font=F["body"])
        button(d, (1070, y - 10, 150, 48), "予約する", False)
        d.text((1260, y), "詳細を見る 〉", fill=ORANGE, font=F["small"])
        d.line((82, y + 58, 1358, y + 58), fill=LINE, width=1)
        y += 90
    d.text((82, 1490), "過去のライブ", fill=INK, font=F["h2"])
    x = 82
    for p in [ASSETS["stage_1"], ASSETS["stage_2"], ASSETS["stage_3"], ASSETS["stage_4"]]:
        paste_cover(base, p, (x, 1550, 280, 120), (0.5, 0.45))
        x += 318
    return base


def sns_page():
    base, d = canvas(1640)
    header(base, d, "SNS")
    paste_cover(base, ASSETS["profile"], (540, 118, 900, 470), (0.5, 0.35), dim=0.03)
    gradient_left(base, (540, 118, 900, 470), 620)
    d.text((82, 260), "SNS", fill=INK, font=font(86, bold=True, en=True))
    text(d, (82, 380), "最新情報はこちらから。", INK, F["body"])
    d.line((82, 450, 140, 450), fill=ORANGE, width=3)
    socials = [("Instagram", "ライブ情報や制作の記録を発信しています。", "フォローする"), ("X", "ライブ情報や制作の記録を発信しています。", "フォローする"), ("YouTube", "ライブ映像や弾き語り動画を公開しています。", "見る"), ("TikTok", "日常やライブの様子をお届けします。", "フォローする"), ("Apple Music", "楽曲を配信中。", "聴く"), ("Spotify", "楽曲を配信中。", "聴く")]
    x0, y0 = 82, 650
    for i, (name, desc, cta) in enumerate(socials):
        x = x0 + (i % 3) * 420
        y = y0 + (i // 3) * 250
        card(d, (x, y, 360, 190))
        d.text((x + 46, y + 42), name, fill=INK, font=F["h3"])
        text(d, (x + 46, y + 82), desc, TEXT, F["small"], width=260)
        button(d, (x + 46, y + 132, 190, 42), cta, False)
    d.text((82, 1210), "最新情報", fill=INK, font=F["h2"])
    d.line((82, 1270, 130, 1270), fill=ORANGE, width=3)
    feed = [("2024.06.10", "6月15日 大阪・Live House Pangea にてワンマンライブ", ASSETS["stage_1"]), ("2024.05.28", "新曲「夜明けの前に」配信スタート", ASSETS["stage_2"]), ("2024.05.15", "新しいアーティスト写真を公開しました", ASSETS["profile"])]
    y = 1305
    for date, title, p in feed:
        paste_cover(base, p, (82, y, 260, 110), (0.5, 0.4))
        d.text((390, y + 10), date, fill=MUTED, font=F["small"])
        d.text((390, y + 42), title, fill=INK, font=F["body"])
        d.text((1320, y + 40), "〉", fill=ORANGE, font=F["h3"])
        d.line((360, y + 120, 1350, y + 120), fill=LINE, width=1)
        y += 140
    return base


def contact_page():
    base, d = canvas(1760)
    header(base, d, "Contact")
    paste_cover(base, ASSETS["street"], (520, 118, 920, 500), (0.58, 0.34), dim=0.02)
    gradient_left(base, (520, 118, 920, 500), 640)
    section_label(d, 82, 300, "お問い合わせ", "Contact")
    text(d, (82, 455), "出演依頼・ライブ予約・制作のご相談はこちらから。", INK, F["body"])
    y = 740
    for title, body in [
        ("出演依頼について", "ライブ出演、イベント出演、サポート演奏、\n楽曲提供などのご依頼を受け付けています。"),
        ("ライブ予約について", "日程・会場名・ご予約者名・枚数を\n明記のうえご連絡ください。"),
        ("その他のご相談", "音源制作、楽曲制作、コラボレーションなど、\n音楽に関する各種ご相談もお気軽にどうぞ。"),
    ]:
        d.text((90, y), title, fill=INK, font=F["h3"])
        d.line((90, y + 48, 138, y + 48), fill=ORANGE, width=3)
        text(d, (90, y + 82), body, TEXT, F["body"], spacing=10)
        d.line((90, y + 205, 505, y + 205), fill=LINE, width=1)
        y += 245
    d.line((570, 740, 570, 1430), fill=LINE, width=1)
    fields = [("お名前", 60), ("メールアドレス", 60), ("お問い合わせ種別", 60), ("メッセージ", 190)]
    y = 740
    for label, h in fields:
        d.text((630, y), label, fill=INK, font=F["body"])
        d.text((780, y), "必須", fill=ORANGE, font=F["small"])
        if label == "お問い合わせ種別":
            opts = ["出演依頼", "ライブ予約", "音源制作", "その他"]
            ox = 630
            for opt in opts:
                d.ellipse((ox, y + 52, ox + 22, y + 74), outline=MUTED, width=1)
                d.text((ox + 35, y + 48), opt, fill=TEXT, font=F["small"])
                ox += 170
        else:
            d.rectangle((630, y + 45, 1320, y + 45 + h), outline="#BDB7AF", width=1)
        y += h + 105
    button(d, (630, 1345, 690, 64), "送信する")
    d.text((630, 1435), "返信には数日いただく場合があります。", fill=MUTED, font=F["small"])
    d.text((90, 1540), "よくあるご質問", fill=INK, font=F["h2"])
    d.line((90, 1602, 138, 1602), fill=ORANGE, width=3)
    d.text((470, 1545), "返信はどのくらいで届きますか？", fill=INK, font=F["body"])
    d.text((470, 1590), "通常、2〜3営業日以内にご返信いたします。", fill=TEXT, font=F["small"])
    d.line((470, 1635, 1320, 1635), fill=LINE, width=1)
    return base


PAGES = [
    ("r-manac-top-page.png", top_page),
    ("r-manac-profile-page.png", profile_page),
    ("r-manac-music-page.png", music_page),
    ("r-manac-live-page.png", live_page),
    ("r-manac-sns-page.png", sns_page),
    ("r-manac-contact-page.png", contact_page),
]


for name, make in PAGES:
    page = make()
    page.save(OUT / name, quality=95)
    print(OUT / name)
