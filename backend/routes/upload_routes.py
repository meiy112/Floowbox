from flask import Blueprint, jsonify, request
import pymupdf

upload_bp = Blueprint("upload", __name__)

@upload_bp.route('/api/extract-text', methods=['POST'])
def extract_text_from_pdf():
  if 'pdf' not in request.files:
    return jsonify({'error': '\'file\' parameter was not provided in post body'}), 400
  
  pdf_file = request.files['pdf']
  if pdf_file.filename == '':
    return jsonify({'error': 'No file provided'}), 400
  
  try:
    # read file
    doc = pymupdf.open(stream=pdf_file.read(), filetype='pdf')
    text = ''
    
    # extract text from each page
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        text += page.get_text()

    return jsonify({'text': text})

  except Exception as e:
     return jsonify({'error': str(e)}), 500