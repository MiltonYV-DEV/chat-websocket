from app.db.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
  
class ChatRoom(Base):
  __tablename__ = 'chat_rooms'

  id = Column(Integer, primary_key=True, autoincrement=True)
  name = Column(String(100), unique=True, nullable=False)

  messages = relationship("Message", back_populates="room")
  users = relationship("UserChatRoom", back_populates="room")

