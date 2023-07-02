import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    ExclamationTriangleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { ICar } from "@/app/models/car.interface";

interface IProps {
    car: ICar;
    isModalOpen: boolean;
    setIsDeleteModalOpen: (e: boolean) => void;
    getData: () => void;
}

const DeleteModal = ({
    car,
    isModalOpen,
    setIsDeleteModalOpen,
    getData,
}: IProps) => {
    const [open, setOpen] = useState(isModalOpen);

    const hideModal = () => {
        setIsDeleteModalOpen(false);
        setOpen(false);
    };

    useEffect(() => {
        setOpen(isModalOpen);
    }, [isModalOpen]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/cars?id=${car.id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                getData();
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
                onClose={() => hideModal()}
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
                                        }}
                                    >
                                        <XMarkIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationTriangleIcon
                                            className="h-6 w-6 text-red-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            Delete car
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p>
                                                Are you sure you want to delete
                                                this car?
                                            </p>
                                            <ul className="text-sm text-gray-500">
                                                <li className="flex">
                                                    <div className="w-20">
                                                        Company:
                                                    </div>
                                                    <div>{car.car}</div>
                                                </li>
                                                <li className="flex">
                                                    <div className="w-20">
                                                        Model:
                                                    </div>
                                                    <div>{car.car_model}</div>
                                                </li>
                                                <li className="flex">
                                                    <div className="w-20">
                                                        VIN:
                                                    </div>
                                                    <div>{car.car_vin}</div>
                                                </li>
                                                <li className="flex">
                                                    <div className="w-20">
                                                        Color:
                                                    </div>
                                                    <div>{car.car_color}</div>
                                                </li>
                                                <li className="flex">
                                                    <div className="w-20">
                                                        Year:
                                                    </div>
                                                    <div>
                                                        {car.car_model_year}
                                                    </div>
                                                </li>
                                                <li className="flex">
                                                    <div className="w-20">
                                                        Price:
                                                    </div>
                                                    <div>{car.price}</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-lime-300 hover:bg-lime-50 sm:mt-0 sm:w-auto"
                                        onClick={() => hideModal()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 sm:ml-3 sm:w-auto"
                                        onClick={() => handleDelete()}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default DeleteModal;
