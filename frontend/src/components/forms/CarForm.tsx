import { FC, useEffect, useState } from "react";
import { Car } from "../../types/car";
import { InputField, TextArea } from "./FormComponents";
import API from "../../api/api";
import Toast from "../app/Toast";

interface CarFormProps {
  // car: Car | null;
  carId: number | null;
  reloadCars: () => void;
  closeForm: () => void;
}

// Initial state for the form
const initState = {
  id: 0,
  team: "",
  driver: "",
  description: "",
  color: "",
};

const CarForm: FC<CarFormProps> = ({ carId, reloadCars, closeForm }) => {
  const [formData, setFormData] = useState(initState as Car);
  const [toast, setToast] = useState({ type: "", message: "" });

  // If a carId is provided, get the car data
  useEffect(() => {
    console.log("Car ID: ", carId)
    if (carId) {
      getCar(carId);
    } else {
      setFormData(initState);
    }

    resetToast();
  }, [carId]);

  // Get the car data from the API
  const getCar = async (id: number) => {
    const car = await API.getCar(id);
    setFormData(car);
  }

  // Update the form data when the user types
  const handleInputChange = (field: keyof Car, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Check if any fields are empty
      const vals = Object.values(formData);
      if (vals.includes("")) {
        setToast({ type: "error", message: "Please fill in all form fields" });
        return;
      }

      // If the car has an ID, update it. Otherwise, create a new car
      if(carId) {
        // Update car
        await API.updateCar(formData);
      } else {
        // Add car
        await API.addCar(formData);
      }

      formSuccess();
    } catch (error) {
      console.error("Error saving car", error);
      setToast({ type: "error", message: "Error saving car" });
    }
  };

  // Display a success message and close the form
  const formSuccess = () => {
    setToast({ type: "success", message: "Car saved successfully" });
    reloadCars();
    setTimeout(() => {
      closeForm();
      handleCancel();
    }, 2500);
  }

  // Handle the cancel button click
  const handleCancel = () => {
    setFormData(initState);
    closeForm();
    resetToast();
  }

  // Reset the toast message
  const resetToast = () => {
    setToast({ type: "", message: "" });
  }

  return (
    <div className="bg-sky-950 border-2 border-sky-800 p-4 rounded-md">
      <div className="flex justify-between relative">
        <h2 className="text-3xl mb-5">{carId ? `Edit Car: ${formData.team}` : "Add New Car"}</h2>
        <button
          onClick={handleCancel}
          className="text-2xl font-bold text-red-500 hover:text-red-700 absolute top-[-10px] right-0"
        >
          X
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <InputField
          id="team"
          label="Team"
          value={formData.team}
          onChange={(value) => handleInputChange("team", value)}
          placeholder="Enter team name"
        />
        <InputField
          id="driver"
          label="Driver"
          value={formData.driver}
          onChange={(value) => handleInputChange("driver", value)}
          placeholder="Enter driver name"
        />
        <TextArea
          id="description"
          label="Description"
          value={formData.description}
          onChange={(value) => handleInputChange("description", value)}
          placeholder="Enter description"
        />
        <InputField
          id="color"
          label="Color"
          value={formData.color}
          onChange={(value) => handleInputChange("color", value)}
          placeholder="Enter color"
        />
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-lg">
          Save
        </button>
      </form>
      <Toast type={toast.type} message={toast.message} />
    </div>
  );
};

export default CarForm;
