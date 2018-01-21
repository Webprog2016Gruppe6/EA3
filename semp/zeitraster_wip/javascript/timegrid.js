		
		function sendeFkt() {

		sendForm();
		getTime(1);
		
		}
		
		
	function sendForm() {

	//get value of the static input fields 
	var input_vname = document.getElementById("vorname");
    var input_nname = document.getElementById("nachname");
    var input_klasse = document.getElementById("klasse");
	var input_schule = document.getElementById("schule");
	var input_schuljahr = document.getElementById("schuljahr");
	var input_klassenlehrer = document.getElementById("klassenlehrer");

		var sendObjektText = {
		'vorname': input_vname.value,
		'nachname': input_nname.value,
		'klasse': input_klasse.value,
		'schule': input_schule.value,
		'schuljahr': input_schuljahr.value,
		'input_klassenlehrer': klassenlehrer.value,
		};
		
		var sendObjektTime = getTimeInput();
		dbTransaction(sendObjektText, sendObjektTime);
		
	}


		var helpNode;
		//Onload, save the starting Formlayout

		document.addEventListener("DOMContentLoaded", function(event) { 
		helpNode = document.getElementById('timeInput');
		helpNode = helpNode.cloneNode(true);

		});

		function changeTime() {

		var inputControl = document.getElementById('inputControl');
		
		//Standard Option, Reset all Field to old, Disable Input
		if(document.getElementById('standardTime').checked) {

		helpNode = document.getElementById('timeInput');
		helpNode = helpNode.cloneNode(true);


			var j = document.getElementsByName("rowWrap").length;

			while (j > 6) {

			    deleteInput();
			    j--;

		}	

		var y = document.getElementsByName("t1");
		var i;
		for (i = 0; i < y.length; i++) {

			y[i].value = y[i].defaultValue;
			y[i].disabled = true;	

		}

		//Hide Button Add & Delte
		inputControl.hidden = true;

		//Allow to change input
		}else if(document.getElementById('customTime').checked) {
			document.getElementById('timeInput').replaceWith(helpNode);
			var y = document.getElementsByName("t1");
			var i;
			for (i = 0; i < y.length; i++) {
				y[i].disabled = false;
			}
			inputControl.hidden = false;
			
		}
		
				
		}

		// This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;


// Open (or create) the database
var open = indexedDB.open("MyDatabase", 1);

// Create the schema
open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
    //var index = store.createIndex("NameIndex", ["name.last", "name.first"]);
	var indexStundenplan = store.createIndex("StundenplanIndex", ["Stundenplanname","info","Vorname",
		"Nachname","Klasse","Schule","Schuljahr","Klassenlehrer"]);
};
		//alert("1");

function dbTransaction(sendObjektText, sendObjektTime) {

    var db = open.result;
    var tx = db.transaction("MyObjectStore", "readwrite");
    var store = tx.objectStore("MyObjectStore");

    store.put({id: 12345, info:sendObjektText , timegrid:sendObjektTime});
    
    var stored = store.get(12345);


    stored.onsuccess = function() {
		//var getStundenplan = store.get(10);
		indexStundenplan = stored.get("StundenplanIndex");
		indexStundenplan.onsuccess = function (ev) {
			alert(indexStundenplan.result.info);
			alert("Daten wurden eingetragen!");
		};

		getStundenplan.onsuccess = function () {
			alert(getStundenplan.result.timegrid);

		};

    };

    tx.oncomplete = function() {
        db.close();
    };
}

function getTimeInput() {

    var x = document.getElementsByName("t1");
    var i;
    var jsonTest = {};
    for (i = 0; i < x.length; i++) {
    	var newUser = "time" + i;
   		var newValue = x[i].value;
    	jsonTest[newUser] = newValue;
    }
    return jsonTest;
}

function getTime(hour) {  
    var db = open.result;
    var tx = db.transaction("MyObjectStore", "readwrite");
    var store = tx.objectStore("MyObjectStore");

    var x = store.get(12345);

    x.onsuccess = function() {
    	var a = 'time' + (hour - 1);
    	var b = 'time' + hour;

    };

    tx.oncomplete = function() {
    db.close();
    }
}

const startingHour = 6;
function createInput() {  

	var pos = document.getElementsByName('rowWrap').length  + 1;

	var newDiv = document.createElement("div"); 
	newDiv.setAttribute("name", "rowWrap");

	var newInput = document.createElement("input"); 
	newInput.setAttribute("type", "time");
	newInput.setAttribute("value", "00:00");
	newInput.setAttribute("name", "t1");
  	
  	newDiv.appendChild(document.createTextNode(pos + ".Stunde")); 
	newDiv.appendChild(newInput); 
  	newDiv.appendChild(document.createTextNode(" - "));

  	newDiv.appendChild(newInput.cloneNode()); 
  	//need cloneing otherwise its just replacing the stuff and put it at the end


  document.getElementById("timeInput").appendChild(newDiv);

}

function deleteInput() {
	var pos = document.getElementsByName('rowWrap').length + 1;

	if (pos > startingHour) {
	var timeI = document.getElementById("timeInput");
	timeI.removeChild(timeI.lastChild);
	}
}
