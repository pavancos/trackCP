import { useEffect, useState, useRef } from "react";
import { SlideLayout } from "../SlideLayout";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { toPng } from "html-to-image";

const RollingDigit = ({ char, delay }) => {
  const isDigit = /^\d$/.test(char);
  
  if (!isDigit) {
      return <span>{char}</span>;
  }

  const digit = parseInt(char);
  const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  const targetIndex = 9 - digit;
  
  return (
    <div className="relative h-[1em] inline-block overflow-hidden">
      <motion.div
        initial={{ y: "-90%" }}
        animate={{ y: `-${targetIndex * 10}%` }}
        transition={{ duration: 1.5, delay: delay, ease: "circOut" }}
        className="absolute top-0 left-0 w-full flex flex-col"
      >
        {numbers.map((num) => (
          <div key={num} className="h-[1em] flex items-center justify-center">
            {num}
          </div>
        ))}
      </motion.div>
      <span className="opacity-0">{char}</span>
    </div>
  );
};

const RollingCounter = ({ value }) => {
  const chars = String(value).split("");
  return (
    <div className="flex items-center justify-center">
      {chars.map((char, index) => (
        <RollingDigit key={index} char={char} delay={index * 0.1} />
      ))}
    </div>
  );
};
import downloadIcon from '../../../assets/rewind/download.svg';
import shareIcon from '../../../assets/rewind/share.svg';
import checkIcon from '../../../assets/rewind/check.svg';
import loaderIcon from '../../../assets/rewind/loader.svg';
import warningIcon from '../../../assets/rewind/warning.svg';
import rewindLogo from '../../../assets/rewind/rewind25logo.svg';

