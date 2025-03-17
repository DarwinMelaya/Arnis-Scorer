const SportCard = ({ card }) => {
  return (
    <div className="group relative">
      <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-lg rounded-3xl border border-white/10 p-8 transition-all duration-300 hover:scale-[1.02] hover:border-white/20">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 transform transition-transform duration-300 group-hover:scale-110">
            <div
              className={`w-24 h-24 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center`}
            >
              <svg
                className="w-16 h-16 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                {card.icon}
              </svg>
            </div>
          </div>
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-3xl font-bold mb-3">{card.title}</h2>
            <p className="text-gray-400 mb-6">{card.description}</p>
            <a
              href={`/${card.id}`}
              className={`inline-flex items-center gap-2 bg-gradient-to-r ${card.gradient} ${card.hoverGradient} px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg ${card.shadow}`}
            >
              Enter System
              <svg
                className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportCard;
