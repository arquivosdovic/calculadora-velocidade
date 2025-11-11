import React, { useState } from "react";

export default function App() {
  const [originalTime, setOriginalTime] = useState({ h: 0, m: 0, s: 0, f: 0 });
  const [desiredTime, setDesiredTime] = useState({ h: 0, m: 0, s: 0, f: 0 });
  const [fps, setFps] = useState(30);
  const [speed, setSpeed] = useState(null);

  const timeToFrames = ({ h, m, s, f }, fps) => (h * 3600 + m * 60 + s) * fps + f;

  const calculateSpeed = () => {
    const originalFrames = timeToFrames(originalTime, fps);
    const desiredFrames = timeToFrames(desiredTime, fps);

    // validações básicas
    if (originalFrames === 0) {
      setSpeed(null);
      return;
    }
    if (desiredFrames === 0) {
      setSpeed(null);
      return;
    }

    // CORREÇÃO: velocidade = original / desejado * 100
    const newSpeed = (originalFrames / desiredFrames) * 100;
    setSpeed(Number(newSpeed.toFixed(2)));
  };

  const handleChange = (setter, key, value) => {
    // evita números negativos e strings vazias
    const n = Number(value);
    setter(prev => ({ ...prev, [key]: Number.isNaN(n) ? 0 : Math.max(0, Math.floor(n)) }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Calculadora de Velocidade de Vídeo</h1>

      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg">
        <label className="block mb-4">
          <span className="font-semibold text-gray-700">FPS (Quadros por segundo)</span>
          <input
            type="number"
            min="1"
            value={fps}
            onChange={(e) => setFps(Math.max(1, Number(e.target.value) || 0))}
            className="w-full p-2 border rounded-lg mt-1"
          />
        </label>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">Duração original (100%)</h2>
            <div className="grid grid-cols-4 gap-2">
              {['h','m','s','f'].map((k,i)=>(
                <input
                  key={k}
                  type="number"
                  min="0"
                  value={originalTime[k]}
                  onChange={(e)=>handleChange(setOriginalTime,k,e.target.value)}
                  className="p-2 border rounded-lg text-center"
                  placeholder={['h','m','s','q'][i]}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-gray-700 mb-2">Duração desejada</h2>
            <div className="grid grid-cols-4 gap-2">
              {['h','m','s','f'].map((k,i)=>(
                <input
                  key={k}
                  type="number"
                  min="0"
                  value={desiredTime[k]}
                  onChange={(e)=>handleChange(setDesiredTime,k,e.target.value)}
                  className="p-2 border rounded-lg text-center"
                  placeholder={['h','m','s','q'][i]}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={calculateSpeed}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Calcular velocidade
        </button>

        {speed !== null && (
          <div className="mt-4 text-center">
            <p className="text-lg font-medium text-gray-800">
              Velocidade necessária: <span className="font-bold">{speed}%</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
