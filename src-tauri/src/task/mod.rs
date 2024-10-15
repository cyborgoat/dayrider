pub mod db;
pub mod config;

#[tauri::command]
pub fn set_task_config(order_by:String) -> Result<config::TaskConfiguration, String> {
    match config::TaskConfiguration::new(order_by) {
        Ok(conf) => Ok(conf),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub fn get_task_config() -> Result<config::TaskConfiguration, String> {
    match config::TaskConfiguration::get_task_config_info() {
        Ok(conf) => Ok(conf),
        Err(err) => Err(format!("Failed to fetch task config: {}", err)),
    }
}
