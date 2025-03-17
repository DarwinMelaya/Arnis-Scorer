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

        {/* Featured Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-lg rounded-3xl border border-white/10 p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M18 4l-6 6m0 0l-6-6m6 6v12"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-grow text-center md:text-left">
                <h2 className="text-3xl font-bold mb-3">
                  Arnis Scoring System
                </h2>
                <p className="text-gray-400 mb-6">
                  Professional real-time scoring management for Arnis
                  competitions
                </p>
                <a
                  href="/arnis"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
                >
                  Enter System
                  <svg
                    className="w-5 h-5"
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
      </div>
    </div>
  );
};

export default Main;
