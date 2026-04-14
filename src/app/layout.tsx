import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Proporciona todas las variables y funcionces del contexto //
import { AuthProvider } from "../context/auth-context";

import { Toaster } from "sonner";

import NavBar from "../components/navbar";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TellMe",
  description: "Red Social para publicar contenido.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} h-full bg-page-background antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <NavBar />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html >
  );
}
