from app.db.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

class Message(Base):
  __tablename__ = "messages"

  id = Column(Integer, primary_key=True, index=True)
  content = Column(String(300), nullable=False)
  timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)

  user_id = Column(Integer, ForeignKey('users.id'))
  room_id = Column(Integer, ForeignKey('chat_rooms.id'))

  user = relationship("User", back_populates="messages")
  room = relationship("ChatRoom", back_populates="messages")

