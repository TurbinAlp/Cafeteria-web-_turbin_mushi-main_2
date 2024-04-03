import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Authentication from "./pages/auth/auth";
import { useEffect } from "react";
import AdminPanel from "./pages/admin/admin-panel";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/home-panel" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
