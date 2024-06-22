import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AppProvider } from "@/provider/AppContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Sizzler",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-open_sans text-black-50 antialiased">
        <AppProvider>
          <Toaster />
          <Header />
          <main className="flex min-h-screen w-full flex-col">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
