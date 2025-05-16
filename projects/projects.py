from flask import Flask, render_template
import sqlite3
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")
app = Flask(__name__, template_folder=TEMPLATES_DIR)

# Ruta principal para mostrar los proyectos
@app.route("/projects")
def projects():
    # Ruta absoluta a la base de datos
    db_path = os.path.join(os.path.dirname(__file__), "projects.db")
    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        # Consulta para obtener los proyectos ordenados por fecha de última modificación
        cursor.execute("SELECT titulo, estado, lenguajes, ultima_modificacion, repositorio FROM projects ORDER BY ultima_modificacion DESC")
        proyectos = cursor.fetchall()

    # Renderizar la plantilla con los proyectos
    return render_template("project_list.html", proyectos=proyectos)