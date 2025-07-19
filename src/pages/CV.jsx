import React, { useState } from "react";

const CV = () => {
  const [pdfError, setPdfError] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">
          Curriculum Vitae
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 mx-auto rounded-full shadow-lg"></div>
      </div>

      {/* CV Content */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
        <div className="p-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Academic CV
              </h2>
              <p className="text-slate-600 text-lg">
                View or download my complete academic curriculum vitae
              </p>
            </div>
            
            <a
              href="/Academic_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download CV
            </a>
          </div>
          
          <div className="bg-slate-50/50 rounded-2xl border border-slate-200/30 overflow-hidden">
            <div className="p-4 bg-slate-100/50 border-b border-slate-200/30">
              <div className="flex items-center gap-2 text-slate-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Academic_CV.pdf</span>
              </div>
            </div>
            
            {!pdfError ? (
              <div className="h-[800px] w-full">
                <iframe
                  src="/Academic_CV.pdf"
                  title="Academic CV"
                  className="w-full h-full border-0"
                  style={{ minHeight: '800px' }}
                  onError={() => setPdfError(true)}
                />
              </div>
            ) : (
              <div className="h-[800px] w-full flex items-center justify-center bg-slate-100/50">
                <div className="text-center p-8">
                  <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">PDF Preview Unavailable</h3>
                  <p className="text-slate-600 mb-4">The PDF preview couldn't be loaded. Please use the download button above to view the CV.</p>
                  <a
                    href="/Academic_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Open PDF
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CV;
