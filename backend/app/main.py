from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.db.database import engine, SessionLocal, Base
from app.models.user import User 
from app.models.chat_room import ChatRoom
from app.models.message import Message
from app.models.user_chat_room import UserChatRoom
from app.schemas.user_schema import UserCreate, UserLogin
from app.utils.auth_password import set_password, check_password

app = FastAPI() # FastAPI

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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

@app.post("/register")
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

@app.post("/login")
def user_login(user_login: UserLogin, db: Session = Depends(get_db)):
  user = db.query(User).filter(User.email == user_login.email).first()

  if not user:
    raise HTTPException(status_code=404, detail="Usuario no encontrado")

  if not check_password(user_login.password, user.password):
    raise HTTPException(status_code=401, detail="Contraseña incorrecta")

  return {"message": "Inicio de sesión exitoso", "user_id": user.id, "username": user.username}
