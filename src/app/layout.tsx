import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Barriecito } from "next/font/google";

const barriecito = Barriecito({ subsets: ["latin"], weight: "400" });

export default function Layout({ children }) {
    return (
        <html lang="en">
            <head />
            <body className={barriecito.className}>{children}</body>
        </html>
    );
}

