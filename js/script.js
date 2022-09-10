let compResults = [
  {
    compID: 100,
    compName: "Bob and John",
    scores: [1, 2, 4, 1, 2]
  },

  {
    compID: 200,
    compName: "Tabitha and Rogatien",
    scores: [2, 1, 2, 3, 1]
  },

  {
    compID: 5,
    compName: "Ghyslaine et Paul",
    scores: [4, 4, 1, 5, 4]
  },

  {
    compID: 8,
    compName: "Roger",
    scores: [5, 5, 5, 4, 3]
  },

  {
    compID: 34,
    compName: "Les tabarfucks",
    scores: [3, 3, 3, 2, 5]
  }

];

// for (c=0; c < compResults.length; c++) {
//   console.log (compResults[c], nbOfOccurences(compResults[c].scores, 5));
// }

runRelativePlacement(compResults);

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

      //If they have a majority AND have not already been placed, add them to majority list.
      if ((nbOfOccurences(resultsArray[comp].scores, place) > (nbOfJudges / 2)) && (placedArray.indexOf(comp) < 0)) {
        majorityArray.push(resultsArray[comp]);
        //pushing the index of the future competitor(s) in the placed array.
        placedArray.push(comp);
      }

    } //end results loop
    
    console.log(`majorityArray after ${place}`, majorityArray);

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

  for (i=0; i < scoreLine.length; i++) {
    if (scoreLine[i] <= place) {
      counter++;
    }
  }

  return counter;
}

//goes through the classic tie-breakers
function breakTie(tieArray, place) {
  console.log(`=============Hello! I've been asked to break a tie at ${place}!`);

  console.log(`First tie breaker: bigger majority`);

  let biggerMajority = 0;
}