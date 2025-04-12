import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/public_pages/Home";
import Plans from "./pages/public_pages/Plans";
import Functions from "./pages/public_pages/Functions";
import FAQ from "./pages/public_pages/FAQ";
import Contact from "./pages/public_pages/Contact";
import TermsAndConditions from "./pages/public_pages/TermsAndConditions";
import PrivacyPolicy from "./pages/public_pages/PrivacyPolicy";
import CookiesPolicy from "./pages/public_pages/CookiesPolicy";
import LegalNotice from "./pages/public_pages/LegalNotice";

import Register from "./pages/auth_pages/Register";
import Login from "./pages/auth_pages/Login";
import RestorePassword from "./pages/auth_pages/RestorePassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import PublicBookingPage from "./pages/Reserve/PublicBookingPage";
import EmailConfirmation from "./pages/auth_pages/EmailConfirmation";
import CreateBusiness from "./components/Create Business/CreateBusiness";
import RutaPrivada from "./components/RutaPrivada";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/functions" element={<Functions />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiesPolicy />} />
        <Route path="/legal" element={<LegalNotice />} />

        {/* Páginas públicas */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restore-password" element={<RestorePassword />} />
        <Route path="/email-confirmation" element={<EmailConfirmation />} />

        <Route path="/:slug_url/reserve" element={<PublicBookingPage />} />

        {/* Páginas privadas */}
        <Route
          path="/create-business"
          element={
            <RutaPrivada>
              {" "}
              <CreateBusiness />
            </RutaPrivada>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RutaPrivada>
              <Dashboard />
            </RutaPrivada>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
