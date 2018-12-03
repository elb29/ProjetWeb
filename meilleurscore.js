var banniere = document.getElementById('banniere');
var tailleTexte = banniere.scrollWidth;

//aller chercher le meilleur score dans la base de donnée et le mettre dans la page html
var ajax = new XMLHttpRequest();
ajax.open('POST', 'meilleurscore.php');
ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
ajax.addEventListener('load', afficher);
ajax.send();

function afficher(){

    var jsonObj = JSON.parse(ajax.response);
		console.log(jsonObj);

		for (var o of jsonObj){
			  banniere.innerHTML = "<p id='best' > Meilleur score " + o.temps + " par : "+ o.pseudo + "</p>";
		}
}


//faire un bandeau défilan avec ce meilleur score

function defile(){
	var texte = document.getElementById('best');

  var pos = texte.style.marginLeft.replace('px','');




  if(pos < -tailleTexte){
    pos = 600;
  }
	
	pos -= 10;
  texte.style.marginLeft = pos+"px";
  window.setTimeout(function(){ defile(); }, 100);

}

ajax.addEventListener('load', defile);
