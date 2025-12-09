import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { StoryContainer } from './Container';
import { fetchRewindData } from './Rewind25Util';

const RewindStory = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleComplete = useCallback(() => {}, []);
    const handleClose = useCallback(() => navigate('/rewind25'), [navigate]);

    useEffect(() => {
        const originalStyle = document.body.style.backgroundColor;
        const originalOverflow = document.body.style.overflow;
        const originalHtmlOverflow = document.documentElement.style.overflow;

        document.body.style.backgroundColor = '#000000';
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        // Lock body to prevent rubber banding
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

    useEffect(() => {
        const lc = searchParams.get('leetcode') || '';
        const cf = searchParams.get('codeforces') || '';
        const cc = searchParams.get('codechef') || '';

        if (!lc && !cf && !cc) {
            navigate('/rewind25');
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await fetchRewindData({
                    leetcode: lc,
                    codeforces: cf,
                    codechef: cc
                });
                setData(result);
            } catch (err) {
                console.error(err);
                setError("Failed to generate story. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [searchParams, navigate]);

    if (loading) {
        return (
            <div className="min-h-[100dvh] bg-black flex flex-col items-center justify-center text-white">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <p>
                        Preparing your Rewind story...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[100dvh] bg-black flex flex-col items-center justify-center text-white">
                <p className="text-red-500 mb-4">{error}</p>
                <button 
                    onClick={() => navigate('/rewind25')}
                    className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                >
                    Back
                </button>
            </div>
        );
    }

    return <StoryContainer data={data} onComplete={handleComplete} onClose={handleClose} />;
};

export default RewindStory;
