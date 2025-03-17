const SPORT_CARDS = [
  {
    id: "arnis",
    title: "Arnis Scoring System",
    description:
      "Professional real-time scoring management for Arnis competitions",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18 4l-6 6m0 0l-6-6m6 6v12"
      />
    ),
    gradient: "from-red-600 to-red-800",
    hoverGradient: "hover:from-red-700 hover:to-red-900",
    shadow: "shadow-red-500/20 hover:shadow-red-500/40",
  },
  {
    id: "billiard",
    title: "Billiard Scoring System",
    description:
      "Professional real-time scoring management for Billiard matches",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
      </>
    ),
    gradient: "from-green-600 to-green-800",
    hoverGradient: "hover:from-green-700 hover:to-green-900",
    shadow: "shadow-green-500/20 hover:shadow-green-500/40",
  },
];

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

const Main = () => {
  return (
    <div
      className="min-h-screen text-white relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Hero Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-6xl font-black mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
              STRASUC 2025
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Experience the Ultimate Sports Competition
          </p>
        </div>

        {/* Featured Cards */}
        <div className="max-w-5xl mx-auto grid gap-8 px-4">
          {SPORT_CARDS.map((card) => (
            <SportCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
