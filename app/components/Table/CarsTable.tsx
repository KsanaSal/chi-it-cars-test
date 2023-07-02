"use client";
import { ICar } from "@/app/models/car.interface";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import DropDown from "../DropDown/DropDown";
import DeleteModal from "../Modals/DeleteModal";
import Pagination from "../Pagination/Pagination";

interface IProps {
    color: string;
    company: string;
    model: string;
    startYear: string;
    endYear: string;
    vin: string;
    available: string;
    startPrice: string;
    endPrice: string;
}

//     Company
//   - Model
//   - VIN
//   - Color
//   - Year
//   - Price
//   - Availability
//   - Actions columns

const CarsTable = ({
    color,
    company,
    model,
    startYear,
    endYear,
    vin,
    available,
    startPrice,
    endPrice,
}: IProps) => {
    const [cars, setCars] = useState<ICar[]>([]);

    const [filterCars, setFilterCars] = useState<ICar[]>([]);
    // setFilterCars(cars);

    const [currentPage, setCurrentPage] = useState(1);
    const [carsPerPage, setCarsPerPage] = useState(10);
    const totalCars = filterCars.length;
    const totalPages = Math.ceil(totalCars / carsPerPage);
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filterCars.slice(indexOfFirstCar, indexOfLastCar);
    console.log(currentCars);

    const [currentCar, setCurrentCar] = useState({
        id: 154,
        car: "Chevrolet",
        car_model: "TrailBlazer",
        car_color: "Violet",
        car_model_year: 2006,
        car_vin: "JA32U2FUXFU470149",
        price: "$2167.72",
        availability: true,
    });

    const deleteHandler = (carCard: ICar) => {
        console.log("delete", carCard);
    };
    const editHandler = (carCard: ICar) => {
        console.log("edit", carCard);
    };

    useEffect(() => {
        const getData = async () => {
            fetch("api/get-cars")
                .then((res) => res.json())
                .then((res) => {
                    setCars(res);
                });
        };
        getData();
    }, []);

    useEffect(() => {
        if (cars.length > 0) {
            const filteredCars = cars.filter(
                (car) =>
                    car.car_color.toLowerCase().includes(color.toLowerCase()) &&
                    car.car.toLowerCase().includes(company.toLowerCase()) &&
                    car.car_model.toLowerCase().includes(model.toLowerCase()) &&
                    (car.car_model_year >= parseInt(startYear) ||
                        startYear.length !== 4 ||
                        startYear === "") &&
                    (car.car_model_year <= parseInt(endYear) ||
                        endYear.length !== 4 ||
                        endYear === "") &&
                    car.car_vin.toLowerCase().includes(vin.toLowerCase()) &&
                    (available === "All" ||
                        car.availability === (available === "Available")) &&
                    (parseFloat(car.price.slice(1)) >= parseInt(startPrice) ||
                        startPrice === "") &&
                    (parseFloat(car.price.slice(1)) <= parseInt(endPrice) ||
                        endPrice === "")
            );
            console.log(filteredCars);
            console.log(company);
            setFilterCars(filteredCars);
            setCurrentPage(1);
        } else {
            setFilterCars(cars);
        }
    }, [
        color,
        cars,
        company,
        model,
        vin,
        startYear,
        endYear,
        available,
        startPrice,
        endPrice,
    ]);

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-3xl font-semibold leading-9 text-gray-900">
                        Cars
                    </h1>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add car
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-lime-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900 sm:pl-6"
                                        >
                                            Company
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                                        >
                                            Model
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                                        >
                                            VIN
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                                        >
                                            Color
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                                        >
                                            Year
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                                        >
                                            Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                                        >
                                            Availability
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {currentCars.length > 0 &&
                                        currentCars.map((car) => (
                                            <tr key={car.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {car.car}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                                                    {car.car_model}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                                                    {car.car_vin}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                                                    {car.car_color}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                                                    {car.car_model_year}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                                                    {car.price}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm flex justify-center">
                                                    {car.availability ? (
                                                        <CheckIcon
                                                            className="h-5 w-5 text-green-600"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <XMarkIcon
                                                            className="h-5 w-5 text-red-600"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <DropDown
                                                        carCard={car}
                                                        deleteHandler={
                                                            deleteHandler
                                                        }
                                                        editHandler={
                                                            editHandler
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {totalPages > 1 && (
                <Pagination
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCarsPerPage={setCarsPerPage}
                    carsPerPage={carsPerPage}
                />
            )}
            <DeleteModal />
        </div>
    );
};

export default CarsTable;
