import re

file_path = r"C:\Users\dell\.gemini\antigravity-ide\brain\957651d9-c55d-4b18-a50b-18b49f37d64f\.system_generated\steps\176\content.md"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for tags that have 'style=' or 'class=' containing transition or motion hints
# e.g., opacity, translateY, ease, transform
matches = re.findall(r'<[a-zA-Z0-9]+[^>]+style="[^"]*"[^>]*>|<[a-zA-Z0-9]+[^>]+class="[^"]*transition[^"]*"[^>]*>', content)

print(f"Found {len(matches)} matches with styles or transition classes.")
for i, m in enumerate(matches[:50]):
    print(f"{i+1}: {m}")
