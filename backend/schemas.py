from pydantic import BaseModel

class ItemBase(BaseModel):
  id: int
  description: str
  amount: int
  category: str
  
  