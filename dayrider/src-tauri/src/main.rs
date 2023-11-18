mod todo;
use todo::db::create_todo_table;
use todo::greet;
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#[cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, create_todo_table])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
