from flask import Blueprint, current_app, request, jsonify

endpoint_bp = Blueprint('endpoints', __name__)

@endpoint_bp.route('/extract-linkedin', methods=['POST'])
def extract_linkedin():
    try:
        linkedin_service = current_app.config.get("linkedin_service")
        
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        data = linkedin_service.extract(file)
        return jsonify(data), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@endpoint_bp.route('/ping', methods=['GET'])
def ping():
    return jsonify({"message": "pong"}), 200
