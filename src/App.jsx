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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <div className="sticky top-8">
              <Sidebar />
            </div>
          </div>
          <div className="lg:col-span-9">
            <div 
              className="rounded-lg shadow-lg border p-8 min-h-[600px]"
              style={{ 
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-light)',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
              }}
            >
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
