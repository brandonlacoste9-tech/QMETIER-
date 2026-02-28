"""
Q-MÉTIER FastAPI Application
Main entry point for the marketplace API
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import projects, quotes, credits, professionals
from app.database import engine, Base

app = FastAPI(
    title="Q-MÉTIER API",
    description="AI-Autonomous Marketplace Platform",
    version="0.1.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(projects.router, prefix="/projects", tags=["projects"])
app.include_router(quotes.router, prefix="/quotes", tags=["quotes"])
app.include_router(credits.router, prefix="/credits", tags=["credits"])
app.include_router(professionals.router, prefix="/professionals", tags=["professionals"])

# Import telegram router
from app.routers import telegram
app.include_router(telegram.router, prefix="/telegram", tags=["telegram"])

# Import reviews router
from app.routers import reviews
app.include_router(reviews.router, prefix="/reviews", tags=["reviews"])

@app.get("/")
async def root():
    return {"message": "Q-MÉTIER API", "version": "0.1.0"}

@app.get("/health")
async def health():
    return {"status": "ok"}
