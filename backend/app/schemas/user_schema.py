from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
  username: str = Field(..., min_length=3, max_length=50, description="Nombre de usuario")
  email: EmailStr = Field(..., description="Correo electrónico del usuario")
  password: str = Field(..., min_length=6, max_length=100, description="Contraseña del usuario")

class UserLogin(BaseModel):
  email: EmailStr = Field(..., description="Correo electrónico del usuario")
  password: str = Field(..., min_length=6, max_length=100, description="Contraseña del usuario")
