import { SPORT_CARDS } from "../components/Main/SPORT_CARDS";
import SportCard from "../components/Main/SportCard";

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
