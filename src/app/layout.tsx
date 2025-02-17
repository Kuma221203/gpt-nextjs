import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {  CssBaseline } from "@mui/material";
import Providers from "./providers";
import authenticaed from "./auth/authenticated";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await authenticaed()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers authenticated={isAuthenticated}>
          <CssBaseline />
          <div>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
