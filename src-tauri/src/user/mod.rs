pub mod properties;

#[tauri::command]
pub fn set_user(name: String, id: u32, email: String) -> Result<(), String> {
    match properties::User::new(name, id, email) {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}
