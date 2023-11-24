use std::fs;
use std::path::PathBuf;

use chrono::{Datelike, Utc};
use dirs::{self, data_dir};
use rusqlite::{Connection, Result};
use serde::Serialize;
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

#[tauri::command]
pub fn add_item(name: String, notes: String) -> Result<String, String> {
    let _ = fs::create_dir_all(data_dir().unwrap().join("DayRider"));
    let db_path = data_dir().unwrap().join("DayRider").join("todo.db");
    let _ = create_db(&db_path);
    let now = Utc::now();
    let (_is_common_era, year) = now.year_ce();
    let date_str = format!("{}-{:02}-{:02}", year, now.month(), now.day());
    let conn = Connection::open(&db_path).unwrap();
    let _ = conn.execute(
        "INSERT INTO todo_list (name, due_date, notes) values (?1, ?2, ?3)",
        &[name.as_str(), date_str.as_str(), notes.as_str()],
    );

    Ok("You added an item".into())
}

#[tauri::command]
pub fn delete_item(id: i32) -> Result<String, String> {
    let _ = fs::create_dir_all(data_dir().unwrap().join("DayRider"));
    let db_path = data_dir().unwrap().join("DayRider").join("todo.db");
    let conn = Connection::open(&db_path).unwrap();
    let _ = conn.execute(&format!("DELETE FROM todo_list WHERE id={}", id), ());

    Ok("You added an item".into())
}

// Create the database if does not exist
pub fn create_db(p: &PathBuf) -> Result<()> {
    let conn = Connection::open(p)?;

    conn.execute(
        "create table if not exists todo_list (
             id integer primary key,
             name text not null,
             due_date text,
             notes text
         )",
        (),
    )?;
    Ok(())
}

// Fetch all data.unwrap()
#[derive(Debug, Serialize)]
struct TodoItem {
    id: i32,
    name: String,
    due_date: String,
    notes: String,
}

#[tauri::command]
pub fn todo_list() -> String {
    let _ = fs::create_dir_all(data_dir().unwrap().join("DayRider"));
    let db_path = data_dir().unwrap().join("DayRider").join("todo.db");
    let _ = create_db(&db_path);
    let conn = Connection::open(&db_path).unwrap();
    let mut stmt = conn.prepare(" SELECT * FROM todo_list; ").unwrap();
    let items = stmt
        .query_map((), |row| {
            Ok(TodoItem {
                id: row.get(0)?,
                name: row.get(1)?,
                due_date: row.get(2)?,
                notes: row.get(3)?,
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
