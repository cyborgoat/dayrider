use dirs;
use serde::{Deserialize, Serialize};
use std::fs;
use std::io;
use std::path::Path;

#[derive(Serialize, Deserialize)]
pub struct TaskConfiguration {
    pub order_by: String,
}

impl TaskConfiguration {
    pub fn new(order_by:String) -> io::Result<Self> {
        let data_dir = dirs::data_dir().ok_or_else(|| {
            io::Error::new(io::ErrorKind::NotFound, "Unable to find data directory")
        })?;
        let config_dir = data_dir.join("DayRider");
        fs::create_dir_all(&config_dir)?;

        let config_path = config_dir.join(format!("task_config.json"));

        let config = Self { order_by };

        config.save_to_file(&config_path)?;

        Ok(config)
    }

    pub fn save_to_file(&self, path: &Path) -> io::Result<()> {
        let json = serde_json::to_string(self)?;
        fs::write(path, json)?;
        Ok(())
    }

    pub fn get_task_config_info() -> io::Result<Self> {
        let data_dir = dirs::data_dir().ok_or_else(|| {
            io::Error::new(io::ErrorKind::NotFound, "Unable to find data directory")
        })?;
        let user_path = data_dir.join("DayRider").join("task_config.json");

        if !user_path.exists() {
            return Err(io::Error::new(
                io::ErrorKind::NotFound,
                "Task configuration not found",
            ));
        }

        let data = fs::read_to_string(user_path)?;
        let config: TaskConfiguration = serde_json::from_str(&data)?;

        Ok(config)
    }
}
