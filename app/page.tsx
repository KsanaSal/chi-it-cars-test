"use client";
import { useState } from "react";
import Search from "./components/Search/Search";
import CarsTable from "./components/Table/CarsTable";

export default function Home() {
    const [selectColor, setSelectColor] = useState("");
    const [selectCompany, setSelectCompany] = useState("");
    const [selectModel, setSelectModel] = useState("");
    const [selectStartYear, setSelectStartYear] = useState("");
    const [selectEndYear, setSelectEndYear] = useState("");
    const [selectVin, setSelectVin] = useState("");
    const [selectAvailable, setSelectAvailable] = useState("All");
    const [selectStartPrice, setSelectStartPrice] = useState("");
    const [selectEndPrice, setSelectEndPrice] = useState("");

    return (
        <main className="px-5 py-10 flex flex-col gap-5">
            <div className="flex gap-2">
                <Search
                    searchHandler={setSelectCompany}
                    label="Company"
                    placeholder="company"
                />
                <Search
                    searchHandler={setSelectModel}
                    label="Model"
                    placeholder="model"
                />
                <Search
                    searchHandler={setSelectColor}
                    label="Color"
                    placeholder="color"
                />
                <Search
                    searchHandler={setSelectVin}
                    label="VIN"
                    placeholder="VIN"
                />
                <div>
                    <label
                        htmlFor="availability"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Availability
                    </label>
                    <select
                        id="availability"
                        name="availability"
                        value={selectAvailable}
                        onChange={(e) => setSelectAvailable(e.target.value)}
                        className="mt-2 block w-40 h-10 shadow-sm rounded-md border-0 py-2 pl-3 pr-10 text-gray-700 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option>All</option>
                        <option>Available</option>
                        <option>Unavailable</option>
                    </select>
                </div>
            </div>
            <div className="flex gap-2">
                <Search
                    searchHandler={setSelectStartYear}
                    label="Start year"
                    placeholder="start year"
                />
                <Search
                    searchHandler={setSelectEndYear}
                    label="End year"
                    placeholder="end year"
                />
                <Search
                    searchHandler={setSelectStartPrice}
                    label="Start price"
                    placeholder="start price"
                />
                <Search
                    searchHandler={setSelectEndPrice}
                    label="End price"
                    placeholder="end price"
                />
            </div>
            <CarsTable
                color={selectColor}
                company={selectCompany}
                model={selectModel}
                startYear={selectStartYear}
                endYear={selectEndYear}
                vin={selectVin}
                available={selectAvailable}
                startPrice={selectStartPrice}
                endPrice={selectEndPrice}
            />
        </main>
    );
}
