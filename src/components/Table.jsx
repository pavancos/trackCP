import React from 'react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
function Table({ data, isStudentReport, filter }) {
  const [areAll, setAreAll] = useState('all');
  const [areLeetcode, setAreLeetcode] = useState();
  const [areCodechef, setAreCodechef] = useState();
  const [areCodeforces, setAreCodeforces] = useState();


  console.log('filter: ', filter);
  // console.log('data: ', data);
  // Function to format date
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const putToast = () => {
    toast.error('No Contests Found', {
      style: {
        marginTop: '-10px',
        marginBottom: '10px',
        borderRadius: '10px',
        background: '#fff',
        color: '#333',
      },
      iconTheme: {
        primary: '#333',
        secondary: '#fff',
      },
      icon: '🚫',
    });
  }

  useEffect(() => {
    let forOurSake = {
      leetcode: [],
      codechef: [],
      codeforces: [],
    };
  
    data.forEach((ele) => {
      let leetcode = ele.contests.leetcode;
      let codechef = ele.contests.codechef;
      let codeforces = ele.contests.codeforces;
      forOurSake.leetcode.push(...leetcode);
      forOurSake.codechef.push(...codechef);
      forOurSake.codeforces.push(...codeforces);
    });
  
    if (filter === 'leetcode') {
      setAreLeetcode(forOurSake.leetcode.length > 0);
      if (forOurSake.leetcode.length === 0) {
        putToast();
      }
    } else if (filter === 'codechef') {
      setAreCodechef(forOurSake.codechef.length > 0);
      if (forOurSake.codechef.length === 0) {
        putToast();
      }
    } else if (filter === 'codeforces') {
      setAreCodeforces(forOurSake.codeforces.length > 0);
      if (forOurSake.codeforces.length === 0) {
        putToast();
      }
    } else if (filter === 'all') {
      const hasContests = forOurSake.leetcode.length > 0 || forOurSake.codechef.length > 0 || forOurSake.codeforces.length > 0;
      setAreAll(hasContests);
      if (!hasContests) {
        putToast();
      }
    }
  }, [data, filter]);
  

  




  return (
    <>
      {
        ((filter === 'all' && areAll) || (filter === 'leetcode' && areLeetcode) || (filter === 'codechef' && areCodechef) || (filter === 'codeforces' && areCodeforces))
        && 


        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-slate-500 min-w-full">
            <thead className=''>
              <tr className='bg-[#e9edf4]'>
                {
                  !isStudentReport &&
                  <>
                    < th className="tableTd" rowSpan={2}>Roll.No</th>
                    <th className="tableTd" rowSpan={2}>Name</th>
                  </>
                }
                {
                  (filter === 'leetcode' || filter === 'all') &&
                  <th className="tableTd" colSpan={4}>Leetcode</th>
                }
                {
                  (filter === 'codechef' || filter === 'all') &&
                  <th className="tableTd" colSpan={4}>Codechef</th>
                }
                {
                  (filter === 'codeforces' || filter === 'all') &&
                  <th className="tableTd" colSpan={4}>Code Forces</th>
                }
              </tr>
              <tr className='bg-[#e9edf4]'>
                {
                  (filter === 'leetcode' || filter === 'all') &&
                  <>
                    <th className="tableTd">Contest Name</th>
                    <th className="tableTd">Rank</th>
                    <th className="tableTd">No of Problems Solved</th>
                    <th className="tableTd">Date</th>
                  </>
                }
                {
                  (filter === 'codechef' || filter === 'all') &&
                  <>
                    <th className="tableTd">Contest Name</th>
                    <th className="tableTd">Rank</th>
                    <th className="tableTd">No of Problems Solved</th>
                    <th className="tableTd">Date</th>
                  </>
                }
                {
                  (filter === 'codeforces' || filter === 'all') &&
                  <>
                    <th className="tableTd">Contest Name</th>
                    <th className="tableTd">Rank</th>
                    <th className="tableTd">No of Problems Solved</th>
                    <th className="tableTd">Date</th>
                  </>
                }
              </tr>
            </thead>
            <tbody>
              {
                data.map(({ student, contests }, studentIndex) => {
                  // each row will have max of leetcode, codechef, codeforces contests n.of rows
                  let maxRows = Math.max(contests.leetcode.length, contests.codechef.length, contests.codeforces.length);
                  if (filter === 'leetcode') {
                    maxRows = contests.leetcode.length;
                  } else if (filter === 'codechef') {
                    maxRows = contests.codechef.length;
                  } else if (filter === 'codeforces') {
                    maxRows = contests.codeforces.length;
                  }


                  // console.log(student)

                  return Array.from({ length: maxRows }).map((_, rowIndex) => {
                    const leetcodeContest = contests.leetcode[rowIndex] || {};
                    const codechefContest = contests.codechef[rowIndex] || {};
                    const codeforcesContest = contests.codeforces[rowIndex] || {};

                    const userBgColor = studentIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100';

                    return (
                      <tr key={`${studentIndex}-${rowIndex}`} className={userBgColor}>


                        {rowIndex === 0 && !isStudentReport && (
                          <>
                            <td rowSpan={maxRows} className="border font-bold border-slate-600 p-4">{student.roll}</td>
                            <td rowSpan={maxRows} className="tableTd">{student.name}</td>
                          </>
                        )}
                        {
                          (filter === 'leetcode' || filter === 'all') &&
                          <>
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
                          </>
                        }
                        {
                          (filter === 'codechef' || filter === 'all') &&
                          <>
                            <td className="tableTd">{codechefContest.name || '  '}</td>
                            <td className="tableTd">{codechefContest.rank || '  '}</td>
                            <td className="tableTd">{codechefContest.noOfProblems || '  '}</td>
                            <td className="tableTd">
                              {codechefContest.end_date ? formatDate(codechefContest.end_date.split(' ')[0]) : '-'}
                            </td>
                          </>
                        }
                        {
                          (filter === 'codeforces' || filter === 'all') &&
                          <>
                            <td className="tableTd">{codeforcesContest.contestName || '  '}</td>
                            <td className="tableTd">{codeforcesContest.rank || '  '}</td>
                            <td className='tableTd'>{codeforcesContest.problemsSolved || '  '}</td>
                            <td className="tableTd">
                              {
                                codeforcesContest.contestName ? new Date(codeforcesContest.ratingUpdateTimeSeconds * 1000).toLocaleDateString('en-IN', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                }) : ' '
                              }
                            </td>
                          </>
                        }
                      </tr>
                    );
                  });
                })}
            </tbody>
          </table>
        </div>
      }
    </>
  );
}

export default Table;
