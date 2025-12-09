import { SlideLayout } from '../SlideLayout'
import { motion } from 'framer-motion'
import { TextAnimation } from '../TextAnimation'
import leetcodeIcon from '../../../assets/rewind/leetcode.svg'
import CodechefIcon from '../../../assets/rewind/codechef.svg'
import CodeforcesIcon from '../../../assets/rewind/codeforces.svg'

export const TopPlatformSlide = ({ data }) => {
  const platform = data.topPlatform;
  
  const getIcon = () => {
    if (platform.toLowerCase() === "leetcode") return <img src={leetcodeIcon} className="w-32 h-32 md:w-40 md:h-40 relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />;
    if (platform.toLowerCase() === "codechef") return <img src={CodechefIcon} className="w-32 h-32 md:w-40 md:h-40 relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />;
    if (platform.toLowerCase() === "codeforces") return <img src={CodeforcesIcon} className="w-32 h-32 md:w-40 md:h-40 relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />;
    return null;
  };

  return (
    <SlideLayout gradientStart="#4338ca" gradientEnd="#1e1b4b">
      <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />

        <TextAnimation
            text="YOUR HOME BASE"
            className="text-lg font-mono text-indigo-200/80 mb-8 tracking-[0.3em] uppercase"
        />

        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
          className="mb-10 relative"
        >
          {getIcon()}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
             <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
                {platform}
            </h2>
        </motion.div>

        <TextAnimation
          text="Where the magic happened."
          className="mt-6 text-xl font-serif italic text-indigo-200"
          delay={1.2}
        />

      </div>
    </SlideLayout>
  )
}
