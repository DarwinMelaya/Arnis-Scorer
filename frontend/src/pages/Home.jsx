import { useState, useEffect } from "react";

const Home = () => {
  const [time, setTime] = useState(120); // 2 minutes per round
  const [isRunning, setIsRunning] = useState(false);
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
      "gameState",
      JSON.stringify({
        time,
        round,
        scores,
        teamNames,
        fouls,
        disarms,
        teamLogos,
      })
    );
  }, [time, round, scores, teamNames, fouls, disarms, teamLogos]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleScore = (fighter, points) => {
    setScores((prev) => ({
      ...prev,
      [fighter]: prev[fighter] + points,
    }));
  };

  const handleFoul = (fighter) => {
    setFouls((prev) => ({
      ...prev,
      [fighter]: prev[fighter] + 1,
    }));
  };

  const handleDisarm = (fighter) => {
    setDisarms((prev) => ({
      ...prev,
      [fighter]: prev[fighter] + 1,
    }));
  };

  const resetRound = () => {
    setTime(120);
    setIsRunning(false);
    if (round < 3) {
      setRound((prev) => prev + 1);
    } else {
      setRound(1);
      setScores({ red: 0, blue: 0 });
    }
  };

  const handleLogoChange = (fighter, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamLogos((prev) => ({
          ...prev,
          [fighter]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-screen bg-white text-white flex flex-col overflow-hidden">
      <div className="container mx-auto flex-1 flex flex-col p-2 md:p-4">
        {/* Header */}
        <h1
          className="text-3xl md:text-5xl font-extrabold tracking-widest text-center mb-2 md:mb-4"
          style={{
            color: "#ffffff",
            background:
              "linear-gradient(135deg, #660033 0%, #990033 50%, #cc0033 100%)",
            padding: "10px md:20px",
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
        <div className="flex-1 grid grid-rows-[auto_1fr] gap-2 md:gap-4">
          {/* Timer Section */}
          <div className="bg-gray-800 rounded-xl p-2 md:p-4 flex flex-col items-center justify-center shadow-2xl">
            <div className="text-5xl md:text-7xl font-mono font-bold text-green-500">
              {formatTime(time)}
            </div>
            <div className="text-xl md:text-2xl mt-1 md:mt-2 text-gray-300">
              Round <span className="text-yellow-500">{round}</span>
              <span className="text-gray-500">/3</span>
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
                onClick={resetRound}
              >
                NEXT ROUND
              </button>
            </div>
          </div>

          {/* Scoring Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 min-h-0">
            {/* Red Fighter */}
            <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-2 md:p-3">
              <label className="cursor-pointer mb-1 group">
                {teamLogos.red ? (
                  <img
                    src={teamLogos.red}
                    alt="Red team logo"
                    className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-full bg-red-700 p-2 mb-1 group-hover:opacity-80"
                  />
                ) : (
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-700 flex items-center justify-center mb-1 group-hover:bg-red-600">
                    <span className="text-red-200 text-sm">Add Logo</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoChange("red", e)}
                  className="hidden"
                />
              </label>
              <input
                type="text"
                value={teamNames.red}
                onChange={(e) =>
                  setTeamNames((prev) => ({ ...prev, red: e.target.value }))
                }
                className="text-xl md:text-2xl font-bold text-center bg-transparent text-red-200 mb-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2"
              />
              <div className="text-5xl md:text-6xl font-bold mb-2 font-mono text-red-100">
                {scores.red}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 5].map((points) => (
                  <button
                    key={points}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-lg font-bold transition-all transform hover:scale-105"
                    onClick={() => handleScore("red", points)}
                  >
                    +{points}
                  </button>
                ))}
              </div>

              {/* Updated Fouls and Disarms section */}
              <div className="flex items-center justify-between w-full mt-2 px-2">
                <div className="flex items-center">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-base font-bold transition-all transform hover:scale-105 mr-2"
                    onClick={() => handleFoul("red")}
                  >
                    Foul
                  </button>
                  <span className="text-lg md:text-xl text-red-200 font-bold">
                    Fouls:{" "}
                    <span className="bg-red-700 px-3 py-1 rounded-lg text-white text-xl md:text-2xl">
                      {fouls.red}
                    </span>
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg md:text-xl text-red-200 font-bold">
                    Disarms:{" "}
                    <span className="bg-red-700 px-3 py-1 rounded-lg text-white text-xl md:text-2xl">
                      {disarms.red}
                    </span>
                  </span>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-base font-bold transition-all transform hover:scale-105 ml-2"
                    onClick={() => handleDisarm("red")}
                  >
                    Disarm
                  </button>
                </div>
              </div>
            </div>

            {/* Blue Fighter */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-2 md:p-3">
              <label className="cursor-pointer mb-1 group">
                {teamLogos.blue ? (
                  <img
                    src={teamLogos.blue}
                    alt="Blue team logo"
                    className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-full bg-blue-700 p-2 mb-1 group-hover:opacity-80"
                  />
                ) : (
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-700 flex items-center justify-center mb-1 group-hover:bg-blue-600">
                    <span className="text-blue-200 text-sm">Add Logo</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoChange("blue", e)}
                  className="hidden"
                />
              </label>
              <input
                type="text"
                value={teamNames.blue}
                onChange={(e) =>
                  setTeamNames((prev) => ({ ...prev, blue: e.target.value }))
                }
                className="text-xl md:text-2xl font-bold text-center bg-transparent text-blue-200 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
              />
              <div className="text-5xl md:text-6xl font-bold mb-2 font-mono text-blue-100">
                {scores.blue}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 5].map((points) => (
                  <button
                    key={points}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-lg font-bold transition-all transform hover:scale-105"
                    onClick={() => handleScore("blue", points)}
                  >
                    +{points}
                  </button>
                ))}
              </div>

              {/* Updated Fouls and Disarms section */}
              <div className="flex items-center justify-between w-full mt-2 px-2">
                <div className="flex items-center">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-base font-bold transition-all transform hover:scale-105 mr-2"
                    onClick={() => handleFoul("blue")}
                  >
                    Foul
                  </button>
                  <span className="text-lg md:text-xl text-blue-200 font-bold">
                    Fouls:{" "}
                    <span className="bg-blue-700 px-3 py-1 rounded-lg text-white text-xl md:text-2xl">
                      {fouls.blue}
                    </span>
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg md:text-xl text-blue-200 font-bold">
                    Disarms:{" "}
                    <span className="bg-blue-700 px-3 py-1 rounded-lg text-white text-xl md:text-2xl">
                      {disarms.blue}
                    </span>
                  </span>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-base font-bold transition-all transform hover:scale-105 ml-2"
                    onClick={() => handleDisarm("blue")}
                  >
                    Disarm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
