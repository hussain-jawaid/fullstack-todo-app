from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


# Allow requests from frontend (localhost:5173 for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# memory list of todos
todos = []

@app.get("/todos")
def get_todos():
    return todos

@app.post("/add-todo")
def add_todo(todo: dict):
    todos.append(todo)
    return {"message": "Todo added"}

@app.delete("/todos/{index}")
def delete_todo(index: int):
    if 0 <= index < len(todos):
        todos.pop(index)
        return {"message": "Todo deleted"}
    return {"message": "Invalid Index"}