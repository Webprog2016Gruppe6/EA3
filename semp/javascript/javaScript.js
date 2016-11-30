/*hier kommt JavaScriptCode*/

/*Drag and Drop*/
function allowDrop(ev) {
    event.preventDefault();
}

function drag(ev) {
    event.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    event.preventDefault();
    var data = ev.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}