#!/usr/bin/env python3
"""Build site/index.html from site/template.html + site/content.yaml."""
import sys
from pathlib import Path

import yaml
from jinja2 import Environment, FileSystemLoader

SITE = Path(__file__).parent / "site"


def build(output=None):
    with open(SITE / "content.yaml", encoding="utf-8") as f:
        content = yaml.safe_load(f)

    env = Environment(
        loader=FileSystemLoader(str(SITE)),
        autoescape=True,
        keep_trailing_newline=True,
        trim_blocks=True,
        lstrip_blocks=True,
    )
    rendered = env.get_template("template.html").render(c=content)

    dest = Path(output) if output else SITE / "index.html"
    dest.write_text(rendered, encoding="utf-8")
    return dest


if __name__ == "__main__":
    dest = build(sys.argv[1] if len(sys.argv) > 1 else None)
    print(f"Built → {dest}")
