
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



/* Generate Matrix */
function generate_matrix(weekmode){
    if(weekmode == "mosa"){
        var days = ["Mo", "Di","Mi","Do","Fr","Sa"];
    }else{
        var days = ["Mo", "Di","Mi","Do","Fr"];
    }
    var hours = ["x","1","2","3","4","5","6","7","8"];

    document.write("<div class=\"table\">");
    for (var i=0 ; i<hours.length;i++){
        document.write("<div class=\"row\">");
        document.write("<div class=\"cell\">");
        if(i>0) {
            document.write(hours[i] + ".Std");
        }
        document.write("</div>");

        for (var j=0 ; j<days.length;j++) {
            document.write("<div class=\"cell\">");
            if(i==0){
                document.write(days[j]);
            }else{
                document.write("<input type='checkbox' id='" + days[j].toLocaleLowerCase() + "_" + hours[i] +"' />");
            }
            document.write("</div>");
        }
        document.write("</div>");
    }
    document.write("</div>");

}

/* save subject */
/* Umsetzung mit jQuery ist evtl sinnvoller. */

function saveSubject(){
    var errors = 0;

    //validate each element
    var name = document.getElementById("subject_name");
    if (name.value == ""){
        errors++;
        name.style.color = "#ff0000"
    }

    var teacher = document.getElementById("subject_teacher");
    if (teacher.value == ""){
        errors++;
        teacher.style.color = "#ff0000"
    }

    var room = document.getElementById("subject_room");
    if (room.value == ""){
        errors++;
        room.style.color = "#ff0000"
    }

    alert(errors)
    // nur wenn kein Fehler, dann wird Fach gespeichert
    if(errors == 0){
        // Hier speichern
        return true;
    }else{
        return false;
    }

}