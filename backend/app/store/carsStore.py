from app.store.datastore import Datastore


#
# CarStore class that extends the Datastore class
#
class CarStore(Datastore):
    def __init__(self):
        super().__init__()

    # Add a new car to the store
    def add_car(self, car):
        self.insert(car)

    # Update an existing car in the store by its ID
    def update_car(self, id, car):
        return self.update(id, car)

    # Delete a car from the store by its ID
    def delete_car(self, id):
        return self.delete(id)
