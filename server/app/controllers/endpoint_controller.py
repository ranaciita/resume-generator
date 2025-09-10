from flask import Flask, request, jsonify
from app.services.github_service import GithubService
from app.services.linkedin_service import LinkedInService

app = Flask(__name__)


