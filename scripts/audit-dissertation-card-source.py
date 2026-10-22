#!/usr/bin/env python3
"""Read-only preview of first pages of historical originals for author/title audit.

Never infer grouping or attribution from numeric filenames alone.
"""
import json
from pathlib import Path
import re
import subprocess
import zipfile
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
for year in range(2015, 2022):
    manifest = json.loads((root / f"src/data/dissertations/archive-{year}-pilot.json").read_text())
    for item in manifest["pilot"]:
        f = root / item["target"]
        text = ""
        err = None
        try:
            if item["format"] == "pdf":
                proc = subprocess.run(
                    ["pdftotext", "-f", "1", "-l", "4", "-layout", "-enc", "UTF-8", str(f), "-"],
                    capture_output=True, text=True, timeout=45
                )
                text = proc.stdout
                if proc.returncode:
                    err = proc.stderr[-180:]
            elif item["format"] == "docx":
                with zipfile.ZipFile(f) as z:
                    root_xml = ET.fromstring(z.read("word/document.xml"))
                    text = "\n".join(
                        "".join((t.text or "") for t in p.iter() if t.tag.endswith("}t"))
                        for p in root_xml.iter() if p.tag.endswith("}p")
                    )
        except Exception as e:
            err = str(e)[:220]
        text = re.sub(r"[ \t]+", " ", text)
        text = re.sub(r"\n{3,}", "\n\n", text).strip()
        print("CARD_SOURCE:" + json.dumps({
            "id": item["id"], "year": year, "name": f.name,
            "format": item["format"], "status": item.get("publicationStatus", "public"),
            "preview": text[:3900], "error": err
        }, ensure_ascii=False))
