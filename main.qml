import QtQuick 2.5
import QtQuick.Window 2.2
import QtQuick.Controls 2.0

import "script.js" as Script

Window {
    id: board
    visible: true
    width: 640
    height: 480
    title: qsTr("8-Puzzle")

    Column{
        spacing: 10
        x: 100
        y: 100

        Button {
            text: "Shuffle"
            width: 60
            height: 30

            onClicked: {
                console.log("Button clicked!");
                Script.shuffle()
            }
        }

        GameBoard {}

    }

}
