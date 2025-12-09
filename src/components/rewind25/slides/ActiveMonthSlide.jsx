import { useState, useEffect } from 'react';
import { SlideLayout } from '../SlideLayout';
import { motion } from 'framer-motion';
import { TextAnimation } from '../TextAnimation';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';

const CustomBar = (props) => {
  const { x, y, width, height, fill, stroke, strokeWidth, index } = props;
  const isHighlighted = fill === '#ffffff';
  
  return (
    <g>
      {isHighlighted && (
        <motion.rect
          x={x - 2}
          y={y - 2}
          width={width + 4}
          height={height + 4}
          fill="white"
          rx={6}
          ry={6}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.5 }}
          style={{ 
            filter: 'blur(8px)',
            WebkitFilter: 'blur(8px)'
          }}
        />
      )}
      <motion.rect
        x={x}
        width={width}
        rx={4}
        ry={4}
        stroke={stroke}
        strokeWidth={strokeWidth}
        initial={{ y: y + height, height: 0 }}
        animate={{ 
          y: y, 
          height: height, 
          fill: fill, 
          stroke: stroke, 
          strokeWidth: strokeWidth,
        }}
        transition={{
          height: { duration: 0.5, delay: 1.5 + index * 0.1, ease: "easeOut" },
          y: { duration: 0.5, delay: 1.5 + index * 0.1, ease: "easeOut" },
          fill: { duration: 0.5 },
          stroke: { duration: 0.5 },
          strokeWidth: { duration: 0.5 }
        }}
      />
    </g>
  );
};

export const ActiveMonthSlide = ({ data }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [showHighlight, setShowHighlight] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => {
      setShowHighlight(true);
    }, 3000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const monthStats = data.monthStats || {};
  
  const chartData = Object.entries(monthStats).map(([month, value]) => ({
    name: isMobile ? month.charAt(0) : month.substring(0, 3),
    fullName: month,
    value: value,
    isActive: month === data.activeMonth
  }));

  return (
    <SlideLayout gradientStart="#ec4899" gradientEnd="#be185d">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl px-4 mx-auto">
        <div className="mb-8 text-center ">
            <TextAnimation 
                text="Your most active coding month was..." 
                className="text-xl md:text-2xl font-mono text-pink-200 mb-4 uppercase tracking-widest" 
            />
             <TextAnimation 
                text={`${data.activeMonth}.`} 
                className="text-4xl md:text-6xl pb-1 font-serif text-white italic" 
                delay={0.5}
            />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="h-56 md:h-64 w-full max-w-3xl mb-8 mx-auto"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }} style={{ overflow: 'visible' }}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#fbcfe8', fontSize: isMobile ? 10 : 12, fontFamily: 'monospace' }}
                dy={10}
                interval={0}
                padding={{ left: 10, right: 10 }}
              />
              <Bar 
                dataKey="value" 
                shape={<CustomBar />}
                isAnimationActive={false}
                maxBarSize={60}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isActive && showHighlight && entry.value > 0 ? '#ffffff' : 'rgba(255, 255, 255, 0.3)'}
                    stroke={entry.isActive && showHighlight && entry.value > 0 ? 'rgba(255,255,255,0.5)' : 'transparent'}
                    strokeWidth={entry.isActive && showHighlight && entry.value > 0 ? 4 : 0}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <TextAnimation 
          text="Your discipline peaked here." 
          className="mt-4 text-neutral-400 font-sans text-sm md:text-base"
          delay={2.5}
        />

      </div>
    </SlideLayout>
  );
};