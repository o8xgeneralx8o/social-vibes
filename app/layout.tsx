import type { Metadata } from "next";
import { Oxygen } from "next/font/google";
import "./globals.css";

const oxygen = Oxygen({
  weight: ["300", "400", "700"],
  subsets: ["latin"]
});

// const roboto = Roboto({
//   weight: ["100", "300", "400", "500", "700", "900"],
//   subsets: ["latin"]
// })

export const metadata: Metadata = {
  title: "Social Vibes",
  description: "Feel A Different Kind Of Madness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={oxygen.className}>
        {children}
      </body>
    </html>
  );
}
