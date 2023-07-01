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
        <nav className="flex items-center px-4 mt-4">
            <div className="-mt-px flex w-0 flex-1  justify-end">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                    <ArrowLongLeftIcon
                        className="mr-3 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                    Previous
                </button>
            </div>
            <div className="hidden md:-mt-px md:flex">
                {getPageNumbers().map((pageNumber, index) => (
                    <button
                        key={index}
                        onClick={() =>
                            typeof pageNumber === "number"
                                ? setCurrentPage(pageNumber)
                                : null
                        }
                        className={`inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium ${
                            currentPage === pageNumber
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                        aria-current={
                            currentPage === pageNumber ? "page" : undefined
                        }
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
            {/* <div className="hidden md:-mt-px md:flex">
                <button className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                    1
                </button>

                <a
                    href="#"
                    className="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
                    aria-current="page"
                >
                    2
                </a>
                <a
                    href="#"
                    className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                    3
                </a>
                <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
                    ...
                </span>
                <a
                    href="#"
                    className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                    8
                </a>
                <a
                    href="#"
                    className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                    9
                </a>
                <a
                    href="#"
                    className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                    10
                </a>
            </div> */}
            <div className="-mt-px flex w-0 flex-1">
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                    Next
                    <ArrowLongRightIcon
                        className="ml-3 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </button>
            </div>
            <div>
                <select
                    name="availability"
                    value={carsPerPage}
                    onChange={(e) => {
                        console.log(e.target.value);
                        setCarsPerPage(parseInt(e.target.value));
                    }}
                    className="mt-2 block w-40 h-10 shadow-sm rounded-md border-0 py-2 pl-3 pr-10 text-gray-700 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
