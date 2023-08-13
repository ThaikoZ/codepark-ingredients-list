from pydantic import BaseModel


class ItemBase(BaseModel):
    id: int
    description: str
    amount: int
    category: str


class UserBase(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None
