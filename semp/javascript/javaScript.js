/*hier kommt JavaScriptCode*/

/*Drag and Drop
* http://www.w3schools.com/html/html5_draganddrop.asp*/
function droppenErlauben(event) {
    event.preventDefault();

}

function draggenInnerTable(event) {
    event.dataTransfer.setData("text", event.target.id);

}

function droppenInnerTable(event)  {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));


}

/*Indexed DB*/


// This works on all devices/browsers, and uses IndexedDBShim as a final fallback
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
var open = indexedDB.open("Stundenplaner", 1);

// Create the schema
open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
    var indexStundenplan = store.createIndex("StundenplanIndex", ["Stundenplanname",
        "Faecher", "Tage", "Professoren" ]);
    /*Es wird ein Index für die einzelnen Stundenpläne angelegt. Pro angelegtem Stundenplan gibt es
    * den Stundenplanername, die abgespeicherten Fächer und deren Aufteilung auf die Tage, die
    * abgespeicherten Professoren zu den einzelnen Fächer.*/
};
//Datenbank wird geöffnet
open.onsuccess = function() {

    var db = open.result;
    var tx = db.transaction("MyObjectStore", "readwrite");
    var store = tx.objectStore("MyObjectStore");
    var indexStundenplan = store.index("StundenplanIndex");



    store.put({id: 10, Stundenplanname: "MeinStundenplan", Tage:"Samstag"});



    var getStundenplan = store.get(10);


    getStundenplan.onsuccess = function() {
        alert(getStundenplan.result.Tage);
    };

    // Datenbank wird geschlossen
    tx.oncomplete = function() {
        db.close();
    };
}