import React from 'react';
function Table({ data }) {
  // Function to format date
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="overflow-x-auto">
      <div id="table-to-pdf">
        <table className="table-auto border-collapse border border-slate-500 min-w-full">
          <thead className=''>
            <tr className='bg-[#e9edf4]'>
              <th className="tableTd" rowSpan={2}>Roll.No</th>
              <th className="tableTd" rowSpan={2}>Name</th>
              <th className="tableTd" colSpan={4}>Leetcode</th>
              <th className="tableTd" colSpan={4}>Codechef</th>
              <th className="tableTd" colSpan={4}>Code Forces</th>
            </tr>
            <tr className='bg-[#e9edf4]'>
              <th className="tableTd">Contest Name</th>
              <th className="tableTd">Rank</th>
              <th className="tableTd">No of Problems Solved</th>
              <th className="tableTd">Date</th>
              <th className="tableTd">Contest Name</th>
              <th className="tableTd">Rank</th>
              <th className="tableTd">No of Problems Solved</th>
              <th className="tableTd">Date</th>
              <th className="tableTd">Contest Name</th>
              <th className="tableTd">Rank</th>
              <th className="tableTd">No of Problems Solved</th>
              <th className="tableTd">Date</th>
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
                        <td rowSpan={maxRows} className="tableTd">{student.name}</td>
                      </>
                    )}
                    

                    <td className="tableTd">{leetcodeContest.contest?.title}</td>
                    <td className="tableTd">{leetcodeContest.ranking}</td>
                    <td className="tableTd">{leetcodeContest.problemsSolved}</td>
                    <td className="tableTd">
                      {leetcodeContest.contest ? new Date(leetcodeContest.contest.startTime * 1000).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      }) : ' '}
                    </td>
                    <td className="tableTd">{codechefContest.name || '  '}</td>
                    <td className="tableTd">{codechefContest.rank || '  '}</td>
                    
                    <td className="tableTd">{codechefContest.noOfProblems || '  '}</td>
                    <td className="tableTd">
                      {codechefContest.end_date ? formatDate(codechefContest.end_date.split(' ')[0]) : '-'}
                    </td>
                    <td className="tableTd">{codeforcesContest.contestName || '  '}</td>
                    <td className="tableTd">{codeforcesContest.rank || '  '}</td>
                    <td className='tableTd'>{codeforcesContest.problemsSolved || '  '}</td>
                    {/* <td className='tableTd'>{codeforcesContest.totalProblems || '-'}</td> */}
                    <td className="tableTd">
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
