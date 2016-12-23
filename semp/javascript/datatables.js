$(document).ready(function() {
    $('#stundenplaner').DataTable( {
        "columnDefs": [
            {
                "targets": [ 6 ],
                "visible": false, //Spalte Samstag wird ausgeblendet
                "searchable": false
            }/*
            {
                "targets": [ 7 ],
                "visible": false, //Spalte Sonntag wird ausgeblendet
                "searchable": false
            }*/
        ],
        "scrollY": 100,  // legt die Größe des scrollbaren Bereichs fest
        "scrollX": 800, //Hier wird der Stundenplan scrollbar gemacht
        "filter": false, //Filter werden ausgeblendet
        "info": false,   //Titel wird ausgeblendet
        "paging": false,
        //Seitenzahlen werden ausgeblendet, falls Tabelle auf mehrere Seiten aufgeteilt wird

    } )
} )
