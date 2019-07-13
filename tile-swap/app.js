//A simple tile swapping game

//shuffle tiles using Fisher Yates shuffle
function shuffle(array) {
    var m = array.length;
        var t;
        var i;
    // While there remain elements to shuffle
    while (m) {
        // Pick a remaining element
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
}

//set up board
var setBoard = function(num, size) {
    var totalTiles = num * num; //rows x columns of tiles.
    var boardSize = num * size; //width/height of board
    document.getElementById('board-size').innerHTML = `${boardSize  }px big`;
    document.getElementById('total-tiles').innerHTML = `${totalTiles  } tiles`;
    tileList[totalTiles - 1] = totalTiles - 1;
    for (var i = 0; i < tileList.length; i++) {
        tileList[i] = i;
    }
    shuffle(tileList);
};
// Make a board and fill with array elements
tileList = [];
setBoard(3, 100);
tile = 0;
console.log(`${tile  } initial`);
var myTile = function(el) {
    tile = parseInt(el.id, 10);
    document.getElementById('my-tile').innerHTML = tile;
    makeMove();
};

function makeTiles(array) {
    listContainer = document.createElement('div');
    // add it to the page

    document.getElementsByTagName('section')[0].appendChild(listContainer);
    var listElement = document.createElement('ul');
    // add it to the page
    listContainer.appendChild(listElement);
    // Set up a loop that goes through the items in listItems one at a time
    var numberOfListItems = array.length;
    for (var i = 0; i < numberOfListItems; ++i) {
        // create a <li> for each one.
        var listItem = document.createElement('li');
        listItem.id = array[i];
        listItem.className = `tile tile-${  array[i]}`;
        listItem.setAttribute('onclick', 'myTile(this)');
        // add the item text
        listItem.innerHTML = ' ';
        // add listItem to the listElement
        listElement.appendChild(listItem);
    }
}
makeTiles(tileList);

//swap selected tile with blank tile
function swapTiles(array) {
    //var tile = parseInt(prompt("Please enter a number to swap with 0"), 10);
    // identify the index position of my tile

    var tilePos = array.indexOf(tile);
    // identify the index position of the blank tile
    document.getElementById('my-tile-pos').innerHTML = tilePos;
    var blankPos = array.indexOf(0);
    document.getElementById('blank-tile-pos').innerHTML = blankPos;
    //swap them over
    t = array[tilePos];
    array[tilePos] = array[blankPos];
    array[blankPos] = t;
}

function isSorted(array) {
    var len = array.length - 1;
    for (var i = 0; i < len; ++i) {
        if (array[i] > array[i + 1]) {
            return false;
        }
    }
    return true;
}
//Play the game
function startGame() {
    makeMove();
}

function makeMove() {
    swapTiles(tileList);
    document.getElementById('shuffled-tiles').innerHTML = `${tileList  } tiles`;
    document.getElementsByTagName('section')[0].removeChild(listContainer);
    makeTiles(tileList);

    //Test to see if they are sorted yet
    if (!isSorted(tileList)) {
        document.getElementById('ask-sorted').innerHTML = 'Nope, not yet.';
    } else {
        alert('Fireworks, sparkling moondust, you are indeed blessed to be still in charge!');
    }
}
