import React from "react";
import TextFormatter from "../components/TextFormatter";
import { aboutMe } from "../database/about-me.json";
import { education } from "../database/education.json";
import { recentUpdates } from "../database/recent-updates.json";
import InfoSection from "../components/InfoSection";

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">
          Welcome to My Portfolio
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 mx-auto rounded-full shadow-lg"></div>
      </div>

      {/* About Me Section */}
      <section className="bg-gradient-to-br from-indigo-50/80 via-purple-50/60 to-blue-50/80 rounded-3xl p-10 border border-white/30 shadow-xl">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          About Me
        </h2>
        <div className="prose prose-lg max-w-none text-slate-700">
          <TextFormatter text={aboutMe.description} />
        </div>
      </section>

      {/* Quick Preview Section */}
      <section>
        <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>
          Quick Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aboutMe.quickPreviews.map((item, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2 flex-shrink-0 shadow-sm"></div>
                <div className="prose prose-sm text-slate-700">
                  <TextFormatter text={item} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <InfoSection 
        title="Education" 
        bulletPoints={education}
        icon="graduation-cap"
        iconColor="bg-gradient-to-r from-purple-500 to-pink-500"
      />

      {/* Recent Updates Section */}
      <InfoSection 
        title="Recent Updates" 
        bulletPoints={recentUpdates}
        icon="clock"
        iconColor="bg-gradient-to-r from-orange-500 to-red-500"
      />
    </div>
  );
};

export default Home;
