const data = [
    {
      "student": {
        "_id": "66a7c74963545808244cea77",
        "roll": "22501A05J2",
        "name": "Phani Sirisha Veeranki"
        
      },
      "contests": {
        "leetcode": [
          {
            "attended": true,
            "rating": 1244.548,
            "ranking": 22289,
            "trendDirection": "DOWN",
            "problemsSolved": 1,
            "totalProblems": 4,
            "finishTimeInSeconds": 1501,
            "contest": {
              "title": "Weekly Contest 408",
              "startTime": 1722133800
            }
          }
        ],
        "codeforces": [
          {
            "contestId": 1997,
            "contestName": "Educational Codeforces Round 168 (Rated for Div. 2)",
            "handle": "veerankisirisha",
            "rank": 18559,
            "ratingUpdateTimeSeconds": 1722357300,
            "oldRating": 785,
            "newRating": 789,
            "problemsSolved": 0
          },
          {
            "contestId": 1996,
            "contestName": "Codeforces Round 962 (Div. 3)",
            "handle": "veerankisirisha",
            "rank": 22314,
            "ratingUpdateTimeSeconds": 1722013500,
            "oldRating": 723,
            "newRating": 785,
            "problemsSolved": 1
          }
        ]
      }
    },
    {
      "student": {
        "_id": "66a2fbd43ea9bdb0743ae143",
        "roll": "22501A05J8",
        "name": "Eswar Aditya Yarlagadda"
      },
      "contests": {
        "leetcode": [
          {
            "attended": true,
            "rating": 1392.145,
            "ranking": 8702,
            "trendDirection": "UP",
            "problemsSolved": 2,
            "totalProblems": 4,
            "finishTimeInSeconds": 2964,
            "contest": {
              "title": "Weekly Contest 408",
              "startTime": 1722133800
            }
          }
        ],
        "codeforces": [
          {
            "contestId": 1996,
            "contestName": "Codeforces Round 962 (Div. 3)",
            "handle": "eswar1357",
            "rank": 23113,
            "ratingUpdateTimeSeconds": 1722013500,
            "oldRating": 726,
            "newRating": 679,
            "problemsSolved": 1
          }
        ]
      }
    }
  ];
  
  function convertToCSV(data) {
    const headers = [
      'student_id', 'student_roll', 'student_name', 
      'contest_type', 'contest_title', 'contest_startTime', 
      'attended', 'rating', 'ranking', 'trendDirection', 
      'problemsSolved', 'totalProblems', 'finishTimeInSeconds', 
      'contestId', 'contestName', 'handle', 'rank', 
      'ratingUpdateTimeSeconds', 'oldRating', 'newRating'
    ];
  
    const rows = data.flatMap(student => {
      const studentId = student.student._id;
      const studentRoll = student.student.roll;
      const studentName = student.student.name;
  
      const leetcodeRows = (student.contests.leetcode || []).map(contest => ({
        student_id: studentId,
        student_roll: studentRoll,
        student_name: studentName,
        contest_type: 'leetcode',
        contest_title: contest.contest.title,
        contest_startTime: contest.contest.startTime,
        attended: contest.attended,
        rating: contest.rating,
        ranking: contest.ranking,
        trendDirection: contest.trendDirection,
        problemsSolved: contest.problemsSolved,
        totalProblems: contest.totalProblems,
        finishTimeInSeconds: contest.finishTimeInSeconds,
        contestId: '',
        contestName: '',
        handle: '',
        rank: '',
        ratingUpdateTimeSeconds: '',
        oldRating: '',
        newRating: ''
      }));
  
      const codeforcesRows = (student.contests.codeforces || []).map(contest => ({
        student_id: studentId,
        student_roll: studentRoll,
        student_name: studentName,
        contest_type: 'codeforces',
        contest_title: '',
        contest_startTime: '',
        attended: '',
        rating: '',
        ranking: '',
        trendDirection: '',
        problemsSolved: contest.problemsSolved,
        totalProblems: '',
        finishTimeInSeconds: '',
        contestId: contest.contestId,
        contestName: contest.contestName,
        handle: contest.handle,
        rank: contest.rank,
        ratingUpdateTimeSeconds: contest.ratingUpdateTimeSeconds,
        oldRating: contest.oldRating,
        newRating: contest.newRating
      }));
  
      return [...leetcodeRows, ...codeforcesRows];
    });
  
    const csv = [
      headers.join(','),
      ...rows.map(row => headers.map(header => row[header] || '').join(','))
    ].join('\n');
  
    return csv;
  }
  
  const csvString = convertToCSV(data);
  console.log(csvString);
  