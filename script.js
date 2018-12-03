var mymap = L.map('mapid').setView([43.28897, 5.41699], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


var markers = [];
var inventaire = [];
var selection = 0;
var maf = 0;
var complices = 0;
var joueur = "";
var debut ;

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

	interractMark(this.options.icon.options);

	if (id_obj == 1) {
		var ok = confirm("Buongiorno ragazzino !\n Si tu es ici, c'est que tu sait qui je suis....\n No ? \n Je suis Toto Rina et moi et mon organisation la Cosa Nostra nous voulons nous implanter ici a Marseille.  On m'a dit que tu étais fiable, c'est pourquoi je te confie la première mission, notre première livraison.  Tu auras besoin d'argent que tu trouveras :\n \n  1)Au vieux Port chez un ami qui tient un restaurant.\n  2)Aux Iles de Frioul chez mon cousin.\n  3)Dans un musée un peu spécial du quartier Saint Barthélémy. \n \n  Tu n'auras plus qu'a effectuer la transaction a la gare Saint Charles. Je compte sur toi. (OK : pour commencer le jeu)");

		if (ok && maf == 0 ) {
			var d = new Date();
			debut = d.getTime();
			maf+=1;
			for (var i = 1; i < 6; i++) {
				chargeObjet(i,creerObjet);
			}

		}
	}

	else if (id_obj == 9) {
		var pseudo = prompt("Comment tu t'appelles? ","");

		while (pseudo == "") {
			pseudo = prompt ("Je t'ai demandé, comment tu t'appelles ? Ce n'est pas clair comme question ?","");
		}

		var code = alert("Mmmmmh c'est bien toi que j'attendais " + pseudo + ". Le code est : " + this.options.icon.options.nom );
		joueur = pseudo;

	

		


	}

	else if (id_obj == 10){
		var d = new Date();
		var fin = d.getTime();
		var temps = new Date(fin-debut).toISOString().slice(11, -1);
		console.log(temps);

		var ajaxf = new XMLHttpRequest();
		ajaxf.open('POST', 'score.php',true);
		ajaxf.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		ajaxf.send("pseudo="+joueur+"&temps="+temps);
		var objets = ajaxf.response;
		console.log(objets);
		var ok = confirm("bravo tu as gagné !");
		if(ok){window.location.assign("index.html")}


	}
}

function interractMark(mark) {

	if (mark.blocked_by != null) {
			if (selection == mark.blocked_by){

				if (mark.recuperable == 1){
					addInventaire(mark);

					if (mark.id == 7) {
						chargeObjet(10,creerObjet);

					}

				}

				else if (mark.id == 5) {
					var ok = confirm("Mammamiaaaaa ! Les Américains nous ont attaqués, et ont pris la cargaison... Préparons la vengeance !!!! \n Utilise l'argent que tu viens de récuperer pour aller acheter des armes au marché noir du Mont de Saint-Cyr. Puis fonce aux Beaumettes, on a des ragazzis prêts à s'évader et nous prêter main forte contre les maudits suppots d'Al Capone.");

					if (ok){

						for (var m of markers){
							if ( m.options.icon.options.id == mark.id ){
								markers.splice(i, 1);
								m.remove();
							}
							else if (m.options.icon.options.id == 1){
								markers.splice(i,1);
								m.remove();
							}
							i = i+1;
						}

						for (var i = 6; i < 8; i++){
							chargeObjet(i,creerObjet);
						}
					}
				}

			}

			else if (mark.id == 7 && complices == 0){
				complices += 1;

				alert("Ciao ragazzo ! Nous sommes tes complices, et nous allons t'aider a mettre une raclée aux américains. Pour nous évader il nous faut notre hélicoptère, posé a l'hippodrome de Pont Vivaux. Le pilote te demandera un code qui se trouve au Palais du Pharo. \n Mémorise le code, prends l'hélicoptère et viens nous chercher. ");

				for (var i =8; i < 10; i++){
					chargeObjet(i,creerObjet);
				}

			}

			else {
						alert("Veuillez selectionner le bon objet.");
					}
	}
	else if (mark.blocked_bycode != null) {

			var code = prompt("Il vous faut un code pour déverouiller l'objet : " + mark.nom ,"");
			if (mark.blocked_bycode != code ){
				alert("Erreur. Le code entré est incorrect.");
			}
			else {
				alert("Félicitations votre " + mark.nom + " est accessible.");
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

	for (var o of objJS) {
			
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
	var emplacement = document.createElement('div');
	emplacement.id = mark.id;
	emplacement.className = inventaire;
	monImg.src = "images/"+ mark.nom +".png";
	monImg.style = "height:15mm"

	emplacement.appendChild(monImg);
	conteneur.appendChild(emplacement);

	monImg.addEventListener('click',function () { clickInventaire(mark,this) })

	var i = 0 ;
	for (var m of markers){
		if ( m.options.icon.options.id == mark.id ){
			markers.splice(i, 1);
			m.remove();
		}
		i = i+1;
	}
}

function clickInventaire(mark,im){
	selection = mark.id;
	console.log("vfvv");

	var s  = document.getElementsByClassName('selec');
	console.log(s);

	for (i of s){
		i.className = 'inventaire';
	}

	var emplacement = document.getElementById(mark.id);
	emplacement.className = 'selec';

	var s  = document.getElementsByClassName('selec');
	console.log(s);

}
