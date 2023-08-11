from fastapi import FastAPI
from sqlalchemy.orm import Session

from . import models, schemas

app = FastAPI()

@app.get("/items")
async def get_items(db: Session, skip: int = 0, limit: int = 100):
  return db.query(models.Item).offset(skip).limit(limit).all()
    
  

#TODO: The whole REST API to comunicate with server
#TODO: The connection to sqlite db with items in a array
#TODO: Try to make a login autorization and session token