import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import QueryClientWrapper from "@/providers/QueryClient";
import GlobalStateProvider from '@/providers/ReduxProvider';

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Vision",
  description: "Created bu Zahra Bzr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fa' dir='rtl'>
      <body className={`antialiased`}>
        <GlobalStateProvider>
          <QueryClientWrapper>{children}</QueryClientWrapper>
        </GlobalStateProvider>
      </body>
    </html>
  );
}
