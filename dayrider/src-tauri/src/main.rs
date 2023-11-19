mod todo;
use todo::db::add_item;
use todo::db::todo_list;
use todo::greet;
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#[cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, add_item, todo_list])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
