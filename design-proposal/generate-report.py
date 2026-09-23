from pathlib import Path
import re, html

root = Path(__file__).resolve().parent
out = root.parent / 'public/design-proposal'
source = (root / 'PROPOSAL.md').read_text()

def inline(s):
    s = html.escape(s)
    s = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', r'<img class="preview" src="\2" alt="\1" loading="lazy">', s)
    s = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', s)
    return re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', s)

lines = source.splitlines()
result = []
toc = []
i = 0
while i < len(lines):
    line = lines[i].strip()
    if not line:
        i += 1
        continue
    if line.startswith('|'):
        rows = []
        while i < len(lines) and lines[i].strip().startswith('|'):
            cells = [c.strip() for c in lines[i].strip().strip('|').split('|')]
            if not all(re.fullmatch(r'[:\- ]+', c) for c in cells): rows.append(cells)
            i += 1
        result.append('<div class="table-wrap" role="region" tabindex="0" aria-label="'+html.escape(rows[0][0])+' 표 (가로 스크롤 가능)"><table><thead><tr>'+''.join('<th scope="col">'+inline(c)+'</th>' for c in rows[0])+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+inline(c)+'</td>' for c in row)+'</tr>' for row in rows[1:])+'</tbody></table></div>')
        continue
    if line.startswith('#'):
        level = len(line) - len(line.lstrip('#'))
        title = line[level:].strip()
        anchor = 'history' if level==2 and title.startswith('1.') else 'section-'+title.split('.')[0] if level==2 else ''
        if level==2: toc.append((anchor,title))
        result.append(f'<h{level} id="{anchor}">{inline(title)}</h{level}>')
    else:
        result.append('<p>'+inline(line)+'</p>')
    i += 1

css = '''@font-face{font-family:Pretendard;src:url(assets/Pretendard-Regular.woff2);font-weight:400}@font-face{font-family:Pretendard;src:url(assets/Pretendard-Bold.woff2);font-weight:700}*{box-sizing:border-box}body{margin:0;background:#F7F8F2;color:#202A25;font:15px/1.85 Pretendard,sans-serif;word-break:keep-all}header{background:#183D32;color:#F7F8F2;padding:18px 40px;display:flex;justify-content:space-between;gap:20px}a{color:inherit;text-underline-offset:3px}header a{font-size:13px}main{max-width:1320px;margin:auto;padding:42px 40px 90px}h1{font-size:43px;letter-spacing:-.04em;line-height:1.3}h2{font-size:29px;letter-spacing:-.03em;margin:72px 0 24px;padding-top:24px;border-top:2px solid #183D32;scroll-margin-top:20px}h3{font-size:20px;margin-top:32px}p{max-width:1050px}nav{background:#e9efdf;padding:24px;border-radius:8px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:30px 0}nav a{font-size:13px}.table-wrap{overflow:auto;margin:25px 0;border:1px solid #c9d0c5;border-radius:8px}table{border-collapse:collapse;width:100%;min-width:760px;text-align:left;font-size:12px;line-height:1.8}th{background:#e7eedd;vertical-align:top;font-size:12px}th,td{padding:13px 15px;border-bottom:1px solid #d6dacf;min-width:110px;vertical-align:top}tr:last-child td{border:0}td a{color:#183D32;font-weight:700}table tr:nth-child(even){background:#f1f3eb}.preview{display:block;max-width:100%;height:auto;border:1px solid #b7c1b3;border-radius:8px;margin:25px 0}.preview[src="mobile.png"]{max-width:390px}strong{color:#183D32}:focus-visible{outline:3px solid #183D32;outline-offset:3px}@media(max-width:700px){header{padding:16px 20px;flex-wrap:wrap}main{padding:30px 20px}h1{font-size:32px}h2{font-size:25px;margin-top:54px}nav{grid-template-columns:1fr;padding:20px}body{font-size:14px}.table-wrap{margin-inline:0}th,td{padding:12px}.preview[src="mobile.png"]{max-width:100%}}'''
nav = '<nav aria-label="제안서 목차">'+''.join(f'<a href="#{anchor}">{inline(title)}</a>' for anchor,title in toc)+'</nav>'
result.insert(3,nav)
doc = '<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>코드스쿼드 디자인 전략·출처·설계 제안</title><style>'+css+'</style></head><body><header><strong style="color:inherit">코드스쿼드 / 디자인 제안</strong><a href="index.html">인터랙티브 시안으로 이동 ↗</a></header><main>'+''.join(result)+'</main></body></html>'
(out / 'proposal.html').write_text(doc)
(out / 'proposal.md').write_text(source)
print('Report generated:',out/'proposal.html')
