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
pub fn create_todo_table() -> String {
    let _ = create_db();
    format!("Created table {}", "111")
}

pub fn create_db() -> Result<()> {
    let conn = Connection::open("todo.db")?;

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
