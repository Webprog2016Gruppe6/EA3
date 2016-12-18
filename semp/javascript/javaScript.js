
/*hier kommt JavaScriptCode*/

/*Drag and Drop
 * http://www.w3schools.com/html/html5_draganddrop.asp*/
function droppenErlauben(event) {
    event.preventDefault();

}

function draggenInnerTable(event) {
    event.dataTransfer.setData("text", event.target.id);
    event.dataTransfer.effectAllowed ='copy';

}

function droppenInnerTable(event)  {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    //$('<div>').text(val).appendTo(event.target);
    event.target.appendChild(document.getElementById(data));
    event.dataTransfer.dropEffect ='copy';
}


/*Indexed DB*/


//  gewährt Interbrowserkompabilität
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Öffnen der Datenbank
var request = indexedDB.open("Stundenplaner");

// Datenbankindex wird erstellt
request.onupgradeneeded = function() {
    var database = request.result;
    var store = database.createObjectStore("MyObjectStore", {keyPath: "id"});
    var indexStundenplan = store.createIndex("StundenplanIndex", ["Stundenplanname",
        "Faecher", "Tage", "Professoren" ]);
    /*Es wird ein Index für die einzelnen Stundenpläne angelegt. Pro angelegtem Stundenplan gibt es
     * den Stundenplanername, die abgespeicherten Fächer und deren Aufteilung auf die Tage, die
     * abgespeicherten Professoren zu den einzelnen Fächer.*/
};
//Datenbank wird u.a. beschrieben
request.onsuccess = function() {

    var database = request.result;
    var transaction = database.transaction("MyObjectStore", "readwrite");
    var store = transaction.objectStore("MyObjectStore");
    var indexStundenplan = store.index("StundenplanIndex");


    store.put({id: 10, Stundenplanname: "MeinStundenplan", Tage: "Samstag"});


    var getStundenplan = store.get(10);


    getStundenplan.onsuccess = function () {
        alert(getStundenplan.result.Tage);
    };

    // Datenbank wird geschlossen
    transaction.oncomplete = function () {
        database.close();
    };
}