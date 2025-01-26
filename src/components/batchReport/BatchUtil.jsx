export function filterBatch(BatchData) {
    // console.log('BatchData: ', BatchData);
    let AllData = []
    BatchData.forEach(stu => {
        try {
            let lcRating = stu.leetcode.contests[stu.leetcode.contests.length - 1].performance.rating;
            let ccRating = stu.codechef.contests[stu.codechef.contests.length - 1].performance.rating;
            let cfRating = stu.codeforces.contests[stu.codeforces.contests.length - 1].performance.rating;
            // console.log(stu.leetcode.contests.length)
            // console.log('stu.leetcode.contests[stu.leetcode.contests.length - 1]: ', stu.leetcode.contests[stu.leetcode.contests.length - 1]);
            let data = {
                rollNo: stu.rollNo,
                name: stu.name,
                branch: stu.branch,
                year: stu.year,
                leetcode: {
                    TotalProblemsSolved: stu.leetcode.TotalProblemsSolved,
                    rating: lcRating,
                    contests: stu.leetcode.contests.length,
                    score: stu.leetcode.score,
                },
                codechef:{
                    TotalProblemsSolved: stu.codechef.TotalProblemsSolved,
                    rating: ccRating,
                    contests: stu.codechef.contests.length,
                    score: stu.codechef.score,
                },
                codeforces:{
                    TotalProblemsSolved: stu.codeforces.TotalProblemsSolved,
                    rating: cfRating,
                    contests: stu.codeforces.contests.length,
                    score: stu.codeforces.score,
                },
                interviewbit:{
                    TotalProblemsSolved:stu.interviewbit.TotalProblemsSolved,
                    platformScore:stu.interviewbit.platformScore,
                    score:stu.interviewbit.score,
                },
                totalScore: stu.totalScore,
                streak:stu.streak
            }
            AllData.push(data);
            
        } catch (err) {
            // console.log(stu.rollNo)
            AllData.push({
                rollNo: stu.rollNo,
                name: stu.name,
                branch: stu.branch,
                year: stu.year,
                leetcode: {
                    TotalProblemsSolved: stu.leetcode.TotalProblemsSolved,
                    rating: 0,
                    contests: 0,
                    score: stu.leetcode.score,
                },
                codechef:{
                    TotalProblemsSolved: stu.codechef.TotalProblemsSolved,
                    rating: 0,
                    contests: 0,
                    score: stu.codechef.score,
                },
                codeforces:{
                    TotalProblemsSolved: stu.codeforces.TotalProblemsSolved,
                    rating: 0,
                    contests: 0,
                    score: stu.codeforces.score,
                },
                interviewbit:{
                    TotalProblemsSolved:stu.interviewbit.TotalProblemsSolved,
                    platformScore:stu.interviewbit.platformScore,
                    score:stu.interviewbit.score,
                },
                totalScore: stu.totalScore,
                streak:stu.streak
            });
        }

    });
    return AllData;
}

export async function getYearsBranches(){
    try{
        const res = await fetch('https://v2contestinfo.onrender.com/v2/batch/getYearsBranches');
        const data = await res.json();
        return data;
    }catch(err){
        console.log(err);
        return {
            years:[],
            branches:[]
        }
    }
}