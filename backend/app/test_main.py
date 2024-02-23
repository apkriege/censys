from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Lights out and away we go!"}


def test_get_cars():
    response = client.get("/cars")
    assert response.status_code == 200
    assert len(response.json()) == 3
    assert response.json() == [
        {
            "id": 1,
            "team": "Red Bull",
            "driver": "Max Verstappen",
            "description": "3x champs Adrian Newey is a genius",
            "color": "blue",
        },
        {
            "id": 2,
            "team": "Ferrari",
            "driver": "Charles Leclerc",
            "description": "Not a complete wagon",
            "color": "ferrari red",
        },
        {
            "id": 3,
            "team": "Aston Martin",
            "driver": "Sebastian Vettel",
            "description": "Preseason speed late season busters",
            "color": "green",
        },
    ]


def test_get_car():
    response = client.get("/cars/1")
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "team": "Red Bull",
        "driver": "Max Verstappen",
        "description": "3x champs Adrian Newey is a genius",
        "color": "blue",
    }


def test_get_car_not_found():
    response = client.get("/cars/4")
    assert response.status_code == 404
    assert response.json() == {"message": "Not found"}


def test_add_car():
    response = client.post(
        "/cars",
        json={
            "team": "Mercedes",
            "driver": "Lewis Hamilton",
            "description": "The best or nothing",
            "color": "silver",
        },
    )
    assert response.status_code == 201
    assert response.json() == {"message": "Car added"}
    assert len(client.get("/cars").json()) == 4


def test_fail_add_car():
    response = client.post(
        "/cars",
        json={
            "team": "Mercedes",
            "description": "The best or nothing",
        },
    )
    assert response.status_code == 422


def test_update_car():
    response = client.put(
        "/cars/1",
        json={
            "team": "Red Bull",
            "driver": "Max Verstappen",
            "description": "4x champs Adrian Newey is a genius",
            "color": "blue",
        },
    )
    assert response.status_code == 200
    assert response.json() == {"message": "Car updated"}


def test_fail_update_car():
    response = client.put(
        "/cars/10",
        json={
            "team": "Red Bull",
            "driver": "Max Verstappen",
            "description": "4x champs Adrian Newey is a genius",
            "color": "blue",
        },
    )
    
    assert response.status_code == 404


def test_delete_car():
    response = client.delete("/cars/1")
    assert response.status_code == 200
    assert len(client.get("/cars").json()) == 3
    assert response.json() == {"message": "Car deleted"}
    
def test_fail_delete_car():
    response = client.delete("/cars/10")
    assert response.status_code == 404
    assert response.json() == {"message": "Not found"}