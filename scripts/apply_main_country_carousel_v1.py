from pathlib import Path
p=Path('index.html'); s=p.read_text()
css='<link rel="stylesheet" href="data/main-country-carousel-v1.css?v=20260911-carousel-v1">\n'
js='<script src="data/main-country-carousel-v1.js?v=20260911-carousel-v1"></script>\n'
if 'main-country-carousel-v1.css' not in s:
    s=s.replace('</head>',css+'</head>',1)
if 'main-country-carousel-v1.js' not in s:
    s=s.replace('</body>',js+'</body>',1)
p.write_text(s)
assert 'main-country-carousel-v1.css' in s and 'main-country-carousel-v1.js' in s
print('CAROUSEL WIRED')
