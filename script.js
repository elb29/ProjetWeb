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

var ajax = new XMLHttpRequest();
ajax.open('GET', 'objets.php',true);
ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

ajax.addEventListener('load',  debut);

ajax.send(null);



function debut(){
	var objets = ajax.response;
	var objJS = JSON.parse(objets);


	for (var o of objJS) {

			var point = L.icon({
			  iconUrl: 'images/' + o.nom + '.png',
				iconSize:     [77, 95], // size of the icon
			  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
			  popupAnchor:  [-3, -76], // point from which the popup should open relative to the iconAnchor
				className : o.id,
				latlng : [o.lat,o.longi]
			});

			var marker = L.marker([o.lat, o.longi], {icon: point});

			markers.push(marker);
			marker.addTo(mymap);
			marker.addEventListener('click',OnClickMark);
		}
}

mymap.addEventListener('zoom',AffichMark);

function AffichMark(){

	if (mymap.getZoom() >= 17) {
		for (var m of markers){
			m.addTo(mymap);
			m.addEventListener('click',OnClickMark);
		}
	}
	else{
		for (var m of markers){
			console.log(m);
			m.remove();
		}
	}
}


function OnClickMark(){
	var id_obj = this.options.icon.options.className;

	var ajax = new XMLHttpRequest();
	ajax.open('GET', 'objets.php?id='+id_obj,true);
	ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	ajax.addEventListener('load',  interractMark(id_obj));

	ajax.send(null);

	if (id_obj == '1') {
		var ok = confirm("Buongiorno ragazzino !\n Si tu es ici, c'est que tu sait qui je suis....\n No ? \n Je suis Toto Rina et moi et mon organisation la Cosa Nostra nous voulons nous implanter ici a Marseille.  On m'a dit que tu étais fiable, c'est pourquoi je te confie la première mission, notre première livraison.  Tu auras besoin d'argent que tu trouveras :\n \n  1)Au vieux Port chez un ami qui tient un restaurant.\n  2)Aux Iles de Frioul chez mon cousin.\n  3)Dans un musée un peu spécial du quartier Saint Barthélémy. \n \n  Tu n'auras plus qu'a effectuer la transaction a la gare Saint Charles. Je compte sur toi. (OK : pour commencer le jeu)");

		if (ok) {

			for (var i = 1; i < 5; i++) {
				chargeObjet(i);
			}
		}


	}

}

function interractMark(id_obj) {
	var reponse = ajax.response;
	var obj = JSON.parse(reponse);

	for (var o of obj) {

		if (o.blocked_by != null) {
			if (doCheck(o.blocked_by,inventaire)){
				if (o.recuperable == "1"){
				addInventaire(id_obj); }
			}
			else {
				alert("IL VOUS MANQUE UN OBJET.");
			}
		}

		else if (o.blocked_bycode != null) {
			var code = prompt("Il vous faut un code pour déverouiller l'objet : " + o.nom ,"");
			if (o.blocked_bycode != code ){
				alert("Erreur. Le code entré est incorrect.");
			}
			else {
				alert("Félicitations votre " + o.nom + " est accessible.")
				if (o.recuperable == "1"){
				addInventaire(id_obj); }
			}
			}

		else if (o.recuperable == '1'){
			addInventaire(id_obj);
		}

	}
}

function addInventaire(id){

}


function chargeObjet(idO){
	var ajax = new XMLHttpRequest();
	ajax.open('GET', 'objets.php?id='+idO,true);
	ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');


	ajax.addEventListener('load',  creerObjet(ajax));
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
				className : o.id,
				latlng : [o.lat,o.longi]
			});

			var marker = L.marker([o.lat, o.longi], {icon: point});

			markers.push(marker);
			console.log(markers);
			marker.addTo(mymap);
			marker.addEventListener('click',OnClickMark);
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
