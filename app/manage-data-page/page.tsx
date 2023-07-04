"use client";
export default function ManageDataPage() {
    const setData = async () => {
        fetch("https://myfakeapi.com/api/cars/")
            .then((res) => res.json())
            .then((res) => {
                fetch("api/seed-data-cars", {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(res),
                })
                    .then((res) => res.json())
                    .then((res) => {
                        console.log(res);
                    });
            });
    };

    const clearData = async () => {
        fetch("api/clear-cars", { method: "DELETE" })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
    };

    return (
        <div className="flex flex-col items-center gap-8 p-10">
            <h1 className="text-[50px] font-bold text-gray-800">Cars</h1>
            <div className="flex gap-4">
                <button
                    onClick={setData}
                    className="py-4 px-3 border border-gray-700 rounded-xl bg-slate-100 hover:bg-slate-500 hover:text-stone-50"
                >
                    set data
                </button>
                <button
                    onClick={clearData}
                    className="py-4 px-3 border border-gray-600 rounded-xl bg-red-100 hover:bg-red-500 hover:text-stone-50"
                >
                    clear data
                </button>
            </div>
        </div>
    );
}
