use dirs::data_dir;
use rusqlite::{Connection, Result as RusqliteResult};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use thiserror::Error;

// Create the error type that represents all errors possible in our program
#[derive(Debug, Error)]
enum Error {
    #[error(transparent)]
    Rusqlite(#[from] rusqlite::Error),
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error("Unable to find data directory")]
    DataDirNotFound,
}

// Implement serde::Serialize for the Error type
impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TodoItem {
    uuid: String,
    name: String,
    date: String,
    deadline: String,
    notes: String,
    finished: String,
    priority: String,
    repeat: String,
}

// Create and ensure the database directory and file
fn get_db_connection() -> Result<Connection, Error> {
    let data_dir = data_dir().ok_or(Error::DataDirNotFound)?;
    let db_path = data_dir.join("DayRider").join("tasks.db");
    fs::create_dir_all(db_path.parent().unwrap())?; // Ensure the directory exists
    create_db(&db_path)?;
    Connection::open(&db_path).map_err(Error::from)
}

// Create the database if it does not exist
fn create_db(p: &PathBuf) -> RusqliteResult<()> {
    let conn = Connection::open(p)?;
    conn.execute(
        "CREATE TABLE IF NOT EXISTS todo_list (
            uuid TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            date TEXT,
            deadline TEXT,
            finished TEXT,
            notes TEXT,
            priority TEXT,
            repeat TEXT
        )",
        (),
    )?;
    Ok(())
}

#[tauri::command]
pub fn add_item(todo_item: TodoItem) -> Result<String, String> {
    let conn = get_db_connection().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO todo_list (uuid, name, date, deadline, finished, notes, priority, repeat) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
        rusqlite::params![
            todo_item.uuid,
            todo_item.name,
            todo_item.date,
            todo_item.deadline,
            todo_item.finished,
            todo_item.notes,
            todo_item.priority,
            todo_item.repeat,
        ],
    ).map_err(|e| e.to_string())?;

    serde_json::to_string(&todo_item).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn delete_item(uuid: String) -> Result<String, String> {
    let conn = get_db_connection().map_err(|e| e.to_string())?;
    conn.execute(
        "DELETE FROM todo_list WHERE uuid = ?1",
        rusqlite::params![uuid],
    )
    .map_err(|e| e.to_string())?;
    Ok("You deleted an item".into())
}

#[tauri::command]
pub fn update_item(todo_item: TodoItem) -> Result<String, String> {
    let conn = get_db_connection().map_err(|e| e.to_string())?;
    conn.execute(
        "UPDATE todo_list SET name = ?2, date = ?3, deadline = ?4, finished = ?5, notes = ?6, priority = ?7, repeat = ?8 WHERE uuid = ?1",
        rusqlite::params![
            todo_item.uuid,
            todo_item.name,
            todo_item.date,
            todo_item.deadline,
            todo_item.finished,
            todo_item.notes,
            todo_item.priority,
            todo_item.repeat,
        ],
    ).map_err(|e| e.to_string())?;

    serde_json::to_string(&todo_item).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn todo_list() -> Result<String, String> {
    let conn = get_db_connection().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare("SELECT * FROM todo_list")
        .map_err(|e| e.to_string())?;

    let items = stmt
        .query_map([], |row| {
            Ok(TodoItem {
                uuid: row.get(0)?,
                name: row.get(1)?,
                date: row.get(2)?,
                deadline: row.get(3)?,
                finished: row.get(4)?,
                notes: row.get(5)?,
                priority: row.get(6)?,
                repeat: row.get(7)?,
            })
        })
        .map_err(|e| e.to_string())?;

    let todo_list: Result<Vec<TodoItem>, _> = items.collect();
    let json =
        serde_json::to_string(&todo_list.map_err(|e| e.to_string())?).map_err(|e| e.to_string())?;

    Ok(json)
}