export const SummarySlide = ({ data }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [error, setError] = useState(null);
  const [tagline, setTagline] = useState("");
  let popColor;

  const posterRef = useRef(null);

  useEffect(() => {
    const totalContests = parseInt(data.totalContestsParticipated) || 0;
    let quote = "";

    if (totalContests >= 100) {
      quote = "You don't just code, you conquer.";
    } else if (totalContests >= 90) {
      quote = "Elite consistency. Unstoppable drive.";
    } else if (totalContests >= 80) {
      quote = "A master of the algorithmic marathon.";
    } else if (totalContests >= 70) {
      quote = "Your dedication is rewriting the rules.";
    } else if (totalContests >= 60) {
      quote = "A true veteran of the virtual arena.";
    } else if (totalContests >= 50) {
      quote = "Half a century of pure problem solving.";
    } else if (totalContests >= 40) {
      quote = "A problem-solving wizard. Your dedication is inspiring.";
    } else if (totalContests >= 30) {
      quote = "The grind is real, and so are your results.";
    } else if (totalContests >= 20) {
      quote = "You're finding your rhythm. Keep pushing.";
    } else if (totalContests >= 10) {
      quote = "The foundation is set. Now, build the skyscraper.";
    } else {
      quote = "The start of something great. Your journey is just beginning.";
    }
    setTagline(quote);
  }, [data.totalContestsParticipated]);

  useEffect(() => {
    const poppyColors = ["#FF6B6B", "#F7B801", "#06D6A0", "#4ECDC4", "#1A73E8"];
    setTimeout(() => {
      confetti({
        particleCount: 150,
        angle: 60,
        spread: 70,
        origin: { x: 0.3, y: 0.8 },
        colors: poppyColors,
        zIndex: 100,
      });
      // Right cannon - moved closer to center (0.7)
      confetti({
        particleCount: 150,
        angle: 120,
        spread: 70,
        origin: { x: 0.7, y: 0.8 },
        colors: poppyColors,
        zIndex: 100,
      });
    
    }, 500);
  }, []);

  const generateImage = async () => {
    if (!posterRef.current) return null;

    try {
      // Wait for images to load
      const images = posterRef.current.getElementsByTagName("img");
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) resolve();
              else img.onload = resolve;
            })
        )
      );

      const dataUrl = await toPng(posterRef.current, {
        quality: 1.0,
        pixelRatio: 3, // Higher resolution
        backgroundColor: "#000000", // Match the black theme
        style: {
            transform: 'scale(1)', // Ensure no scaling artifacts
        }
      });
      return dataUrl;
    } catch (err) {
      console.error("Error generating image:", err);
      setError("Failed to generate image");
      return null;
    }
  };

  const handleDownload = async () => {
    if (isDownloading || hasDownloaded) return;

    setIsDownloading(true);
    setError(null);

    try {
      const dataUrl = await generateImage();
      if (dataUrl) {
        const link = document.createElement("a");
        link.download = `TrackCode-Rewind-2025-${data.username}.png`;
        link.href = dataUrl;
        link.click();
        setHasDownloaded(true);
        
        // Reset success state after 3 seconds
        setTimeout(() => setHasDownloaded(false), 3000);
      }
    } catch (err) {
      setError("Failed to save");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    try {
      const dataUrl = await generateImage();
      if (!dataUrl) return;

      const blob = await (await fetch(dataUrl)).blob();

      if (navigator.share) {
        await navigator.share({
          title: "My TrackCode Rewind 2025",
          text: `Check out my coding journey in 2025!\nI solved ${data.totalProblemsSolved} contest problems this year. Here is my Rewind'25: ${window.location.href}\nYou can get yours at ${"https://trackcode.in/rewind25"} \n#TrackCodeRewind`,
        });
      } else {
        // Fallback for desktop/unsupported browsers
        await navigator.clipboard.write([
            new ClipboardItem({
                [blob.type]: blob
            })
        ]);
        alert("Image copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const colorRandomizer = () => {
    const classes=[
      "text-red-500",
      "text-green-500",
      "text-yellow-500",
      "text-purple-500",
      "text-pink-500",
      "text-indigo-500",
      "text-teal-500"
    ];
    return classes[Math.floor(Math.random() * classes.length)];
  };
  const [rewindColor] = useState(() => colorRandomizer());


  return (
    <SlideLayout gradientStart="#000000" gradientEnd="#0a0a0a">
      <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">

        <motion.div
          ref={posterRef}
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="relative w-full max-w-sm bg-black rounded-none overflow-hidden border border-neutral-800 shadow-2xl"
        >
          
          {/* Subtle Grid Lines */}

          <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
            
            {/* Top Section */}
            <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                <h1 className="text-2xl font-serif italic text-white">TrackCode</h1>
                <p className="text-base font-mono text-neutral-400">Rewind 
                  <span className={`${rewindColor}`}>'25</span>
                </p>
            </div>

            {/* Middle Section - Hero Stat */}
            <div className="flex flex-col items-center justify-center  border-b border-neutral-800 py-4 my-1 md:my-2 md:py-7 relative">
               <div className="absolute inset-0 via-neutral-900/50 to-transparent pointer-events-none"></div>
               <span className="text-xs font-mono text-neutral-500 uppercase tracking-[0.3em] mb-4">Total Problems Solved</span>
               <div className="text-8xl font-black md:tracking-tighter text-neutral-200 leading-none flex overflow-hidden h-[1em]">
                 <RollingCounter value={data.totalProblemsSolved} />
               </div>
            </div>

            {/* Bottom Section - Details Grid */}
            <div className="grid grid-cols-2 gap-6 mt-3 md:mt-1">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Top Platform</span>
                <span className="text-2xl font-serif text-white italic">{data.topPlatform}</span>
              </div>

              <div className="flex flex-col gap-1 text-right">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Active Month</span>
                <span className="text-2xl font-serif text-white italic">{data.activeMonth.toLowerCase()}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Contests</span>
                <span className="text-2xl font-serif text-white italic">{data.totalContestsParticipated}</span>
              </div>

              <div className="flex flex-col gap-1 text-right">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Best Rank</span>
                <span className="text-2xl font-serif text-white italic">#{data.topContest.rank}</span>
                <span className="text-xs text-neutral-500 truncate max-w-[120px] ml-auto">{data.topContest.name}</span>
              </div>

            </div>

            {/* Footer */}
            <div className="pt-6">
                <p className="text-sm font-serif italic text-neutral-400 text-center leading-relaxed">
                  "{tagline}"
                </p>
            </div>

          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex gap-4 mt-8 z-20"
        >
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 rounded-none font-bold bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-700 transition-all hover:scale-105 active:scale-95"
          >
            <img src={shareIcon} className="w-4 h-4" alt="Share" />
            <span className="text-sm uppercase tracking-wider">Share</span>
          </button>

          <button
            onClick={handleDownload}
            className={`flex items-center gap-2 px-6 py-3 rounded-none font-bold transition-all hover:scale-105 active:scale-95 shadow-lg ${
              hasDownloaded
                ? "bg-white text-black"
                : error
                ? "bg-red-600 text-white"
                : "bg-white text-black hover:bg-neutral-200"
            }`}
          >
            {isDownloading ? (
              <>
                <img src={loaderIcon} className="w-4 h-4 animate-spin" alt="Loading" /> <span className="text-sm uppercase tracking-wider">Saving...</span>
              </>
            ) : hasDownloaded ? (
              <>
                <img src={checkIcon} className="w-4 h-4" alt="Saved" /> <span className="text-sm uppercase tracking-wider">Saved</span>
              </>
            ) : error ? (
              <>
                <img src={warningIcon} className="w-4 h-4" alt="Error" /> <span className="text-sm uppercase tracking-wider">{error}</span>
              </>
            ) : (
              <>
                <img src={downloadIcon} className="w-4 h-4" alt="Save" /> <span className="text-sm uppercase tracking-wider">Save</span>
              </>
            )}
          </button>
        </motion.div>

      </div>
    </SlideLayout>
  );
};

export default SummarySlide;