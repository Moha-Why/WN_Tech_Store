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
  title: "Wn Store",
  description: "Shop the latest collection of elegant dresses – evening gowns, casual styles & chic outfits. High-quality fabrics, affordable prices & fast delivery.",
  icons: { icon: "/N&Y_PhotoGrid.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.className} h-full`}>
      <body className={`${outfit.className} antialiased flex flex-col min-h-screen`}>
        <link rel="icon" href="/favicon.ico" />
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