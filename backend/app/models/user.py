from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship
from app.db.database import Base
import bcrypt

class User(Base):
  __tablename__ = 'users'
  id = Column(Integer, primary_key=True, autoincrement=True)
  username = Column(String(50), unique=True, nullable=False)
  email = Column(String(100), unique=True, nullable=False)
  password = Column(String(100), nullable=False)
  is_active = Column(Integer, default=0)

  def set_password(self, password: str) -> None:
    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    self.password = hashed.decode("utf-8")

  def check_password(self, password: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), self.password.encode("utf-8"))


