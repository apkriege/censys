# Censys Take Home - F1
This is a simple application that allows a user to input a new car into the datastore and retrieve information about the cars in the datastore via a RestAPI built using FastAPI. Upon initialization the application will load in initial data from a JSON file and store it into the datastore. The datastore is a simple in-memory dictionary that stores the car data. All data retrieved from the API is in JSON format.

The front end displays a table of cars, and allows the user to either Add a new car, Edit an existing car, or Delete a car from the datastore. It is built using React and TailwindCSS and packaged with Vite.

## Running the application
To run the application first open 2 terminal windows. 
### Frontend
In the first terminal window, navigate to the `frontend` directory and execute the following command in the terminal:
```
npm install 
```
Then to start the application run either of the following 
```
sh start.sh
```
```
npm run dev
```

### Backend
In the second terminal window, navigate to the `backend` directory and execute the following command in the terminal:
Install dependencies
```
pip install pytest uvicorn -r requirements.txt
```
Start the application run either of the following and it will be accessible on port 8000 at http://localhost:8000
``` 
sh start.sh
```
``` 
uvicorn main:app --reload
```

## API Endpoints
The API endpoints can be accessed via the following URL: http://localhost:8000/docs

The API has the following endpoints:
  - GET /cars/{car_id}
  - GET /cars
  - POST /cars
  - PUT /cars/{car_id}
  - DELETE /cars/{car_id}

## Testing
I have built tests for the backend using Pytest. It will test all endpoints of the API with both valid and invalid inputs.
To run the tests, execute the following command in the terminal in the `backend` directory:
  `pytest app/test_main.py`

I haven't built any tests for the frontend yet, but I would use Jest, React Testing Library, and Cypress to do so.

## Future Improvements
- Add delete confirmation modal
- Create a secure way to access the API
- Add UI tests to the frontend and add tests for the backed datastore model
- Add more error handling
- Containerize the application

