async function fetchFromDB(setstudentsInfo) {
    let studentsDataFromAPI = await fetch(`https://getdata-contests.vercel.app/getAllData`);
    let studentsData = await studentsDataFromAPI.json();
    console.log('studentsData: ', studentsData);
    setstudentsInfo(studentsData);
    // console.log("useEffect Invoked");
  }

export {fetchFromDB};