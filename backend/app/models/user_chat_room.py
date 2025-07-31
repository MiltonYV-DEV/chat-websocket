from app.db.database import Base
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
class UserChatRoom(Base):
  __tablename__ = "user_chat_rooms"

  id = Column(Integer, primary_key=True, autoincrement=True)
  user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
  room_id = Column(Integer, ForeignKey('chat_rooms.id'), nullable=False)

  user = relationship("User", back_populates="chat_rooms")
  room = relationship("ChatRoom", back_populates="users")
