#
# Description: Datastore class to store items in memory as a dictionary
#
class Datastore:
    def __init__(self):
        self.data = {}
        self.idx = 0

    # Retrieve an item from the Datastore by its ID
    def select(self, item_id):
        if item_id not in self.data:
            return None

        return self.data[item_id]

    # Retrieve all items from the Datastore as a list of dictionaries
    def select_all(self):
        return list(self.data.values())

    # Insert a new item into the Datastore as a dictionary
    def insert(self, item):
        self.idx += 1
        self.data[self.idx] = {"id": self.idx, **item}

    # Update an item in the Datastore by its ID if it exists
    def update(self, item_id, item):
        if item_id not in self.data:
            return None

        self.data[item_id] = {"id": item_id, **item}
        return item

    # Delete an item from the Datastore by its ID if it exists
    def delete(self, item_id):
        if item_id not in self.data:
            return None

        del self.data[item_id]
        return item_id

    # Get the number of items in the Datastore
    def __len__(self):
        return len(self.data)
