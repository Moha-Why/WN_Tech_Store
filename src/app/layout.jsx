import "./globals.css";
import {CartProvider}  from "../context/CartContext";
import { Outfit } from "next/font/google";
import Footer from "../components/Footer";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import { Analytics } from "@vercel/analytics/react"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400","500","600","700","800","900"]
});

export const metadata = {
  title: "N&Y Latptop Store - Find the strongest and most reliable laptops",
  description: "Your one-stop shop for high-performance laptops. Discover top brands, unbeatable prices, and exceptional customer service at N&Y Laptop Store.",
  icons: { icon: "/N&Y_PhotoGrid.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.className} h-full`}>
      <body className={`${outfit.className} antialiased flex flex-col min-h-screen`}>
        <link rel="icon" href="/N&Y_PhotoGrid.png" />
        <Analytics />
        <CartProvider>
          <ClientLayoutWrapper className="flex-grow">
            {children}
          </ClientLayoutWrapper>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}