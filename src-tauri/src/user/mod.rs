pub mod base;

#[tauri::command]
pub fn set_user(name: String, id: String, email: String) -> Result<base::User, String> {
    match base::User::new(name, id, email) {
        Ok(user) => Ok(user),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub fn get_user() -> Result<base::User, String> {
    match base::User::get_user_info() {
        Ok(user) => Ok(user),
        Err(err) => Err(format!("Failed to fetch user info: {}", err)),
    }
}
