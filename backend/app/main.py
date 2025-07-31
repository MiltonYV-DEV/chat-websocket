from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.db.database import engine, SessionLocal, Base
from app.models.user import User 
from app.schemas.user_schema import UserCreate

app = FastAPI()

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
  return {"message": "Backend corriendo!"}

@app.post("/register")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
  # verificando si el usuario ya existe
  existing_user = db.query(User).filter(User.email == user.email).first()
  
  if existing_user:
    raise HTTPException(status_code=400, detail="El correo ya esta registrado")

  new_user = User(
    username=user.username,
    email=user.email
  )

  new_user.set_password(user.password)

  db.add(new_user)
  db.commit()
  db.refresh(new_user)
  
  return JSONResponse(status_code=201, content={"message": "Usuario creado exitosamente", "user_id": new_user.id})
