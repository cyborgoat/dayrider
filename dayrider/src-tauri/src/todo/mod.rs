pub mod db;

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
