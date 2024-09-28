// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use task::db;
mod task;
mod user;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            db::add_item,
            db::todo_list,
            db::update_item,
            db::delete_item,
            user::create_user
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
