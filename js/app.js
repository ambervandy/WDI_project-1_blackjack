$(document).ready(function() {
  // Can replace window.onload


console.log("this is working!");


// ====================================================================================================================================
//                                                             Variables/objects
// ====================================================================================================================================

// 	oObject to hold all cards in the deck
// •	Array?
// •	John had a good idea of using a constructor – will look into that
// •	Will need to pop cards from this object when the cards are dealt
// •	Once all cards are dealt, object will return to default state

// ----- going to try to create a constructor to call a card by suit and by value
// ----- will also include function: if value = 1 or ACE, then value = 1 or 11 based on value of hand array
// ----- need two variables for player hand and dealer hand to calc value of hand to decide value of ACE (SCOPE)

// create variables for deck of cards and number of cards in the deck
// var numberOfCards = 52;  <------------------------------------------- not necessary

// create an ARRAY giving values to each suit
			// spade: 1, 
			// heart: 2,
			// diamond: 3,
			// club: 4,

// create array of suits 
var suit = ["spade", "heart", "diamond", "club"];

// create array of values
var value = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

// create array of face values
var face = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// create empty array called deck to push card from constructor
var deck = [];

// oObject to hold player cards
// •	Array? Constructor?
// •	Will push cards dealt to the player into the object
// •	Will reset to default (empty) after each hand (player win, computer win, bust, or push)
var playerHand = [];

// oObject to hold computer cards
// •	Array? Constructor? 
// •	Will push cards  dealt to dealer into the object
// •	Will reset to default after each hand
var dealerHand = [];

// create object to hold bets
var pizzaBox = [];



// ====================================================================================================================================
//              DECK OF CARDS (finally got it! Many thanks to Matt Jamison for helping me figure it out!)
// ====================================================================================================================================

// create for loop to iterate through all three arrays (suit, value, face) and put into a constructor to build out the deck
// first for loop for suits array
for (i = 0; i < suit.length; i++) {
	// second for loop for value and face array
	for (j = 0; j < value.length; j++) {
		// create deck constructor using the i and j as variables
		var Deck = function(i, j) {
			//use i to get suit value
			this.suit = suit[i];
			// j to get both value and face
			this.value = value[j];
			this.face = face[j];
		}
		// push the new objects from constructor into array using inputs i and j
		deck.push(new Deck(i, j));
	}
}

// console.log to print the deck array
console.log(deck);

// ====================================================================================================================================
//                                                          SHUFFLE CARDS
// ====================================================================================================================================

// going to reference the stackoverflow post that Matt found for this: 
// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

// create a function to shuffle the deck
var shuffleDeck = function(deck) {
	// for loop to iterate through the deck array starting at the end of the array and moving backward
	// just realized i needs to equal deck.length-1 (yay for debugging!)
    for (i = deck.length - 1; i > 0; i--) {
    	// variable for choosing element of array by random number and rounding down
        var j = Math.floor(Math.random() * (i + 1));
        // create temporary variable to house the value of the i'th element of deck
        var temp = deck[i];
        // the ith element will take on j's value
        deck[i] = deck[j];
        // j will take on temp's value
        deck[j] = temp;
    }
    // return deck array after having swapped all elements with another random element in the array
    return deck;
}
// print to test
console.log(deck);
// invoke the function
shuffleDeck(deck);


// ====================================================================================================================================
//                                                             GAME PLAY
// ====================================================================================================================================

// 1. popup to start play

// 2.  play begins when player clicks bet button:

// DEFAULT STATE: 
// - $1000 in bankBox
// - cards are opacity = 0

//============================================================================================================== VARIABLES


// create variable for betButton for onclick function
var $betButton = $('#betButton');
// create variable for betBox
var $betBox = $('#bet1');
// create variable for the total bank amount
// var bank = 1000;
// create a variable for bank div
var $bankAmt = $('#bank');
// create variable for hit button
var $hitButton = $('#hitButton');
// create a variable for stand button
var $standButton = $('#standButton');

// var minusBet = (bank - 10);
// // set minusBet to string so it will display
// var bankString = minusBet.toString();
// // testing
// // console.log(bankString);
// // get minusBet to display in the bank div
// $bankAmt.text(bankString);

// create a game reset function
var playReset = function() {
	// testing
	console.log("Resetting the game now for next hand");
	// testing
	// console.log(playerTotal);
}




//============================================================================================================== PLAY STARTS ON CLICK OF BET BUTTON

// create new function to invoke at end of each hand to start
// var newHand = function() { ??????????????????????????????????????????????? WHY ISN'T THIS WORKING??!?!!

// creat click function for click of betButton
$betButton.click(function() {
	
	// kitty sound
	var kitty2 = new Audio("sounds/kitty2.wav");
  	kitty2.play();
	// ========================================================================================  BEGINNING TESTING RESET

	// reset playerHand and dealerHand back to empty arrays
	playerHand = [];
	dealerHand = [];

	// reset text
	$("#direction").text("XXXXXXXXX").css("opacity", "0");


	// Check if bankBox amount = 0, then game is over
	var count = $("#bank img").length;

	if (count == 0) {
		// change text
		$("#direction").text("SORRY, KITTY. GAME OVER.").css("opacity", "1");
		$betButton.off();
	}

	// reset bet img to opacity 1
	$("#bet1").css("opacity", "1");

	// reset playerTotal and dealerTotal back to 0
	playerTotal = 0;
	dealerTotal = 0;

	// reset dCard1 to pizza card img, but opaque
	var $dCard1 = $("#dCard1");
	$dCard1.css({"background-image": "url('images/pizzaCard.jpeg')", "opacity": "1"});

	// reset dImg1 back to z-index of -10
	$("#dImg1").css("z-index", "-10")

	// reset dealer and player cards to opaque
	var $allCards = $(".cards");
	$allCards.css("opacity", "0");

	// remove the added card divs from classes player-cards and dealer-cards
	var $allAdded = $(".addedCard");
	$allAdded.remove();



	// ========================================================================================  END TESTING RESET



	// ========================================================================================  BEGINNING BANK AND BET BOXES


	// create variable to get pizza from bank box to bet
	var $bankPizza = $("#bank img:first-child");

	$bankPizza.remove();
	// ============================================= need to reestablish bank






	// ========================================================================================  END BANK AND BET BOXES
	


	// ========================================================================================  BEGINNING FIRST "DEALING" CARDS


	// need to pop card from deck array and push to player array
	var playerCard1 = deck.pop();
	// need to push to player hand array 
	playerHand.push(playerCard1); //<------------------------------first player card pushed into array
	// - card color changes to background white for two player cards and one dealer card and adds face value and appt image
	var $pface = playerCard1.face;
	// console.log($pface);
	// console.log(typeof $pface);
	var $pSuit = playerCard1.suit;
	// class = card, this is the first child of id "player-cards" - create a variable
	var $pCard1 = $(".player-cards div:first-child");
	// get the html divs to place the face and image
	var $pFace1 = $("#pFace1");
	var $pImg1 = $("#pImg1");
	// change opacity to 1, remove background-image and change background color to white <-------- DON'T FORGET TO ADD CARD DEETS
 	// $pCard1.delay().css({"opacity": "1", "background-image": "none", "background-color": "white"});
 	// do this within a setTimeout function so it looks like cards are being dealt
 	setTimeout(function () { $pCard1.css({"opacity": "1", "background-image": "none", "background-color": "white"}) }, 800);
 	setTimeout(function () { $pFace1.text($pface).css("color", "black")}, 800);
 	
 	console.log($pSuit);
 	
 	// create a function for card image
 	// if statement to find which card to grab
 	if ($pSuit == "spade") {
 		$pImg1.html('<img src="images/spade.png" height= "55%" >');
 	}
 	else if ($pSuit == "heart") {
 		$pImg1.html('<img src="images/heart.png" height= "50%" margin-top="2em" >');
 	}
 	else if ($pSuit == "diamond") {
 		$pImg1.html('<img src="images/diamond.png" height= "65%" left="20%" >');
 	}
 	else if ($pSuit == "club") {
 		$pImg1.html('<img src="images/club.png" height= "55%" >');
 	}
	

	


 	// pop a card from deck and add to dealerHand an add all same changes except background color
 	var dealerCard1 = deck.pop(); 
 	dealerHand.push(dealerCard1); 
 	var $dface = dealerCard1.face;
 	var $dSuit = dealerCard1.suit;
 	var $dImg1 = $("#dImg1");
 	var $dFace1 = $("#dFace1");
 	var $dCard1 = $(".dealer-cards div:first-child");
 	setTimeout(function () { $dCard1.css({"opacity": "1"}) }, 1600); //<-------------------------------------- didn't yet show the dealer card
 	setTimeout(function () { $dFace1.text($dface).css({"color": "black", "opacity": "0"}) }, 1600);
 	// run card suit to get suit
 	// create a function for card image
 	// if statement to find which card to grab
 	if ($dSuit == "spade") {
 		$dImg1.html('<img src="images/spade.png" height= "55%" opacity="0" >');
 	}
 	else if ($dSuit == "heart") {
 		$dImg1.html('<img src="images/heart.png" height= "50%" opacity="0" margin-top="2em" >');
 	}
 	else if ($dSuit == "diamond") {
 		$dImg1.html('<img src="images/diamond.png" height= "65%" opacity="0" >');
 	}
 	else if ($dSuit == "club") {
 		$dImg1.html('<img src="images/club.png" height= "55%" opacity="0" >');
 	}

 	
 	// do the same thing again for player's second card
 	var playerCard2 = deck.pop(); 
 	playerHand.push(playerCard2);
 	var $pface2a = playerCard2.face;
 	var $pSuit2 = playerCard2.suit;
 	// this time for second child using nth-child
 	var $pCard2 = $(".player-cards div:nth-child(2)");
 	var $pFace2 = $("#pFace2");
 	var $pImg2 = $("#pImg2");
 	setTimeout(function () { $pCard2.css({"opacity": "1", "background-image": "none", "background-color": "white"}) }, 2400);
 	setTimeout(function () { $pFace2.text($pface2a).css("color", "black") }, 2400);
 	// create a function for card image
 	// if statement to find which card to grab
 	if ($pSuit2 == "spade") {
 		$pImg2.html('<img src="images/spade.png" height= "55%" >');
 	}
 	else if ($pSuit2 == "heart") {
 		$pImg2.html('<img src="images/heart.png" height= "50%" margin-top="2em" >');
 	}
 	else if ($pSuit2 == "diamond") {
 		$pImg2.html('<img src="images/diamond.png" height= "65%" >');
 	}
 	else if ($pSuit2 == "club") {
 		$pImg2.html('<img src="images/club.png" height= "55%" >');
 	}
 	
 	// do the same thing again for the dealer's second card
 	var dealerCard2 = deck.pop(); 
 	dealerHand.push(dealerCard2); 
 	var $dface2a = dealerCard2.face;
 	var $dSuit2 = dealerCard2.suit;
 	var $dCard2 = $(".dealer-cards div:nth-child(2)");
 	var $dFace2 = $("#dFace2");
 	var $dImg2 = $("#dImg2");
 	setTimeout(function () { $dCard2.css({"opacity": "1", "background-image": "none", "background-color": "white"}) }, 3200);
 	setTimeout(function () { $dFace2.text($dface2a).css("color", "black") }, 3200);
	// create a function for card image
 	// if statement to find which card to grab
 	if ($dSuit2 == "spade") {
 		$dImg2.html('<img src="images/spade.png" height= "55%" >');
 	}
 	else if ($dSuit2 == "heart") {
 		$dImg2.html('<img src="images/heart.png" height= "50%" margin-top="2em" >');
 	}
 	else if ($dSuit2 == "diamond") {
 		$dImg2.html('<img src="images/diamond.png" height= "65%" >');
 	}
 	else if ($dSuit2 == "club") {
 		$dImg2.html('<img src="images/club.png" height= "55%" >');
 	}


	console.log(playerHand);
	console.log(dealerHand);



	// ========================================================================================  END FIRST "DEALING" CARDS

	
	// ========================================================================================  BEGINNING SUMMING CARD VALUES

	
	// first figure out how to console.log both playerHand card values with a loop
	// sum dealer cards
	// declare a variable for total
	var dealerTotal = 0;
	// for loop to iterate through entire player hand
	for (i = 0; i < dealerHand.length; i++) {
		// console.log(playerHand[i].value);
		dealerTotal += dealerHand[i].value;
	}


    
	// sum player cards
	// declare a variable for total
    var playerTotal = 0;
    // for loop to iterate through entire player hand
    for (i = 0; i < playerHand.length; i++) {
    	// console.log(playerHand[i].value);
    	playerTotal += playerHand[i].value;
	}
    // testing

	console.log(playerTotal);
	console.log(dealerTotal);


	// ========================================================================================  END SUMMING CARD VALUES



	// ========================================================================================  BEGINNING CHECK FOR 21 ON DEAL


	// - check if playerHand = 21 and dealerHand = 21 with if statement
	if (playerTotal == 21 && dealerTotal == 21) {
		console.log("PUSH");
		// then need to turn other dealer card over with delay
		setTimeout(function () { $dCard1.css({"background-image": "none", "background-color": "white", "opacity": "1"}) }, 1600);
		// add the card text to the dealer card
		setTimeout(function () { $dFace1.text($dface).css({"color": "black", "opacity": "1"}) }, 1600);
		// need to add some text to the div and change the text color back to white with delay
		setTimeout(function () { $betBox.text("X").css("color", "white") }, 1600);

		// set mid-screen text
		$("#direction").text("YOU BOTH GOT 21. PUSH.").css("opacity", "1");

		// run pushFunction
		pushFunction();
		// play reset
		playReset();
	}


	else if (playerTotal == 21 && dealerTotal != 21) {
		console.log("BLACKJACK! PLAYER WINS HAND"); // <------------------ testing
		// then need to turn other dealer card over with delay
		setTimeout(function () { $dCard1.css({"background-image": "none", "background-color": "white", "opacity": "1"}) }, 1600);
		// add the card text to the dealer card
		setTimeout(function () { $dFace1.text($dface).css({"color": "black", "opacity": "1"}) }, 1600);
		
		// set mid-screen text
		$("#direction").text("BLACKJACK!").css("opacity", "1");

		// run playerWins function
		playerWins();

		playReset();
	}


	else if (dealerTotal == 21 && playerTotal != 21) {
		// testing
		console.log("DEALER WINS THIS ROUND");
		// update bankBox and betBox
		setTimeout(function () { $dCard1.css({"background-image": "none", "background-color": "white", "opacity": "1"}) }, 1600);
		// add the card text to the dealer card
		setTimeout(function () { $dFace1.text($dface).css({"color": "black", "opacity": "1"}) }, 1600);

		// set mid-screen text
		$("#direction").text("AW, FIDDLESTICKS.  DEALER WINS.").css("opacity", "1");

		// run dealerWins function
		dealerWins();

		playReset();
	}


// ========================================================================================  END CHECK FOR 21 ON DEAL


//=========================================================================================  WHERE PLAY STARTS IF NO BLACKJACK ON DEAL


}); //========================================================================================================================  END OF BET BUTTON FUNCTION

// testing
// console.log(bank);


$hitButton.click(function() { //==============================================================================================  BEGINNING HIT BUTTON FUNCTION

	// LOL kitty sound!
	var kitty3 = new Audio("sounds/kitty3.wav");
  	kitty3.play();

	// testing button
	console.log("HIT ME!");
	

	// if hit, then create new card element and append to the player card div
	var $newPlayerCard = $("<div>").addClass("cards addedCard").css({"opacity": "1", "background-image": "none", "background-color": "white"}).appendTo(".player-cards");
	
	// need to pop another card from the deck and push it to playerHand copying code from above
	var playerCard = deck.pop(); 
 	
 	playerHand.push(playerCard); 
 	// create variables for both the face value and suit
 	var $pFace = playerCard.face;
 	// console.log($pFace);
 	var $pImg = playerCard.suit;

 	// create a new div for both the suit image and face value
	$("<div>").addClass("faces").text($pFace).appendTo($newPlayerCard).css({"color": "black", "opacity": "1"});

	var $pImg1 = $("<div>").addClass("cardImg").appendTo($newPlayerCard);

	if ($pImg == "spade") {
 		$pImg1.html('<img src="images/spade.png" height= "55%" >');
 	}
 	else if ($pImg == "heart") {
 		$pImg1.html('<img src="images/heart.png" height= "50%" >');
 	}
 	else if ($pImg == "diamond") {
 		$pImg1.html('<img src="images/diamond.png" height= "65%" left="20%" >');
 	}
 	else if ($pImg == "club") {
 		$pImg1.html('<img src="images/club.png" height= "55%" >');
 	}

 	// create a new div for both the suit image and face value
 	
 	console.log(playerHand);




  	// sum player cards
	// declare a variable for total
    var playerTotal = 0;
    // for loop to iterate through entire player hand
    for (i = 0; i < playerHand.length; i++) {
    	// console.log(playerHand[i].value);
    	playerTotal += playerHand[i].value;
	}
    // testing
	console.log(playerTotal);
	



	// if statement for if player BUSTS or hits 21
	if (playerTotal > 21) {
		// CHECK TO SEE IF ONE OF THE CARDS WAS AN ACE AND CHANGE THE VALUE - NEED IF STATEMENT HERE
		pBusted();
	}

	// if player has 21, need to run through stand function
	else if (playerTotal == 21) {
		// set mid-screen text
		$("#direction").text("YOU GOT 21! BE SURE TO STAY.").css("opacity", "1");

		console.log("YAY!, Player got 21!  Let's see what the dealer has.");
		console.log("You might want to click STAY here.")
	}



}); //=========================================================================================================================== END OF HIT BUTTON FUNCTION



//=============================================================================================================================== DEALER PLAY WHEN PLAYER STANDS 




// then create click function for stand
$standButton.click(function() { //<---------------------------------- ME STAND BUTTON FUNCTION

	// kitty sound
	var kitty1 = new Audio("sounds/kitty1.wav");
  	kitty1.play();

	// testing button
	console.log("Player will stay.");
	console.log(dealerHand);



	// // reset dCard1 to pizza card img, but opaque
	// var $dCard1 = $(".dealer-cards div:first-child");
	var $dFace1 = $("#dFace1");
	// $dCard1.css({"background-image": "url('../images/pizzaCard.jpeg')", "opacity": "1"});
	// if stand, then dealer card flips over with delay
	$dCard1.css({"background-image": "none", "background-color": "white"});
	// add the card text to the dealer card
	$dFace1.css("opacity", "1");
	$("#dImg1").css("z-index", "10")






	// sum dealer cards
	// declare a variable for total
	var dealerTotal = 0;
	// for loop to iterate through entire player hand
	for (i = 0; i < dealerHand.length; i++) {
		// console.log(playerHand[i].value);
		dealerTotal += dealerHand[i].value;
	}
	console.log(dealerTotal);





  	// sum player cards
	// declare a variable for total
    var playerTotal = 0;
    // for loop to iterate through entire player hand
    for (i = 0; i < playerHand.length; i++) {
    	// console.log(playerHand[i].value);
    	playerTotal += playerHand[i].value;
	}
	// testing again
	console.log(playerTotal);





	

	if (dealerTotal < 17) { // 1

		// need to pop another card from the deck and push it to dealerHand
		var dealerCard1 = deck.pop(); 
		dealerHand.push(dealerCard1); 
		console.log(dealerHand);

		// create variables for both the face value and suit
	 	var $dFace = dealerCard1.face;
	 	// console.log($pFace);
	 	var $dImg = dealerCard1.suit;

		// ADD CARD FACE AND IMAGE
		var $newDealerFace = $("<div>").addClass("faces").text($dFace).css({"color": "black", "opacity": "1"});

		var $dSuit = $("<div>").addClass("cardImg");

		// add a new card with delay
		var $newDealerCard = setTimeout(function () { $("<div>").addClass("cards addedCard").attr('id', 'dCard1').css({"opacity": "1", "background-image": "none", "background-color": "white"}).appendTo(".dealer-cards").append($newDealerFace).append($dSuit); }, 600);
		

		// if statement to find which card to grab
	 	if ($dImg == "spade") {
	 		$dSuit.html('<img src="images/spade.png" height= "55%" >');
	 	}
	 	else if ($dImg == "heart") {
	 		$dSuit.html('<img src="images/heart.png" height= "50%" >');
	 	}
	 	else if ($dImg == "diamond") {
	 		$dSuit.html('<img src="images/diamond.png" height= "65%" >');
	 	}
	 	else if ($dImg == "club") {
	 		$dSuit.html('<img src="images/club.png" height= "55%" >');
	 	}

		// need to add the last dealer card value to the dealer total value
	    for (i = dealerHand.length - 1; i > dealerHand.length - 2; i--) {
	    	// console.log(playerHand[i].value);
	    	dealerTotal = dealerTotal + dealerHand[i].value;
	    	// testing
			console.log(dealerTotal);
		}


		

		// another if statement to see if new total is > 21 for dealer to BUST
		if (dealerTotal > 21) { // 2
			busted();
		}
		else if (dealerTotal == 21 && playerTotal != 21) {
			dealerWins();
		}
		else if (dealerTotal == 21 && playerTotal == 21) {
			pushFunction();
		}
		
		// need a bunch of nested if statements here to allow dealer to draw additional cards.  Will go up to 7. (this is #2)
		else if (dealerTotal < 17) { 
			
			// need to pop another card from the deck and push it to dealerHand
			var dealerCard2 = deck.pop(); 
			dealerHand.push(dealerCard2); 
			console.log(dealerHand); 

			// create variables for both the face value and suit
		 	var $dFace2 = dealerCard2.face;
		 	// console.log($pFace);
		 	var $dImg2 = dealerCard2.suit;

			// ADD CARD FACE AND IMAGE
			var $newDealerFace2 = $("<div>").addClass("faces").text($dFace2).css({"color": "black", "opacity": "1"});

			var $dSuit2 = $("<div>").addClass("cardImg");

			// add a new card with delay
			var $newDealerCard2 = setTimeout(function () { $("<div>").addClass("cards addedCard").attr('id', 'dCard1').css({"opacity": "1", "background-image": "none", "background-color": "white"}).appendTo(".dealer-cards").append($newDealerFace2).append($dSuit2); }, 600);
			

			// if statement to find which card to grab
		 	if ($dImg2 == "spade") {
		 		$dSuit2.html('<img src="images/spade.png" height= "55%" >');
		 	}
		 	else if ($dImg2 == "heart") {
		 		$dSuit2.html('<img src="images/heart.png" height= "50%" >');
		 	}
		 	else if ($dImg2 == "diamond") {
		 		$dSuit2.html('<img src="images/diamond.png" height= "65%" >');
		 	}
		 	else if ($dImg2 == "club") {
		 		$dSuit2.html('<img src="images/club.png" height= "55%" >');
		 	}


			// need to add the last dealer card value to the dealer total value
		    for (i = dealerHand.length - 1; i > dealerHand.length - 2; i--) {
		    	// console.log(playerHand[i].value);
		    	dealerTotal = dealerTotal + dealerHand[i].value;
		    	// testing
				console.log(dealerTotal);
			}
	




			// another if statement to see if new total is > 21 for dealer to BUST
			if (dealerTotal > 21) { // 3
				busted();
			}
			else if (dealerTotal == 21 && playerTotal != 21) {
				dealerWins();
			}
			else if (dealerTotal == 21 && playerTotal == 21) {
				pushFunction();
			}	


			else if (dealerTotal < 17) { 
				
				// need to pop another card from the deck and push it to dealerHand
				var dealerCard3 = deck.pop(); 
				dealerHand.push(dealerCard3); 
				console.log(dealerHand); 

				// create variables for both the face value and suit
			 	var $dFace3 = dealerCard3.face;
			 	// console.log($pFace);
			 	var $dImg3 = dealerCard3.suit;

				// ADD CARD FACE AND IMAGE
				var $newDealerFace3 = $("<div>").addClass("faces").text($dFace3).css({"color": "black", "opacity": "1"});

				var $dSuit3 = $("<div>").addClass("cardImg");

				// add a new card with delay
				var $newDealerCard3 = setTimeout(function () { $("<div>").addClass("cards addedCard").attr('id', 'dCard1').css({"opacity": "1", "background-image": "none", "background-color": "white"}).appendTo(".dealer-cards").append($newDealerFace3).append($dSuit3); }, 600);
				

				// if statement to find which card to grab
			 	if ($dImg3 == "spade") {
			 		$dSuit3.html('<img src="images/spade.png" height= "55%" >');
			 	}
			 	else if ($dImg3 == "heart") {
			 		$dSuit3.html('<img src="images/heart.png" height= "50%" >');
			 	}
			 	else if ($dImg3 == "diamond") {
			 		$dSuit3.html('<img src="images/diamond.png" height= "65%" >');
			 	}
			 	else if ($dImg3 == "club") {
			 		$dSuit3.html('<img src="images/club.png" height= "55%" >');
			 	}

				// need to add the last dealer card value to the dealer total value
			    for (i = dealerHand.length - 1; i > dealerHand.length - 2; i--) {
			    	// console.log(playerHand[i].value);
			    	dealerTotal = dealerTotal + dealerHand[i].value;
			    	// testing
					console.log(dealerTotal);
				}	
			

				



					// another if statement to see if new total is > 21 for dealer to BUST
					if (dealerTotal > 21) { // 4
						busted();
					}
					else if (dealerTotal == 21 && playerTotal != 21) {
						dealerWins();
					}
					else if (dealerTotal == 21 && playerTotal == 21) {
						pushFunction();
					}
					else if (dealerTotal < 17) { 

						// need to pop another card from the deck and push it to dealerHand
						var dealerCard4 = deck.pop(); 
						dealerHand.push(dealerCard4); 
						console.log(dealerHand); 

						// create variables for both the face value and suit
					 	var $dFace4 = dealerCard4.face;
					 	// console.log($pFace);
					 	var $dImg4 = dealerCard4.suit;

						// ADD CARD FACE AND IMAGE
						var $newDealerFace4 = $("<div>").addClass("faces").text($dFace4).css({"color": "black", "opacity": "1"});

						var $dSuit4 = $("<div>").addClass("cardImg");

						// add a new card with delay
						var $newDealerCard4 = setTimeout(function () { $("<div>").addClass("cards addedCard").attr('id', 'dCard1').css({"opacity": "1", "background-image": "none", "background-color": "white"}).appendTo(".dealer-cards").append($newDealerFace4).append($dSuit4); }, 600);
						

						// if statement to find which card to grab
					 	if ($dImg4 == "spade") {
					 		$dSuit4.html('<img src="images/spade.png" height= "55%" >');
					 	}
					 	else if ($dImg4 == "heart") {
					 		$dSuit4.html('<img src="images/heart.png" height= "50%" >');
					 	}
					 	else if ($dImg4 == "diamond") {
					 		$dSuit4.html('<img src="images/diamond.png" height= "65%" >');
					 	}
					 	else if ($dImg4 == "club") {
					 		$dSuit4.html('<img src="images/club.png" height= "55%" >');
					 	}


						// need to add the last dealer card value to the dealer total value
					    for (i = dealerHand.length - 1; i > dealerHand.length - 2; i--) {
					    	// console.log(playerHand[i].value);
					    	dealerTotal = dealerTotal + dealerHand[i].value;
					    	// testing
							console.log(dealerTotal);
						}

					


						// another if statement to see if new total is > 21 for dealer to BUST
						if (dealerTotal > 21) { // 5
							busted();
						}
						else if (dealerTotal == 21 && playerTotal != 21) {
							dealerWins();
						}
						else if (dealerTotal == 21 && playerTotal == 21) {
							pushFunction();
						}
						else if (dealerTotal < 17) { 

							// need to pop another card from the deck and push it to dealerHand
							var dealerCard5 = deck.pop(); 
							dealerHand.push(dealerCard5); 
							console.log(dealerHand); 


							// create variables for both the face value and suit
						 	var $dFace5 = dealerCard5.face;
						 	// console.log($pFace);
						 	var $dImg5 = dealerCard5.suit;

							// ADD CARD FACE AND IMAGE
							var $newDealerFace5 = $("<div>").addClass("faces").text($dFace5).css({"color": "black", "opacity": "1"});

							var $dSuit5 = $("<div>").addClass("cardImg");

							// add a new card with delay
							var $newDealerCard5 = setTimeout(function () { $("<div>").addClass("cards addedCard").attr('id', 'dCard1').css({"opacity": "1", "background-image": "none", "background-color": "white"}).appendTo(".dealer-cards").append($newDealerFace5).append($dSuit5); }, 600);
							

							// if statement to find which card to grab
						 	if ($dImg5 == "spade") {
						 		$dSuit5.html('<img src="images/spade.png" height= "55%" >');
						 	}
						 	else if ($dImg5 == "heart") {
						 		$dSuit5.html('<img src="images/heart.png" height= "50%" >');
						 	}
						 	else if ($dImg5 == "diamond") {
						 		$dSuit5.html('<img src="images/diamond.png" height= "65%" >');
						 	}
						 	else if ($dImg5 == "club") {
						 		$dSuit5.html('<img src="images/club.png" height= "55%" >');
						 	}

							// need to add the last dealer card value to the dealer total value
						    for (i = dealerHand.length - 1; i > dealerHand.length - 2; i--) {
						    	// console.log(playerHand[i].value);
						    	dealerTotal = dealerTotal + dealerHand[i].value;
						    	// testing
								console.log(dealerTotal);
							}

						



							// another if statement to see if new total is > 21 for dealer to BUST
							if (dealerTotal > 21) { // 6
								busted();
							}
							else if (dealerTotal == 21 && playerTotal != 21) {
								dealerWins();
							}
							else if (dealerTotal == 21 && playerTotal == 21) {
								pushFunction();
							}
							else if (dealerTotal < 17) { 
							
								// need to pop another card from the deck and push it to dealerHand
								var dealerCard6 = deck.pop(); 
								dealerHand.push(dealerCard6); 
								console.log(dealerHand); 


								// create variables for both the face value and suit
							 	var $dFace6 = dealerCard6.face;
							 	// console.log($pFace);
							 	var $dImg6 = dealerCard6.suit;

								// ADD CARD FACE AND IMAGE
								var $newDealerFace6 = $("<div>").addClass("faces").text($dFace6).css({"color": "black", "opacity": "1"});

								var $dSuit6 = $("<div>").addClass("cardImg");

								// add a new card with delay
								var $newDealerCard6 = setTimeout(function () { $("<div>").addClass("cards addedCard").attr('id', 'dCard1').css({"opacity": "1", "background-image": "none", "background-color": "white"}).appendTo(".dealer-cards").append($newDealerFace6).append($dSuit6); }, 600);
								

								// if statement to find which card to grab
							 	if ($dImg6 == "spade") {
							 		$dSuit6.html('<img src="images/spade.png" height= "55%" >');
							 	}
							 	else if ($dImg6 == "heart") {
							 		$dSuit6.html('<img src="images/heart.png" height= "50%" >');
							 	}
							 	else if ($dImg6 == "diamond") {
							 		$dSuit6.html('<img src="images/diamond.png" height= "65%" >');
							 	}
							 	else if ($dImg6 == "club") {
							 		$dSuit6.html('<img src="images/club.png" height= "55%" >');
							 	}

								// need to add the last dealer card value to the dealer total value
							    for (i = dealerHand.length - 1; i > dealerHand.length - 2; i--) {
							    	// console.log(playerHand[i].value);
							    	dealerTotal = dealerTotal + dealerHand[i].value;
							    	// testing
									console.log(dealerTotal);
								}

							


								// another if statement to see if new total is > 21 for dealer to BUST
								if (dealerTotal > 21) { // 7
									busted();
								}
								else if (dealerTotal == 21 && playerTotal != 21) {
									dealerWins();
								}
								else if (dealerTotal == 21 && playerTotal == 21) {
									pushFunction();
								}
								else if (dealerTotal < 17) { 
									
									// need to pop another card from the deck and push it to dealerHand
									var dealerCard7 = deck.pop(); 
									dealerHand.push(dealerCard7); 
									console.log(dealerHand); 

									// create variables for both the face value and suit
								 	var $dFace7 = dealerCard7.face;
								 	// console.log($pFace);
								 	var $dImg7 = dealerCard7.suit;

									// ADD CARD FACE AND IMAGE
									var $newDealerFace7 = $("<div>").addClass("faces").text($dFace7).css({"color": "black", "opacity": "1"});

									var $dSuit7 = $("<div>").addClass("cardImg");

									// add a new card with delay
									var $newDealerCard7 = setTimeout(function () { $("<div>").addClass("cards addedCard").attr('id', 'dCard1').css({"opacity": "1", "background-image": "none", "background-color": "white"}).appendTo(".dealer-cards").append($newDealerFace7).append($dSuit7); }, 600);
									

									// if statement to find which card to grab
								 	if ($dImg7 == "spade") {
								 		$dSuit7.html('<img src="images/spade.png" height= "55%" >');
								 	}
								 	else if ($dImg7 == "heart") {
								 		$dSuit7.html('<img src="images/heart.png" height= "50%" >');
								 	}
								 	else if ($dImg7 == "diamond") {
								 		$dSuit7.html('<img src="images/diamond.png" height= "65%" >');
								 	}
								 	else if ($dImg7 == "club") {
								 		$dSuit7.html('<img src="images/club.png" height= "55%" >');
								 	}

									// need to add the last dealer card value to the dealer total value
								    for (i = dealerHand.length - 1; i > dealerHand.length - 2; i--) {
								    	// console.log(playerHand[i].value);
								    	dealerTotal = dealerTotal + dealerHand[i].value;
								    	// testing
										console.log(dealerTotal);
									}
								}


								else if (dealerTotal >= 17) { // 7
									console.log("dealer will stay.");
									// now check to see who was closer to 21 to determine winner
									if (dealerTotal > playerTotal) {
										dealerWins();
									}
									else if (playerTotal > dealerTotal) {
										playerWins();
									}
									else if (dealerTotal == playerTotal) {
										console.log("push");
										console.log(playerTotal);
										console.log(dealerTotal);
										playReset();
									}
								}

							}
							else if (dealerTotal >= 17) { // 6
								console.log("dealer will stay.");
								// now check to see who was closer to 21 to determine winner
								if (dealerTotal > playerTotal) {
									dealerWins();
								}
								else if (playerTotal > dealerTotal) {
									playerWins();
								}
								else if (dealerTotal == playerTotal) {
									console.log("push");
									console.log(playerTotal);
									console.log(dealerTotal);
									playReset();
								}
							}

						}
						else if (dealerTotal >= 17) { // 5
							console.log("dealer will stay.");
							// now check to see who was closer to 21 to determine winner
							if (dealerTotal > playerTotal) {
								dealerWins();
							}
							else if (playerTotal > dealerTotal) {
								playerWins();
							}
							else if (dealerTotal == playerTotal) {
								console.log("push");
								console.log(playerTotal);
								console.log(dealerTotal);
								playReset();
							}
						}

					}
					else if (dealerTotal >= 17) { // 4
						console.log("dealer will stay.");
						// now check to see who was closer to 21 to determine winner
						
						if (dealerTotal > playerTotal) {
							dealerWins();
						}
						else if (playerTotal > dealerTotal) {
							playerWins();
						}
						else if (dealerTotal == playerTotal) {
							console.log("push");
							console.log(playerTotal);
							console.log(dealerTotal);
							playReset();
						}
					}

				}
				else if (dealerTotal >= 17) { // 3
					console.log("dealer will stay.");
					// now check to see who was closer to 21 to determine winner
					
					if (dealerTotal > playerTotal) {
						dealerWins();
					}
					else if (playerTotal > dealerTotal) {
						playerWins();
					}
					else if (dealerTotal == playerTotal) {
						console.log("push");
						console.log(playerTotal);
						console.log(dealerTotal);
						playReset();
					}
				}

			}
			else if (dealerTotal >= 17) { // 2
				console.log("dealer will stay.");

				if (dealerTotal > playerTotal) {
					dealerWins();
				}
				else if (playerTotal > dealerTotal) {
					playerWins();
				}
				else if (dealerTotal == playerTotal) {
					console.log("push");
					console.log(playerTotal);
					console.log(dealerTotal);
					playReset();
				}
			}		
	}
	else if (dealerTotal >= 17) { // 1
		// testing
		console.log("dealer will stay.");

		// have to do the push compare inside of each else if because we're setting it back to zero after

		if (dealerTotal > playerTotal) {
			dealerWins();
		}
		else if (playerTotal > dealerTotal) {
			playerWins();
		}
		else if (dealerTotal == playerTotal) {
			console.log("push");
			console.log(playerTotal);
			console.log(dealerTotal);
			playReset();
		}
		// now check to see who was closer to 21 to determine winner
		// if ((21 - dealerTotal) < (21 - playerTotal)) {
		// 	dealerWins();
		// }
		// else if ((21 - playerTotal) < (21 - dealerTotal)) {
		// 	playerWins();
		// }
		// else if ((21 - playerTotal) == (21 - dealerTotal)) {
		// 	pushFunction();
		// }
	// }


	}
// var getWinner = function() {
// 	if ((21 - dealerTotal) < (21 - playerTotal)) {
// 		dealerWins();
// 	}
// 	else if ((21 - playerTotal) < (21 - dealerTotal)) {
// 		playerWins();
// 	}
// 	else if ((21 - playerTotal) === (21 - dealerTotal)) {
// 		console.log("push");
// 		console.log(playerTotal);
// 		console.log(dealerTotal);
// 	}
// }

// reinstate the ability to click betButton again <---------- doesn't work, ugh
// $betButton.on("click");


}); //==================================================================================================================== END OF ME STAY FUNCTION

// testing
// console.log(minusBet);

// sum dealer cards
// declare a variable for total
var dealerTotal = 0;
// for loop to iterate through entire player hand
for (i = 0; i < dealerHand.length; i++) {
	// console.log(playerHand[i].value);
	dealerTotal += dealerHand[i].value;
}


// sum player cards
// declare a variable for total
var playerTotal = 0;
// for loop to iterate through entire player hand
for (i = 0; i < playerHand.length; i++) {
	// console.log(playerHand[i].value);
	playerTotal += playerHand[i].value;
}




// reestab dCard1
var $dCard1 = $(".dealer-cards div:first-child");


// MINIMIZING:


var pushFunction = function() {
	console.log("PUSH");

	// set variables for both classes "faces" and "cardImg" to set them to opaque
	$(".faces").css({"color": "black", "opacity": "1"});
	$(".cardImg").css("opacity", "1");
	$("#dImg1").css("z-index", "10")


	// pizza bank and bet to reset!
	// reset bet img to opacity 1
	$("#bet1").css("opacity", "0");
	// create variable for #bank div
	var $bankDiv = $("#bank");
	// then append another pizza img
	$("<img>").attr("src", "images/pizzaSprite.png").addClass("pizza").appendTo($bankDiv);

	$("#direction").text("PUSH. BETTER LUCK NEXT TIME.").css("opacity", "1");

	playReset();
}



var dealerWins = function() {
	// testing
	console.log("DEALER WINS THIS ROUND");
	// update bankBox and betBox
	// // reset dCard1 to pizza card img, but opaque
	// var $dCard1 = $(".dealer-cards div:first-child");
	$dCard1.css({"background-image": "none", "background-color": "white"});

	// set variables for both classes "faces" and "cardImg" to set them to opaque
	$(".faces").css({"color": "black", "opacity": "1"});
	$(".cardImg").css("opacity", "1");
	$("#dImg1").css("z-index", "10")

	// if PLAYER LOST HAND then betBox clears and bankBox stays the same without bet
	// $betBox.text("X").css("color", "white");
	$("#bet1").css("opacity", "0");

	$("#direction").text("TOO BAD. YOU LOSE THIS ONE.").css("opacity", "1");

	playReset();
}



var playerWins = function() {
	console.log("PLAYER WINS HAND!");
	// then need to turn other dealer card over with delay
	$dCard1.css({"background-image": "none", "background-color": "white"});
	// if PLAYER WINS HAND then betBox clears (color to white) and bankBox adds 20 (2x bet) with delay

	// set variables for both classes "faces" and "cardImg" to set them to opaque
	$(".faces").css({"color": "black", "opacity": "1"});
	$(".cardImg").css("opacity", "1");
	$("#dImg1").css("z-index", "10");

	// pizza bank and bet to reset!
	// reset bet img to opacity 1
	$("#bet1").css("opacity", "0");
	// create variable for #bank div
	var $bankDiv = $("#bank");
	// then append 2 pizza imgs
	$("<img>").attr("src", "images/pizzaSprite.png").addClass("pizza").appendTo($bankDiv);
	$("<img>").attr("src", "images/pizzaSprite.png").addClass("pizza").appendTo($bankDiv);
	
	$("#direction").text("YOU WIN THE HAND, KITTY!").css("opacity", "1");

	playReset();
}




var busted = function() {
	// CHECK TO SEE IF ONE OF THE CARDS WAS AN ACE AND CHANGE THE VALUE - NEED IF STATEMENT HERE ***********************************
	// testing
	console.log("dealer busted function is running now");

	$("#direction").text("DEALER BUSTED!");

	// setTimeout(function () { playerWins() }, 1600);

	playerWins();

}





var pBusted = function() {
	// CHECK TO SEE IF ONE OF THE CARDS WAS AN ACE AND CHANGE THE VALUE - NEED IF STATEMENT HERE ***********************************
	// testing
	console.log("player busted function is running now");

	// create variables for both the face value and suit

	$("#direction").text("YOU BUSTED!");

	// setTimeout(function () { }, 1600);
 	// tried a setTimeout and that didn't work well.
 	dealerWins()


}




// }); //============================================================================================================================ END OF BET BUTTON FUNCTION



				
// <--------------------------------------------- REMEMBER TO CLEAR PLAYERHAND/DEALER HAND WHEN CLICK BET BUTTON
// <--------------------------------------------- NEED TO CREATE VARIABLE FOR betButton.click function to invoke 
// <--------------------------------------------- it at the end of play at each round with the new variable totals
// <--------------------------------------------- NOTE: WRITE FUNCTIONS TO INVOKE IF PUSH, PLAYER WIN, DEALER WIN, then just invoke those functions








// ====================================================================================================================================
//                                                          1:1 Notes
// ====================================================================================================================================
// CSS: Base design has higher priorirty than responsive design;
// - events?
	// - respond to listener (listeners) 
		// - functionality to handlers

// JS:
// Deck : contains all the cards, cards should be exclusive, have value
	// - Card: Objects
		// a- suit
		// a- value
		// b- specific card suit and value utilzies some sort of legend

// Constructor:
// 	function Dog(text) {
// 		this.name = text,
// 		this.bark = function() {
// 			console.log('bark');
// 		}
// 	)

// new Card(suit, value);
// Deck with 52 cards

// =====
// card.value compare that to player.hand vs scope(draw out scope and use params)
// =====


// - Player = object
	// - player needs money/backroll
	// - player needs money

// - Dealer = object
// - both can have hand_total

// functionality
// - when I bet, does it work?
	// - player can hit deal/bet
		// - 2 cards deal to player, 1 to dealer
			// functionality, data side, and user side
		// MVP: draw 2 to dealer, hide one of the dealers cards
		// Bonus: have the dealer draw 1, then a check to draw more
	// - hand values are calculated
	// - Compare to win/lose conditions
		// - win 
		// - loss
	// - ability to draw more if...

// - Aftermath of hand captured
	// - bankroll




// At end of each hand, can click bet button to restart entire flow <---------- doesn't work, ugh!
// $newHand.click();
// $newHand();


//  - if player or dealer BUST then if ace, then change value to 1 and invoke meStand function again so dealer can get another card





//  - need to figure out how to start second, third, etc hands
//  - FIGURE OUT HOW TO ADD CARD FACES TO CARDS (.text and/or HTML to div position: absolute inside of card?) - make a function to do this?
//  - restart game?


// DONE:
//  - figure out if you can stop/turn off (.off("click")) (http://api.jquery.com/off/) bet button until end of play
//  - need to figure out a way to invoke meStand function



// =============================================================================================================================
// 												SOME IDEAS THAT DIDN'T WORK
// =============================================================================================================================




// create object of values  <---------------------------------------------- too complicated to call later
// var value = [{faceValue:"ace", numValue: [1, 11},
// 			 {"2": 2},
// 			 {"3": 3}, 
// 			 {"4": 4}, 
// 			 {"5": 5}, 
// 			 {"6": 6}, 
// 			 {"7": 7}, 
// 			 {"8": 8}, 
// 			 {"9": 9}, 
// 			{"10": 10},
// 		  {"jack": 10},
// 		 {"queen": 10},
// 		  {"king": 10},
// 			];
	
// console.log(value[0].faceValue);
// var Deck = function(suit, value) 
// 	this.suit = suit; 
// 	this.value = value;
// }
// var Deck1 = new Deck(suit[2], value[0]);
// console.log(Deck1); <---------------------------------------------------- too complicated to call later

// create constructor that takes in suit and value of card <---------------- TOTALLY didn't work
// var cardDeck = function(suit, value) {
// 	// needs to take in suit
// 	this.suit = suit;
// 	// needs to take in a function to determine value of card and ace value
// 	// this.value = function () {}
// 	// but first, let's not worry about that.
// 	this.value = value;
// }
// // practicing calling some cards
// var card1 = new cardDeck("hearts", 7);
// // console.log card1
// console.log(card1);
// new Card(suit, value);

// now create a constructor that will iterate through all suits and cards
// var deckOfCards = function() {
// 	// create variable to name each new card name
// 	i = 0;
// 	// constructor to create cards
// 	var card = function(suit, value) {
// 		for (suit = 1; suit <= 4; suit++) {
// 			for (value = 0; value <= 13; value++) {
// 			}
// 		}
// 	}
// 	console.log(new card[i]);
// 	i++;
// }    <------------------------------------------------------------------------ TOTALLY didn't work

// player's ability to deal new hand/raise contingent upon having money


// remove the ability to click betButton again
	// $(this).off("click");
	// - $10 moves to betBox && // text color becomes black again
	// $betBox.text("10").css("color", "black");
	// - $10 moves from bankBox



	// ============================================= need to reestablish bank
	// create variable for newBank
	// var bank = newBank;
	// create a variable for the bank - bet
	// var minusBet = (bank - 10);

	// console.log(minusBet);
	// // set minusBet to string so it will display
	// var bankString = minusBet.toString();
	// // testing
	// // console.log(bankString);
	// // get minusBet to display in the bank div
	// $bankAmt.text(bankString);






});//=============================================================================================================================== ONLOAD FUNCTION







































