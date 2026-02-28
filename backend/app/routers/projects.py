"""Project management endpoints"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Project, ProjectStatus
from app.schemas import ProjectCreate, Project as ProjectSchema
import httpx

router = APIRouter()

@router.post("/", response_model=ProjectSchema)
async def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    """Create a new project and trigger professional matching"""
    db_project = Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.get("/{project_id}", response_model=ProjectSchema)
async def get_project(project_id: str, db: Session = Depends(get_db)):
    """Get project details"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.get("/", response_model=List[ProjectSchema])
async def list_projects(
    skip: int = 0,
    limit: int = 20,
    status: str = None,
    db: Session = Depends(get_db)
):
    """List projects with optional filtering"""
    query = db.query(Project)
    if status:
        query = query.filter(Project.status == status)
    projects = query.offset(skip).limit(limit).all()
    return projects

@router.get("/{project_id}/matches")
async def get_project_matches(project_id: str, db: Session = Depends(get_db)):
    """Get matched professionals for a project"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Call matcher service
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8001/match",
            json={
                "title": project.title,
                "description": project.description,
                "category_id": str(project.category_id),
                "skill_tags": project.skill_tags,
                "lat": project.location_lat,
                "lng": project.location_lng
            }
        )
        response.raise_for_status()
        return response.json()
