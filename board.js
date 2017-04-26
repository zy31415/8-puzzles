.pragma library
.import QtQuick 2.0 as QtQuick
.import "blocks.js" as BlocksJS

var board_size = 3;


// Define Board class
// class constructor
function Board(board_size) {
    this.board_size = board_size;
    this.blocks = new BlocksJS.Blocks(board_size);

    this.initConf = new Array(board_size);
    this.conf = new Array(board_size);
    this.pos0 = 0;

    // private members
    }

Board.prototype = {
    // Init Board class
    init: function(parentItem, initConf) {
        var obj = this;

        obj.blocks.create(parentItem);
        setInitConf(initConf);
        setConf();
        obj.blocks.show();


        function setConf(parent) {
            for (var ii=0; ii < obj.board_size; ii++) {
                obj.conf[ii] = new Array(obj.board_size);

                for (var jj=0; jj<obj.board_size; jj++) {

                    var nth = obj.initConf[ii][jj];

                    if (nth === 0) {
                        obj.pos0 = [ii, jj];
                    } else {
                        obj.blocks.get(nth).position = [ii, jj];
                    }
                    obj.conf[ii][jj] = nth;
                }
            }
        }

        function setInitConf(initConf) {
            if (initConf === undefined) {
                var nth = 0;
                for (var ii = 0; ii < obj.board_size; ii++) {
                    obj.initConf[ii] = new Array(board_size);
                    for (var jj = 0; jj < obj.board_size; jj++) {
                        obj.initConf[ii][jj] = nth;
                        nth++;
                    }
                }
                return;
            }

            // Do a deep copy
            obj.initConf = initConf.slice(0);
        }


    },

    moveWest: function() {
        // 0 block position
        var m0 = this.pos0[0];
        var n0 = this.pos0[1];

        // moving block position
        var m1 = m0;
        var n1 = n0 + 1;


        if (n1 < this.board_size)
            this._update_conf(m0, n0, m1, n1);
    },

    moveEast: function() {
        // 0 block position
        var m0 = this.pos0[0];
        var n0 = this.pos0[1];

        // moving block position
        var m1 = m0;
        var n1 = n0 - 1;

        if (n1 >= 0)
            this._update_conf(m0, n0, m1, n1);
    },

    moveSouth: function() {
        // 0 block position
        var m0 = this.pos0[0];
        var n0 = this.pos0[1];

        // moving block position
        var m1 = m0 - 1;
        var n1 = n0;

        if (m1 < this.board_size)
            this._update_conf(m0, n0, m1, n1);
    },

    moveNorth: function() {
        // 0 block position
        var m0 = this.pos0[0];
        var n0 = this.pos0[1];

        // moving block position
        var m1 = m0 + 1;
        var n1 = n0;

        if (m1 >= 0)
            this._update_conf(m0, n0, m1, n1);

    },

    _update_conf: function _update_conf (m0, n0, m1, n1) {
        // get block reference number
        var nth_block = this.conf[m1][n1];

        // change position
        this.blocks.get(nth_block).position = [m0, n0];

        // Update configuration matrix
        this.conf[m1][n1] = 0;
        this.conf[m0][n0] = nth_block;

        this.pos0 = [m1, n1];
    }
}


var board = new Board(board_size);
