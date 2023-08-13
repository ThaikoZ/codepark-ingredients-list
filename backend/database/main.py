
from fastapi import FastAPI, status, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from typing import Annotated

from sqlalchemy.orm import Session
from enum import Enum

# Local import
import schemas
import models
import crud
from database import SessionLocal, engine


class Tags(Enum):
    users = "Users"
    items = "Items"


models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="App API", version="0.0.1")

# Dependency


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/items", tags=[Tags.items], summary="Get list of items")
async def get_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip, limit)
    return items


@app.get("/items/{item_id}", tags=[Tags.items])
async def get_item(item_id: int, db: Session = Depends(get_db)):
    item = crud.get_item(db, item_id)
    return item


@app.post("/items/add", tags=[Tags.items], status_code=status.HTTP_201_CREATED)
async def add_item(item: schemas.ItemBase, db: Session = Depends(get_db)):
    msg = crud.create_item(db, item)
    return msg
# @app.get("/items")
# async def get_items(db: Session, skip: int = 0, limit: int = 100):
#   return db.query(models.Item).offset(skip).limit(limit).all()


# TODO: The whole REST API to comunicate with server
# TODO: The connection to sqlite db with items in a array
# TODO: Try to make a login autorization and session token
