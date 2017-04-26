import QtQuick 2.0

Item {
    property string label: ""
    property int block_size: 50
    property var position: [0,0]
    property int margin: 5

    width: block_size
    height: block_size

    x: margin + block_size * position[1]
    y: margin + block_size * position[0]

    Rectangle {
        anchors.fill: parent
        color: "green"
        radius: block_size/4

        Text {
            anchors.centerIn: parent
            text: label
            font.bold: true
            font.pixelSize: block_size * 3 / 5
            color: "yellow"
        }
    }

}
