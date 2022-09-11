let compResults = [
  {
    //uniqueID / bib number
    compID: 100,
    compName: "Bob and John",
    scores: [1, 1, 4, 1, 5],

    //We will tabulate all majorities here. For clarity, we will leave index 0 blank, so placement will correspond to its index.
    tally : [-1],

    //corresponding to tally, determines if there's a majority at that position
    hasMajorityAt : [-1]
  },

  {
    compID: 200,
    compName: "Tabi and Rogatien",
    scores: [2, 3, 2, 3, 2],
    tally : [-1],
    
    hasMajorityAt : [-1]
  },

  {
    compID: 5,
    compName: "Ghyslaine et Paul",
    scores: [4, 4, 3, 5, 4],
    tally : [-1],
    
    hasMajorityAt : [-1]
  
  },

  {
    compID: 8,
    compName: "Roger",
    scores: [5, 5, 5, 4, 3],
    tally : [-1],
    
    hasMajorityAt : [-1]
  
  },

  {
    compID: 34,
    compName: "Les tabarfucks",
    scores: [3, 2, 1, 2, 1],
    tally : [-1],
    
    hasMajorityAt : [-1]
  }

];

runRelativePlacementRedux(compResults);

function logArray(arrayToLog, msg = "Logging Array") {
  console.log(msg, `Length: ${arrayToLog.length}`);
  for (i=0; i < arrayToLog.length; i++) {
    console.log(arrayToLog[i]);
  }
}

function runRelativePlacementRedux(resultsArray)
{

  //We will use this as the current looped instance to make things more readable.
  let compObject;
  let nbOfJudges = resultsArray[0].scores.length;
  let majorityArray = [];

  let winnersArray = [];

  //Populate tally. For each competitor, we will tally their complete results. Saves us time in the end.
  for (comp=0; comp < resultsArray.length; comp++) {

    compObject = resultsArray[comp];

    //for each alloted placement, we tally the occurences.
    for (place=1; place <= resultsArray.length; place++) {
      compObject.tally.push(nbOfOccurences(compObject.scores, place));
      compObject.hasMajorityAt.push(nbOfOccurences(compObject.scores, place) >= (nbOfJudges / 2));
    }
  }

  console.log("Tally finished! - ", resultsArray);

  //Time to sort folks! For each placement we will cycle again.
  for (place=1; place < resultsArray[0].tally.length; place++) {
    console.log(`Going through placement ${place}...`)

    for (comp=0; comp < resultsArray.length; comp++) {
      compObject = resultsArray[comp];

      if ((compObject.hasMajorityAt[place]) && (winnersArray.indexOf(compObject) < 0)) {
        majorityArray.push(compObject);
      }
    }

    switch(majorityArray.length) {
      case 0:
        console.log(`No majority found at placement ${place}. Moving on...`);
        break;

      case 1:
        console.log(`Single majority found at placement ${place}! Placing competitor and continuing...`);
        winnersArray.push(majorityArray.pop());
        logArray(winnersArray, "Winners so far: ")
        break;

      default:
        console.log(`${majorityArray.length} competitors have a majority at placement ${place}. Going to tie breaker with`);
        logArray(majorityArray, "These folks!");
        majorityArray = breakTie(majorityArray, place);
        logArray(majorityArray, "Resolved ties:");

        for (i=0; i < majorityArray.length; i++) {
          winnersArray.push(majorityArray[i]);
        }
        majorityArray = [];
    }

  }

  logArray(winnersArray);

  return winnersArray;
  
}

//for each comp we calculate the number of occurences between 1 and place
function nbOfOccurences(scoreLine, place) {
  
  let counter = 0;

  for (let i=0; i < scoreLine.length; i++) {
    if (scoreLine[i] <= place) {
      counter++;
    }
  }

  return counter;
}

//should return a sorted array of the tie.
function breakTie(tieArray, place) {

  //First Tie Breaker: biggest majority
  return checkHighestMajority(tieArray, place);
}

//returns an array containing the comps that have a highest majority
function checkHighestMajority(tieArray, place) {
  let highestMajorityArray = [];

  //I don't think they're losers! They just lost that tie!
  let losersArray = [];
  let highestMajority = 0;

  for(i=0; i < tieArray.length; i++) {

    if (tieArray[i].tally[place] > highestMajority) {

      highestMajority = tieArray[i].tally[place];
      highestMajorityArray = []; //a new highest majority means everyone previously in, isn't anymore.
      highestMajorityArray.push(tieArray[i]);

    } else if (tieArray[i].tally[place] == highestMajority) {

      highestMajorityArray.push(tieArray[i]);

    }
      
  }

  console.log (`=====Highest majority determined: ${highestMajority}.`);
  logArray(highestMajorityArray, "Highest Majority Array: ")

  for (i=0; i < tieArray.length; i++) {
    if (highestMajorityArray.indexOf(tieArray[i]) < 0) {
      losersArray.push(tieArray[i]);
    }
  }

  logArray(losersArray, "Losers Array: ");

  if (highestMajorityArray.length > 1) { //tie unresolved, this should order the highest majority array.
    highestMajorityArray = goToNextPlacement(highestMajorityArray, place);
  }

  //Took care of the winners, taking care of the losers. This should order the losers array.
  if (losersArray.length > 1) {
    losersArray = breakTie(losersArray, place);
  }

  return highestMajorityArray.concat(losersArray);

}

function goToNextPlacement(tieArray, place) {
  console.log("=====Highest majority didn't work. Going to next placement...");

}