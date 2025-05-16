from projects.projects import app
from flask import send_from_directory
import os

@app.route('/')
def index():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    return send_from_directory(base_dir, 'index.html')

@app.route('/sections/<path:filename>')
def custom_sections(filename):
    base_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'sections')
    return send_from_directory(base_dir, filename)

@app.route('/css/<path:filename>')
def custom_css(filename):
    base_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'css')
    return send_from_directory(base_dir, filename)

@app.route('/js/<path:filename>')
def custom_js(filename):
    base_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'js')
    return send_from_directory(base_dir, filename)

@app.route('/images/<path:filename>')
def custom_images(filename):
    base_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'images')
    return send_from_directory(base_dir, filename)

if __name__ == "__main__":
    app.run(debug=True)