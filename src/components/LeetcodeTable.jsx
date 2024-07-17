// // import React from 'react';

// // function LeetcodeTable({ data }) {

// //   // async function getProblems()

// //   // Changing Date format for Codechef
// //   const formatDate = (dateString) => {
// //     const [year, month, day] = dateString.split('-');
// //     return `${day}/${month}/${year}`;
// //   };





// //   return (
// //     <div className="overflow-x-auto">
// //       <table className="table-auto border-collapse border border-slate-500 min-w-full">
// //         <thead>
// //           <tr>
// //             <th className="border border-slate-600 p-4" rowSpan={2}>Roll.No</th>
// //             <th className="border border-slate-600 p-4" rowSpan={2}>Name</th>
// //             <th className="border border-slate-600 p-4" colSpan={5}>Leetcode</th>
// //             <th className="border border-slate-600 p-4" colSpan={3}>Codechef</th>
// //             <th className="border border-slate-600 p-4" colSpan={3}>Code Forces</th>
// //           </tr>
// //           <tr>
// //             {/* <th className="border border-slate-600 p-4"></th>
// //             <th className="border border-slate-600 p-4"></th> */}
// //             <th className="border border-slate-600 p-4">Contest Name</th>
// //             <th className="border border-slate-600 p-4">Rank</th>
// //             <th className="border border-slate-600 p-4">No of Problems Solved</th>
// //             <th className="border border-slate-600 p-4">Total Problems</th>
// //             <th className="border border-slate-600 p-4">Date</th>
// //             <th className="border border-slate-600 p-4">Contest Name</th>
// //             <th className="border border-slate-600 p-4">Rank</th>
// //             <th className="border border-slate-600 p-4">Date</th>
// //             <th className="border border-slate-600 p-4">Contest Name</th>
// //             <th className="border border-slate-600 p-4">Rank</th>
// //             {/* <th className="border border-slate-600 p-4">No of Problems Solved</th>
// //             <th className="border border-slate-600 p-4">Total Problems</th> */}
// //             <th className="border border-slate-600 p-4">Date</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {data.map(({ student, contests }, studentIndex) => {
// //             const maxRows = Math.max(contests.leetcode.length, contests.codechef.length);

// //             return Array.from({ length: maxRows }).map((_, rowIndex) => {
// //               const leetcodeContest = contests.leetcode[rowIndex] || {};
// //               const codechefContest = contests.codechef[rowIndex] || {};
// //               const codeforcesContest = contests.codeforces[rowIndex] || {};

// //               return (
// //                 <tr key={`${studentIndex}-${rowIndex}`}>
// //                   {rowIndex === 0 && (
// //                     <>
// //                       <td rowSpan={maxRows} className="border font-bold border-slate-600 p-4">{student.roll}</td>
// //                       <td rowSpan={maxRows} className="border border-slate-600 p-4">{student.name}</td>
// //                     </>
// //                   )}
// //                   <td className="border border-slate-600 p-4">{leetcodeContest.contest?.title}</td>
// //                   <td className="border border-slate-600 p-4">{leetcodeContest.ranking}</td>
// //                   <td className="border border-slate-600 p-4">{leetcodeContest.problemsSolved}</td>
// //                   <td className="border border-slate-600 p-4">{leetcodeContest.totalProblems}</td>
// //                   <td className="border border-slate-600 p-4">
// //                     {leetcodeContest.contest ? new Date(leetcodeContest.contest.startTime * 1000).toLocaleDateString('en-IN', {
// //                       day: '2-digit',
// //                       month: '2-digit',
// //                       year: 'numeric'
// //                     }) : ' '}
// //                   </td>
// //                   <td className="border border-slate-600 p-4">{codechefContest.code || '-'}</td>
// //                   <td className="border border-slate-600 p-4">{codechefContest.rank || '-'}</td>
// //                   <td className="border border-slate-600 p-4">
// //                     {codechefContest.end_date ? formatDate(codechefContest.end_date.split(' ')[0]) : '-'}
// //                   </td>
// //                   <td className="border border-slate-600 p-4">{codeforcesContest.contestName || '-'}</td>
// //                   <td className="border border-slate-600 p-4">{codeforcesContest.rank || '-'}</td>
// //                   {/* <td className="border border-slate-600 p-4">{codeforcesContest.solved || '-'}</td>
// //                   <td className="border border-slate-600 p-4">{codeforcesContest.total || '-'}</td> */}
// //                   <td className="border border-slate-600 p-4">
// //                     {codeforcesContest.contestName ? new Date(codeforcesContest.ratingUpdateTimeSeconds * 1000).toLocaleDateString('en-IN', {
// //                       day: '2-digit',
// //                       month: '2-digit',
// //                       year: 'numeric'
// //                     }) : ' '}
// //                   </td>
// //                 </tr>
// //               );
// //             });
// //           })}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// // export default LeetcodeTable;

// // File: \trackCP\src\components\LeetcodeTable.jsx
// import React from 'react';
// import html2pdf from 'html2pdf.js';

// function LeetcodeTable({ data }) {

//   // Function to format date
//   const formatDate = (dateString) => {
//     const [year, month, day] = dateString.split('-');
//     return `${day}/${month}/${year}`;
//   };

//   // Function to generate and download PDF
//   const downloadPDF = () => {
//     const element = document.getElementById('table-to-pdf');
//     const options = {
//       margin: 0.5,
//       filename: 'table-data.pdf',
//       image: { type: 'jpeg', quality: 1 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'tabloid', orientation: 'landscape' }
//     };

