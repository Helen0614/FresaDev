import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), "projects.db")
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

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

conn.commit()
conn.close()
print(f"Tabla 'projects' creada correctamente en {db_path}.")