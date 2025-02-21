import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EJ ToDo",
  description: "할 일을 추가하고 관리할 수 있는 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
