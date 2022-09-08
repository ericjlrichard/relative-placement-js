RELATIVE PLACEMENT
------------------

    A brief explanation of how relative placement works and why it's useful.

    For clarity purpose, "comp" here means a competing item, can be a person, a team, a couple.

    Why relative placement?
    -----------------------
      Relative placement is an efficient way of weeding out "abnormal" judge scores. Whereas a classic scoring system can allow one single judge to tank a performance, or, on the contrary, boost it, relative placement does a pretty good job of ignoring outliers. Far and wide, the concept of relative placement is all about MAJORITY. If a majority of judges think you should win, you should win, whether the other judges think otherwise or not.

    Prelims
    -------
      - You'll want at least 3 judges per role.
      
      - Each judge has a limited "stash" of Yes (they want this comp in the finals) and Maybes, or Alternates (they'd be ok with this comp in the finals but not their first choice). We won't implement the coding itself, but it's strongly suggested to number your Alternates (Alt1, Alt2, etc) to help break ties.

      - As a general rule, you'll want the number of Yes and Alt to loosely match both the number of comps in the prelims and the number of comps wanted in the finals. For a final of 7 comps for example, around 4Y, 2A is good. Be ready to change your plans or, if you need a specific number of comps (for battles, for example), to choose between equal comps.

      Example:

      We want three couples in finals so 2Y, 1A per judge. The results are as Follow:

                J1    J2    J3
      Comp1     Y     Y     Y
      Comp2           A
      Comp3           Y     A
      Comp4     A           Y
      Comp5     Y

      Simplify this by ordering by Yes first, A second:

      Comp1     Y     Y     Y  <-- natural break
      Comp4     A           Y
      Comp3           Y     A  <-- natural break
      Comp5     Y              <-- natural break
      Comp2           A        <-- natural break

      A "natural break" simply means a group of comps with the same results. You generally want to avoid cutting a break in two because there is no valid way to justify it (if for example we had to choose between Comp4 and Comp3). An efficient way is to have a head judge. Another way to mitigate this is to number your Alts. But always having a head judge is sound practice.

    Finals
    ------

      For a more in depth look at relative placement, check out https://jazzmonkey.wordpress.com/2013/04/19/6-steps-to-understanding-relative-placement/

      The name of the game in relative placement is MAJORITY. We will look at each position (1st through last) and see if anyone has a majority of placements.

      An odd number of judges is strongly recommended unless you really need to flatter some egos, 5 to 9 is ideal but 3 can work. An even number only encourages ties and we don't want that. Realize that the more judges, the less likely ties are to happen!

      Consider this scenario:

              J1  J2  J3  J4  J5
      Comp1   1   2   1   1   5
      Comp2   2   4   2   2   3
      Comp3   3   3   5   3   4
      Comp4   4   5   3   5   2
      Comp5   5   1   4   4   1

      We will look at who has a majority of 1s. As luck has it, Comp1 has 3 out of 5 judges. Comp1 is in first.

      Then we'll look at a majority of 1 AND 2s, placing Comp2 in second. 1 AND 2s AND 3s will place Comp3 in third.

      When we get to Comp4 and Comp5 at positions 1 -> 4, we realize they both have a majority. In this case though, Comp5 has a bigger (4) majority than Comp4 (3) so wins out.

      The complete breakdown would look something like this:

              J1  J2  J3  J4  J5  ||1-1 |1-2 |1-3 |1-4 |1-5 ||POS
      Comp1   1   2   1   1   5   ||  3 |----|----|----|----|| 1
      Comp2   2   4   2   2   3   ||    |  3 |----|----|----|| 2
      Comp3   3   3   5   3   4   ||    |    |  3 |----|----|| 3
      Comp5   5   1   4   4   1   ||  2 |  1 |  2 | (4)|----|| 4
      Comp4   4   5   3   5   2   ||    |  1 |  2 |  3 |----|| 5

      If we switched the last results to:

      Comp4   4   1   3   5   2
      Comp5   5   5   4   4   1

      Both Comp4 and Comp5 have 3 judges at position 1 -> 4.
      
      In that case, we add up the placements *** comprising the majority ***, this is called the 2nd tie-breaker (some would argue it's the only tie-breaker since the previous "tie-breaker" isn't, in reality, a tie. I prefer to approach it as such). The end result will look like this:

              J1  J2  J3  J4  J5  ||1-1 |1-2 |1-3 |1-4 |1-5 ||POS
      Comp1   1   2   1   1   5   ||  3 |----|----|----|----|| 1
      Comp2   2   4   2   2   3   ||    |  3 |----|----|----|| 2
      Comp3   3   3   5   3   4   ||    |    |  3 |----|----|| 3
      Comp4   4   1   3   5   2   ||  2 |  1 |  2 |3(7)|----|| 4
      Comp5   5   5   4   4   1   ||    |  1 |  2 |3(9)|----|| 5

      The smallest result wins (meaning they earned higher positions within the majority). Note that we don't count the results OUTSIDE the majority.

      If two or more comps end up like this:

      Comp4   4   1   3   5   3
      Comp5   5   4   1   2   2

      You could either defer to the Head Judge and place Comp4 in first, or use what I call the "hidden tie-breaker": converting all the values in 1 and 2s (or 1 2 and 3 in case of a threeway tie, etc...)

      Comp4   1   1   2   2   2
      Comp5   2   2   1   1   1

      I'm not sure how widespread this method is, I don't remember inventing it but I don't remember seeing it anywhere either. Note that the head judge method will always give more weight to one individual judge's opinion, whereas the conversion tie-breaker takes every majority judge into account (at this point it's just a unanimous majority) which, in my opinion, is more fair and corresponds to the spirit of relative placement.

      You're ready to run your competition now!