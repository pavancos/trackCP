// Get Student Info Data
async function fetchFromDB(setstudentsInfo) {
  let studentsDataFromAPI = await fetch(`https://getdata-contests.vercel.app/getAllData`);
  let studentsData = await studentsDataFromAPI.json();
  console.log('studentsData: ', studentsData);
  setstudentsInfo(studentsData);
  // console.log("useEffect Invoked");
}

// Getting Data of Batch 21
async function fetch21BatchData(setBatch21Data){
  let response= await fetch(`https://getdata-contests.vercel.app/getBatch21Data`);
  let data = await response.json();
  console.log("Batch 21 Data: ",data);
  setBatch21Data(data);
}

// Getting Data of Batch 22
async function fetch22BatchData(setBatch22Data) {
  let response = await fetch(`https://getdata-contests.vercel.app/getBatch22Data`);
  let data = await response.json();
  console.log("Batch 22 data: ",data);
  setBatch22Data(data);
}




export { fetchFromDB, fetch21BatchData, fetch22BatchData };