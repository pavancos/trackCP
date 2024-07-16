import React from 'react';

function LeetcodeTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-slate-500 min-w-full">
        <thead>
          <tr>
            <th className="border border-slate-600 p-4">Roll.No</th>
            <th className="border border-slate-600 p-4">Name</th>
            <th className="border border-slate-600 p-4" colSpan={5}>Leetcode</th>
            <th className="border border-slate-600 p-4" colSpan={3}>Codechef</th>
            <th className="border border-slate-600 p-4" colSpan={3}>Code Forces</th>
          </tr>
          <tr>
            <th className="border border-slate-600 p-4"></th>
            <th className="border border-slate-600 p-4"></th>
            <th className="border border-slate-600 p-4">Contest Name</th>
            <th className="border border-slate-600 p-4">Rank</th>
            <th className="border border-slate-600 p-4">No of Problems Solved</th>
            <th className="border border-slate-600 p-4">Total Problems</th>
            <th className="border border-slate-600 p-4">Date</th>
            <th className="border border-slate-600 p-4">Contest Name</th>
            <th className="border border-slate-600 p-4">Rank</th>
            <th className="border border-slate-600 p-4">Date</th>
            <th className="border border-slate-600 p-4">Contest Name</th>
            <th className="border border-slate-600 p-4">Rank</th>
            <th className="border border-slate-600 p-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ student, contests }, studentIndex) => {
            const maxRows = Math.max(contests.leetcode.length, contests.codechef.length);

            return Array.from({ length: maxRows }).map((_, rowIndex) => {
              const leetcodeContest = contests.leetcode[rowIndex] || {};
              const codechefContest = contests.codechef[rowIndex] || {};
              const codeforcesContest = contests.codeforces[rowIndex] || {};

              return (
                <tr key={`${studentIndex}-${rowIndex}`}>
                  {rowIndex === 0 && (
                    <>
                      <td rowSpan={maxRows} className="border font-bold border-slate-600 p-4">{student.roll}</td>
                      <td rowSpan={maxRows} className="border border-slate-600 p-4">{student.name}</td>
                    </>
                  )}
                  <td className="border border-slate-600 p-4">{leetcodeContest.contest?.title }</td>
                  <td className="border border-slate-600 p-4">{leetcodeContest.ranking }</td>
                  <td className="border border-slate-600 p-4">{leetcodeContest.problemsSolved }</td>
                  <td className="border border-slate-600 p-4">{leetcodeContest.totalProblems }</td>
                  <td className="border border-slate-600 p-4">
                    {leetcodeContest.contest ? new Date(leetcodeContest.contest.startTime * 1000).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }) : ' '}
                  </td>
                  <td className="border border-slate-600 p-4">{codechefContest.code || '-'}</td>
                  <td className="border border-slate-600 p-4">{codechefContest.rank || '-'}</td>
                  <td className="border border-slate-600 p-4">
                    {codechefContest.end_date ? codechefContest.end_date.split(' ')[0] : '-'}
                  </td>
                  <td className="border border-slate-600 p-4">{codeforcesContest.contestName || '-'}</td>
                  <td className="border border-slate-600 p-4">{codeforcesContest.rank || '-'}</td>
                  <td className="border border-slate-600 p-4">
                    {codeforcesContest.contestName ? new Date(codeforcesContest.ratingUpdateTimeSeconds*1000).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }) : ' '}
                  </td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LeetcodeTable;
