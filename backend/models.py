from sqlalchemy import  Column,  Integer, String
from .database import Base

class Item(Base):
    __tablename__ = "Items"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    amount = Column(Integer)
    category = Column(String)
