import type React from "react"
import type { Metadata } from "next"
import { GeistSans, GeistMono } from "geist/font"
import "./globals.css"

export const metadata: Metadata = {
  title: "Kayzo | AI for Builders & General Contractors",
  description:
    "Kayzo is a cloud platform that lets builders and general contractors run their work through a conversational web app, with integrations to suppliers like Lowe's and Home Depot.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.style.fontFamily};
  --font-mono: ${GeistMono.style.fontFamily};
}
        `}</style>
      </head>
      <body className="dark">{children}</body>
    </html>
  )
}
