import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    ExclamationTriangleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { ICar } from "@/app/models/car.interface";

interface IProps {
    car: ICar;
    isModalOpen: boolean;
    setIsModalOpen: (e: boolean) => void;
    getData: () => void;
    mode: "add" | "edit";
}

const AddEditModal = ({
    mode,
    car,
    isModalOpen,
    setIsModalOpen: setIsModalOpen,
    getData,
}: IProps) => {
    const [open, setOpen] = useState(isModalOpen);
    const [carCompany, setCarCompany] = useState("");
    const [carModel, setCarModel] = useState("");
    const [carColor, setCarColor] = useState("");
    const [carModelYear, setCarModelYear] = useState("");
    const [carVIN, setCarVIN] = useState("");
    const [price, setPrice] = useState("");
    const [availability, setAvailability] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isVinUnique, setIsVinUnique] = useState(true);

    useEffect(() => {
        const validateForm = () => {
            const requiredFields = [
                carCompany,
                carModel,
                carColor,
                carModelYear,
                carVIN,
                price,
            ];
            const isFormValid = requiredFields.every((field) => field !== "");
            setIsFormValid(isFormValid);
        };
        validateForm();
    }, [carColor, carCompany, carModel, carModelYear, carVIN, price]);

    console.log(mode);
    useEffect(() => {
        console.log("first");
        if (mode === "edit") {
            setCarCompany(car.car);
            setCarModel(car.car_model);
            setCarColor(car.car_color);
            setCarModelYear(car.car_model_year.toString());
            setCarVIN(car.car_vin);
            setPrice(car.price.slice(1));
            setAvailability(car.availability);
        }
    }, [
        car.availability,
        car.car,
        car.car_color,
        car.car_model,
        car.car_model_year,
        car.car_vin,
        car.price,
        mode,
    ]);

    const resetData = () => {
        setCarCompany("");
        setCarModel("");
        setCarColor("");
        setCarModelYear("");
        setCarVIN("");
        setPrice("");
        setAvailability(false);
        setIsVinUnique(true);
    };

    const hideModal = () => {
        setIsModalOpen(false);
        setOpen(false);
    };

    useEffect(() => {
        setOpen(isModalOpen);
    }, [isModalOpen]);

    const handleAdd = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        console.log(ev);
        try {
            const response = await fetch("/api/cars", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    car: carCompany,
                    car_model: carModel,
                    car_color: carColor,
                    car_model_year: parseInt(carModelYear as string, 10),
                    car_vin: carVIN,
                    price: `$${price}`,
                    availability,
                }),
            });
            console.log(response);
            if (response.ok) {
                getData();
                resetData();
                hideModal();
            } else if (response.status === 400) {
                setIsVinUnique(false);
            } else {
                console.error("Something went wrong");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleYearInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const inputValue = ev.target.value;
        const year = new Date().getFullYear();
        console.log(year);
        if (/^\d*$/.test(inputValue)) {
            setCarModelYear(inputValue);
            if (parseInt(inputValue) > year) {
                setCarModelYear(year.toString());
            }
        }
    };

    const handlePriceInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const inputValue = ev.target.value;
        const year = new Date().getFullYear();
        console.log(year);
        if (/^\d*\.?\d{0,2}?$/.test(inputValue)) {
            setPrice(inputValue);
            if (parseInt(inputValue) < 0) {
                setPrice("0");
            }
        }
    };

    const handleEdit = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        console.log("123");
        try {
            const response = await fetch("/api/cars", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: car.id,
                    car_color: carColor,
                    price: `$${price}`,
                    availability,
                }),
            });

            if (response.ok) {
                getData();
                resetData();
                hideModal();
            } else {
                console.error("Something went wrong");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => {
                    hideModal();
                    resetData();
                }}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                                        onClick={() => {
                                            hideModal();
                                            resetData();
                                        }}
                                    >
                                        <XMarkIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base font-extrabold leading-6 text-indigo-700"
                                        >
                                            {mode === "edit"
                                                ? "Edit car"
                                                : "Add car"}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <form
                                                className="flex flex-col gap-3 w-[450px]"
                                                onSubmit={(e) =>
                                                    mode === "edit"
                                                        ? handleEdit(e)
                                                        : handleAdd(e)
                                                }
                                            >
                                                <label className="flex gap-1 text-gray-900 font-semibold">
                                                    Car Company:
                                                    <input
                                                        readOnly={
                                                            mode === "edit"
                                                        }
                                                        className={`${
                                                            mode === "edit"
                                                                ? "border-none"
                                                                : "border border-gray-200 rounded-md"
                                                        } text-sm font-normal w-60 py-1 px-2  placeholder:text-gray-400`}
                                                        type="text"
                                                        value={carCompany}
                                                        placeholder="Company"
                                                        onChange={(e) =>
                                                            setCarCompany(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </label>
                                                <label className="flex gap-1 text-gray-900 font-semibold">
                                                    Car Model:
                                                    <input
                                                        readOnly={
                                                            mode === "edit"
                                                        }
                                                        className={`${
                                                            mode === "edit"
                                                                ? "border-none"
                                                                : "border border-gray-200 rounded-md"
                                                        } text-sm font-normal w-60 py-1 px-2  placeholder:text-gray-400`}
                                                        type="text"
                                                        value={carModel}
                                                        placeholder="Model car"
                                                        onChange={(e) =>
                                                            setCarModel(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </label>
                                                <label className="flex gap-1 text-gray-900 font-semibold">
                                                    Car Color:
                                                    <input
                                                        className="text-sm font-normal w-60 py-1 px-2 border border-gray-200 rounded-md placeholder:text-gray-400"
                                                        type="text"
                                                        value={carColor}
                                                        placeholder="Color car"
                                                        onChange={(e) =>
                                                            setCarColor(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </label>
                                                <label className="flex gap-1 text-gray-900 font-semibold">
                                                    Car Model Year:
                                                    <input
                                                        readOnly={
                                                            mode === "edit"
                                                        }
                                                        className={`${
                                                            mode === "edit"
                                                                ? "border-none"
                                                                : "border border-gray-200 rounded-md"
                                                        } text-sm font-normal w-60 py-1 px-2  placeholder:text-gray-400`}
                                                        type="text"
                                                        value={carModelYear}
                                                        placeholder="Modal year car"
                                                        onChange={(e) =>
                                                            handleYearInputChange(
                                                                e
                                                            )
                                                        }
                                                    />
                                                </label>
                                                <label className="flex gap-1 text-gray-900 font-semibold">
                                                    Car VIN:
                                                    <div className="flex flex-col">
                                                        <input
                                                            readOnly={
                                                                mode === "edit"
                                                            }
                                                            className={`${
                                                                mode === "edit"
                                                                    ? "border-none"
                                                                    : "border border-gray-200 rounded-md"
                                                            } text-sm font-normal w-60 py-1 px-2  placeholder:text-gray-400`}
                                                            type="text"
                                                            value={carVIN}
                                                            placeholder="VIN car"
                                                            onChange={(e) =>
                                                                setCarVIN(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        {!isVinUnique && (
                                                            <span className="text-xs text-red-600 mt-1">
                                                                VIN is not
                                                                unique, change
                                                                VIN and try
                                                                again
                                                            </span>
                                                        )}
                                                    </div>
                                                </label>
                                                <label className="flex gap-1 text-gray-900 font-semibold">
                                                    Price $:
                                                    <input
                                                        className="text-sm font-normal w-60 py-1 px-2 border border-gray-200 rounded-md placeholder:text-gray-400"
                                                        type="text"
                                                        value={price}
                                                        placeholder="Price car"
                                                        onChange={(e) =>
                                                            handlePriceInputChange(
                                                                e
                                                            )
                                                        }
                                                    />
                                                </label>
                                                <label className="flex gap-1 text-gray-900 items-center font-semibold">
                                                    Availability:
                                                    <input
                                                        className="w-4 h-4"
                                                        type="checkbox"
                                                        checked={availability}
                                                        onChange={(e) =>
                                                            setAvailability(
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </label>

                                                <div className="mt-5 sm:mt-4 flex justify-end">
                                                    <button
                                                        type="button"
                                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-lime-300 hover:bg-lime-50 sm:mt-0 sm:w-auto"
                                                        onClick={() => {
                                                            hideModal();
                                                            resetData();
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={!isFormValid}
                                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 sm:ml-3 sm:w-auto disabled:bg-slate-300"
                                                    >
                                                        {mode === "edit"
                                                            ? "Update"
                                                            : "Add"}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default AddEditModal;
