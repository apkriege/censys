import { Car } from '../types/car';

class API {
  // Define the base URL for API requests
  private static readonly baseUrl: string = 'http://localhost:8000';  

  // Build the full URL for a given route
  private static routeBuilder(route: string): string {
    return `${API.baseUrl}${route}`;
  }

  // Perform a generic fetch request with optional options
  private static async fetch(route: string, options: RequestInit = {}): Promise<Response> {
    return fetch(API.routeBuilder(route), options);
  }

  // Get the root endpoint of the API
  public static async getRoot(): Promise<any> {
    const response = await this.fetch('/');
    return response.json();
  }

  // Get the list of cars from the API
  public static async getCars(): Promise<Car[]> {
    const response = await this.fetch('/cars');
    return response.json();
  }

  // Get a single car for the api
  public static async getCar(id: number): Promise<Car> {
    const response = await this.fetch('/cars/'+id);
    return response.json();
  }

  // Add a new car to the API
  public static async addCar(car: Car): Promise<any> {
    const response = await this.fetch('/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });

    return response.json();
  }

  // Update an existing car in the API
  public static async updateCar(car: Car): Promise<any> {
    const response = await this.fetch(`/cars/${car.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });

    return response.json();
  }

  // Delete a car from the API
  public static async deleteCar(id: number): Promise<any> {
    const response = await this.fetch(`/cars/${id}`, {
      method: 'DELETE',
    });

    return response.json();
  }
}

export default API;
