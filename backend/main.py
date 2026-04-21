from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from tax_engine.suggest_regime import suggest_regime
from ai.chatbot import ask_tax_bot

app = FastAPI()

# CORS (React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Request Models
# -----------------------------
class TaxRequest(BaseModel):
    income: float
    sec80c: float
    sec80d: float
    hra: float


class ChatRequest(BaseModel):
    question: str


# -----------------------------
# Routes
# -----------------------------
@app.get("/")
def home():
    return {"message": "AI Tax Assistant Running"}


@app.post("/calculate-tax")
def calculate_tax(request: TaxRequest):
    return suggest_regime(
        request.income,
        request.sec80c,
        request.sec80d,
        request.hra
    )


@app.post("/chat")
def chat(request: ChatRequest):
    return {"response": ask_tax_bot(request.question)}