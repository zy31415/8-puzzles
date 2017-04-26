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

