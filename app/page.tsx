// import Image from "next/image";
import Pagination from "./components/Pagination/Pagination";
import Search from "./components/Search/Search";
import Table from "./components/Table/Table";

export default function Home() {
    return (
        <main className="px-5 py-10 flex flex-col gap-5">
            <Search />
            <Table />
            <Pagination />
        </main>
    );
}
