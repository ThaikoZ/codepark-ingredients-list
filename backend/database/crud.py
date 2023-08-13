"""The script contain functions that are used to connect with a database.

Methods:
    get_items: returns a list of all items in Item table
    get_item: return only one item selected by item_id
    create_item: creates item in our database
    delete_item: delete item by body
"""

from sqlalchemy.orm import Session

import schemas
import models


def get_items(db: Session, skip: int, limit: int):
    """Returns the list of all items in a database in 'Session'

    Args:
        db (Session): current session to our database
        skip (int): index of a first element
        limit (int): max amount of elements

    Returns:
        JSON: returns a data in json type
    """
    return db.query(models.Item).offset(skip).limit(limit).all()


def get_item(db: Session, item_id: int):
    """Get only one item by his id

    Args:
        db (Session): current session to our database
        item_id (int): id of a searching item

    Returns:
        JSON: whole data about an item found by id
    """
    return db.query(models.Item).where(models.Item.id == item_id).first()


def create_item(db: Session, item: schemas.ItemBase):
    """Add a new item to database and commit.

    Args:
        db (Session): current session to our database
        item (schemas.ItemBase): the schema of a item

    Returns:
        JSON: message with a added item
    """
    db_item = models.Item(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return {"status": "Item has been added succesfully", "item": item}


def delete_item(db: Session, item: schemas.ItemBase):
    """Deletes item in a database by his body

    Args:
        db (Session): current session to our database
        item (schemas.ItemBase): item which will be deleted

    Returns:
        JSON: message that item was deleted
    """
    db.delete(item)
    db.commit()
    return {"status": "Item has been deleted successfully"}
