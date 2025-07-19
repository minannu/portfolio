import Header from "./components/Header";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Publications from "./pages/Publications";
import Experience from "./pages/Experience";
import Awards from "./pages/Awards";
import Projects from "./pages/Projects";
import TeachingAndServices from "./pages/TeachingAndServices";
import CV from "./pages/CV";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <div className="sticky top-8">
              <Sidebar />
            </div>
          </div>
          <div className="lg:col-span-9">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 min-h-[600px]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/publications" element={<Publications />} />
                <Route path="/experiences" element={<Experience />} />
                <Route path="/awards" element={<Awards />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/teaching-services" element={<TeachingAndServices />} />
                <Route path="/cv" element={<CV />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
