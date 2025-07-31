from bcrypt import hashpw, gensalt, checkpw

def set_password(password: str) -> str:
  """
  Hash de la contraseña proporcionada.
  """
  hashed_password = hashpw(password.encode("utf-8"), gensalt())
  return hashed_password.decode("utf-8")

def check_password(password: str, hashed_password: str) -> bool:
  """
  Verifica si la contraseña proporcionada coincide con la contraseña almacenada.
  """
  return checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))
