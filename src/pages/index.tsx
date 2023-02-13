/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

type response = {
    imageUrl: string;
};

export default function Home() {
    const [imageSrc, setImageSrc] = useState("");
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    async function getImage() {
        const resp = await fetch(`/api/image?prompt=${prompt}`);
        const obj = (await resp.json()) as response;
        const url = obj.imageUrl;
        setImageSrc(url);
        setLoading(false);
    }

    return (
        <div className="app w-screen h-screen bg-slate-900 text-white flex justify-center items-center flex-col gap-8">
            <input
                className="text-black text-center rounded shadow bg-slate-300 focus:outline-none w-1/3 h-12 text-lg"
                type="text"
                value={prompt}
                onChange={(e) => {
                    setPrompt(e.target.value);
                }}
            />
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
                <img src={imageSrc} alt="" />
            ) : loading ? (
                <p className="text-white">Generating...</p>
            ) : (
                <></>
            )}
        </div>
    );
}
