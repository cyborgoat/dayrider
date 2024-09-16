use dirs::{self, data_dir};
use rusqlite::{Connection, Result};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use thiserror;

// create the error type that represents all errors possible in our program
#[derive(Debug, thiserror::Error)]
enum Error {
    #[error(transparent)]
    Rusqlite(#[from] rusqlite::Error),
}

// we must manually implement serde::Serialize
impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
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
}

#[tauri::command]
pub fn add_item(todo_item: TodoItem) -> Result<String, String> {
    let _ = fs::create_dir_all(data_dir().unwrap().join("DayRider"));
    let db_path = data_dir().unwrap().join("DayRider").join("todo.db");
    let _ = create_db(&db_path);
    let conn = Connection::open(&db_path).unwrap();
    let _ = conn.execute(
        "INSERT INTO todo_list (uuid, name, date, deadline, finished, notes) values (?1, ?2, ?3, ?4, ?5, ?6)",
        [
            todo_item.uuid.to_string(), todo_item.name.to_string(), todo_item.date.to_string(),
            todo_item.deadline.to_string(), todo_item.notes.to_string(), todo_item.finished.to_string()
        ],
    );

    Ok(format!("{}", serde_json::to_string(&todo_item).unwrap()).into())
}

#[tauri::command]
pub fn delete_item(uuid: String) -> Result<String, String> {
    let _ = fs::create_dir_all(data_dir().unwrap().join("DayRider"));
    let db_path = data_dir().unwrap().join("DayRider").join("todo.db");
    let conn = Connection::open(&db_path).unwrap();
    let _ = conn.execute(
        &format!("DELETE FROM todo_list WHERE uuid = '{}'", uuid),
        (),
    );

    Ok("You deleted an item".into())
}

#[tauri::command]
pub fn update_item(todo_item: TodoItem) -> Result<String, String> {
    let _ = fs::create_dir_all(data_dir().unwrap().join("DayRider"));
    let db_path = data_dir().unwrap().join("DayRider").join("todo.db");
    let conn = Connection::open(&db_path).unwrap();

    let mut stmt = conn
        .prepare(
            "UPDATE todo_list SET \
    name = ?2, \
    date = ?3, \
    deadline = ?4, \
    finished = ?5, \
    notes = ?6 \
    WHERE uuid = ?1",
        )
        .unwrap();
    stmt.execute(rusqlite::params![
        todo_item.uuid.to_string(),
        todo_item.name.to_string(),
        todo_item.date.to_string(),
        todo_item.deadline.to_string(),
        todo_item.finished.to_string(),
        todo_item.notes.to_string()
    ])
    .unwrap();
    Ok(format!("{}", serde_json::to_string(&todo_item).unwrap()).into())
}

// Create the database if does not exist
pub fn create_db(p: &PathBuf) -> Result<()> {
    let conn = Connection::open(p)?;

    conn.execute(
        "create table if not exists todo_list (
             uuid text primary key,
             name text not null,
             date text,
             deadline text,
             finished text,
             notes text
         )",
        (),
    )?;
    Ok(())
}

#[tauri::command]
pub fn todo_list() -> String {
    let _ = fs::create_dir_all(data_dir().unwrap().join("DayRider"));
    let db_path = data_dir().unwrap().join("DayRider").join("todo.db");
    let _ = create_db(&db_path);
    let conn = Connection::open(&db_path).unwrap();
    let mut stmt = conn.prepare("SELECT * FROM todo_list").unwrap();
    let items = stmt
        .query_map((), |row| {
            Ok(TodoItem {
                uuid: row.get(0)?,
                name: row.get(1)?,
                date: row.get(2)?,
                deadline: row.get(3)?,
                finished: row.get(4)?,
                notes: row.get(5)?,
            })
        })
        .unwrap();

    let mut todo_list: Vec<TodoItem> = Vec::new();
    for item in items {
        let _item = item.unwrap();
        todo_list.push(_item);
    }

    let json = serde_json::to_string(&todo_list).unwrap();
    return json;
}
