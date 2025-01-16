export function combineContests(StudentData){
    // console.log('StudentData: ', StudentData);
    let contests = [];
    let cnt = 0;
    // console.log('StudentData: ', StudentData);

    StudentData.leetcode.contests.forEach((con)=>{
        contests.push({
            key: cnt++,
            contestName: con.contest.contestName,
            date: con.contest.date,
            platform: "Leetcode",
            rating: con.performance.rating,
            rank: con.performance.rank,
            problemsSolved: con.performance.problemsSolved,
        });
    })    

    StudentData.codeforces.contests.forEach((con)=>{
        contests.push({
            key: cnt++,
            contestName: con.contest.contestName,
            date: con.contest.date,
            platform: "Codeforces",
            rating: con.performance.rating,
            rank: con.performance.rank,
            problemsSolved: con.performance.problemsSolved,
        });
    })
    StudentData.codechef.contests.forEach((con)=>{
        contests.push({
            key: cnt++,
            contestName: con.contest.contestName,
            date: con.contest.date,
            platform: "Codechef",
            rating: con.performance.rating,
            rank: con.performance.rank,
            problemsSolved: con.performance.problemsSolved,
        });
    })
    contests.sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split("-").map(Number);
        const [dayB, monthB, yearB] = b.date.split("-").map(Number);
        const dateA = new Date(`20${yearA}`, monthA - 1, dayA);
        const dateB = new Date(`20${yearB}`, monthB - 1, dayB);
    
        return dateB - dateA;
    });
    
    // console.log(contests);
    return contests;
}

// {
//     key: "1",
//     contestName: "Weekly Contest 379",
//     date: "2025-01-10",
//     platform: "Leetcode",
//     rating: 1500,
//     rank: 1,
//     problemsSolved: 4,
// },