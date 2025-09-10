from flask import Flask
from app.controllers.endpoint_controller import endpoint_bp
from app.services.linkedin_service import LinkedInService

app = Flask(__name__)
app.config["linkedin_service"] = LinkedInService()
app.register_blueprint(endpoint_bp)

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)