// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod task;
mod user;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            task::db::add_item,
            task::db::todo_list,
            task::db::update_item,
            task::db::delete_item,
            task::set_task_config,
            task::get_task_config,
            user::set_user,
            user::get_user,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
