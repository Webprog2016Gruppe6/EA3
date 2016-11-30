<script type="text/javascript">
$(document).ready(function() {
    $('#stundenplaner').DataTable( { // bezieht sich auf die Funktion DataTables im index.html Dokument
        "scrollY": 200,  // legt die Größe des scrollbaren Bereichs fest
        "scrollX": true, //Hier wird der Stundenplan scrollbar gemacht
        "filter": false, //Filter werden ausgeblendet
        "info": false,   //Titel wird ausgeblendet
        "paging": false
        //Seitenzahlen werden ausgeblendet, falls Tabelle auf mehrere Seiten aufgeteilt wird
    } );
} );
</script>
