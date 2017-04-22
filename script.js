.pragma library
.import QtQuick 2.0 as QtQuick

var blockSrc = "./Block.qml";
var component = Qt.createComponent(blockSrc);
var board_size = 3;
var arr_len = board_size * board_size;
var board = new Array(arr_len);
var pos0 = 0;


function createBlocks(parent) {

    if (component.status !== QtQuick.Component.Ready) {
        console.error("Error: Component is not ready.");
        return;
    }

    var ii, jj, nth = 0;

    for (ii = 0; ii < board_size; ii++) {
        for (jj = 0; jj < board_size; jj++) {
            var block = component.createObject(parent, {
                                                   "position": [ii, jj],
                                                   "label":nth
                                               });
            board[nth] = block;
            nth += 1;
        }
    }

    pos0 = 0;

}

function moveWest() {
    // swap array position
    if (pos0 % board_size < board_size - 1) {
        var temp = board[pos0].label;
        board[pos0].label = board[pos0+1].label;
        board[pos0+1].label = temp;
        pos0 ++;
    }
}

function moveEast() {
    // swap array position
    if (pos0 % board_size > 0 ) {
        var temp = board[pos0].label;
        board[pos0].label = board[pos0 - 1].label;
        board[pos0 - 1].label = temp;
        pos0 --;
    }
}

function moveSouth() {
    // swap array position
    if (pos0 >= board_size ) {
        var temp = board[pos0].label;
        board[pos0].label = board[pos0 - board_size].label;
        board[pos0 - board_size].label = temp;
        pos0 -= board_size;
    }
}

function moveNorth() {
    // swap array position
    if (pos0 < arr_len - board_size ) {
        var temp = board[pos0].label;
        board[pos0].label = board[pos0 + board_size].label;
        board[pos0 + board_size].label = temp;
        pos0 += board_size;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle() {
    for (var ii=0; ii<10000; ii++) {
        switch(getRandomInt(0, 3)) {
        case 0:
            moveNorth();
            break;
        case 1:
            moveEast();
            break;
        case 2:
            moveSouth();
            break;
        case 3:
            moveWest();
            break;
        }
    }
}
