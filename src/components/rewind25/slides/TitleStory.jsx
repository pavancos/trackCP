import { motion } from 'framer-motion'
import { TextAnimation } from '../TextAnimation'
import { SlideLayout } from '../SlideLayout'
import leetcodeIcon from '../../../assets/rewind/leetcode.svg'
import CodechefIcon from '../../../assets/rewind/codechef.svg'
import CodeforcesIcon from '../../../assets/rewind/codeforces.svg'

export const TitleSlide = ({ data }) => {
  const usernames = data.usernames || [];
  const hasLeetcode = usernames.some(u => u.leetcode);
  const hasCodechef = usernames.some(u => u.codechef);
  const hasCodeforces = usernames.some(u => u.codeforces);

  return (
    <SlideLayout gradientStart='#3B82F6' gradientEnd='#000000'>
      <div className='flex-1 flex flex-col items-center justify-center text-center'>
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: 'spring' }}
          className='mb-12 relative'
        >
          <div className='absolute inset-0 blur-3xl opacity-40 animate-pulse-slow'></div>
          <div className='flex gap-2'>
            {hasLeetcode && (
              <img
                src={leetcodeIcon}
                className='w-20 relative z-10'
                alt='LeetCode Logo'
              />
            )}
            {hasCodechef && (
              <img
                src={CodechefIcon}
                className='w-20 relative z-10'
                alt='Codechef Logo'
              />
            )}
            {hasCodeforces && (
              <img
                src={CodeforcesIcon}
                className='w-20 relative z-10'
                alt='Codeforces Logo'
              />
            )}
          </div>
        </motion.div>

        <TextAnimation
          text={`2025.`}
          className='text-8xl font-serif pb-1 text-white mb-4 tracking-tighter'
          delay={0.5}
        />
        <TextAnimation
          text='Your Competitive Coding Journey.'
          className='text-xl font-sans text-neutral-400 max-w-xs mx-auto'
          delay={1.5}
        />
        <TextAnimation
          text='Wrapped for You.'
          className='text-lg font-sans text-neutral-400 max-w-xs mx-auto'
          delay={2.0}
        />
      </div>
    </SlideLayout>
  )
}
