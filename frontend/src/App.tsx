import { useState, useEffect } from "react";
import { TableHeadCell, TableCell, ActionButton } from "./components/table/TableComponents";
import { Car } from "./types/car";
import CarForm from "./components/forms/CarForm";
import API from "./api/api";
import f1 from "./assets/f1.png";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [editCar, setEditCar] = useState<Car | null>(null);

  useEffect(() => {
    loadCars();
  }, []);

  // Load the list of cars from the API
  const loadCars = async (): Promise<void> => {
    try {
      const fetchedCars: Car[] = await API.getCars();
      setCars(fetchedCars);
    } catch (error) {
      console.error("Error loading cars:", error);
    }
  };

  // Handle the edit button click
  const handleEditClick = (id: number): void => {
    const carToEdit: Car | undefined = cars.find((car: Car) => car.id === id);
    if (carToEdit) {
      setEditCar(carToEdit);
      
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  };

  // Handle the delete button click
  const handleDeleteClick = async (id: number): Promise<void> => {
    try {
      await API.deleteCar(id);
      loadCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  // Handle the add car button click
  const handleAddCarClick = () => {
    setEditCar(null);

    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="absolute top-[-170px] left-0 right-0 flex justify-center items-center">
          <div className="mb-5 bg-white inline-block rounded-full px-14 pt-16 pb-8">
            <img src={f1} alt="F1" className="h-[65px] mt-[120px]" />
          </div>
        </div>

        <div className="flex justify-between mt-24">
          <h1 className="text-5xl text-left mb-5">2024 <i>F1</i> Grid</h1>
          <button
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded h-10"
            onClick={handleAddCarClick}
          >
            Add New Car
          </button>
        </div>
        <hr className="border-gray-400 border-t-2" />

        <table className="table-auto border-spacing-2">
          <thead>
            <tr>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell>Team</TableHeadCell>
              <TableHeadCell>Driver</TableHeadCell>
              <TableHeadCell>Notes</TableHeadCell>
              <TableHeadCell>Color</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </tr>
          </thead>
          <tbody>
            {cars.map((car: Car) => (
              <tr key={car.id}>
                <TableCell>{car.id}</TableCell>
                <TableCell>{car.team}</TableCell>
                <TableCell>{car.driver}</TableCell>
                <TableCell>{car.description}</TableCell>
                <TableCell>
                  <span className="capitalize">{car.color}</span>
                </TableCell>
                <TableCell>
                  <ActionButton color="sky" onClick={() => handleEditClick(car.id)}>
                    Edit
                  </ActionButton>
                  <ActionButton color="red" onClick={() => handleDeleteClick(car.id)}>
                    Delete
                  </ActionButton>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-5">
          <div
            className={`mt-4 transition-all duration-500 ease-in-out ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <CarForm car={editCar} reloadCars={loadCars} closeForm={() => setIsOpen(false)}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
