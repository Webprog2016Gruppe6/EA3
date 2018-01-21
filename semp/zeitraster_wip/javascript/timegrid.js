
function sendeFkt() {
	sendForm();
	setCookie('timegridflag','set', 30); 	

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
	}
	
	var sendObjektTime = getTimeInput();
	dbTransaction(sendObjektText, sendObjektTime);
	
};		


var helpNode
//Onload, save the starting Formlayout

document.addEventListener("DOMContentLoaded", function(event) { 
	helpNode = document.getElementById('timeInput');
	helpNode = helpNode.cloneNode(true);

});

		/*Switch between Default & own values*/
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

	//Hide Button Add & Delete
	inputControl.hidden = true;

	//Allows to change input, load old input
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

function dbTransaction(sendObjektText, sendObjektTime) {

    var db = open.result;
    var tx = db.transaction("MyObjectStore", "readwrite");
    var store = tx.objectStore("MyObjectStore");

    store.put({id: 12345, info:sendObjektText , timegrid:sendObjektTime});
    
    var stored = store.get(12345);

    stored.onsuccess = function() {
    	return;

    };

    tx.oncomplete = function() {
        db.close();
    };
}

function getTimeInput() {

    var x = document.getElementsByName("t1");
    var i;
    var arrayTime = {};
    for (i = 0; i < x.length; i++) {
    	var newUser = "time" + i;
   		var newValue = x[i].value;
    	arrayTime[newUser] = newValue;
    }
    return arrayTime;
}

function getTime() {  
    var db = open.result;
    var tx = db.transaction("MyObjectStore", "readwrite");
    var store = tx.objectStore("MyObjectStore");

    let x = store.get(12345);

	var hourobj;
	var firstrows = document.getElementsByName('first');
    x.onsuccess = function() {

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
    return hourobj;
}

const startingHour = 6;
function createInput() {  

	let pos = document.getElementsByName('rowWrap').length  + 1;

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
	let pos = document.getElementsByName('rowWrap').length + 1;

	if (pos > startingHour) {
	var timeI = document.getElementById("timeInput");
	timeI.removeChild(timeI.lastChild);
	}
}

/*Source: www.w3schools.com */
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

function testcookie(){
	getTime();

}

function test(){
	sendForm();
}