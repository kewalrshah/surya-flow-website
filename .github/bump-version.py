"""Stamp styles.css and script.js links with a fresh ?v= so browsers fetch the new files after each change.
Run from the repo root before committing: python3 .github/bump-version.py"""
import re, time, pathlib

v = time.strftime("%Y%m%d%H%M%S")
for page in pathlib.Path(".").glob("*.html"):
    text = page.read_text()
    new = re.sub(r'(href="styles\.css|src="script\.js)(\?v=\d+)?"', lambda m: f'{m.group(1)}?v={v}"', text)
    if new != text:
        page.write_text(new)
        print("stamped", page, v)
