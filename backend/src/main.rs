// ============================================================================
// PROYECTO: AINOHA-ES
// ARCHIVO: backend/src/main.rs
// RUTA ABSOLUTA: G:\00-STARTUP\AINOHA-ES\backend\src\main.rs
// PROPÓSITO: Punto de entrada del servidor de API en Rust para AINOHA-ES
// AUTOR: AINOHA LABS
// FECHA: 2026-11-01
// DESCRIPCIÓN: Rutas para verificación de estado y motor RAG de búsqueda de IA
// DEPENDENCIAS: RUST (Axum, Tokio)
// NOTA_LEY: No modificar estructura sin autorización.
// ============================================================================

mod ai_engine;

use ai_engine::{process_ai_search, QueryRequest, QueryResponse};
use axum::{
    routing::{get, post},
    Json, Router,
};
use serde::Serialize;
use std::{env, net::SocketAddr};
use tower_http::cors::CorsLayer;

#[derive(Serialize)]
struct SystemStatus {
    proyecto: String,
    estado: String,
    servicios: Vec<String>,
}

async fn health_check() -> Json<SystemStatus> {
    Json(SystemStatus {
        proyecto: "AINOHA-ES".to_string(),
        estado: "ONLINE".to_string(),
        servicios: vec![
            "HTTP Server (Axum)".to_string(),
            "AI Engine (Reqwest)".to_string(),
            "Vector DB (Qdrant Client)".to_string(),
        ],
    })
}

async fn handle_ai_query(Json(payload): Json<QueryRequest>) -> Json<QueryResponse> {
    let result = process_ai_search(&payload.prompt).await;
    Json(result)
}

#[tokio::main]
async fn main() {
    let port = env::var("PORT").unwrap_or_else(|_| "8080".to_owned());
    let addr: SocketAddr = format!("127.0.0.1:{port}").parse().unwrap();

    let app = Router::new()
        .route("/api/status", get(health_check))
        .route("/api/search", post(handle_ai_query))
        .layer(CorsLayer::permissive());

    println!("🚀 AINOHA-ES Backend (Motor IA + Vector DB) activo en http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

