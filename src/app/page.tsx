"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch images from the API route when the page loads
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/airtable");
        const data = await res.json();

        if (res.ok) {
          setImages(data.result);
          if (data.result.length > 0) {
            setCurrentImage(data.result[Math.floor(Math.random() * data.result.length)]);
          }
        } else {
          throw new Error(data.error || "Failed to load images");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Handle button click to show a new random image
  const handleClick = () => {
    if (images.length > 0) {
      const randomIndex = Math.floor(Math.random() * images.length);
      setCurrentImage(images[randomIndex]);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 font-bold"
      style={{ fontFamily: "Impact, Haettenschweiler, Arial Black, sans-serif" }}
    >
      <h1 className="text-3xl mb-6">recreate this shot!</h1>

      {loading && <p>Loading images...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {currentImage && (
        <div className="mb-4 flex flex-col items-center">
          <div className="border-4 border-white p-1">
            <img
              src={currentImage.url}
              alt={currentImage.film || "Film Scene"}
              className="w-[600px] h-[400px] object-cover rounded-lg"
            />
          </div>
          <p className="mt-3 text-xl">{currentImage.film}</p>
        </div>
      )}

      <button
        onClick={handleClick}
        className="px-6 py-3 bg-black text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition duration-200"
      >
        give me another film
      </button>
    </div>
  );
}
