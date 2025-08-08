from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Dict, Any

class UserCreate(BaseModel):
  username: str = Field(..., min_length=3, max_length=50, description="Nombre de usuario")
  email: EmailStr = Field(..., description="Correo electrónico del usuario")
  password: str = Field(..., min_length=6, max_length=100, description="Contraseña del usuario")

class RegisterResponse(BaseModel):
    message: str
    user_id: int

class UserLogin(BaseModel):
  email: EmailStr = Field(..., description="Correo electrónico del usuario")
  password: str = Field(..., min_length=6, max_length=100, description="Contraseña del usuario")

class UserUpdate(BaseModel):
  username: Optional[str] = Field(..., min_length=3, max_length=50, description="Nuevo nombre de usuario")
  email: Optional[EmailStr] = Field(..., description="Nuevo correo electronico")
  password: Optional[str] = Field(..., min_length=6, max_length=100, description="Contraseña antigua")
  password_new: Optional[str]

class UserUpdateResponse(BaseModel):
  message: str
  data_new: Dict[str, Any] = Field(default_factory=dict)
