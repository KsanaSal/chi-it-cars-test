"use client";
export default function TestPage() {
    const getData = async () => {
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
                console.log(res);
            });
    };
    return (
        <div>
            Cars
            <button onClick={getData}>get data</button>
        </div>
    );
}
