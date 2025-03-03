"use client";

import { useState, useEffect } from "react";

export default function Home() {
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAnalysis, setShowAnalysis] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch("/api/airtable");
                const data = await res.json();
                setImages(data.result);
                if (data.result.length > 0) {
                    setCurrentImage(data.result[Math.floor(Math.random() * data.result.length)]);
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchImages();
    }, []);

    const analyzeImage = async () => {
        if (!currentImage) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/openai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageUrl: currentImage.url })
            });
            const data = await res.json();
            setAnalysis(data.result);
            setShowAnalysis(true);
        } catch (err) {
            setError("Failed to analyze image.");
        } finally {
            setLoading(false);
        }
    };

    const changeImage = () => {
        if (images.length > 0) {
            setCurrentImage(images[Math.floor(Math.random() * images.length)]);
            setAnalysis(null);
            setShowAnalysis(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4"
            style={{ fontFamily: "'Roboto', sans-serif", fontOpticalSizing: "auto", fontWeight: "400", fontStyle: "normal" }}
        >
            {/* Centered Title */}
            <h1 className="text-5xl mb-2 text-center font-bold text-pink-500">recreate this shot!</h1>

            {/* Card Layout */}
            <div className="bg-black p-5 rounded-lg shadow-lg w-[600px] flex flex-col items-center border-5 border-white">
                {currentImage && (
                    <>
                        <img
                            src={currentImage.url}
                            alt={currentImage.film || "Film Scene"}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                        <p className="mt-2 text-4xl text-center uppercase tracking-wide font-bold">{currentImage.film}</p>
                        
                        {!showAnalysis ? (
                            <button
                                onClick={analyzeImage}
                                className="mt-2 px-2 py-5 text-md bg-black text-white border-5 border-white rounded-lg hover:bg-white hover:text-black transition duration-200"
                            >
                                click here for analysis
                            </button>
                        ) : (
                            <>
                                <p className="mt-4 text-xl text-justify text-white-300 w-full">{analysis}</p>
                                <button
                                    onClick={changeImage}
                                    className="mt-4 px-6 py-3 text-lg bg-black text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition duration-200"
                                >
                                    click for a new shot
                                </button>
                            </>
                        )}
                    </>
                )}
                {loading && <p className="mt-4">analyzing...</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
}
