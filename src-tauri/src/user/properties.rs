use dirs;
use serde::{Deserialize, Serialize};
use std::fs;
use std::io;
use std::path::{Path, PathBuf};

#[derive(Serialize, Deserialize)]
pub struct User {
    pub name: String,
    pub id: u32,
    pub email: String,
}

impl User {
    pub fn new(name: String, id: u32, email: String) -> io::Result<Self> {
        let data_dir = dirs::data_dir().ok_or_else(|| io::Error::new(io::ErrorKind::NotFound, "Unable to find data directory"))?;
        let user_dir = data_dir.join("DayRider");
        fs::create_dir_all(&user_dir)?;

        let user_path = user_dir.join(format!("user_{}.json", id));

        let user = Self {
            name,
            id,
            email,
        };

        user.save_to_file(&user_path)?;

        Ok(user)
    }

    pub fn save_to_file(&self, path: &Path) -> io::Result<()> {
        let json = serde_json::to_string(self)?;
        fs::write(path, json)?;
        Ok(())
    }
}
