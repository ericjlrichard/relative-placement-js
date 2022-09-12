let compResults = [
  {
    //uniqueID / bib number
    compID: 100,
    compName: "Bob and John",

    //it's implied that the first score is the head judge in case of a multiple perfect tie.
    scores: [2, 2, 4, 5, 3],

    //We will tabulate all majorities here. For clarity, we will leave index 0 blank, so placement will correspond to its index.
    tally : [-1],

    //corresponding to tally, determines if there's a majority at that position. Again, 0 index is blank and shouldn't be used.
    hasMajorityAt : [-1],

    //we will use this for the second tie breaker: adding up the total scores at placement.
    majoritySum: 0,

    //we will use this for the third tie breaker.
    nextPlacementOccurences: 0
  },

  {
    compID: 200,
    compName: "Tabi and Rogatien",
    scores: [1, 1, 2, 3, 4],
    tally : [-1],
    hasMajorityAt : [-1],
    majoritySum: 0,
    nextPlacementOccurences: 0
  },

  {
    compID: 5,
    compName: "Ghyslaine et Paul",
    scores: [4, 4, 2, 1, 1],
    tally : [-1],
    hasMajorityAt : [-1],
    majoritySum: 0,
    nextPlacementOccurences: 0
  },

  {
    compID: 8,
    compName: "Roger",
    scores: [5, 5, 5, 4, 2],
    tally : [-1],
    hasMajorityAt : [-1],
    majoritySum: 0,
    nextPlacementOccurences: 0
  },

  {
    compID: 34,
    compName: "Les tabarfucks",
    scores: [3, 2, 3, 2, 5],
    tally : [-1],
    hasMajorityAt : [-1],
    majoritySum: 0,
    nextPlacementOccurences: 0
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

//sister function of nbOfOccurences, calculates the sum of scores from 1 to place.
function sumOfScoreLine(scoreLine, place) {
  
  let sumScore = 0;

  for (let i=0; i < scoreLine.length; i++) {
    if (scoreLine[i] <= place) {
      sumScore += scoreLine[i];
    }
  }

  return sumScore;
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
  logArray(highestMajorityArray, "=====Highest Majority Array: ")

  for (i=0; i < tieArray.length; i++) {
    if (highestMajorityArray.indexOf(tieArray[i]) < 0) {
      losersArray.push(tieArray[i]);
    }
  }

  logArray(losersArray, "=====Losers Array: ");

  if (highestMajorityArray.length > 1) { //tie unresolved, this should order the highest majority array.
    highestMajorityArray = addUpMajority(highestMajorityArray, place);
  }

  //Took care of the winners, taking care of the losers. This should order the losers array. I think.
  if (losersArray.length > 1) {
    losersArray = breakTie(losersArray, place);
  }

  return highestMajorityArray.concat(losersArray);

}

//First tie breaker: adding majority scores up
function addUpMajority(tieArray, place) {
  console.log("==========Highest majority didn't work. Going to add up majority...");
  logArray(tieArray, `==========Array to add up majority at placement ${place}:`);

  losersArray = [];
  winnersArray = [];

  //We want to find the lowest score
  let lowestTotal = 999999999;
  let compObject = {};

  for (i=0; i<tieArray.length; i++) {
    compObject = tieArray[i];
    compObject.majoritySum = sumOfScoreLine(compObject.scores, place);
    if (compObject.majoritySum < lowestTotal) {
      lowestTotal = compObject.majoritySum;
    }
  }

  console.log(`==========Lowest total found: ${lowestTotal} `);

  for (i=0; i<tieArray.length; i++) {
    compObject = tieArray[i];
    //should be equal, but this makes sense to catch errors
    if (compObject.majoritySum == lowestTotal) {
      winnersArray.push(compObject);
    } else {
      losersArray.push(compObject);
    }
  }

  logArray(winnersArray, "==========Winners Array");
  logArray(losersArray, "==========Losers Array");
  if (winnersArray.length > 1) { //the tie breaker was ineffective. Resolving it first.
    winnersArray = goToNextPlacement(winnersArray, place);
  }

  if (losersArray.length > 1) { //Even if the winners are sorted, we have to sort the losers as well.
    losersArray = addUpMajority(losersArray, place);
  }

  return winnersArray.concat(losersArray);

}

//going to next placement looks deceptively like the highest majority, but they're not exactly the same. In one case a comp has a higher majority (11224, 22135). In the other they have the same majority (11233, 11245), and in this case the same addUp (otherwise for example (11233, 12233) would have been broken up by the Add Up tie breaker). That being said these would probably work as the same function, mathematically, but for clarity/logging purposes let'S keep them separate.

function goToNextPlacement(tieArray, place) { //third tie breaker, if sum of majority didn't work :(
  console.log("===============Adding up majority didn't work. Going to next placement...");

  let nextPlacement = place + 1;
  let biggerMajority = 0;

  let winnersArray = [];
  let losersArray = [];

  for (let i = 0; i < tieArray.length; i++) {
    tieArray[i].nextPlacementOccurences = nbOfOccurences(tieArray[i].scores, nextPlacement);

    if (tieArray[i].nextPlacementOccurences > biggerMajority) {
      biggerMajority = tieArray[i].nextPlacementOccurences;
    }
  }
  
  console.log(`===============Next majority placement at ${nextPlacement}: ${biggerMajority}`);

  for (let i = 0; i < tieArray.length; i++) {
    compObject = tieArray[i];

    if (compObject.nextPlacementOccurences == biggerMajority) {
      winnersArray.push(compObject);
    } else {
      losersArray.push(compObject);
    }
  }

  logArray(winnersArray, "Winners Array");
  logArray(losersArray, "Losers Array");

  if (winnersArray.length > 1) {   //if the tie wasn't resolved, we'Ll do next Placement again.
    winnersArray = goToNextPlacement(winnersArray, nextPlacement);
  }

  if (losersArray.length > 1) { //if there's a remaining tie, break that tie.
    losersArray = breakTie(losersArray, nextPlacement);
  }

  return winnersArray.concat(losersArray);

}