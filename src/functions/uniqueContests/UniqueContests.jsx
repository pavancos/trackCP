import React, { useState } from 'react';


async function getUniqueContests(filteredContests, setUniqueCodechefContestNames, setUniqueLeetcodeContestNames, setUniqueCodeforcesContestNames, setUniqueContests) {

    let codechefContestsNames = await getCodechefUniqueContests(filteredContests);
    console.log('codechefContestsNames: ', codechefContestsNames);
    let leetcodeContestsNames = await getLeetcodeUniqueContests(filteredContests);
    console.log('leetcodeContestsNames: ', leetcodeContestsNames);
    let codeforcesContestsNames = await getCodeforcesUniqueContests(filteredContests);
    console.log('codeforcesContestsNames: ', codeforcesContestsNames);


    setUniqueCodechefContestNames(Array.from(codechefContestsNames));
    setUniqueLeetcodeContestNames(Array.from(leetcodeContestsNames));
    setUniqueCodeforcesContestNames(Array.from(codeforcesContestsNames));

    let codechefContestNamesArray = Array.from(codechefContestsNames);
    let leetcodeContestNamesArray = Array.from(leetcodeContestsNames);
    let codeforcesContestNamesArray = Array.from(codeforcesContestsNames); 

    let codechefContests = [];
    let leetcodeContests = [];
    let codeforcesContests = [];

    for(let i=0; i<codechefContestNamesArray.length; i++){
        codechefContests.push({
            contest: {
                title: codechefContestNamesArray[i]
            }
        });
    }

    for(let i=0; i<leetcodeContestNamesArray.length; i++){
        leetcodeContests.push({
            contest: {
                title: leetcodeContestNamesArray[i]
            }
        });
    }

    for(let i=0; i<codeforcesContestNamesArray.length; i++){
        codeforcesContests.push({
            contest: {
                title: codeforcesContestNamesArray[i]
            }
        });
    }
    // console.log('codechefContests: ', codechefContests);
    // console.log('leetcodeContests: ', leetcodeContests);
    // console.log('codeforcesContests: ', codeforcesContests);
    const newUpcomingContests= {
        leetcode: leetcodeContests,
        codechef: codechefContests,
        codeforces: codeforcesContests
    }
    console.log('newUpcomingContests: ', newUpcomingContests);
    return newUpcomingContests;
}

async function getCodechefUniqueContests(filteredContests) {
    let newFilteredContests = filteredContests.map((contest) => {
        return {
            contests: contest.contests.codechef
        }
    });
    // console.log('newFilteredContests: ', newFilteredContests);

    let uniqueCodeChefContests = new Set();
    for (let i = 0; i < newFilteredContests.length; i++) {
        for (let j = 0; j < newFilteredContests[i].contests.length; j++) {
            uniqueCodeChefContests.add(newFilteredContests[i].contests[j].name);
        }
    }

    return uniqueCodeChefContests;
    // console.log('uniqueCodeChefContests: ', uniqueCodeChefContests);
}

async function getLeetcodeUniqueContests(filteredContests) {
    let newFilteredContests = filteredContests.map((contest) => {
        return {
            contests: contest.contests.leetcode
        }
    });
    // console.log('newFilteredContests: ', newFilteredContests);

    let uniqueLeetcodeContests = new Set();
    for (let i = 0; i < newFilteredContests.length; i++) {
        for (let j = 0; j < newFilteredContests[i].contests.length; j++) {
            uniqueLeetcodeContests.add(newFilteredContests[i].contests[j].contest.title);
        }
    }
    return uniqueLeetcodeContests;
    // console.log('uniqueLeetcodeContests: ', uniqueLeetcodeContests);
}

async function getCodeforcesUniqueContests(filteredContests) {
    let newFilteredContests = filteredContests.map((contest) => {
        return {
            contests: contest.contests.codeforces
        }
    });
    // console.log('newFilteredContests: ', newFilteredContests);

    let uniqueCodeforcesContests = new Set();
    for (let i = 0; i < newFilteredContests.length; i++) {
        for (let j = 0; j < newFilteredContests[i].contests.length; j++) {
            uniqueCodeforcesContests.add(newFilteredContests[i].contests[j].contestName);
        }
    }
    // console.log('uniqueCodeforcesContests: ', uniqueCodeforcesContests);
    return uniqueCodeforcesContests;
}

export { getUniqueContests };