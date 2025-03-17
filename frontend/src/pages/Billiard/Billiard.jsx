import { useState, useEffect } from "react";

const Billiard = () => {
  const [time, setTime] = useState(60); // Default 60 seconds
  const [isRunning, setIsRunning] = useState(false);
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
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  useEffect(() => {
    localStorage.setItem(
      "billiardGameState",
      JSON.stringify({
        time,
        rack,
        scores,
        playerNames,
      })
    );
  }, [time, rack, scores, playerNames]);

  const formatTime = (seconds) => {
    return seconds.toString().padStart(2, "0");
  };

  const handleScore = (player, points) => {
    setScores((prev) => ({
      ...prev,
      [player]: prev[player] + points,
    }));
  };

  const handleFoul = (player, increment = true) => {
    const foulKey = player === "player1" ? "fouls1" : "fouls2";
    setScores((prev) => ({
      ...prev,
      [foulKey]: Math.max(0, prev[foulKey] + (increment ? 1 : -1)),
    }));
  };

  const resetRack = () => {
    setRack((prev) => prev + 1);
    setTime(60);
    setIsRunning(false);
  };

  const resetGame = () => {
    setTime(60);
    setIsRunning(false);
    setRack(1);
    setScores({ player1: 0, player2: 0, fouls1: 0, fouls2: 0 });
  };

  const handleExtension = () => {
    setTime((prev) => prev + 30);
  };

  const handleSetTime = (seconds) => {
    setTime(seconds);
    setIsRunning(false);
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <div className="container mx-auto flex-1 flex flex-col p-2 md:p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-2 md:mb-4">
          <h1
            className="text-3xl md:text-5xl font-extrabold tracking-widest text-center flex-1"
            style={{
              color: "#ffffff",
              background:
                "linear-gradient(135deg, #004d00 0%, #006600 50%, #008000 100%)",
              padding: "10px md:20px",
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
          <button
            onClick={() => window.open("/billiard-scorer", "_blank")}
            className="ml-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-lg font-bold transition-all transform hover:scale-105"
          >
            Scorer View
          </button>
        </div>

        {/* Timer Section */}
        <div className="bg-gray-800 rounded-xl p-2 md:p-4 flex flex-col items-center justify-center shadow-2xl mb-4">
          <div className="text-5xl md:text-7xl font-mono font-bold text-green-500">
            {formatTime(time)}
          </div>
          <div className="grid grid-cols-2 gap-2 w-full max-w-md mt-2">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-lg font-bold"
              onClick={() => handleSetTime(30)}
            >
              Set 30s
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-lg font-bold"
              onClick={() => handleSetTime(60)}
            >
              Set 60s
            </button>
          </div>
          <div className="space-x-2 md:space-x-4 mt-2 md:mt-4">
            <button
              className={`${
                isRunning
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              } text-white px-6 py-2 rounded-lg text-lg font-bold transition-all transform hover:scale-105`}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? "PAUSE" : "START"}
            </button>
            <button
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg text-lg font-bold transition-all transform hover:scale-105"
              onClick={handleExtension}
            >
              +30s
            </button>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-lg font-bold transition-all transform hover:scale-105"
              onClick={resetRack}
            >
              NEXT RACK
            </button>
          </div>
        </div>

        {/* Players Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Player 1 */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-2xl p-4">
            <input
              type="text"
              value={playerNames.player1}
              onChange={(e) =>
                setPlayerNames((prev) => ({ ...prev, player1: e.target.value }))
              }
              className="text-xl md:text-2xl font-bold text-center bg-transparent text-blue-200 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
            />
            <div className="text-5xl md:text-6xl font-bold mb-4 font-mono text-blue-100 text-center">
              {scores.player1}
            </div>
            {/* Scoring Buttons */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[1, 2, 3].map((points) => (
                <button
                  key={points}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-lg font-bold transition-all transform hover:scale-105"
                  onClick={() => handleScore("player1", points)}
                >
                  +{points}
                </button>
              ))}
            </div>
            {/* Foul Section */}
            <div className="border-t border-blue-700 pt-4">
              <div className="flex justify-between items-center gap-2">
                <span className="text-blue-200 font-bold">
                  Fouls: {scores.fouls1}
                </span>
                <div className="flex gap-2">
                  <button
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-lg font-bold transition-all transform hover:scale-105"
                    onClick={() => handleFoul("player1", true)}
                  >
                    +F
                  </button>
                  <button
                    className="bg-yellow-800 hover:bg-yellow-900 text-white px-4 py-2 rounded-lg text-lg font-bold transition-all transform hover:scale-105"
                    onClick={() => handleFoul("player1", false)}
                  >
                    -F
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Player 2 */}
          <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl shadow-2xl p-4">
            <input
              type="text"
              value={playerNames.player2}
              onChange={(e) =>
                setPlayerNames((prev) => ({ ...prev, player2: e.target.value }))
              }
              className="text-xl md:text-2xl font-bold text-center bg-transparent text-red-200 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2"
            />
            <div className="text-5xl md:text-6xl font-bold mb-4 font-mono text-red-100 text-center">
              {scores.player2}
            </div>
            {/* Scoring Buttons */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[1, 2, 3].map((points) => (
                <button
                  key={points}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-lg font-bold transition-all transform hover:scale-105"
                  onClick={() => handleScore("player2", points)}
                >
                  +{points}
                </button>
              ))}
            </div>
            {/* Foul Section */}
            <div className="border-t border-red-700 pt-4">
              <div className="flex justify-between items-center gap-2">
                <span className="text-red-200 font-bold">
                  Fouls: {scores.fouls2}
                </span>
                <div className="flex gap-2">
                  <button
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-lg font-bold transition-all transform hover:scale-105"
                    onClick={() => handleFoul("player2", true)}
                  >
                    +F
                  </button>
                  <button
                    className="bg-yellow-800 hover:bg-yellow-900 text-white px-4 py-2 rounded-lg text-lg font-bold transition-all transform hover:scale-105"
                    onClick={() => handleFoul("player2", false)}
                  >
                    -F
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reset Game Button */}
        <div className="mt-4 text-center">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg text-lg font-bold transition-all transform hover:scale-105"
            onClick={resetGame}
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billiard;
