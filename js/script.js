let compResults = [
  {
    compID: 100,
    compName: "Bob and John",
    scores: [1, 1, 4, 1, 2],

    //We will tabulate all majorities here. For clarity, we will leave index 0 blank, so placement will correspond to its index.
    tally : [-1],

    //corresponding to tally, determines if there's a majority at that position
    hasMajorityAt : [-1]
  },

  {
    compID: 200,
    compName: "Tabitha and Rogatien",
    scores: [2, 2, 2, 3, 5],
    tally : [-1],
    
    hasMajorityAt : [-1]
  },

  {
    compID: 5,
    compName: "Ghyslaine et Paul",
    scores: [4, 4, 1, 5, 4],
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
    scores: [3, 3, 3, 2, 1],
    tally : [-1],
    
    hasMajorityAt : [-1]
  }

];

// for (c=0; c < compResults.length; c++) {
//   console.log (compResults[c], nbOfOccurences(compResults[c].scores, 5));
// }

runRelativePlacementRedux(compResults);

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
        console.log("Winners so far: ", winnersArray);
        break;
      default:
        console.log(`${majorityArray.length} competitors have a majority at placement ${place}. Going to tie breaker with`);
    }
  }

  for (i=0; i < winnersArray.length; i++) {
    console.log(winnersArray[i]);
  }
  
  return winnersArray;
  
}

function runRelativePlacement(resultsArray) {

  //for each placement we will put the scores here to see if tie breakers are necessary
  let majorityArray = [];

  //Once we determine a winner, we will push them here
  let winnersArray = [];

  //when a competitor has been placed, we will put their index here to ensure they don't get counted again.
  let placedArray = [];

  //number of columns of scoring.
  let nbOfJudges = resultsArray[0].scores.length;

  //for clarity purposes we use two variables. this one goes throught the placements 1st through last.
  for(let place=1; place <= resultsArray.length; place++) { //results.length; place++) {

    //this loop goes through the competitors list itself! For each position, we will iterate the list and check if we have a majority.
    for (let comp=0; comp < resultsArray.length; comp++) {

      let compObject = resultsArray[comp];

      //If they have a majority AND have not already been placed, add them to majority list.
      if ((nbOfOccurences(compObject.scores, place) > (nbOfJudges / 2)) && (placedArray.indexOf(comp) < 0)) {
        majorityArray.push(compObject);
        //pushing the index of the future competitor(s) in the placed array.
        placedArray.push(comp);
      }

    } //end results loop
    
    console.log(`majorityArray after ${place}: `);

    for (let k=0; k < majorityArray.length; k++) {
      console.log(majorityArray[k]);
    }

    switch(majorityArray.length) {
      case 0:
        console.log (`No majority at ${place}, going to next placement`)
        break;
      case 1:
        console.log (`Majority of 1 at ${place} for ${majorityArray[0].compName} - putting them in the Winners list`);

        //a pop would achieve the same results
        winnersArray.push (majorityArray.shift());
        break;
      default:
        //Tie!
        console.log (`Tie of ${majorityArray.length} at ${place} - going to tie break`);
        breakTie(majorityArray, place);

    }
  

  } //end placement loop

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

//goes through the classic tie-breakers
function breakTie(tieArray, place) {
  console.log(`=====Hello! I've been asked to break a tie at ${place}!`);

  console.log(`=====First tie breaker: bigger majority`);

  let higherMajority = 0;
  let nbMajority = 0;

  let tieBreakWinners = [];

  let higherMajorityArray = [];

  //finding the highest majority
  for (let j=0; j < tieArray.length; j++) {
    console.log (`=====checking ${tieArray[j].compName} `);
    nbMajority = nbOfOccurences(tieArray[j].scores, place);

        if (nbMajority >= higherMajority) {
          higherMajority= nbMajority;
        }
  }

  console.log(`=====higher Majority determined - ${higherMajority}`);

  //adding those who have the higher majority to higherMajorityWinners
  for (let j=0; j< tieArray.length; j++) {
    nbMajority = nbOfOccurences(tieArray[j].scores, place);
    console.log (`=====nbMajority for ${tieArray[j].compName} - ${nbMajority}`);

    if (nbMajority == higherMajority ) {
      higherMajorityArray.push(tieArray.splice[j, 1]);
    }
  }

  console.log(`===== higher Majority at ${higherMajority} after first tie break `, higherMajorityArray);
  console.log(`===== tie Array Remainder at ${higherMajority} after first tie break `, tieArray);

}