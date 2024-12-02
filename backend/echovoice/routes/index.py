from fastapi import APIRouter

main_route = APIRouter(prefix="")

@main_route.get("/")
async def index():
  return {"message": "Hello World"}