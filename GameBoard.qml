import QtQuick 2.0
import "script.js" as Script


Item {
    id: game_board
    property var margin: 5
    property var block_wid: 50

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
        Script.createBlocks(game_board);
    }

    focus: true

    Keys.onLeftPressed: {
        console.log("Left key pressed.");
        Script.moveWest();
    }

    Keys.onRightPressed: {
        console.log("Right key pressed.");
        Script.moveEast();
    }

    Keys.onUpPressed: {
        console.log("Up key pressed.");
        Script.moveNorth();
    }

    Keys.onDownPressed: {
        console.log("Down key pressed.");
        Script.moveSouth();
    }

    MouseArea {
        anchors.fill: parent
        onClicked: {
            parent.focus = true
        }
    }
}
