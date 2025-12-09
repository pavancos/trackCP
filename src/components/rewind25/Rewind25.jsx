import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import rewindLogo from '../../assets/rewind/rewind25logo.svg';
import rewindLogoOld from '../../assets/rewind/rewindlogo.svg';
import leftArrow from '../../assets/left-arrow.svg';

const Rewind25 = () => {
  const navigate = useNavigate();
  const [usernames, setUsernames] = useState({
    leetcode: '',
    codeforces: '',
    codechef: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const originalStyle = document.body.style.backgroundColor;
    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    
    document.body.style.backgroundColor = '#000000';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    
    return () => {
      document.body.style.backgroundColor = originalStyle;
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const handleInputChange = (platform, value) => {
    setUsernames(prev => ({ ...prev, [platform]: value }));
    if (error) setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usernames.leetcode && !usernames.codeforces && !usernames.codechef) {
        setError("Please enter at least one username");
        return;
    }

    const params = new URLSearchParams();
    if (usernames.leetcode) params.append('leetcode', usernames.leetcode);
    if (usernames.codeforces) params.append('codeforces', usernames.codeforces);
    if (usernames.codechef) params.append('codechef', usernames.codechef);
    
    navigate(`/rewind25/story?${params.toString()}`);
  };

  return (
    <div className="h-[100dvh] w-full bg-black flex flex-col items-center justify-center p-6 text-white overflow-hidden font-sans fixed inset-0 touch-none">
        {/* Back Button */}
        {/* <button 
            onClick={() => navigate('/')}
            className="absolute top-6 left-6 text-white/50 hover:text-white transition-colors z-20 flex items-center gap-1"
            >
            <img src={leftArrow} alt="Back" className="w-8 p-1" /> Back to Home
        </button> */}

       {/* Background Elements */}
       <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-vividBlue/20 rounded-full blur-[120px] pointer-events-none" />
       <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-coral/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-6">
            <div className='flex mx-auto justify-center gap-2'>
                <img src={rewindLogo} alt="Rewind Logo" className="w-18 mb-6" />
                <img src={rewindLogo} alt="Rewind Logo" className="w-18 mb-6" />
            </div>
          <h1 className="text-5xl md:text-7xl mb-3 tracking-tight">Rewind '25</h1>
          <p className="text-neutral-400 font-sans tracking-widest text-sm uppercase">Your 2025 CP Journey Unwrapped by Trackcode</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs mx-auto">
          {['Leetcode', 'Codeforces', 'Codechef'].map((platform) => (
            <motion.div key={platform} variants={itemVariants} className="relative group">
                <input
                type="text"
                value={usernames[platform.toLowerCase()]}
                onChange={(e) => handleInputChange(platform.toLowerCase(), e.target.value)}
                placeholder={`Enter ${platform} Username`}
                className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-4 py-3 text-base text-center focus:outline-none focus:ring-0 focus:border-neutral-800 placeholder:text-neutral-600 text-white"
                />
            </motion.div>
          ))}

          <motion.div variants={itemVariants}>
            <button
                type="submit"
                disabled={(!usernames.leetcode && !usernames.codeforces && !usernames.codechef)}
                className="w-full bg-white text-black rounded-lg px-4 py-3 font-bold text-base hover:bg-neutral-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
                <div className='flex items-center gap-3'>
                    Visualize Journey <img src={rewindLogoOld} alt="Go" className="w-3 pb-1 group-hover:translate-x-1 transition-transform rotate-180" />
                </div>
            </button>
          </motion.div>

          {error && (
            <motion.div 
              variants={itemVariants}
              className="bg-red-900/20 border border-red-800/50 text-red-200 p-4 rounded-xl flex items-center gap-3 text-sm font-mono animate-pulse"
            >
              <span className="text-xl">!</span>
              {error}
            </motion.div>
          )}
        </form>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 w-full text-center z-10"
      >
        <div className="flex flex-col items-center gap-2 text-neutral-600 text-[10px] md:text-xs font-mono tracking-widest uppercase">
            <span className="opacity-50">Developed by</span>
            <div className="flex flex-col md:flex-row gap-1 md:gap-4 items-center">
                <a href="https://vigneshvaranasi.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Vignesh Varanasi</a>
                <span className="hidden md:inline text-neutral-700">•</span>
                <a href="https://pavanc.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Pavan Kumar Chennupati</a>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Rewind25;