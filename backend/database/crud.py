from sqlalchemy.orm import Session

import schemas
import models


def get_items(db: Session, skip: int, limit: int):
    return db.query(models.Item).offset(skip).limit(limit).all()


def get_item(db: Session, item_id: int):
    return db.query(models.Item).where(models.Item.id == item_id).first()


def create_item(db: Session, item: schemas.ItemBase):
    db_item = models.Item(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return {"status": "Item has been added succesfully", "item": item}
