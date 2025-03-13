import { useEffect, useState } from "react";

const Display = () => {
  const [time, setTime] = useState(120);
  const [round, setRound] = useState(1);
  const [scores, setScores] = useState({
    red: 0,
    blue: 0,
  });
  const [teamNames, setTeamNames] = useState({
    red: "RED FIGHTER",
    blue: "BLUE FIGHTER",
  });
  const [fouls, setFouls] = useState({ red: 0, blue: 0 });
  const [disarms, setDisarms] = useState({ red: 0, blue: 0 });
  const [teamLogos, setTeamLogos] = useState({
    red: null,
    blue: null,
  });

  useEffect(() => {
    // Initial load
    const loadGameState = () => {
      const gameState = localStorage.getItem("gameState");
      if (gameState) {
        const parsedState = JSON.parse(gameState);
        setTime(parsedState.time || 120);
        setRound(parsedState.round || 1);
        setScores(parsedState.scores || { red: 0, blue: 0 });
        setTeamNames(
          parsedState.teamNames || { red: "RED FIGHTER", blue: "BLUE FIGHTER" }
        );
        setFouls(parsedState.fouls || { red: 0, blue: 0 });
        setDisarms(parsedState.disarms || { red: 0, blue: 0 });
        setTeamLogos(parsedState.teamLogos || { red: null, blue: null });
      }
    };

    // Load initial state
    loadGameState();

    // Set up storage event listener
    const handleStorageChange = (e) => {
      if (e.key === "gameState") {
        loadGameState();
      }
    };

    // Listen for changes
    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-screen bg-white text-white flex flex-col p-4">
      <div className="container mx-auto flex-1 flex flex-col">
        {/* Header */}
        <h1
          className="text-6xl font-extrabold tracking-widest text-center mb-6 "
          style={{
            color: "#ffffff",
            background:
              "linear-gradient(135deg, #660033 0%, #990033 50%, #cc0033 100%)",
            padding: "20px",
            borderRadius: "12px",
            boxShadow:
              "0 4px 20px rgba(102, 0, 51, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)",
            textTransform: "uppercase",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            border: "2px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          STRASUC 2025
        </h1>

        {/* Main Content */}
        <div className="flex-1 grid grid-rows-[1fr_1.2fr] gap-4">
          {/* Timer Section */}
          <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center shadow-2xl">
            <div className="text-8xl font-mono font-bold text-green-500">
              {formatTime(time)}
            </div>
            <div className="text-3xl mt-4 text-gray-300">
              Round <span className="text-yellow-500">{round}</span>
              <span className="text-gray-500">/3</span>
            </div>
          </div>

          {/* Scoring Section */}
          <div className="grid grid-cols-2 gap-4">
            {/* Red Fighter */}
            <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-4">
              {teamLogos.red && (
                <img
                  src={teamLogos.red}
                  alt="Red team logo"
                  className="w-20 h-20 object-contain rounded-full bg-red-700 p-2 mb-4"
                />
              )}
              <h2 className="text-3xl font-bold text-red-200 mb-4">
                {teamNames.red}
              </h2>
              <div className="text-9xl font-bold font-mono text-red-100">
                {scores.red}
              </div>
              <div className="text-3xl mt-6 text-red-200 font-bold">
                Fouls:{" "}
                <span className="bg-red-700 px-6 py-3 rounded-lg text-white text-4xl">
                  {fouls.red}
                </span>{" "}
                | Disarms:{" "}
                <span className="bg-red-700 px-6 py-3 rounded-lg text-white text-4xl">
                  {disarms.red}
                </span>
              </div>
            </div>

            {/* Blue Fighter */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-4">
              {teamLogos.blue && (
                <img
                  src={teamLogos.blue}
                  alt="Blue team logo"
                  className="w-20 h-20 object-contain rounded-full bg-blue-700 p-2 mb-4"
                />
              )}
              <h2 className="text-3xl font-bold text-blue-200 mb-4">
                {teamNames.blue}
              </h2>
              <div className="text-9xl font-bold font-mono text-blue-100">
                {scores.blue}
              </div>
              <div className="text-3xl mt-6 text-blue-200 font-bold">
                Fouls:{" "}
                <span className="bg-blue-700 px-6 py-3 rounded-lg text-white text-4xl">
                  {fouls.blue}
                </span>{" "}
                | Disarms:{" "}
                <span className="bg-blue-700 px-6 py-3 rounded-lg text-white text-4xl">
                  {disarms.blue}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
