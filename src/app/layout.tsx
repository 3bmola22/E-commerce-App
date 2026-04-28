import type { Metadata, Viewport } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer/Footer";
import SecondFooter from "./_components/SecondFooter/SecondFooter";
import ContextProvider from "./_components/ContextProvider/ContextProvider";
import ContextUsrCart from "./_components/ContextProvider/ContextUsrCart";
import { Bounce, ToastContainer } from "react-toastify";

const exo = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-exo",
});

export const metadata: Metadata = {
  title: "Fresh Cart - Online Shopping",
  description: "Fresh Cart - Your online shopping destination",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${exo.variable} font-[family-name:var(--font-exo)]`}>
        <ContextProvider>
          <ContextUsrCart>
            <Navbar />
            {children}
            <SecondFooter />
            <Footer />
          </ContextUsrCart>
        </ContextProvider>
      </body>
    </html>
  );
}
