var mymap = L.map('mapid').setView([43.28897, 5.41699], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

//function onMapClick(e) {
//		  alert("You clicked the map at " + e.latlng);
//		}

//mymap.on('click', onMapClick);


var markers = [];
var inventaire = [];

var ajaxd = new XMLHttpRequest();
ajaxd.open('GET', 'objets.php',true);
ajaxd.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

ajaxd.addEventListener('load',  function() { creerObjet(ajaxd) });

ajaxd.send(null);


mymap.addEventListener('zoom',AffichMark);

function AffichMark(){
	for (var m of markers){

		if (mymap.getZoom() >= m.options.icon.options.zoom) {
			m.addTo(mymap);
			m.addEventListener('click',OnClickMark);
		}
		else{
			m.remove();
		}

	}
}

function OnClickMark(){
	var id_obj = this.options.icon.options.id;
	console.log(id_obj);

//	var ajax = new XMLHttpRequest();
//	ajax.open('GET', 'objets.php?id='+id_obj,true);
//	ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

//	ajax.addEventListener('load', function(){ interractMark(id_obj,ajax)});

//	ajax.send(null);

	interractMark(this.options.icon.options);

	if (id_obj == 1) {
		var ok = confirm("Buongiorno ragazzino !\n Si tu es ici, c'est que tu sait qui je suis....\n No ? \n Je suis Toto Rina et moi et mon organisation la Cosa Nostra nous voulons nous implanter ici a Marseille.  On m'a dit que tu étais fiable, c'est pourquoi je te confie la première mission, notre première livraison.  Tu auras besoin d'argent que tu trouveras :\n \n  1)Au vieux Port chez un ami qui tient un restaurant.\n  2)Aux Iles de Frioul chez mon cousin.\n  3)Dans un musée un peu spécial du quartier Saint Barthélémy. \n \n  Tu n'auras plus qu'a effectuer la transaction a la gare Saint Charles. Je compte sur toi. (OK : pour commencer le jeu)");

		if (ok) {

			for (var i = 1; i < 6; i++) {
				chargeObjet(i,creerObjet);
			}
		}


	}


}

function interractMark(mark) {
//	var reponse = ajax.response;
//	var obj = JSON.parse(reponse);

	console.log("CLICK");

	if (mark.blocked_by != null) {
			console.log("WSH");
			if (doCheck(mark.blocked_by,inventaire)){
				if (mark.recuperable == 1){
				addInventaire(mark); }
			}
			else {
				alert("IL VOUS MANQUE UN OBJET.");
			}
		}

	else if (mark.blocked_bycode != null) {

			var code = prompt("Il vous faut un code pour déverouiller l'objet : " + mark.nom ,"");
			if (mark.blocked_bycode != code ){
				alert("Erreur. Le code entré est incorrect.");
			}
			else {
				alert("Félicitations votre " + mark.nom + " est accessible.")
				if (mark.recuperable == "1"){
				addInventaire(mark); }
			}
			}

	else if (mark.recuperable == 1){
			addInventaire(mark);
		}

}

function chargeObjet(idO,fct){
	var ajax = new XMLHttpRequest();
	ajax.open('GET', 'objets.php?id='+idO,true);
	ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');


	ajax.addEventListener('load',  function() {fct(ajax) });
	ajax.send(null);


}

function creerObjet(ajax) {
	var objets = ajax.response;
	var objJS = JSON.parse(objets);
	console.log(objJS);

	for (var o of objJS) {
			console.log(o.nom);
			var point = L.icon({
			  iconUrl: 'images/' + o.nom + '.png',
				iconSize:     [77, 95], // size of the icon
			  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
			  popupAnchor:  [-3, -76], // point from which the popup should open relative to the iconAnchor
				id : o.id,
				nom : o.nom,
				recuperable : o.recuperable,
				blocked_by : o.blocked_by,
				blocked_bycode : o.blocked_bycode,
				zoom : o.zoom
			});

			var marker = L.marker([o.lat, o.longi], {icon: point});

			markers.push(marker);
			console.log(markers);
			marker.addTo(mymap);
			marker.addEventListener('click',OnClickMark);
		}
}

function addInventaire(mark){
	inventaire.push(mark.id);

	var conteneur = document.getElementById('inventaire');
	var monImg = document.createElement('img');
	monImg.src = "images/"+ mark.nom +".png";

	conteneur.appendChild(monImg);

	var i = 0 ;
	for (var m of markers){
		m.remove();
		if ( m.options.icon.options.id == mark.id ){
			markers.splice(i, 1);
		}
		i = i+1;
	}
}


function doCheck(value, array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] == value) {
			return true;
		}
	}
	return false;
}
