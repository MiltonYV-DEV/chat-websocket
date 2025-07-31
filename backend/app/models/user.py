from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship
from app.db.database import Base

class User(Base):
  __tablename__ = 'users'
  id = Column(Integer, primary_key=True, autoincrement=True)
  username = Column(String(50), unique=True, nullable=False)
  email = Column(String(100), unique=True, nullable=False)
  password = Column(String(100), nullable=False)
  is_active = Column(Integer, default=0)

  messages = relationship("Message", back_populates="user")
  chat_rooms = relationship("UserChatRoom", back_populates="user")

