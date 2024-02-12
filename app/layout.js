import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar/SidebarOne";
import SidebarTwo from "@/components/Sidebar/SidebarTwo";
import SidebarThree from "@/components/Sidebar/SidebarThree";




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Requiring Adjustment - The Very Original Kanban Board",
  description: "This is definetly not something I made to bash myself on my old work",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        {/* <Sidebar /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
