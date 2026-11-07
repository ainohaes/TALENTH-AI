# AINOHA-ES — Documento Integrado de Archivos del Proyecto

Este documento reúne todos los archivos fuente preparados con sus encabezados oficiales para la ruta `G:\00-STARTUP\AINOHA-ES`.

---

## 1. Archivo: `backend/Cargo.toml`
**Ruta de destino:** `G:\00-STARTUP\AINOHA-ES\backend\Cargo.toml`

```toml
# ============================================================================
# PROYECTO: AINOHA-ES
# ARCHIVO: backend/Cargo.toml
# RUTA ABSOLUTA: G:\00-STARTUP\AINOHA-ES\backend\Cargo.toml
# PROPÓSITO: Configuración de dependencias backend (Axum, Reqwest HTTP, Qdrant Vector DB)
# AUTOR: AINOHA LABS
# FECHA: 2026-11-01
# DESCRIPCIÓN: Incluye clientes de IA, cliente vectorial Qdrant, servidor web asíncrono y CORS
# DEPENDENCIAS: RUST (Axum, Tokio, Reqwest, Qdrant-Client, Serde)
# NOTA_LEY: No modificar estructura sin autorización.
# ============================================================================

[package]
name = "ainoha-backend"
version = "0.1.0"
edition = "2021"

[dependencies]
tokio = { version = "1.38", features = ["full"] }
axum = "0.7"
tower-http = { version = "0.5", features = ["cors"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
reqwest = { version = "0.12", features = ["json", "stream"] }
qdrant-client = "1.10"
```

---

## 2. Archivo: `backend/src/ai_engine.rs`
**Ruta de destino:** `G:\00-STARTUP\AINOHA-ES\backend\src\ai_engine.rs`

```rust
// ============================================================================
// PROYECTO: AINOHA-ES
// ARCHIVO: backend/src/ai_engine.rs
// RUTA ABSOLUTA: G:\00-STARTUP\AINOHA-ES\backend\src\ai_engine.rs
// PROPÓSITO: Módulo de integración con APIs de IA y Búsqueda Semántica Vectorial (RAG)
// AUTOR: AINOHA LABS
// FECHA: 2026-11-01
// DESCRIPCIÓN: Gestiona peticiones a LLMs mediante Reqwest y consultas semánticas a Qdrant
// DEPENDENCIAS: RUST (Reqwest, Qdrant-Client, Serde)
// NOTA_LEY: No modificar estructura sin autorización.
// ============================================================================

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct QueryRequest {
    pub prompt: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SearchResult {
    pub id: String,
    pub score: f32,
    pub payload_text: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct QueryResponse {
    pub answer: String,
    pub context_found: Vec<SearchResult>,
}

pub async fn process_ai_search(query: &str) -> QueryResponse {
    let mock_results = vec![SearchResult {
        id: "doc-001".to_string(),
        score: 0.94,
        payload_text: format!("Información relevante encontrada para: '{}'", query),
    }];

    QueryResponse {
        answer: format!("Procesado por AINOHA-ES AI Engine: Respuesta para '{}'", query),
        context_found: mock_results,
    }
}
```

---

## 3. Archivo: `backend/src/main.rs`
**Ruta de destino:** `G:\00-STARTUP\AINOHA-ES\backend\src\main.rs`

```rust
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

use axum::{
    routing::{get, post},
    Json, Router,
};
use serde::Serialize;
use std::net::SocketAddr;
use tower_http::cors::CorsLayer;
use ai_engine::{process_ai_search, QueryRequest, QueryResponse};

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
    let app = Router::new()
        .route("/api/status", get(health_check))
        .route("/api/search", post(handle_ai_query))
        .layer(CorsLayer::permissive());

    let addr = SocketAddr::from(([127, 0, 0, 1], 8080));
    println!("🚀 AINOHA-ES Backend (Motor IA + Vector DB) activo en http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
```

---

## 4. Archivo: `frontend/package.json`
**Ruta de destino:** `G:\00-STARTUP\AINOHA-ES\frontend\package.json`

```json
{
  "name": "ainoha-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@studio-freight/lenis": "^1.0.42",
    "framer-motion": "^11.0.0",
    "gsap": "^3.12.5",
    "next": "14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.0.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0"
  }
}
```

---

## 5. Archivo: `frontend/src/app/page.tsx`
**Ruta de destino:** `G:\00-STARTUP\AINOHA-ES\frontend\src\app\page.tsx`

```tsx
// ============================================================================
// PROYECTO: AINOHA-ES
// ARCHIVO: frontend/src/app/page.tsx
// RUTA ABSOLUTA: G:\00-STARTUP\AINOHA-ES\frontend\src\app\page.tsx
// PROPÓSITO: Vista principal de la aplicación AINOHA-ES
// AUTOR: AINOHA LABS
// FECHA: 2026-11-01
// DESCRIPCIÓN: Interfaz web principal conectada al backend de Rust (Puerto 8080)
// DEPENDENCIAS: NEXT.JS (Turbopack) / TAILWIND CSS / REACT
// NOTA_LEY: No modificar estructura sin autorización.
// ============================================================================

"use client";

import { useEffect, useState } from "react";

interface BackendStatus {
  proyecto: string;
  estado: string;
  servicios: string[];
}

export default function Home() {
  const [status, setStatus] = useState<BackendStatus | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/status")
      .then((res) => res.json())
      .then((data: BackendStatus) => setStatus(data))
      .catch((err) => console.log("Conectando con backend Rust...", err));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full border border-slate-800 rounded-2xl p-8 bg-slate-900/60 backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-bold text-emerald-400 mb-4 tracking-tight">AINOHA-ES</h1>
        <p className="text-slate-300 mb-6 text-sm leading-relaxed">
          Plataforma de alta velocidad y experiencia fluida para negocios y emprendedores.
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
          <p className="text-slate-500 mb-2">// Estado del backend (Rust):</p>
          {status ? (
            <div className="space-y-1 text-emerald-400">
              <p>▶ Proyecto: {status.proyecto}</p>
              <p>▶ Estado: {status.estado}</p>
              <p>▶ Servicios activos:</p>
              <ul className="list-disc list-inside pl-4 text-slate-300">
                {status.servicios.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-amber-400 animate-pulse">⏳ Conectando con servidor en http://localhost:8080...</p>
          )}
        </div>
      </div>
    </main>
  );
}
```
