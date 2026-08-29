import React, { useRef, useState, useEffect } from 'react';
import { sound } from '../utils/sound';
import { Sparkles, RotateCcw, Volume2, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LetterTracingCanvasProps {
  letter: string;
  subtext?: string;
  isHindi?: boolean;
  onComplete?: () => void;
}

const BRUSH_COLORS = [
  { name: 'Saffron Gold', color: '#F59E0B' },
  { name: 'Peacock Teal', color: '#0D9488' },
  { name: 'Lotus Rose', color: '#EC4899' },
  { name: 'Royal Azure', color: '#3B82F6' },
  { name: 'Marigold Yellow', color: '#EAB308' },
];

export const LetterTracingCanvas: React.FC<LetterTracingCanvasProps> = ({
  letter,
  subtext = '',
  isHindi = false,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#F59E0B');
  const [strokeCount, setStrokeCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    drawGuide();
  }, [letter]);

  const drawGuide = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Soft dotted grid lines for writing guidance
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);

    // Top guide line
    ctx.beginPath();
    ctx.moveTo(30, 70);
    ctx.lineTo(canvas.width - 30, 70);
    ctx.stroke();

    // Middle guide line
    ctx.beginPath();
    ctx.moveTo(30, canvas.height / 2);
    ctx.lineTo(canvas.width - 30, canvas.height / 2);
    ctx.stroke();

    // Bottom guide line
    ctx.beginPath();
    ctx.moveTo(30, canvas.height - 70);
    ctx.lineTo(canvas.width - 30, canvas.height - 70);
    ctx.stroke();

    ctx.setLineDash([]);

    // Draw the faint guide letter in the center
    ctx.font = isHindi
      ? "bold 170px 'Baloo 2', sans-serif"
      : "bold 190px 'Fredoka', 'Baloo 2', sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Faint stroke outline for toddler to trace over
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#FED7AA'; // Soft warm peach guide
    ctx.strokeText(letter, canvas.width / 2, canvas.height / 2 + (isHindi ? 10 : 0));

    // Inner dotted path
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#F97316';
    ctx.setLineDash([4, 6]);
    ctx.strokeText(letter, canvas.width / 2, canvas.height / 2 + (isHindi ? 10 : 0));
    ctx.setLineDash([]);

    setStrokeCount(0);
    setCompleted(false);
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    sound.playFlute(strokeCount % 6);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();

    // Glitter sparkle dots around stroke
    if (Math.random() > 0.6) {
      ctx.fillStyle = '#FEF08A';
      ctx.beginPath();
      ctx.arc(x + (Math.random() * 20 - 10), y + (Math.random() * 20 - 10), 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const newCount = strokeCount + 1;
    setStrokeCount(newCount);

    if (newCount >= 3 && !completed) {
      setCompleted(true);
      sound.playSparkle();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#EC4899', '#3B82F6'],
      });
      if (onComplete) onComplete();
    }
  };

  const handleSpeak = () => {
    sound.playBell();
    sound.speak(
      isHindi ? `यह है ${letter}, ${subtext}` : `Letter ${letter}, ${subtext}`,
      isHindi ? 'hi' : 'en'
    );
  };

  return (
    <div className="flex flex-col items-center bg-white/90 backdrop-blur-md rounded-3xl p-5 border-4 border-amber-300 shadow-xl max-w-md mx-auto">
      {/* Header Info */}
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center gap-2">
          <span className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shadow-inner">
            ✏️
          </span>
          <div>
            <h4 className="text-xl font-bold text-amber-900 leading-tight">
              Trace & Sparkle: {letter}
            </h4>
            <p className="text-xs text-amber-700 font-medium">{subtext || 'Follow the glowing line!'}</p>
          </div>
        </div>
        <button
          id="listen-letter-btn"
          onClick={handleSpeak}
          className="p-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-2xl shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 font-bold text-sm"
          title="Listen"
        >
          <Volume2 className="w-5 h-5" />
          <span>Hear</span>
        </button>
      </div>

      {/* Drawing Canvas */}
      <div className="relative rounded-2xl overflow-hidden border-4 border-dashed border-amber-200 bg-gradient-to-b from-amber-50/50 to-orange-50/30 touch-none shadow-inner">
        <canvas
          ref={canvasRef}
          width={360}
          height={320}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="cursor-crosshair w-full h-[280px] sm:h-[300px]"
        />

        {completed && (
          <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-bold animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            Shabash! Great job!
          </div>
        )}
      </div>

      {/* Brush Palette & Actions */}
      <div className="flex flex-wrap items-center justify-between w-full mt-4 gap-3">
        {/* Colors */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Color:
          </span>
          <div className="flex gap-1.5">
            {BRUSH_COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => {
                  setBrushColor(c.color);
                  sound.playPop();
                }}
                className={`w-7 h-7 rounded-full transition-transform border-2 ${
                  brushColor === c.color ? 'scale-125 border-slate-800 shadow-md' : 'border-white hover:scale-110'
                }`}
                style={{ backgroundColor: c.color }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Clear / Redo Button */}
        <button
          id="clear-canvas-btn"
          onClick={() => {
            sound.playPop();
            drawGuide();
          }}
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl transition-all active:scale-95 shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Clear Pad
        </button>
      </div>
    </div>
  );
};
