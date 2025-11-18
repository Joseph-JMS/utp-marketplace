import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "UTP Marketplace",
  description: "Proyecto final - UTP Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 fade-in">{children}</main>
        <Footer />
      </body>
    </html>
  );
}