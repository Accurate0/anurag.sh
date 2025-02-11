use askama::Template;
use axum::{
    extract::{MatchedPath, State},
    http::{Request, StatusCode},
    response::{Html, IntoResponse},
    routing::get,
    Router,
};
use axum_extra::extract::CookieJar;
use tower::ServiceBuilder;
use tower_http::{
    services::ServeDir,
    trace::{DefaultOnRequest, DefaultOnResponse, TraceLayer},
    LatencyUnit,
};
use tracing::Level;
use tunnelbana_etags::{ETagLayer, ETagMap};

#[derive(Template)]
#[template(path = "index.html")]
struct IndexTemplate<'a> {
    css_url: String,
    background_color: String,
    all_styles: &'a [&'static str],
}

const ALL_STYLES: [&str; 2] = ["/static/css/sakura.css", "/static/css/sakura-dark.css"];

#[derive(Clone)]
struct AppState {}

pub enum AppError {
    Error(anyhow::Error),
}

impl IntoResponse for AppError {
    fn into_response(self) -> axum::response::Response {
        match self {
            AppError::Error(e) => {
                tracing::error!("{e}");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "Something went wrong".to_string(),
                )
                    .into_response()
            }
        }
    }
}

impl<E> From<E> for AppError
where
    E: Into<anyhow::Error>,
{
    fn from(err: E) -> Self {
        Self::Error(err.into())
    }
}

// basic handler that responds with a static string
async fn index(State(_state): State<AppState>, jar: CookieJar) -> Result<Html<String>, AppError> {
    let theme = jar
        .get("current-theme")
        .map(|c| c.value().to_owned())
        .unwrap_or_else(|| "default".to_string());

    tracing::info!("theme: {theme}");
    let css_url = if theme == "dark" {
        "/static/css/sakura-dark.css"
    } else {
        "/static/css/sakura.css"
    }
    .to_string();

    let background_color = if theme == "dark" {
        "#222222"
    } else {
        "#f9f9f9"
    }
    .to_string();

    let index_template = IndexTemplate {
        css_url,
        background_color,
        all_styles: &ALL_STYLES,
    };

    Ok(axum::response::Html(index_template.render()?))
}

async fn health() -> &'static str {
    "ok"
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();

    tracing::info!("started anurag-sh");

    let trace_layer = TraceLayer::new_for_http()
        .make_span_with(|request: &Request<_>| {
            let matched_path = request
                .extensions()
                .get::<MatchedPath>()
                .map(MatchedPath::as_str)
                .unwrap_or_else(|| request.uri().path());

            tracing::info_span!("request", uri = matched_path)
        })
        .on_request(DefaultOnRequest::new().level(Level::INFO))
        .on_response(
            DefaultOnResponse::new()
                .level(Level::INFO)
                .latency_unit(LatencyUnit::Millis),
        );

    let path = std::path::PathBuf::from("static");
    let etags = ETagMap::new(&path).expect("Failed to generate etags");
    let etag_mw = ETagLayer::new(etags);
    let serve_dir = ServeDir::new(path);
    let service = ServiceBuilder::new().layer(etag_mw).service(serve_dir);

    let app = Router::new()
        .route("/", get(index))
        .route("/health", get(health))
        .nest_service("/static", service)
        .layer(trace_layer)
        .with_state(AppState {});

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await?;
    axum::serve(listener, app).await?;

    Ok(())
}
