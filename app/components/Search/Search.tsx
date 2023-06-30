import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface IProps {
    searchHandler: (e: string) => void;
    label: string;
    placeholder: string;
}

const Search = ({ searchHandler, label, placeholder }: IProps) => {
    return (
        <div className="w-40">
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
                    onChange={(e) => searchHandler(e.target.value)}
                    type="search"
                    name="search"
                    id="search"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

export default Search;
