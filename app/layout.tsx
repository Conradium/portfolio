import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Poppins, Roboto_Mono, Rubik_Mono_One } from "next/font/google"
import { AudioProvider } from "@/components/audio-provider"
// Import the AudioInitializer component
import AudioInitializer from "@/components/audio-initializer"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-mono",
})

const rubikMonoOne = Rubik_Mono_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-rubik-mono-one",
})

export const metadata: Metadata = {
  title: "Ben's Portfolio",
  description: "Portfolio of Benedictus Sebastian Aria Pratama",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${robotoMono.variable} ${rubikMonoOne.variable}`}>
        <AudioProvider>
          <AudioInitializer />
          {children}
        </AudioProvider>
      </body>
    </html>
  )
}
