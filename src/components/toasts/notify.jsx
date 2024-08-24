import toast from 'react-hot-toast';
const notify = () => toast.custom(
    <div className='flex flex-row items-center justify-around p-3 bg-slate-200 rounded-lg shadow-2xl border'>
        <p>Oops! Found no one participated in contests, try with different date</p>
        <button
            onClick={() => toast.remove()}
            type="button" className="rounded-lg ml-2 p-1.5 focus:ring-2 focus:ring-slate-400 inline-flex items-center justify-center h-8 w-8 text-gray-500">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
        </button>
    </div>,
    {
        duration: 2000,
        position: 'top-center',
        icon: '⚠️',
        style: {
            background: '#333',
            color: '#fff',
        },
    }
);

export default notify;