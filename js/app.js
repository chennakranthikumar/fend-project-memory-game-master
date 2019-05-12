/*
 * Create a list that holds all of your cards
 */
 'use strict';
var cards = Array.prototype.slice.call(document.querySelectorAll(".card"));

var deck = document.querySelector('.deck');

function onpageload() {
  shuffle(cards).map(i => {
    Array.prototype.forEach.call(cards, function(x) {
      deck.appendChild(x);

    });
  });
}

 // TODO: refresh the page function  on page loadng in browser
window.onload = onpageload();
// TODO: reseter button function
function reseter() {
  self.addEventListener("click", reseter1());

};

function reseter1() {
  location.reload();
}
var card=0;
// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
 card = cards[i];

  card.addEventListener("click", cardOpen);

};

// opening by displayCards
var opencards = [];


// TODO:  add opened cards to opencards list and check if cards are match or not
function cardOpen() {
  this.classList.toggle("open");

  this.classList.toggle("show");
  this.classList.toggle("disabled");


  opencards.push(this);
  //console.log(opencards);
  if (opencards.length == 1) {
    moveCounter();
  }
  if (opencards.length == 2) {
    if ((opencards[0].type === opencards[1].type)) {
      matched();
    } else {
      unmatched();
    }
  }
};

var mastercount = 0;
var count=0;
// TODO:  when cards match
function matched() {
  opencards[0].classList.add("match", "disabled");
  opencards[1].classList.add("match", "disabled");
  opencards[0].classList.remove("show", "open", "no-event");
  opencards[1].classList.remove("show", "open", "no-event");
  opencards = [];
  count = 0;
  mastercount++;
  //  console.log(mastercount);
  // TODO: response when the player won by matching all the cards
  var countertime=0;
  if (mastercount == 8) {
    countertime = document.querySelector('.timer');
    swal({

      title: "Congratulations",

      html: "You have won the game! <br> MOVES: " + tries + "<br> STARS: &nbsp" + starcount + '<i class="fa fa-star"></i>' + "<br>" + countertime.textContent,
      confirmButtonText: "Play Again",

    }).then(function() {
      location.reload();
    });


    //  location.reload();

  }
}



//  TODO:  when cards don't match
function unmatched() {


  opencards[0].classList.add("unn");
  opencards[1].classList.add("unn");

  disable();
  setTimeout(function() {
    opencards[0].classList.remove("show", "open", "no-event", "unn");
    opencards[1].classList.remove("show", "open", "no-event", "unn");

    enable();
    opencards = [];
  }, 200);
}
// TODO: to disable the card
function disable() {
  Array.prototype.filter.call(cards, function(cards) {
    card.classList.add('disabled');
  });
}
var matchedcards = document.getElementsByClassName('.match')
// TODO: to enable the card
function enable() {
  Array.prototype.filter.call(cards, function(cards) {
    cards.classList.remove('disabled');
    for (var i = 0; i < matchedcards.length; i++) {
      //console.log(matchedcards);
      matchedcards[i].classList.add("disabled");
    }
  });


}
var stars = Array.prototype.slice.call(document.querySelectorAll(".fa-star"));
// TODO: count player's moves
var tries = 0;
let countermoves = document.querySelector('.tries');
var starcount = 3;

function moveCounter() {
  tries++;

  countermoves.innerHTML = tries;
  // TODO: start timer on first click
  if (tries == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
  // setting rates based on moves
  // move counter functions to decrease stars
// TODO: gaming pattern

  if (tries > 10 && starcount == 3) {
    stars[starcount - 1].classList.add("fa-star-o");
    starcount--;
  }
  if (tries > 20 && starcount == 2) {
    stars[starcount - 1].classList.add("fa-star-o");
    starcount--;
  }
  if (tries > 30 && starcount == 1) {
    stars[starcount - 1].classList.add("fa-star-o");
    starcount--;
// TODO: when the player lost the game
    swal({

      title: "out of lives",
      text: "BETER LUCK NEXT TIME",


    }).then(function() {
      location.reload();
    });

    //  reseter1();
  }
}


// TODO: tarting the startTimer
var second = 0,
  minute = 0,
  hour = 0;
var timer = document.querySelector('.timer');
var interval;

function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + "M   -  " + second + "S     -  " + hour + "H";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
    }
  }, 1000);
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
