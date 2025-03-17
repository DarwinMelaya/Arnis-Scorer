import { useEffect, useState } from "react";

const BilliardScorer = () => {
  const [time, setTime] = useState(60);
  const [rack, setRack] = useState(1);
  const [scores, setScores] = useState({
    player1: 0,
    player2: 0,
    fouls1: 0,
    fouls2: 0,
  });
  const [playerNames, setPlayerNames] = useState({
    player1: "PLAYER 1",
    player2: "PLAYER 2",
  });

  useEffect(() => {
    // Initial load
    const loadGameState = () => {
      const gameState = localStorage.getItem("billiardGameState");
      if (gameState) {
        const parsedState = JSON.parse(gameState);
        setTime(parsedState.time || 60);
        setRack(parsedState.rack || 1);
        setScores(
          parsedState.scores || { player1: 0, player2: 0, fouls1: 0, fouls2: 0 }
        );
        setPlayerNames(
          parsedState.playerNames || {
            player1: "PLAYER 1",
            player2: "PLAYER 2",
          }
        );
      }
    };

    // Load initial state
    loadGameState();

    // Set up storage event listener
    const handleStorageChange = (e) => {
      if (e.key === "billiardGameState") {
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
    return seconds.toString().padStart(2, "0");
  };

  return (
    <div className="h-screen bg-white text-white flex flex-col p-4">
      <div className="container mx-auto flex-1 flex flex-col">
        {/* Header */}
        <h1
          className="text-6xl font-extrabold tracking-widest text-center mb-6"
          style={{
            color: "#ffffff",
            background:
              "linear-gradient(135deg, #004d00 0%, #006600 50%, #008000 100%)",
            padding: "20px",
            borderRadius: "12px",
            boxShadow:
              "0 4px 20px rgba(0, 77, 0, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)",
            textTransform: "uppercase",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            border: "2px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          RACK {rack}
        </h1>

        {/* Main Content */}
        <div className="flex-1 grid grid-rows-[0.8fr_1fr] gap-4">
          {/* Timer Section */}
          <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center shadow-2xl">
            <div className="text-8xl font-mono font-bold text-green-500">
              {formatTime(time)}
            </div>
          </div>

          {/* Scoring Section */}
          <div className="grid grid-cols-2 gap-4">
            {/* Player 1 */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-3">
              <h2 className="text-3xl font-bold text-blue-200 mb-4">
                {playerNames.player1}
              </h2>
              <div className="text-8xl font-bold font-mono text-blue-100">
                {scores.player1}
              </div>
              <div className="text-xl font-bold text-yellow-400 mt-2">
                Fouls: {scores.fouls1}
              </div>
            </div>

            {/* Player 2 */}
            <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-3">
              <h2 className="text-3xl font-bold text-red-200 mb-4">
                {playerNames.player2}
              </h2>
              <div className="text-8xl font-bold font-mono text-red-100">
                {scores.player2}
              </div>
              <div className="text-xl font-bold text-yellow-400 mt-2">
                Fouls: {scores.fouls2}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BilliardScorer;
