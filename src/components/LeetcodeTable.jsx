import React from 'react';

function LeetcodeTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-slate-500 min-w-full">
        <thead>
          <tr>
            <th className="border border-slate-600 p-4">Roll.No</th>
            <th className="border border-slate-600 p-4">Name</th>
            <th className="border border-slate-600 p-4">Contest Name</th>
            <th className="border border-slate-600 p-4">Rank</th>
            {/* <th className="border border-slate-600 p-4">Attended</th> */}
            <th className="border border-slate-600 p-4">No of Problems Solved</th>
            <th className="border border-slate-600 p-4">Total Problems</th>
            <th className="border border-slate-600 p-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ student, contests }, studentIndex) =>
            contests.map((contest, contestIndex) => (
              <tr key={`${studentIndex}-${contestIndex}`}>
                {contestIndex === 0 && (
                  <>
                    <td rowSpan={contests.length} className="border border-slate-600 p-4">{student.roll}</td>
                    <td rowSpan={contests.length} className="border border-slate-600 p-4">{student.name}</td>
                  </>
                )}
                <td className="border border-slate-600 p-4">{contest.contest.title}</td>
                <td className="border border-slate-600 p-4">{contest.ranking}</td>
                {/* <td className="border border-slate-600 p-4">{contest.attended ? 'Yes' : 'No'}</td> */}
                <td className="border border-slate-600 p-4">{contest.problemsSolved}</td>
                <td className="border border-slate-600 p-4">{contest.totalProblems}</td>
                <td className="border border-slate-600 p-4">
                  {new Date(contest.contest.startTime * 1000).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeetcodeTable;
