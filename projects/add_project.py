import sqlite3
import os

# Ruta absoluta a projects.db en la carpeta actual (projects/)
db_path = os.path.join(os.path.dirname(__file__), "projects.db")
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Crear la tabla si no existe
cursor.execute("""
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    estado TEXT NOT NULL,
    lenguajes TEXT NOT NULL,
    ultima_modificacion TEXT NOT NULL,
    repositorio TEXT NOT NULL
)
""")

# Cambia estos valores por los de tu nuevo proyecto
nuevo_proyecto = (
    "FresaDev",
    "En desarrollo",
    "HTML, CSS, JavaScript, Python, Flask, SQLite",
    "2025-05-16",
    "https://github.com/Helen0614/FresaDev"
)

cursor.execute("""
INSERT INTO projects (titulo, estado, lenguajes, ultima_modificacion, repositorio)
VALUES (?, ?, ?, ?, ?)
""", nuevo_proyecto)

conn.commit()
conn.close()
print(f"Proyecto añadido correctamente en {db_path}.")