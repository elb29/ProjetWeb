var banniere = document.getElementById('banniere');
var texte = banniere.firstElementChild;
var tailleTexte = banniere.scrollWidth;

//aller chercher le meilleur score dans la base de donnée et le mettre dans la page html
var ajax = new XMLHttpRequest();
ajax.open('POST', 'meilleurscore.php');
ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
ajax.addEventListener('load', afficher);
ajax.send("type=afiichage");

function afficher(){

    var jsonObj = JSON.parse(ajax.response);
    for(i=0;i<jsonObj.length;i++){
        banniere.innerHTML = "<p> Meilleur score " + jsonObj.prenom + " "+ jsonObj.prenom + "</p>";
    }
}


//faire un bandeau défilan avec ce meilleur score

function defile(){
    var pos = texte.style.marginLeft.replace('px','');
    pos -= 10;
    
    
    if(pos < -tailleTexte){
        pos = 1000;
    }
    texte.style.marginLeft = pos+"px";
    window.setTimeout(function(){ defile(); }, 80);
  
}

window.addEventListener('load', defile);




//calculer le temps de jeu du joueur


var affichage = document.getElementById('banniere');
var timer = document.getElementById('jouer')
timer.addEventListener('click', debut_timer)






var myVar;
function debut_timer(event){	
	myVar = setTimeout();
	console.log("toto")
}



function fin_timer() {
    clearTimeout(myVar);
}