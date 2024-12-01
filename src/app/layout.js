import localFont from "next/font/local";
import "./globals.css";


export const metadata = {
  title: "Todolist App",
  description: "Todolist web app for test",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
