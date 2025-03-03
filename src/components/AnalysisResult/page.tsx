import { useState } from "react";

export default function AnalysisResult({ analysis }) {
    const [isVisible, setIsVisible] = useState(false);

    if (!analysis) return null; // Don't render if there's no analysis data

    return (
        <div className="mt-6 text-left w-[600px]">
            <button
                onClick={() => setIsVisible(!isVisible)}
                className="px-4 py-2 bg-black text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition duration-200"
            >
                {isVisible ? "Hide Analysis" : "Show Analysis"}
            </button>

            {isVisible && (
                <div className="mt-4 p-4 border-2 border-white rounded-lg">
                    <h2 className="text-xl underline mb-2">shot analysis</h2>

                    {/* Parse the AI-generated response (assuming it's plain text) */}
                    {typeof analysis === "string" ? (
                        <p className="text-lg">{analysis}</p>
                    ) : (
                        <ul className="list-disc pl-5">
                            {Object.entries(analysis).map(([key, value], index) => (
                                <li key={index}>
                                    <strong>{key}:</strong> {value}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
