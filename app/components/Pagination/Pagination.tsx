import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";

interface IProps {
    setCurrentPage: (e: number) => void;
    currentPage: number;
    totalPages: number;
    setCarsPerPage: (e: number) => void;
    carsPerPage: number;
}

const Pagination = ({
    setCurrentPage,
    currentPage,
    totalPages,
    setCarsPerPage,
    carsPerPage,
}: IProps) => {
    const [selectAvailable, setSelectAvailable] = useState("All");
    const getPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push("...");
                pageNumbers.push(totalPages);
            } else if (currentPage > totalPages - 4) {
                pageNumbers.push(1);
                pageNumbers.push("...");
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push("...");
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push("...");
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    return (
        <nav className="flex flex-col md:flex-row md:justify-around lg:justify-evenly items-center px-4 md:px-6 mt-4">
            <div className="flex flex-row w-[300px] px-2">
                <div className="-mt-px flex w-0 flex-1 justify-start sm:justify-end">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm sm:text-base lg:text-lg font-medium  hover:border-gray-300"
                    >
                        <ArrowLongLeftIcon
                            className={`${
                                currentPage <= 1
                                    ? "text-lime-300"
                                    : "text-lime-700"
                            } mr-3 h-6 w-6 text-gray-400`}
                            aria-hidden="true"
                        />
                    </button>
                </div>
                <div className="-mt-px flex">
                    {getPageNumbers().map((pageNumber, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                typeof pageNumber === "number"
                                    ? setCurrentPage(pageNumber)
                                    : null
                            }
                            className={`inline-flex items-center border-t-2 px-2 sm:px-4 pt-4 text-base sm:text-lg lg:text-xl font-medium ${
                                currentPage === pageNumber
                                    ? "border-indigo-500 text-indigo-700 font-bold"
                                    : "border-transparent text-gray-300 hover:text-gray-500 hover:border-gray-300"
                            }`}
                            aria-current={
                                currentPage === pageNumber ? "page" : undefined
                            }
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>
                <div className="-mt-px flex w-0 flex-1 justify-end sm:justify-start">
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm sm:text-base lg:text-lg font-medium hover:border-gray-300"
                    >
                        <ArrowLongRightIcon
                            className={`${
                                currentPage >= totalPages
                                    ? "text-lime-300"
                                    : "text-lime-700"
                            } mr-3 h-6 w-6 text-gray-400`}
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </div>
            <div className="w-[200px] sm:w-[180px] lg:w-[210px]">
                <select
                    name="availability"
                    value={carsPerPage}
                    onChange={(e) => {
                        setCarsPerPage(parseInt(e.target.value));
                    }}
                    className="mt-2 block w-full h-10 shadow-sm rounded-md border-0 py-2 pl-3 pr-10 text-gray-700 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 text-sm sm:text-base lg:text-lg sm:leading-6"
                >
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={30}>30 per page</option>
                    <option value={50}>50 per page</option>
                    <option value={70}>70 per page</option>
                    <option value={100}>100 per page</option>
                </select>
            </div>
        </nav>
    );
};

export default Pagination;
