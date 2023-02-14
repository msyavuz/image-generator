/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
type response = {
    imageUrls: string[];
};

export default function Home() {
    const [imageSrc, setImageSrc] = useState<Array<string>>([]);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [numbers, setNumbers] = useState(1);
    const [size, setSize] = useState("256x256");

    async function getImage() {
        const resp = await fetch(
            `/api/image?prompt=${prompt}&n=${numbers}&size=${size}`,
        );
        const obj = (await resp.json()) as response;
        const url = obj.imageUrls;
        setImageSrc(url);
        setLoading(false);
    }

    return (
        <div className="app w-screen h-screen overflow-x-hidden bg-slate-900 text-white flex justify-center items-center flex-col gap-8">
            <input
                className="text-black text-center rounded shadow bg-slate-300 focus:outline-none w-1/3 h-12 text-lg"
                type="text"
                value={prompt}
                onChange={(e) => {
                    setPrompt(e.target.value);
                }}
            />
            <select
                name="size"
                id="size"
                onChange={(e) => {
                    console.log(e.target.value);
                    setSize(e.target.value);
                }}
                className="text-black px-2 py-1"
            >
                <option value="256x256">256x256</option>
                <option value="512x512">512x512</option>
                <option value="1024x1024">1024x1024</option>
            </select>
            <select
                name="number"
                id="number"
                onChange={(e) => {
                    setNumbers(parseInt(e.target.value));
                }}
                className="text-black px-2 py-1"
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="8">8</option>
            </select>
            <button
                onClick={() => {
                    setLoading(true);
                    getImage();
                }}
                className="w-32 bg-emerald-600 px-4 py-2 rounded"
            >
                Generate
            </button>

            {imageSrc && !loading ? (
                <div className="flex flex-wrap gap-12 place-content-center">
                    {imageSrc.map((src) => (
                        <img src={src} alt="" key={src} className="w-56" />
                    ))}
                </div>
            ) : loading ? (
                <p className="text-white">Generating...</p>
            ) : (
                <></>
            )}
        </div>
    );
}
