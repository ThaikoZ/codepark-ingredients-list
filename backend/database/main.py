# FastAPI Library
from fastapi import FastAPI, status, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from enum import Enum
from typing import Annotated

# Local import
import schemas
import models
import crud
from database import SessionLocal, engine
import auth
from auth import get_current_user


class Tags(Enum):
    users = "Users"
    items = "Items"
    auth = "Auth"


models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="App API", version="0.1.0")
app.include_router(auth.router)

origins = ["http://localhost:5173",
           "http://127.0.0.1:5173",
           "http://localhost:5173/auth/register",
           "http://localhost:5173/auth/login"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


user_dependency = Annotated[dict, Depends(get_current_user)]


@app.get("/api/items", tags=[Tags.items], summary="Get list of items")
def get_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip, limit)
    return items


@app.get("/api/items/{item_id}", tags=[Tags.items])
def get_item(item_id: int, db: Session = Depends(get_db)):
    item = crud.get_item(db, item_id)
    return item


@app.post("/api/items/add", tags=[Tags.items], status_code=status.HTTP_201_CREATED)
def add_item(item: schemas.ItemBase, db: Session = Depends(get_db)):
    msg = crud.create_item(db, item)
    return msg


@app.delete("/api/items/delete/{item_id}", tags=[Tags.items])
def delete_item(item_id: int, db: Session = Depends(get_db)):
    db_item = crud.get_item(db, item_id)
    msg = crud.delete_item(db, db_item)
    return msg


@app.get('/api/auth/me', status_code=status.HTTP_200_OK, tags=[Tags.auth])
async def authenticate_token(user: user_dependency, db: Session = Depends(get_db)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    return {'user': user}
