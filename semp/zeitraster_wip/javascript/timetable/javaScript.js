
/*hier kommt JavaScriptCode*/

/*Drag and Drop
 * http://www.w3schools.com/html/html5_draganddrop.asp*/
function droppenErlauben(event) {
    event.preventDefault();

}

function draggenInnerTable(event) {
    event.dataTransfer.setData("text", event.target.id);
    //event.dataTransfer.effectAllowed ='copy';


}

function droppenInnerTable(event)  {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    //$('<div>').text(val).appendTo(event.target);
   // event.target.appendChild(document.getElementById(data));
   // event.dataTransfer.dropEffect ='copy';
   var nodeCopy = document.getElementById(data).cloneNode(true);
    nodeCopy.id = "newId";
    event.target.appendChild(nodeCopy);
   /* if (ev.ctrlKey)
    {
        var nodeCopy = document.getElementById(data).cloneNode(true);
        nodeCopy.id = "newId"; /* We cannot use the same ID
        ev.target.appendChild(nodeCopy);
    }
    else
        ev.target.appendChild(document.getElementById(data));*/

}

//Werte aus dem Timegrid in die Stundenplaner schreiben
function writeValue(id,a) {
    document.getElementById("Stunde1").firstChild.nodeValue = a;
    document.getElementById("Stunde2").firstChild.nodeValue = a;
    document.getElementById("Stunde3").firstChild.nodeValue = a;
    document.getElementById("Stunde4").firstChild.nodeValue = a;
    document.getElementById("Stunde5").firstChild.nodeValue = a;
    document.getElementById("Stunde6").firstChild.nodeValue = a;
}



        // This works on all devices/browsers
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;


// Open (or create) the database
var open = indexedDB.open("MyDatabase", 1);

// Create the schema
open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
    var indexStundenplan = store.createIndex("StundenplanIndex", ["Stundenplanname","info","Vorname",
        "Nachname","Klasse","Schule","Schuljahr","Klassenlehrer"]);
};
/* Generate Matrix */

function generate_matrix(weekmode){
// weekmode set days-array with five or six days
    if(weekmode == "mosa"){
        var days = ["Mo", "Di","Mi","Do","Fr","Sa"];
    }else{
        var days = ["Mo", "Di","Mi","Do","Fr"];
    }
    // possible hours
    var hours = ["x","1","2","3","4","5","6","7","8"];

    // write table-like div (eq. to <table> -tag
    document.write("<div class=\"table\">");
    // each hour a new row (like <tr>
    for (var i=0 ; i<hours.length;i++){
        document.write("<div class=\"row\">");
        // and the cells for containing the values
        document.write("<div class=\"cell\">");
        // only from 1 to 8, x is for a void cell
        if(i>0) {
            document.write(hours[i] + ".Std");
        }
        document.write("</div>");
        // and then in each row the days
        for (var j=0 ; j<days.length;j++) {
            document.write("<div class=\"cell\">");
            // in the first line (the  'x'-line from hours) the name of the day
            if(i==0){
                document.write(days[j]);
            }else{
                // otherwise the checkbox, which have within the combined value for the id
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
/* diese Funktion ist nur vorläufig, mit jQuery sinnvoller */
function saveSubject(){
    // helping var
    var errors = 0;

    //validate each element
    // fetch element
    var name = document.getElementById("subject_name");
    // check if void
    if (name.value == ""){
        // increment error counter
        errors++;
        // change backcolor to red
        name.style.color = "#ff0000"
    }

    // same thing here
    var teacher = document.getElementById("subject_teacher");
    if (teacher.value == ""){
        errors++;
        teacher.style.color = "#ff0000"
    }
    // same thing here
    var room = document.getElementById("subject_room");
    if (room.value == ""){
        errors++;
        room.style.color = "#ff0000"
    }
    // Test output
    alert(errors)
    // nur wenn kein Fehler, dann wird Fach gespeichert
    if(errors == 0){
        // Hier speichern
        return true;
    }else{
        return false;
    }

}


function getTime() {  
    var db = open.result;
    var tx = db.transaction("MyObjectStore", "readwrite");
    var store = tx.objectStore("MyObjectStore");

    let x = store.get(12345);

    var hourobj;
    var firstrows = document.getElementsByName('first');
    x.onsuccess = function() {

        var numberofInput = (Object.keys(x.result.timegrid).length) / 2 ;
        console.log(numberofInput);
        if (6 < numberofInput) {

            var z = 0;
            numberofInput = numberofInput - 6; 
            console.log(numberofInput);
            while(numberofInput > z) {
                createNewRow();
            z+=2;
            
            }    

        }


        var i = 0;
        var j = 0;

        while (i < firstrows.length) {

            let a = 'time' + j;
            a = x.result.timegrid[a];
            let b = 'time' + (j+1);
            b = x.result.timegrid[b];
            firstrows[i].innerHTML = (i + 1)+".Stunde " + '<br>' + a + " - " + b;

            i++;
            j+=2;
        }
    };

    tx.oncomplete = function() {
    db.close();
    }
}

/*Source: www.w3schools.com */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

document.addEventListener("DOMContentLoaded", function(event) { 
        
        if(getCookie('timegridflag') == 'set') {
            getTime();
        }


});

function test(){
    getTime();
    //createNewRow();
}


var cellNR = 6;
function createNewRow(){

    var c = document.getElementById("days").childElementCount;

    var table = document.getElementById("stundenplaner");
    var row = table.insertRow(-1);

for (var i = 0; i < c; i++) {
    let cell1 = row.insertCell(i);
    cell1.ondrop=new Function('F','droppenInnerTable(event)');
    cell1.ondragover=new Function('F','droppenErlauben(event)');
}
    let cell1 = row.insertCell(0);
    cell1.setAttribute("name", "first");
    cell1.innerHTML = ++cellNR + '.';
}

function deleteOldRow(){
    document.getElementById("stundenplaner").deleteRow(-1);
    cellNR--; 
}