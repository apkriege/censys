import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.store.carsStore import CarStore
from app.utils.api import APIResponse

app = FastAPI()

# Configure CORS for incoming requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows specific origin(s)
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
    allow_credentials=True,
)


# Create a new instance of the CarStore and load the initial cars
car_store = CarStore()

# Could do this in a separate function but for simplicity we'll roll with this
def load_cars():
    f = open("app/data/cars.json", "r")
    init_cars = json.load(f)

    for car in init_cars:
        car_store.add_car(car)


load_cars()


# Route for the root endpoint, returning a simple message
@app.get("/")
def root():
    return APIResponse(200, {"message": "Lights out and away we go!"})


# Route to retrieve all cars from the store
@app.get("/cars")
def get_cars():
    try:
        all_cars = car_store.select_all()
        return APIResponse(200, all_cars)
    except:
        return APIResponse(500, {"message": "Internal server error"})


# Route to retrieve a specific car by its ID
@app.get("/cars/{car_id}")
def get_car(car_id: int):
    try:
        # Retrieve the car from the store by its ID if it exists
        car = car_store.select(car_id)

        if car is None:
            return APIResponse(404, {"message": "Not found"})

        return APIResponse(200, car)
    except:
        return APIResponse(500, {"message": "Internal server error"})


# Define a class representing a car with attributes: name, description, and color
class Car(BaseModel):
    team: str
    driver: str
    description: str
    color: str


# Route to add a new car to the store
@app.post("/cars")
def add_car(car: Car):
    try:
        # Create a new dictionary to store the car data
        if car.team is None or car.driver is None or car.description is None or car.color is None:
            return APIResponse(400, {"message": "Bad request"})
        
        new_car = {"team": car.team, "driver": car.driver, "description": car.description, "color": car.color}

        car_store.add_car(new_car)

        return APIResponse(201, {"message": "Car added"})
    except Exception as e:
        print(e)
        return APIResponse(500, {"message": "Internal server error"})

# Route to update an existing car in the store
@app.put("/cars/{car_id}")
def update_car(car_id: int, car: Car):
    try:
        # Create a dictionary with updated car data
        update_car = {
            "team": car.team,
            "driver": car.driver,
            "description": car.description,
            "color": car.color,
        }   

        # Update the car in the store by its ID if it exists
        updated = car_store.update_car(car_id, update_car)

        if updated is None:
            return APIResponse(404, {"message": "Not found"})

        return APIResponse(200, {"message": "Car updated"})
    except Exception as e:
        print(e)
        return APIResponse(500, {"message": "Internal server error"})


# Route to delete a car from the store by its ID
@app.delete("/cars/{car_id}")
def delete_car(car_id: int):
    try:
        print(car_id)
        # Delete the car from the store by its ID if it exists
        deleted = car_store.delete_car(car_id)

        if deleted is None:
            return APIResponse(404, {"message": "Not found"})

        return APIResponse(200, {"message": "Car deleted"})
    except:
        return APIResponse(500, {"message": "Internal server error"})
