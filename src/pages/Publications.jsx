import TextFormatter from "../components/TextFormatter";
import publicationsData from "../database/publications.json";

const { publications } = publicationsData;

const Publications = () => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">
          Publications
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 mx-auto rounded-full shadow-lg"></div>
      </div>

      {/* Publications List */}
      <div className="space-y-10">
        {publications.map((item, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="p-10">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Image */}
                <div className="lg:col-span-1 flex justify-center lg:justify-start">
                  <div className="w-36 h-44 rounded-2xl overflow-hidden shadow-xl border border-slate-200/30">
                    <img 
                      src={item.image} 
                      alt="paper preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Title */}
                  <div>
                    <a
                      href={item.paper_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors leading-tight"
                    >
                      <TextFormatter text={item.title} />
                    </a>
                  </div>

                  {/* Authors */}
                  <div className="flex flex-wrap gap-x-2 text-slate-700">
                    {item.authors.map((_item, _index) => (
                      <a
                        href={_item.profile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:text-indigo-600 transition-colors ${_index === 0 ? "font-semibold" : ""}`}
                        key={_index}
                      >
                        {_item.name}
                        {item.authors.length !== _index + 1 ? ", " : ""}
                      </a>
                    ))}
                  </div>

                  {/* Notes */}
                  {item.notes.length > 0 && (
                    <div className="space-y-3">
                      {item.notes.map((_item, _index) => (
                        <div key={_index} className="text-emerald-600 font-medium bg-emerald-50/50 rounded-xl p-3 border border-emerald-200/30">
                          <TextFormatter text={_item} />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  {item.description.length > 0 && (
                    <div className="text-slate-600 leading-relaxed bg-slate-50/50 rounded-xl p-4 border border-slate-200/30">
                      <TextFormatter text={item.description} />
                    </div>
                  )}

                  {/* Key Contributions */}
                  {item.KeyContribution && item.KeyContribution.length > 0 && (
                    <div className="bg-gradient-to-r from-indigo-50/80 to-purple-50/60 rounded-2xl p-6 border border-indigo-200/30">
                      <h3 className="text-indigo-800 font-semibold mb-4 flex items-center gap-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Key Contributions
                      </h3>
                      <ul className="space-y-3">
                        {item.KeyContribution.map((_item, _index) => (
                          <li key={_index} className="flex items-start gap-3 text-indigo-700">
                            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-3 flex-shrink-0 shadow-sm"></div>
                            <span>{_item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Supervisors */}
                  {item.supervisors.length > 0 && (
                    <div className="flex items-center gap-3 flex-wrap bg-slate-50/50 rounded-xl p-4 border border-slate-200/30">
                      <span className="text-slate-700 font-semibold flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        Supervisor(s):
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {item.supervisors.map((_item, _index) => (
                          <a
                            href={_item.profile}
                            key={_index}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 transition-colors"
                          >
                            {_item.name}
                            {item.supervisors.length !== _index + 1 ? "," : ""}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publications;
