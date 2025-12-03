import "./globals.css";

export const metadata = {
  title: "TechChat",
  description: "Real Time Team Communication",
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
