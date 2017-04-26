import QtQuick 2.0
import "board.js" as BoardJS


Item {
    id: game_board
    property int margin: 5
    property int block_wid: 50

    width: block_wid * 3 + 2 * margin
    height: block_wid * 3 + 2 * margin

    Rectangle {
        id: board
        anchors.fill: parent
        color: "yellow"
        border.color: "black"
        border.width: margin - 1
    }


    //anchors.centerIn: parent

    Component.onCompleted: {
        BoardJS.board.init(board);
    }

    focus: true

    Keys.onLeftPressed: {
        console.log("Left key pressed.");
        BoardJS.board.moveWest();
    }

    Keys.onRightPressed: {
        console.log("Right key pressed.");
        BoardJS.board.moveEast();
    }

    Keys.onUpPressed: {
        console.log("Up key pressed.");
        BoardJS.board.moveNorth();
    }

    Keys.onDownPressed: {
        console.log("Down key pressed.");
        BoardJS.board.moveSouth();
    }

    MouseArea {
        anchors.fill: parent
        onClicked: {
            parent.focus = true
        }
    }
}
