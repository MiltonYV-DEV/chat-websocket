from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.db.database import engine, SessionLocal, Base, get_db
from app.models.user import User 
from app.models.chat_room import ChatRoom
from app.models.message import Message
from app.models.user_chat_room import UserChatRoom
from app.schemas.user_schema import UserCreate, UserLogin, RegisterResponse
from app.schemas.auth_schema import TokenResponse, LoginRequest
from app.utils.auth_password import set_password, check_password
from app.utils.jwt import create_access_token, get_current_user
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()  # Cargar variables de entorno desde .env

app = FastAPI() # FastAPI

origins = [os.getenv("FRONTEND_URL")]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,  # Permitir todas las origines
  allow_credentials=True,
  allow_methods=["*"],  # Permitir todos los métodos
  allow_headers=["*"],  # Permitir todos los headers
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def read_root():
  return {"message": "Backend corriendo! para proyecto de diseno y fundamentos"}

@app.get("/test")
def test_create_user( db: Session = Depends(get_db)):
  test_user = User(
    username="pedrito",
    email="pedrito@gmail.com",
    password=set_password("hola123"),
  )
  db.add(test_user)
  db.commit()
  db.refresh(test_user)
  
  return JSONResponse(status_code=201, content={"message": "Usuario creado exitosamente", "user_id": test_user.id})

@app.post("/register", response_model=RegisterResponse)
def user_create(user: UserCreate, db: Session = Depends(get_db)):
  # verificando si el usuario ya existe
  existing_user = db.query(User).filter(User.email == user.email).first()
  
  if existing_user:
    raise HTTPException(status_code=400, detail="El correo ya esta registrado")

  new_user = User(
    username=user.username,
    email=user.email,
    password=set_password(user.password),
  )

  db.add(new_user)
  db.commit()
  db.refresh(new_user)
  
  return JSONResponse(status_code=201, content={
    "message": "Usuario creado exitosamente", "user_id": new_user.id
  })

@app.post("/login", response_model=TokenResponse)
def user_login(user_login: UserLogin, db: Session = Depends(get_db)):
  user = db.query(User).filter(User.email == user_login.email).first()

  if not user:
    raise HTTPException(status_code=404, detail="Usuario no encontrado")

  if not check_password(user_login.password, user.password):
    raise HTTPException(status_code=401, detail="Contraseña incorrecta")

  if user.is_active == 0:
    user.is_active = 1
    db.commit()
    db.refresh(user)

  # Se crea el token de acceso
  access_token = create_access_token(data={"sub": user.email})

  return {
    "access_token": access_token,
    "token_type": "bearer",
    "user": {
      "id": user.id,
      "username": user.username,
      "email": user.email,
      "is_active": user.is_active
    }
  }

