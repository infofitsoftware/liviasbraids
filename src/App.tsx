import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PhoneCTA from "./components/PhoneCTA";

import Home from "./pages/Home";
import ServicesPage from "./pages/Services";
import GalleryPage from "./pages/Gallery";
import AboutPage from "./pages/About";
import VisitPage from "./pages/Visit";
import ContactPage from "./pages/Contact";

// Admin pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminBookings from "./pages/admin/Bookings";
import AdminPayments from "./pages/admin/Payments";
import AdminTransactions from "./pages/admin/Transactions";
import AdminGallery from "./pages/admin/Gallery";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin routes (no navbar/footer) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute>
                <AdminBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/payments"
            element={
              <ProtectedRoute>
                <AdminPayments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/transactions"
            element={
              <ProtectedRoute>
                <AdminTransactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <AdminGallery />
              </ProtectedRoute>
            }
          />

          {/* Public routes (with navbar/footer) */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <main className="pt-20 bg-black text-white min-h-screen">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/visit" element={<VisitPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                  </Routes>
                </main>
                <Footer />
                <PhoneCTA variant="floating" />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
