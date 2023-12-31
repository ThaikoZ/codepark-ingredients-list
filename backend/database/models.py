from sqlalchemy import Column, Integer, Boolean, String, Sequence, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Item(Base):
    """Model for database Table.

    Table name: Items

    Args:
        id (int): unique id
        description (str): item name or a short description
        amount (int): price of a element
        category (str): foreign key, category of items from Categories
    """
    __tablename__ = "Items"

    id = Column(Integer, primary_key=True, autoincrement=True)
    description = Column(String)
    amount = Column(Integer)
    category = Column(String)


class Users(Base):
    """Model for database Table.

    Table name: Users

    Args:

    """
    __tablename__ = "Users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String)
    email = Column(String)
    hashed_password = Column(String)
    disabled = Column(Boolean)
