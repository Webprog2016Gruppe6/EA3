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
}