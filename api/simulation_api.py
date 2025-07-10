from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TurnRequest(BaseModel):
    user_action: str
    environment: str

class TurnResponse(BaseModel):
    environment: str
    description: str
    memory: str
    mutation_chance: str
    choices: list
    result: str

@app.post("/simulate", response_model=TurnResponse)
def simulate_turn(data: TurnRequest):
    sample_choices = [
        "Cast Fire Manipulation at the fog",
        "Speak with Lathra Vex about her visions",
        "Search memory for the origin of your powers",
    ]
    mutation_chance = random.choice(["LOW", "MEDIUM", "HIGH"])
    result = f"You attempted: {data.user_action}. World shifts slightly. Mutation chance is {mutation_chance}."

    return TurnResponse(
        environment=data.environment,
        description="A thick mist rolls through the swamp. You feel heat rising in your bones.",
        memory="You remember the cursed ritual under the blood moon.",
        mutation_chance=mutation_chance,
        choices=sample_choices,
        result=result
    )
