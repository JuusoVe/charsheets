import os
from PyPDF2 import PdfReader, PdfWriter
from pdf2image import convert_from_path

# Define the path to the directory containing PDF files
directory_path = "./data"

print("directory_path: ", directory_path)

# Create an output directory for the split PDF pages
output_directory = os.path.join(directory_path, "split_pages")
os.makedirs(output_directory, exist_ok=True)

# Loop through each file in the directory
for filename in os.listdir(directory_path):
    if filename.endswith(".pdf"):
        pdf_path = os.path.join(directory_path, filename)

        pdf_reader = PdfReader(pdf_path)

        # Get the total number of pages in the current PDF
        num_pages = len(pdf_reader.pages)

        print(f"Processing {filename} - {num_pages} pages")

        # Convert the PDF to images (one image per page)
        images = convert_from_path(pdf_path)

        for page_num in range(num_pages):
            # Save the PDF page as a new single-page PDF
            pdf_writer = PdfWriter()
            pdf_writer.add_page(pdf_reader.pages[page_num])

            output_filename = f"{os.path.splitext(filename)[0]}_page_{page_num + 1}.pdf"
            output_path = os.path.join(output_directory, output_filename)

            with open(output_path, "wb") as output_pdf:
                pdf_writer.write(output_pdf)

            # Save the corresponding page as a .jpg image
            image_output_filename = (
                f"{os.path.splitext(filename)[0]}_page_{page_num + 1}.jpg"
            )
            image_output_path = os.path.join(output_directory, image_output_filename)
            images[page_num].save(image_output_path, "JPEG")

        print(f"Processed {filename} - {num_pages} pages extracted and images saved.")
