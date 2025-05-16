import sqlite3
import requests
from urllib.parse import urlparse

def get_last_commit_date(repo_url):
    # Extrae usuario y repo de la URL
    path = urlparse(repo_url).path.strip("/")
    if len(path.split("/")) < 2:
        return None
    user, repo = path.split("/")[:2]
    api_url = f"https://api.github.com/repos/{user}/{repo}/commits"
    response = requests.get(api_url)
    if response.status_code == 200:
        commits = response.json()
        if commits:
            return commits[0]["commit"]["committer"]["date"][:10]  # Solo la fecha YYYY-MM-DD
    return None

def update_projects_db(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT id, repositorio FROM projects")
    projects = cursor.fetchall()
    for project_id, repo_url in projects:
        last_date = get_last_commit_date(repo_url)
        if last_date:
            cursor.execute(
                "UPDATE projects SET ultima_modificacion = ? WHERE id = ?",
                (last_date, project_id)
            )
            print(f"Actualizado proyecto {project_id} a fecha {last_date}")
        else:
            print(f"No se pudo obtener la fecha para {repo_url}")
    conn.commit()
    conn.close()

if __name__ == "__main__":
    db_path = "projects.db"  # Cambia la ruta si es necesario
    update_projects_db(db_path)