from pathlib import Path
import fitz

assets = Path("attached_assets")
output = Path(".agents/outputs/vallmook-pdfs")
output.mkdir(parents=True, exist_ok=True)

for pdf_path in sorted(assets.glob("*.pdf")):
    document = fitz.open(pdf_path)
    print(f"{pdf_path.name}: {document.page_count} page(s)")
    for page_number, page in enumerate(document):
        if page_number >= 3:
            break
        pixmap = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
        image_path = output / f"{pdf_path.stem}-page-{page_number + 1}.png"
        pixmap.save(image_path)
        print(f"  page {page_number + 1}: {page.rect.width:.0f} x {page.rect.height:.0f} pt -> {image_path}")
