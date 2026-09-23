import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="bg-black"><AuthProvider>{children}</AuthProvider></body></html>
}