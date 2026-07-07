import re
from html.parser import HTMLParser

file_path = r"C:\Users\dell\.gemini\antigravity-ide\brain\957651d9-c55d-4b18-a50b-18b49f37d64f\.system_generated\steps\176\content.md"
out_path = r"C:\Users\dell\.gemini\antigravity-ide\brain\957651d9-c55d-4b18-a50b-18b49f37d64f\scratch\extracted_text.txt"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.in_script_or_style = False
        self.current_section = None
        self.sections = {}

    def handle_starttag(self, tag, attrs):
        if tag in ["script", "style"]:
            self.in_script_or_style = True
        if tag == "section":
            for name, value in attrs:
                if name == "id":
                    self.current_section = value
                    self.sections[value] = []

    def handle_endtag(self, tag):
        if tag in ["script", "style"]:
            self.in_script_or_style = False
        if tag == "section":
            self.current_section = None

    def handle_data(self, data):
        if self.in_script_or_style:
            return
        cleaned = data.strip()
        if cleaned:
            self.text.append(cleaned)
            if self.current_section:
                self.sections[self.current_section].append(cleaned)

parser = MyHTMLParser()
parser.feed(content)

with open(out_path, "w", encoding="utf-8") as out:
    out.write("--- ALL TEXT CHUNKS ---\n")
    out.write("\n".join(parser.text))
    out.write("\n\n--- SECTIONS FOUND ---\n")
    for sect, chunks in parser.sections.items():
        out.write(f"\nSection ID: {sect}\n")
        out.write(" | ".join(chunks))
        out.write("\n" + "-" * 50 + "\n")

print("Extracted to extracted_text.txt successfully!")
