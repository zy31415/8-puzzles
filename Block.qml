import QtQuick 2.0

Item {
    property alias text: label.text

    width: 50
    height: 50

    visible: label.text != "0"

    Rectangle {
        anchors.fill: parent
        color: "green"
        radius: parent.width/4

        Text {
            id: label
            anchors.centerIn: parent
            text: ""
            font.bold: true
            font.pixelSize: 30
            color: "yellow"
        }
    }

}
