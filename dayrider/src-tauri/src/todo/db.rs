use std::fs;
use std::path::PathBuf;

use chrono::{Datelike, Utc};
use dirs::{self, data_dir};
use rusqlite::{Connection, Result};
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
