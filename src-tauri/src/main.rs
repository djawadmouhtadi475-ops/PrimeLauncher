#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{Manager};

#[tauri::command]
fn authenticate_offline(username: String) -> String {
    format!("Offline Mode Active: {}", username)
}

#[tauri::command]
fn get_java_status(mc_version: String) -> String {
    format!("Java 17 (Auto-Detected for {})", mc_version)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            authenticate_offline,
            get_java_status
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
