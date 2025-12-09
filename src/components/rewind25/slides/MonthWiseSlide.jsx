import { SlideLayout } from "../SlideLayout";
import { motion } from "framer-motion";
import { TextAnimation } from "../TextAnimation";

export const MonthWiseSlide = ({ data }) => {
  const monthStats = data.monthStats;

  return (
    <SlideLayout gradientStart="#4f46e5" gradientEnd="#1e1b4b">
      <div className="flex-1 flex flex-col items-center text-center justify-center">

        <TextAnimation
          text="Your Month-by-Month Journey."
          className="text-lg font-mono text-indigo-200 mb-1 uppercase tracking-widest"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs text-indigo-300 my-3 tracking-wide"
        >
          Problems solved each month.
        </motion.p>

        <div className="grid grid-cols-2 gap-3 w-full max-w-lg px-4 mt-2">
          {Object.entries(monthStats).map(([month, count], index) => (
            <motion.div
              key={month}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center justify-center py-3 bg-white/5 rounded-xl backdrop-blur-md border border-white/10"
            >
              <span className="text-white font-serif text-sm md:text-base">{month}</span>
              <span className="text-indigo-300 font-mono text-xs md:text-sm mt-1">
                {count} problems
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </SlideLayout>
  );
};

export default MonthWiseSlide;
