#[tauri::command]
fn evaluate_expression(expression: &str) -> Result<f64, String> {
    match meval::eval_str(expression) {
        Ok(result) => Ok(result),
        Err(e) => Err(format!("Error evaluating expression: {}", e)),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![evaluate_expression])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
