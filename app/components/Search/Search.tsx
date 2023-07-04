import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ChangeEvent, useState } from "react";

interface IProps {
    searchHandler: (e: string) => void;
    label: string;
    placeholder: string;
}

const Search = ({ searchHandler, label, placeholder }: IProps) => {
    const [searchValue, setSearchValue] = useState<string | number>("");

    const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const inputValue = ev.target.value;
        if (label.toLowerCase().includes("year")) {
            if (/^\d*$/.test(inputValue)) {
                setSearchValue(inputValue);
                searchHandler(inputValue);
            }
        } else if (label.toLowerCase().includes("price")) {
            if (/^\d*\.?\d{0,2}?$/.test(inputValue)) {
                setSearchValue(inputValue);
                searchHandler(inputValue);
            }
        } else {
            setSearchValue(inputValue);
            searchHandler(inputValue);
        }
    };

    return (
        <div>
            <label
                htmlFor="search"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </div>
                <input
                    onChange={handleInputChange}
                    type="search"
                    value={searchValue}
                    name="search"
                    id="search"
                    className="block w-40 h-10 rounded-md border-0 py-2 pl-10 pr-2 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

export default Search;
