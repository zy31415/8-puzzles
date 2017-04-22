.pragma library
.import QtQuick 2.0 as QtQuick

var board_size = 3;

// Define Blocks class to manage all blocks.
// class constructor
function Blocks(board_size) {
    this.num_blocks = board_size * board_size - 1;

    // Buffer to store block objects
    this._array = new Array(this.num_blocks + 1);
}

// Static variable shared by all instances
Blocks.block_source = "./Block.qml"
Blocks.block_component = Qt.createComponent(Blocks.block_source);

Blocks.prototype = {
    create: function(parent) {
        this._array[0] = null;
        for (var ii = 1; ii < this.num_blocks + 1; ii++)
            this._array[ii] = Blocks.block_component.createObject(parent, {"label": ii.toString(), "visible": false});
    },

    show: function() {
        for (var ii = 1; ii < this.num_blocks + 1; ii++) {
            this._array[ii].visible = true;
        }
    },

    get: function(nth) {
        if (nth <= 0 || nth > this.num_blocks) {
            throw "Out of range.";
        }

        return this._array[nth];
    }
}

// Put nth block into the position of the board indicated by pos.
function emplace(nth, pos) {

    var _block = blocks[nth];

    // This actual change the position of block nth:
    if (_block !== null)
        _block.position = pos;

    // board is used for tracking, update board.
    board[pos[0]][pos[1]] = _block;
}


// Define Board class
// class constructor
function Board(board_size, initConf) {
    this.board_size = board_size;
    this.blocks = new Blocks(board_size);

    this.initConf = getInitConf(initConf);

    function getInitConf(initConf) {
        if (initConf === undefined) {
            var arr = new Array(board_size);
            var nth = 0;

            for (var ii = 0; ii < board_size; ii++) {
                arr[ii] = new Array(board_size);
                for (var jj = 0; jj < board_size; jj++) {
                    arr[ii][jj] = nth;
                    nth++;
                }
            }

            return arr;
        }
        return initConf;
    }
}

Board.prototype = {
    // Init Board class
    init: function(parent) {
        this.blocks.create(parent);
        this.blocks.show();

        for (var ii=0; ii<this.board_size; ii++) {
            for (var jj=0; jj<this.board_size; jj++) {

                if (ii === 0 && jj === 0)
                    continue;

                var nth = this.initConf[ii][jj];
                console.log(nth);
                var _block = this.blocks.get(nth);
                _block.position = [ii, jj];
            }
        }

    }

}

var board = new Board(board_size);


function createBlocks(parent) {

    if (Blocks.block_component.status !== QtQuick.Component.Ready) {
        console.error("Error: Component is not ready.");
        return;
    }

    blocks.createBlocks(parent);

    blocks.show();

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
