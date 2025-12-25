import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Your E-Card App',
  description: 'Create beautiful AI-powered greeting cards!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
return (
  <html>
    <body>
          {children}
    </body>
  </html>
  );
}
