import React from 'react';
import html2pdf from 'html2pdf.js';

function Table({ data }) {

  // Function to format date
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Function to generate and download PDF
  const downloadPDF = () => {
    const element = document.getElementById('table-to-pdf');
    const options = {
      margin: 0.5,
      filename: 'table-data.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'tabloid', orientation: 'landscape' }
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="overflow-x-auto">
      
      <div id="table-to-pdf">
        <table className="table-auto border-collapse border border-slate-500 min-w-full">
          <thead className=''>
            <tr className='bg-[#e9edf4]'>
              <th className="border border-slate-600 p-4" rowSpan={2}>Roll.No</th>
              <th className="border border-slate-600 p-4" rowSpan={2}>Name</th>
              <th className="border border-slate-600 p-4" colSpan={4}>Leetcode</th>
              <th className="border border-slate-600 p-4" colSpan={4}>Codechef</th>
              <th className="border border-slate-600 p-4" colSpan={4}>Code Forces</th>
            </tr>
            <tr className='bg-[#e9edf4]'>
              <th className="border border-slate-600 p-4">Contest Name</th>
              <th className="border border-slate-600 p-4">Rank</th>
              <th className="border border-slate-600 p-4">No of Problems Solved</th>
              <th className="border border-slate-600 p-4">Date</th>
              <th className="border border-slate-600 p-4">Contest Name</th>
              <th className="border border-slate-600 p-4">Rank</th>
              <th className="border border-slate-600 p-4">No of Problems Solved</th>
              <th className="border border-slate-600 p-4">Date</th>
              <th className="border border-slate-600 p-4">Contest Name</th>
              <th className="border border-slate-600 p-4">Rank</th>
              <th className="border border-slate-600 p-4">No of Problems Solved</th>
              <th className="border border-slate-600 p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(({ student, contests }, studentIndex) => {
              // each row will have max of leetcode, codechef, codeforces contests n.of rows
              const maxRows = Math.max(contests.leetcode.length, contests.codechef.length, contests.codeforces.length);
              
              // console.log(student)

              return Array.from({ length: maxRows }).map((_, rowIndex) => {
                const leetcodeContest = contests.leetcode[rowIndex] || {};
                const codechefContest = contests.codechef[rowIndex] || {};
                const codeforcesContest = contests.codeforces[rowIndex] || {};
                

                const userBgColor = studentIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100';

                return (
                  <tr key={`${studentIndex}-${rowIndex}`} className={userBgColor}>
                    {rowIndex === 0 && (
                      <>
                        <td rowSpan={maxRows} className="border font-bold border-slate-600 p-4">{student.roll}</td>
                        <td rowSpan={maxRows} className="border border-slate-600 p-4">{student.name}</td>
                      </>
                    )}
                    

                    <td className="border border-slate-600 p-4">{leetcodeContest.contest?.title}</td>
                    <td className="border border-slate-600 p-4">{leetcodeContest.ranking}</td>
                    <td className="border border-slate-600 p-4">{leetcodeContest.problemsSolved}</td>
                    <td className="border border-slate-600 p-4">
                      {leetcodeContest.contest ? new Date(leetcodeContest.contest.startTime * 1000).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      }) : ' '}
                    </td>
                    <td className="border border-slate-600 p-4">{codechefContest.name || '-'}</td>
                    <td className="border border-slate-600 p-4">{codechefContest.rank || '-'}</td>
                    
                    <td className="border border-slate-600 p-4">{codechefContest.noOfProblems || '-'}</td>
                    <td className="border border-slate-600 p-4">
                      {codechefContest.end_date ? formatDate(codechefContest.end_date.split(' ')[0]) : '-'}
                    </td>
                    <td className="border border-slate-600 p-4">{codeforcesContest.contestName || '-'}</td>
                    <td className="border border-slate-600 p-4">{codeforcesContest.rank || '-'}</td>
                    <td className='border border-slate-600 p-4'>{codeforcesContest.problemsSolved || '-'}</td>
                    {/* <td className='border border-slate-600 p-4'>{codeforcesContest.totalProblems || '-'}</td> */}
                    <td className="border border-slate-600 p-4">
                      {
                        codeforcesContest.contestName ? new Date(codeforcesContest.ratingUpdateTimeSeconds * 1000).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        }) : ' '
                      }
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
