import React, { useState } from 'react';


async function getUniqueContests(filteredContests, setUniqueCodechefContestNames, setUniqueLeetcodeContestNames, setUniqueCodeforcesContestNames, setUniqueContests,setLeetcodeParticipants,setCodechefParticipants,setCodeforcesParticipants) {

    let codechefContestsNames = await getCodechefUniqueContests(filteredContests);
    // console.log('codechefContestsNames: ', codechefContestsNames);
    let leetcodeContestsNames = await getLeetcodeUniqueContests(filteredContests);
    // console.log('leetcodeContestsNames: ', leetcodeContestsNames);
    let codeforcesContestsNames = await getCodeforcesUniqueContests(filteredContests);
    // console.log('codeforcesContestsNames: ', codeforcesContestsNames);


    // setUniqueCodechefContestNames(Array.from(codechefContestsNames));
    // setUniqueLeetcodeContestNames(Array.from(leetcodeContestsNames));
    // setUniqueCodeforcesContestNames(Array.from(codeforcesContestsNames));

    let codechefContestNamesArray = Array.from(codechefContestsNames);
    let leetcodeContestNamesArray = Array.from(leetcodeContestsNames);
    let codeforcesContestNamesArray = Array.from(codeforcesContestsNames);
    setUniqueCodechefContestNames(codechefContestNamesArray);
    setUniqueLeetcodeContestNames(leetcodeContestNamesArray);
    setUniqueCodeforcesContestNames(codeforcesContestNamesArray);
    let codechefContests = [];
    let leetcodeContests = [];
    let codeforcesContests = [];

    for (let i = 0; i < codechefContestNamesArray.length; i++) {
        codechefContests.push({
            contest: {
                title: codechefContestNamesArray[i]
            }
        });
    }

    for (let i = 0; i < leetcodeContestNamesArray.length; i++) {
        leetcodeContests.push({
            contest: {
                title: leetcodeContestNamesArray[i]
            }
        });
    }

    for (let i = 0; i < codeforcesContestNamesArray.length; i++) {
        codeforcesContests.push({
            contest: {
                title: codeforcesContestNamesArray[i]
            }
        });
    }
    // leetcodeContests[0].contest.title
    // leetcodeContests[0].contest.participants



    // console.log('codechefContests: ', codechefContests);
    // console.log('leetcodeContests: ', leetcodeContests);
    // console.log('codeforcesContests: ', codeforcesContests);
    const newUniqueContests = {
        leetcode: leetcodeContests,
        codechef: codechefContests,
        codeforces: codeforcesContests
    }
    // console.log('newUniqueContests: ', newUniqueContests);
    await getLeetcodeParticipants(filteredContests, newUniqueContests, leetcodeContests,setLeetcodeParticipants);
    await getCodechefParticipants(filteredContests, newUniqueContests, codechefContests, setCodechefParticipants);
    await getCodeforcesParticipants(filteredContests, newUniqueContests, codeforcesContests, setCodeforcesParticipants);
    // console.log('newUniqueContests: ', newUniqueContests);
    
    setUniqueContests(newUniqueContests);
}

// uniqueContests.leetcode[0].contest.title
// uniqueContests.codechef[0].contest.paticipants

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

async function getLeetcodeParticipants(filteredContests, newUniqueContests, leetcodeContests, setLeetcodeParticipants) {
    // console.log('leetcodeContests: ', leetcodeContests);
    // console.log('newUniqueContests: ', newUniqueContests);
    // console.log('filteredContests: ', filteredContests);
    let newLeetcodeContests = leetcodeContests.map((cont) => {
        // console.log('cont: ', cont);
        let participation = [];
        let contestTitle = cont.contest.title;
        for (let i = 0; i < filteredContests.length; i++) {
            if (filteredContests[i].contests.leetcode != []) {
                let filteredLeetcodeContests = filteredContests[i].contests.leetcode;
                // console.log('filteredLeetcodeContests: ', filteredLeetcodeContests);
                // console.log('filteredLeetcodeContests: ', filteredLeetcodeContests);
                let student = filteredContests[i].student;
                let leetcodeUsername = student.leetcode.username;
                // console.log('leetcodeUsername: ', leetcodeUsername);
                let studentData = {
                    name: student.name,
                    roll: student.roll,
                    username: leetcodeUsername,
                    performance: {}
                }
                // console.log('studentData: ', studentData);
                let contestPerformance = filteredLeetcodeContests.filter((c) => c.contest.title === contestTitle);
                if (contestPerformance.length > 0) {
                    studentData.performance = contestPerformance[0];
                    participation.push(studentData);
                }

            }
        }
        return {
            contest: {
                title: contestTitle,
                participants: participation
            }
        }
    })
    // console.log('newLeetcodeContests: ', newLeetcodeContests);
    setLeetcodeParticipants(newLeetcodeContests);
    newUniqueContests.leetcode = newLeetcodeContests;
}

async function getCodechefParticipants(filteredContests, newUniqueContests, codechefContests, setCodechefParticipants){
    let newCodechefContests = codechefContests.map((cont)=>{
        let participation = [];
        let contestTitle = cont.contest.title;
        // console.log('contestTitle: ', contestTitle);
        for(let i=0;i<filteredContests.length;i++){
            if(filteredContests[i].contests.codechef != [] && filteredContests[i].student.codechef != null ){
                // console.log('filteredContests[i].contests.codechef: ', filteredContests[i].contests.codechef);
                let filteredCodechefContests = filteredContests[i].contests.codechef;
                let student = filteredContests[i].student;
                let codechefUsername = student.codechef.username;
                let studentData = {
                    name: student.name,
                    roll: student.roll,
                    username: codechefUsername,
                    performance: {}
                }
                let contestPerformance = filteredCodechefContests.filter((c)=>c.name === contestTitle);
                if(contestPerformance.length > 0){
                    studentData.performance = contestPerformance[0];
                    participation.push(studentData);
                }
            }
        }
        return{
            contest:{
                title: contestTitle,
                participants: participation
            }
        }
        
    })
    // console.log('newCodechefContests: ', newCodechefContests);
    setCodechefParticipants(newCodechefContests);
    newUniqueContests.codechef = newCodechefContests;
}

async function getCodeforcesParticipants(filteredContests, newUniqueContests, codeforcesContests){
    let newCodeforcesContests = codeforcesContests.map((cont)=>{
        let participation = [];
        let contestTitle = cont.contest.title;
        for(let i=0;i<filteredContests.length;i++){
            if(filteredContests[i].contests.codeforces != []){
                let filteredCodeforcesContests = filteredContests[i].contests.codeforces;
                let student = filteredContests[i].student;
                let codeforcesUsername = student.codeforces.username;
                let studentData = {
                    name: student.name,
                    roll: student.roll,
                    username: codeforcesUsername,
                    performance: {}
                }
                let contestPerformance = filteredCodeforcesContests.filter((c)=>c.contestName === contestTitle);
                if(contestPerformance.length > 0){
                    studentData.performance = contestPerformance[0];
                    participation.push(studentData);
                }
            }
        }
        return{
            contest:{
                title: contestTitle,
                participants: participation
            }
        }
    })
    // console.log('newCodeforcesContests: ', newCodeforcesContests);
    newUniqueContests.codeforces = newCodeforcesContests;
}


export { getUniqueContests };