//     html2pdf().from(element).set(options).save();
//   };

//   return (
//     <div className="overflow-x-auto">
//       {/* <button
//         onClick={downloadPDF}
//         className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         Download PDF
//       </button> */}
//       <div id="table-to-pdf">
//         <table className="table-auto border-collapse border border-slate-500 min-w-full">
//           <thead>
//             <tr>
//               <th className="border border-slate-600 p-4" rowSpan={2}>Roll.No</th>
//               <th className="border border-slate-600 p-4" rowSpan={2}>Name</th>
//               <th className="border border-slate-600 p-4" colSpan={5}>Leetcode</th>
//               <th className="border border-slate-600 p-4" colSpan={3}>Codechef</th>
//               <th className="border border-slate-600 p-4" colSpan={3}>Code Forces</th>
//             </tr>
//             <tr>
//               <th className="border border-slate-600 p-4">Contest Name</th>
//               <th className="border border-slate-600 p-4">Rank</th>
//               <th className="border border-slate-600 p-4">No of Problems Solved</th>
//               <th className="border border-slate-600 p-4">Total Problems</th>
//               <th className="border border-slate-600 p-4">Date</th>
//               <th className="border border-slate-600 p-4">Contest Name</th>
//               <th className="border border-slate-600 p-4">Rank</th>
//               <th className="border border-slate-600 p-4">Date</th>
//               <th className="border border-slate-600 p-4">Contest Name</th>
//               <th className="border border-slate-600 p-4">Rank</th>
//               <th className="border border-slate-600 p-4">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map(({ student, contests }, studentIndex) => {
//               const maxRows = Math.max(contests.leetcode.length, contests.codechef.length);

//               return Array.from({ length: maxRows }).map((_, rowIndex) => {
//                 const leetcodeContest = contests.leetcode[rowIndex] || {};
//                 const codechefContest = contests.codechef[rowIndex] || {};
//                 const codeforcesContest = contests.codeforces[rowIndex] || {};

//                 const rowBgColor = rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100';

//                 return (
//                   // <tr key={`${studentIndex}-${rowIndex}` }>
//                   <tr key={`${studentIndex}-${rowIndex}`} className={rowBgColor}> 
//                     {rowIndex === 0 && (
//                       <>
//                         <td rowSpan={maxRows} className="border font-bold border-slate-600 p-4">{student.roll}</td>
//                         <td rowSpan={maxRows} className="border border-slate-600 p-4">{student.name}</td>
//                       </>
//                     )}
//                     <td className="border border-slate-600 p-4">{leetcodeContest.contest?.title}</td>
//                     <td className="border border-slate-600 p-4">{leetcodeContest.ranking}</td>
//                     <td className="border border-slate-600 p-4">{leetcodeContest.problemsSolved}</td>
//                     <td className="border border-slate-600 p-4">{leetcodeContest.totalProblems}</td>
//                     <td className="border border-slate-600 p-4">
//                       {leetcodeContest.contest ? new Date(leetcodeContest.contest.startTime * 1000).toLocaleDateString('en-IN', {
//                         day: '2-digit',
//                         month: '2-digit',
//                         year: 'numeric'
//                       }) : ' '}
//                     </td>
//                     <td className="border border-slate-600 p-4">{codechefContest.code || '-'}</td>
//                     <td className="border border-slate-600 p-4">{codechefContest.rank || '-'}</td>
//                     <td className="border border-slate-600 p-4">
//                       {codechefContest.end_date ? formatDate(codechefContest.end_date.split(' ')[0]) : '-'}
//                     </td>
//                     <td className="border border-slate-600 p-4">{codeforcesContest.contestName || '-'}</td>
//                     <td className="border border-slate-600 p-4">{codeforcesContest.rank || '-'}</td>
//                     <td className="border border-slate-600 p-4">
//                       {codeforcesContest.contestName ? new Date(codeforcesContest.ratingUpdateTimeSeconds * 1000).toLocaleDateString('en-IN', {
//                         day: '2-digit',
//                         month: '2-digit',
//                         year: 'numeric'
//                       }) : ' '}
//                     </td>
//                   </tr>
//                 );
//               });
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default LeetcodeTable;
import React from 'react';
import html2pdf from 'html2pdf.js';

function LeetcodeTable({ data }) {

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
          <thead>
            <tr>
              <th className="border border-slate-600 p-4" rowSpan={2}>Roll.No</th>
              <th className="border border-slate-600 p-4" rowSpan={2}>Name</th>
              <th className="border border-slate-600 p-4" colSpan={5}>Leetcode</th>
              <th className="border border-slate-600 p-4" colSpan={3}>Codechef</th>
              <th className="border border-slate-600 p-4" colSpan={3}>Code Forces</th>
            </tr>
            <tr>
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
                    <td className="border border-slate-600 p-4">{leetcodeContest.totalProblems}</td>
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
                      {codechefContest.end_date ? formatDate(codechefContest.end_date.split(' ')[0]) : '-'}
                    </td>
                    <td className="border border-slate-600 p-4">{codeforcesContest.contestName || '-'}</td>
                    <td className="border border-slate-600 p-4">{codeforcesContest.rank || '-'}</td>
                    <td className="border border-slate-600 p-4">
                      {codeforcesContest.contestName ? new Date(codeforcesContest.ratingUpdateTimeSeconds * 1000).toLocaleDateString('en-IN', {
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
    </div>
  );
}

export default LeetcodeTable;
