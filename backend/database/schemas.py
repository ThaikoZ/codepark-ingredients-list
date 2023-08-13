from pydantic import BaseModel


class ItemBase(BaseModel):
    """Schema of a Items table in a database.

    Args:
        id (int): unique id
        description (str): item name or a short description
        amount (int): price of a element
        category (str): category of items
    """
    id: int
    description: str
    amount: int
    category: str


class UserBase(BaseModel):
    """Schema of a Users table in a database.

    Args:
        username (str): unique username
        email (str) optional - email adress
        full name (str) optional - first and last name
        disabled (boolean) optional - is account disabled
    """
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None
