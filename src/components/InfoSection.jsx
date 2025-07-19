import React from "react";
import TextFormatter from "./TextFormatter";

const InfoSection = ({ title, bulletPoints, icon, iconColor = "bg-gradient-to-r from-indigo-500 to-purple-500" }) => {
  const getIcon = (iconName) => {
    const icons = {
      "graduation-cap": (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      ),
      "clock": (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      "briefcase": (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
      ),
      "trophy": (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      "book-open": (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.138-3.5.804a10.000 10.000 0 0110.698 13.4C8.279 13.4 7 14.476 7 15.768v.196A7.971 7.971 0 005.5 18c2.347 0 4.5-.804 5.5-2.07V4.804z" />
          <path d="M14.5 4c-1.255 0-2.443.138-3.5.804a10.000 10.000 0 0110.698 13.4C13.279 13.4 12 14.476 12 15.768v.196A7.971 7.971 0 0114.5 18c2.347 0 4.5-.804 5.5-2.07V4.804A7.968 7.968 0 0014.5 4z" />
        </svg>
      ),
    };
    return icons[iconName] || icons["briefcase"];
  };

  return (
    <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-4">
        {icon && (
          <div className={`w-10 h-10 ${iconColor} rounded-xl flex items-center justify-center shadow-lg`}>
            {getIcon(icon)}
          </div>
        )}
        {title}
      </h2>
      <div className="space-y-4">
        {bulletPoints.map((point, index) => (
          <div key={index} className="flex items-start gap-4 p-6 bg-gradient-to-r from-slate-50/80 to-indigo-50/30 rounded-2xl hover:from-slate-100/80 hover:to-indigo-100/30 transition-all duration-200 border border-slate-200/30">
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-3 flex-shrink-0 shadow-sm"></div>
            <div className="prose prose-sm max-w-none text-slate-700">
              <TextFormatter text={point} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoSection;