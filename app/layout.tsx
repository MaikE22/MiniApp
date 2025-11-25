import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import { Providers } from "./providers";
import { theme } from "./theme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neon Origins",
  description: "A Farcaster Mini App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <Providers>{children}</Providers>
        </MantineProvider>
      </body>
    </html>
  );
}
