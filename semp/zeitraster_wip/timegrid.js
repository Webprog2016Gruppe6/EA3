		
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

		var sendeObjektText = {
		'vorname': input_vname.value,
		'nachname': input_nname.value,
		'klasse': input_klasse.value,
		'schule': input_schule.value,
		'schuljahr': input_schuljahr.value,
		'input_klassenlehrer': klassenlehrer.value,
		}
		
		var sendeObjektZeitzahl = getTimeInput();
		dbTransaction(sendeObjektText, sendeObjektZeitzahl);
		
	};		


		var helpNode
		//Onload, save the starting Formlayout

		document.addEventListener("DOMContentLoaded", function(event) { 
		helpNode = document.getElementById('timeInput');
		helpNode = helpNode.cloneNode(true);

		});

		function changeTime() {

		let inputControl = document.getElementById('inputControl');	
		
		//Standard Option, Reset all Field to old, Disable Input
		if(document.getElementById('standardTime').checked) {

		helpNode = document.getElementById('timeInput');
		helpNode = helpNode.cloneNode(true);


			var j = document.getElementsByName("rowWrap").length;

			while (j > 6) {

			    deleteInput();
			    j--;

		}	

		let y = document.getElementsByName("t1");
		let i;	
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
};

function dbTransaction(sendeObjektText, sendeObjektZeitzahl) {

    var db = open.result;
    var tx = db.transaction("MyObjectStore", "readwrite");
    var store = tx.objectStore("MyObjectStore");

    store.put({id: 12345, info:sendeObjektText , timegrid:sendeObjektZeitzahl});
    
    var getJohn = store.get(12345);

    getJohn.onsuccess = function() {
        //console.log(getJohn.result.info.vorname);  // => "John"
        //console.log(getJohn.result.timegrid.time1);

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

    let x = store.get(12345);

    x.onsuccess = function() {
    	let y = 'time' + (hour - 1);
    	let z = 'time' + hour;
    };
    tx.oncomplete = function() {
    db.close();
    }
}

const startingHour = 6;
function createInput() {  

	let pos = document.getElementsByName('rowWrap').length  + 1;

	var newDiv = document.createElement("div"); 
	newDiv.setAttribute("name", "rowWrap");

	var newInput = document.createElement("input"); 
	newInput.setAttribute("type", "time");
	newInput.setAttribute("value", "00:00");
  	
  	newDiv.appendChild(document.createTextNode(pos + ".Stunde")); 
	newDiv.appendChild(newInput); 
  	newDiv.appendChild(document.createTextNode(" - "));

  	newDiv.appendChild(newInput.cloneNode()); 
  	//need cloneing otherwise its just replacing the stuff and put it at the end


  document.getElementById("timeInput").appendChild(newDiv);

}

function deleteInput() {
	let pos = document.getElementsByName('rowWrap').length + 1;

	if (pos > startingHour) {
	var timeI = document.getElementById("timeInput");
	timeI.removeChild(timeI.lastChild);
	}
}

function saveCurrentTimeInput(){


}