const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let noClicking = false;
let cardsFlipped = 0;

const COLORS = [
  'images/image1.gif',
  'images/image2.gif',
  'images/image3.gif',
  'images/image4.gif',
  'images/image5.gif',
  'images/image1.gif',
  'images/image2.gif',
  'images/image3.gif',
  'images/image4.gif',
  'images/image5.gif'
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    const newImg = document.createElement('img');
    newImg.setAttribute('src', color);
    newImg.setAttribute('width', '100');
    newImg.setAttribute('height', '100');
    newImg.setAttribute('alt', './images/default.png');
    newImg.classList.add('hide');
    

    // give it a class attribute for the value we are looping over
   // newDiv.classList.add();
    newDiv.appendChild(newImg);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", e.target.firstChild);

  // Get out of here! If the card is already flipped up, or cannot be clicked. 
  if(noClicking) { return; }
  if(e.target.classList.contains('flipped')) { return; }

  // Get the current card that has been clicked. 
  let currentCard = e.target.firstChild; 
  currentCard.style.visibility = 'visible';

  // If neither of the two cards do not exist. 
  if(!card1 || !card2){
    currentCard.classList.add('flipped');
    card1 = card1 || currentCard;
    card2 = (currentCard === card1 ? null : currentCard);
  }

  // If the two card exists. 
  if(card1 && card2){
    noClicking = true;

    let color1 = card1.getAttribute('src');
    let color2 = card2.getAttribute('src'); 
    
    // Check if the two cards match. 
    if(color1 === color2){
      card1.removeEventListener('click', handleCardClick);
      card2.removeEventListener('click', handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false; 
      cardsFlipped += 2;
    } else{ // If the two cards do not match, set back their default style with 1 sec delay.
        console.log('Cards do not match must appear!');
        setTimeout(function(){
        console.log('card1 has: ' + card1)
        console.log('card2 has: ' + card2)
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.style.visibility = 'hidden';
        card2.style.visibility = 'hidden';
        card1 = null;
        card2 = null;
        noClicking = false; 
      }, 1000)
    }
  }
  if (cardsFlipped === COLORS.length) alert("game over!");
}

// when the DOM loads
createDivsForColors(shuffledColors);
