"use client";
// import Image from "next/image";
import { useState } from "react";
import Pagination from "./components/Pagination/Pagination";
import Search from "./components/Search/Search";
import CarsTable from "./components/Table/CarsTable";

export default function Home() {
    const [selectColor, setSelectColor] = useState("");
    const [selectCompany, setSelectCompany] = useState("");
    const [selectModel, setSelectModel] = useState("");
    const [selectYear, setSelectYear] = useState("");
    const [selectVin, setSelectVin] = useState("");

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
                    searchHandler={setSelectYear}
                    label="Year"
                    placeholder="year"
                />
                <Search
                    searchHandler={setSelectVin}
                    label="VIN"
                    placeholder="VIN"
                />
            </div>
            <CarsTable
                color={selectColor}
                company={selectCompany}
                model={selectModel}
                year={selectYear}
                vin={selectVin}
            />
            <Pagination />
        </main>
    );
}
