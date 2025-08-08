from fastapi import FastAPI, HTTPException, Depends, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.db.database import engine, SessionLocal, Base, get_db
from app.models.user import User 
from app.models.chat_room import ChatRoom
from app.models.message import Message
from app.models.user_chat_room import UserChatRoom
from app.schemas.user_schema import UserCreate, UserLogin, RegisterResponse, UserUpdate, UserUpdateResponse
from app.schemas.auth_schema import TokenResponse, LoginRequest
from app.utils.auth_password import set_password, check_password
from app.utils.jwt import create_access_token, get_current_user
from app.utils.connection_manager import ConnectionManager
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()  # Cargar variables de entorno desde .env

app = FastAPI() # FastAPI
manager = ConnectionManager()

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

@app.get("/rooms_create")
def rooms_create(db: Session = Depends(get_db)):

  test_rooms = [
    {"name": "General"},
    {"name": "Programación"}
  ]

  created_rooms = []

  for room_data in test_rooms:
      # Verifica si ya existe para no duplicar
      existing_room = db.query(ChatRoom).filter_by(name=room_data["name"]).first()
      if not existing_room:
          new_room = ChatRoom(name=room_data["name"])
          db.add(new_room)
          created_rooms.append(room_data["name"])

  db.commit()
  return {"message": "Salas creadas", "rooms": created_rooms}

@app.get("/rooms")
def rooms(db: Session = Depends(get_db)):
  rooms = db.query(ChatRoom).all()
  return [{"id": room.id, "name": room.name} for room in rooms]

@app.websocket("/ws/{room}")
async def websocket_endpoint(websocket: WebSocket, room: str):
    await manager.connect(websocket, room)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(data, room)
    except WebSocketDisconnect:
        manager.disconnect(websocket, room)

@app.put("/user_update")
def user_update(
    data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = current_user

    if not check_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Contraseña actual incorrecta")

    # Actualizar username si vino y no está vacío
    if data.username is not None and data.username.strip() != "":
        user.username = data.username.strip()

    # Actualizar email si vino y no está vacío
    if data.email is not None and data.email.strip() != "":
        user.email = data.email.strip()

    # Actualizar contraseña si es distinta de la actual
    if data.password_new is not None and data.password_new.strip() != "":
        if check_password(data.password_new, user.password):
            raise HTTPException(status_code=400, detail="La nueva contraseña no puede ser igual a la actual")
        user.password = set_password(data.password_new.strip())

    db.commit()
    db.refresh(user)

    return {
        "message": "Datos actualizados correctamente",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }

