function getTopContests(contests){
    if(contests.length>=5){
        let tempcontests= contests.map((cont)=>{
            return cont.contest;
        })
        return tempcontests.slice(0,5);
    }else{
        let tempcontests= contests.map((cont)=>{
            return cont.contest;
        })
        return tempcontests;
        // If the contests are 0, we have to handle in the component
    }
}

function getTopPlatform(contests){
    let codeforces = 0;
    let codechef = 0;
    let leetcode = 0;
    contests.forEach((cont)=>{
        if(cont.platform === 'Codeforces'){
            codeforces++;
        }else if(cont.platform === "Codechef"){
            codechef++;
        }else if(cont.platform === "Leetcode"){
            leetcode++;
        }
    })
    let topplatformsArr = [
        { platform: 'codechef', length: codechef },
        { platform: 'codeforces', length: codeforces },
        { platform: 'leetcode', length: leetcode }
    ]
    topplatformsArr.sort((a, b) => b.length - a.length)
    return topplatformsArr;
}

function getProblemsSolved(contests){
    let problemsSolved = 0;
    contests.forEach((con)=>{
        problemsSolved+=con.problem;
    })
    return problemsSolved;
}
export {
    getTopContests,
    getTopPlatform,
    getProblemsSolved
};