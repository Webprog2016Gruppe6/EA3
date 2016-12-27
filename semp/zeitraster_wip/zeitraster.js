		function sendeFkt() {
		console.log("send Fkt open"); //delete	
		speichereFormAlsObjekt();
		// Platzhalter fuer evtl. weitere Funktionen
		}
		
		
	//Erste Funktionalität: Sammle alle Eingaben als Objekte und konvertiere sie in JSON für zukünftige Operationen	
	function speichereFormAlsObjekt() {
	//allgemeine Daten für Variablen
	var input_vname = document.getElementById("vorname");
    var input_nname = document.getElementById("nachname");
    var input_klasse = document.getElementById("klasse");
	var input_schule = document.getElementById("schule");
	var input_schuljahr = document.getElementById("schuljahr");
	var input_klassenlehrer = document.getElementById("klassenlehrer");
    //Zeitangaben für Variablen	
	var std1A = document.getElementById("1stdA");	var std1B= document.getElementById("1stdB");
	var std2A = document.getElementById("2stdA");	var std2B= document.getElementById("2stdB");
	var std3A = document.getElementById("3stdA");	var std3B= document.getElementById("3stdB");
	var std4A = document.getElementById("4stdA");	var std4B= document.getElementById("4stdB");
	var std5A = document.getElementById("5stdA");	var std5B= document.getElementById("5stdB");
	var std6A = document.getElementById("6stdA");	var std6B= document.getElementById("6stdB");
	var std7A = document.getElementById("7stdA");	var std7B= document.getElementById("7stdB");
	var std8A = document.getElementById("8stdA");	var std8B= document.getElementById("8stdB");
		
		
	console.log("speichere Form als Object"); //delete	
		
		var sendeObjektText = {
		'vorname': input_vname.value,
		'nachname': input_nname.value,
		'klasse': input_klasse.value,
		'schule': input_schule.value,
		'schuljahr': input_schuljahr.value,
		'input_klassenlehrer': klassenlehrer.value,
		}
		
		var sendeObjektZeitzahl = {
			
		'1stdA': std1A.value,  '1stdB': std1B.value,
		'2stdA': std2A.value,  '2stdB': std2B.value,
		'3stdA': std3A.value,  '3stdB': std3B.value,
		'4stdA': std4A.value,  '4stdB': std4B.value,
		'5stdA': std5A.value,  '5stdB': std5B.value,
		'6stdA': std6A.value,  '6stdB': std6B.value,
		'7stdA': std7A.value,  '7stdB': std7B.value,
		'8stdA': std8A.value,  '8stdB': std8B.value,
		}
		
		
		<!--  in Json umwandeln -->
		sendeObjektJSON = JSON.stringify(sendeObjektText);
		console.log("Wert des JsonObjekt:");
		console.log(sendeObjektJSON);
		
		sendeObjektJSONZahl = JSON.stringify(sendeObjektZeitzahl);
		console.log("Wert des JsonObjekt:");
		console.log(sendeObjektJSONZahl);
	
		//Hier Funktionsaufruf für Weitergabe an Daten, wahrscheinlich an indexDB
		//Hier Funktionsaufruf für Öffnen der nächsten Seite()
		
	};		
		// Zweite Funktionalität: Entweder eigenes Zeitraster oder verwende vorgebendes
		function changeTime() {
		//Reset zu Standard Eingabe
		if(document.getElementById('standardTime').checked) {
		console.log("check standardTime") // delete
		var y = document.getElementsByName("t1");
		var i;
			for (i = 0; i < y.length; i++) {
			y[i].value = y[i].defaultValue;
			y[i].disabled = true;	
			}
		
		//Gib eigene Eingabe frei
		}else if(document.getElementById('customTime').checked) {
			console.log("check customTime") // delete
			// test loop für Zeitangaben
			var y = document.getElementsByName("t1");
			var i;
			for (i = 0; i < y.length; i++) {
				y[i].disabled = false;
			}
		}
		
				
		}
