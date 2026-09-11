from pathlib import Path
p=Path('index.html')
s=p.read_text()
s=s.replace('{"date":"1 Aug 2027","label":"Central Asia leg"}','{"date":"22 Jul 2027","label":"Central Asia leg"}',1)
p.write_text(s)
