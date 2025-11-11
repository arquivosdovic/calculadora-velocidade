import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [fps, setFps] = useState(30);
  const [origSeg, setOrigSeg] = useState(23);
  const [origQuadros, setOrigQuadros] = useState(6);
  const [novoSeg, setNovoSeg] = useState(15);
  const [novoQuadros, setNovoQuadros] = useState(1);
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const original = origSeg * fps + origQuadros;
    const desejado = novoSeg * fps + novoQuadros;
    if (desejado === 0) return setResultado("A duração desejada deve ser maior que zero.");
    const velocidade = (original / desejado) * 100;
    setResultado(`${velocidade.toFixed(2)}%`);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-md w-full shadow-2xl rounded-2xl p-6 bg-white/10 backdrop-blur-md text-white">
        <h1 className="text-2xl font-semibold text-center mb-6">Calculadora de Velocidade (Premiere)</h1>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">FPS</label>
            <input
              type="number"
              value={fps}
              onChange={(e) => setFps(Number(e.target.value))}
              className="w-full p-2 text-black rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Duração original</label>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" placeholder="Segundos" value={origSeg} onChange={(e) => setOrigSeg(Number(e.target.value))} className="p-2 text-black rounded" />
              <input type="number" placeholder="Quadros" value={origQuadros} onChange={(e) => setOrigQuadros(Number(e.target.value))} className="p-2 text-black rounded" />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm">Duração desejada</label>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" placeholder="Segundos" value={novoSeg} onChange={(e) => setNovoSeg(Number(e.target.value))} className="p-2 text-black rounded" />
              <input type="number" placeholder="Quadros" value={novoQuadros} onChange={(e) => setNovoQuadros(Number(e.target.value))} className="p-2 text-black rounded" />
            </div>
          </div>

          <button className="w-full bg-indigo-500 hover:bg-indigo-600 p-2 rounded" onClick={calcular}>
            Calcular
          </button>

          {resultado && (
            <motion.div className="text-center mt-4 text-lg font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Velocidade necessária: <span className="font-bold">{resultado}</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
