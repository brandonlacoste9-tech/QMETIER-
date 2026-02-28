#!/usr/bin/env python3
"""
Embedding Matcher Service for Q-MÉTIER
Real-time professional matching using semantic embeddings
"""
import os, uvicorn
import numpy as np, requests
import asyncpg
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Tuple

OLLAMA_EMB = os.getenv("OLLAMA_EMB", "http://localhost:11434/api/embeddings")
EMB_MODEL = os.getenv("EMB_MODEL", "nomic-embed-text")
DB_URL = os.getenv("POSTGRES_URL", "postgresql://postgres:secret@postgres:5432/qmetier")

app = FastAPI()

class MatchRequest(BaseModel):
    title: str
    description: str
    category_id: str
    skill_tags: List[str]
    lat: float
    lng: float
    max_distance_miles: float = 50
    top_n: int = 10

class ProfessionalMatch(BaseModel):
    id: str
    name: str
    rating: float
    review_count: int
    similarity: float
    distance_miles: float

class MatchResponse(BaseModel):
    matches: List[ProfessionalMatch]

async def get_db():
    return await asyncpg.connect(DB_URL)

def embed(text: str) -> np.ndarray:
    """Generate embedding via Ollama"""
    r = requests.post(OLLAMA_EMB, json={"model": EMB_MODEL, "input": text})
    r.raise_for_status()
    return np.array(r.json()["embedding"], dtype=np.float32)

@app.post("/match", response_model=MatchResponse)
async def match_professionals(request: MatchRequest):
    """Match professionals using semantic similarity + geo filtering"""
    # Build project embedding
    text = f"{request.title} {request.description} {' '.join(request.skill_tags)}"
    proj_vec = embed(text)
    
    # Query pgvector for top-N
    async with await get_db() as conn:
        rows = await conn.fetch(
            """
            SELECT id, name, rating, review_count,
                   1 - (embedding <=> $1) AS similarity,
                   ST_Distance(location::geography, ST_MakePoint($2,$3)::geography) / 1609.34 AS distance_miles
            FROM professionals
            WHERE ST_DWithin(location::geography, ST_MakePoint($2,$3)::geography, $4 * 1609.34)
              AND credit_balance > 0
            ORDER BY similarity DESC
            LIMIT $5;
            """,
            proj_vec.tolist(),
            request.lng, request.lat,
            request.max_distance_miles,
            request.top_n
        )
    
    if not rows:
        raise HTTPException(status_code=404, detail="No professionals found")
    
    matches = [ProfessionalMatch(**dict(r)) for r in rows]
    return MatchResponse(matches=matches)

@app.get("/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
