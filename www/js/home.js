
document.addEventListener('deviceready', onDeviceReady, true);

var sreen = "b1"
var stevenboxconversation = document.getElementById("boxconvsteven")
var stevenboxconversation2 = document.getElementById("boxconvsteven2")
var talkto;
var idtalkto;
var e;

//var pagemessage = window.location.href="message.html"
var utilisateur=JSON.parse(sessionStorage.getItem('utilisateur2'))
function onDeviceReady() {

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version)
    document.getElementById('buttonShow').addEventListener('click', showTable, false);
    document.getElementById('buttonShowConnection').addEventListener('click', showConnexion, false);
    //document.getElementById('buttonValidate').addEventListener('click', showHello, false);
    document.getElementById('buttonLoard').addEventListener('click', takePicturFromGalerie, false);
    document.getElementById('picture').addEventListener('click', takePic, false);
    document.getElementById('buttonLocation').addEventListener('click', takeLocation, false);
}


function printu(){
   
    console.log(utilisateur)

} 


function showTable() {
    document.getElementById('test').innerHTML = device.platform
    document.getElementById('test2').innerHTML = device.model
    document.getElementById('test').style.display = "block"
    document.getElementById('test2').style.display = "block"
    navigator.vibrate(2000);
}

function showConnexion() {

    var networkState = navigator.connection.type;
    var states = {};

    states[Connection.UNKNOWN] = 'Inconnue';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI] = 'Wi-Fi';
    states[Connection.CELL_2G] = 'cellulaire 2G';
    states[Connection.CELL_3G] = 'cellulaire 3G';
    states[Connection.CELL_4G] = 'cellulaire 4G';
    states[Connection.CELL] = 'générique';
    states[Connection.NONE] = 'aucune';

    document.getElementById('test3').innerHTML = "Connexion " + states[networkState];
    document.getElementById('test3').style.display = "block"
}

function showHello() {
   // const axios = require('axios').default;
    const url = "http://erickstattner.com/service/user.php"
    const url2 = 'https://mangascanplus.herokuapp.com/api/descritionOp'
    var login = document.getElementById("inputLogin").value;
    var password = document.getElementById("inputPassword").value;

      var bodyFormData = new FormData();
      bodyFormData.append('action', 'read');
      bodyFormData.append('mail', login);
      bodyFormData.append('mdp', password);
      axios({
        method: "post",
        url: url,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          console.log(response.data);
          //alert(response.data.prenom);
          showPictureWebService(response.data)
          
        })
        .catch(function (response) {
          //handle error
          console.log(response);
          alert(response);
        });
}

function takePicturFromGalerie() {
    const options = {
        quality: 25, 
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
    }
    navigator.camera.getPicture(onSuccess, onFail, options)
}


function takePic() {
    const options = {
        quality: 25, 
        destinationType: Camera.DestinationType.DATA_URL
    }
    navigator.camera.getPicture(onSuccess, onFail, options)
}

function onSuccess (imageData) {
    var image = document.getElementById ('logo') ; 
    image.src = "data:image/jpeg;base64," + imageData;
    var url = 'https://proj.ruben-jeaurat.fr/modifygeo?idGeotchatteur=5&photo='+image

    fetch(url, {
        headers: { 'Accept': 'application/json'
    },
})
    .catch(response => console.log(response))

}

function onFail(message) {
    alert("Echec car :" + message)
}


/*function takeLocation () {
    
    const options = {
        maximumAge: 3000,
        timeout: 5000, 
        enableHighAccuracy: true 
    }

    var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n');
    };
fli
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}*/


function showPictureWebService (data) {

  document.getElementById('spanHello').innerHTML = "Bonjour " + data.prenom
  document.getElementById('spanHello').style.display = "block"

  var image = document.getElementById ('logo') ; 
  image.src = "data:image/jpeg;base64," + data.photo;
}

function display(value) {

    document.getElementById(sreen).classList.add('none')
    document.getElementById(value).classList.remove('none')

    sreen = value

    if( value == "b1" ){
        document.getElementById('span').innerHTML = 'Géotchatte'
    }else if (value == "b2"){
        document.getElementById('span').innerHTML = 'Profile'
    }else if (value == "b3"){
        document.getElementById('span').innerHTML = 'Messages'
    }else if (value == "b4"){
        document.getElementById('span').innerHTML = 'Photos'
    }else if (value == "b5"){
        document.getElementById('span').innerHTML = 'Parametres'
    }

}

function effacerswipe(div){
    div.remove()
    console.log('dsdsdooooo')
}
function afficherswipe(){
    if(document.querySelectorAll('.swipebox').length<=1){
        lireswipe();
    }
    if(document.querySelector('.swipebox')!=null){
        document.querySelector('.swipebox').style.display='flex'
        console.log(document.querySelector('.swipebox').id)
    }

}

function like(id) {
    //const siwpeBox = document.querySelector('.siwpeBox')
    //siwpeBox.style.transform = `translateX(500px) rotateY(40deg)`

    var swipebox = document.getElementById('swipebox'+id)
    
    //swipebox.style.transform = `translateX(500px) rotateY(40deg)`
    swipebox.style.animationName = `swipeAnimation`
    swipebox.style.animationDuration = `4s`
    setTimeout(function(){ effacerswipe(swipebox);
        if(document.querySelectorAll('.swipebox').length<=1){
        lireswipe();
        }
        if(document.querySelector('.swipebox')!=null){
//            document.querySelector('.swipebox').style.opacity='1'
            document.querySelector('.swipebox').style.display='flex'
            
            console.log(document.querySelector('.swipebox').id)
        }},1600)
    //swipebox.style.opacity = "0";

    var url = "https://proj.ruben-jeaurat.fr/api/modifyinvi?idInviteur="+utilisateur["idGeotchatteur"]+"&idInvite="+id+"&dateInvitation="+Date.now()+"&idEtat=2"
    fetch(url, {
    method: 'get',
    headers: { 'Accept': 'application/json',"Content-Type": "multipart/form-data" 

    },
    //body: formData
    })
    
    .catch(response=>console.log(response))
    
    
    
   
	

   
}

function dislike(id) {
    //const siwpeBox = document.querySelector('.siwpeBox')
    //siwpeBox.style.transform = `translateX(-500px) rotateY(-40deg)`

    var swipebox = document.getElementById('swipebox'+id)
    //swipebox.style.transform = `translateX(-500px) rotateY(-40deg)`
    swipebox.style.animationName = `swipeAnimationDislike`
    swipebox.style.animationDuration = `4s`
    setTimeout(function(){ effacerswipe(swipebox); afficherswipe()},1600)

}

function signUp() {
     const url = "http://erickstattner.com/service/user.php"
     var name = document.getElementById("inputName").value;
     var lastname = document.getElementById("inputLastName").value;
     var login = document.getElementById("inputPseudo").value;
     var mail = document.getElementById("inputMail").value;
     var password = document.getElementById("inputPasswordForm").value;
     var passwordConfirm = document.getElementById("inputConfirmPassword").value;
     var country = document.getElementById("inputCountry").value;
 
     if (password == passwordConfirm) {
        var bodyFormData = new FormData();
       bodyFormData.append('action', 'create');
       bodyFormData.append('nom', name);
       bodyFormData.append('prenom', lastname);
       bodyFormData.append('pseudo', login);
       bodyFormData.append('mail', mail);
       bodyFormData.append('mdp', password);
       bodyFormData.append('pays', country);
       bodyFormData.append('photo', );
       axios({
         method: "post",
         url: url,
         data: bodyFormData,
         headers: { "Content-Type": "multipart/form-data" },
       })
         .then(function (response) {
           //handle success
           console.log(response.data);
           //alert(response.data.prenom);
           showPictureWebService(response.data)
           
         })
         .catch(function (response) {
           //handle error
           console.log(response);
           alert(response);
         });
     }
       
 }
  
 function lireconversation(){
    //console.log(utilisateur)
    const url = "https://proj.ruben-jeaurat.fr/selectinvi"
    
    var invit=[];
    
    
    //window.location='./home.html'  
    fetch(url, {
        headers: { 'Accept': 'application/json'
    },
})
    .then(response => response.json())
    .then(response =>  {
        //stevenboxconversation.innerHTML='';
        for (var i = 0; i < response.length; i++){


            if(response[i]["idEtat"]==1){

                if(response[i]["idInvite"] == utilisateur["idGeotchatteur"] || response[i]["idInviteur"] == utilisateur["idGeotchatteur"] ){
                    invit.push(response[i])


                }
            }


        }

    })
    .then(response =>{  for (var i = 0; i < invit.length; i++){
        talkto = utilisateur["idGeotchatteur"] ==invit[i]["idInvite"] ?  invit[i]["idInviteur"]:invit[i]["idInvite"] ;
        if(document.getElementById('Row_'+ talkto)=== null){
            console.log(document.getElementById('Row_'+ talkto))
            console.log('lol')
            let row=document.createElement('div');
                //utilisateur[0]["idGeotchatteur"]==invit[0]["idGeotchatteur"]? p_msg.className="from-me" : p_msg.className="from-them"
        console.log(invit[i])
                //invit[0]["idInviteur"]
        
        row.setAttribute('onclick','sessionStorage.setItem("idtalkto",'+talkto+');console.log(sessionStorage.getItem("idtalkto"));window.location="./message.html"; /*liremsg('+talkto+')*/');
        row.setAttribute('class','Row ' + talkto)
        row.id='Row_' + talkto
                //row.innerHTML=talkto;

        let rowimg=document.createElement('img')
        rowimg.setAttribute('class','imagconv')

        let Boxrow=document.createElement('div')
        Boxrow.className="BoxRow"

        let afterBoxrow=document.createElement('div')

        let h1=document.createElement('h1')

        let span=document.createElement('span')
        span.innerHTML='Last message ...'

        let span2=document.createElement('span')

        let hr=document.createElement('hr')

        fetch("https://proj.ruben-jeaurat.fr/selectgeo?id="+talkto, 
        {
            headers: { 'Accept': 'application/json'
        },
    })
        .then(response => response.json())

    .then(response=>{console.log(response[0]);
         rowimg.src=response[0]["photo"];
        h1.innerHTML=response[0]["prenom"]})
        row.appendChild(rowimg)
        row.appendChild(Boxrow)
        Boxrow.appendChild(afterBoxrow)
        Boxrow.appendChild(span2)
        afterBoxrow.appendChild(h1)
        afterBoxrow.appendChild(span)
        stevenboxconversation.appendChild(row);
        stevenboxconversation.appendChild(hr)

        }
        
        
    
    
        

}


})


    
}

 function lireprofile(){
        document.getElementById("prenomprofile").innerHTML=utilisateur["prenom"];
        document.getElementById("nomprofile").innerHTML=utilisateur["nom"];
        document.getElementById("pseudoprofile").innerHTML=utilisateur["pseudo"];
        document.getElementById("sexprofile").innerHTML=utilisateur["sexe"];
        document.getElementById("mailprofile").innerHTML=utilisateur["mail"];
        document.getElementById("photoprofile").src=utilisateur["photo"];



}
function lirephoto(){
    
    document.getElementById("photophoto").src=utilisateur["photo"];
    document.getElementById("photophoto2").src=utilisateur["photo"];
    document.getElementById("photophoto3").src=utilisateur["photo"];



}

function lireswipe(){
    const url = "https://proj.ruben-jeaurat.fr/api/selectalent?id="
    
    //window.location='./home.html'  
    fetch(url+utilisateur["idGeotchatteur"], {
        headers: { 'Accept': 'application/json'
    },
})
    .then(response => response.json())
    .then(response=>{
    
        for (var i = 0; i < response.length; i++){
            if(true){

            let divbox = document.createElement('div');
            divbox.className="siwpeBox swipebox"
            //divbox.style.opacity='0'
            divbox.id="swipebox"+response[i]["idGeotchatteur"]
            //divbox.style.transition = 'opacity 4s ease-in-out'
            
            divbox.style.display='none';

            let h1nomnomswipe =document.createElement('h1');
            h1nomnomswipe.innerHTML=response[i]["prenom"];

            let imgswipe = document.createElement('img');
            imgswipe.style.height='100%';

            imgswipe.src=response[i]["photo"]

            let spanswipe = document.createElement('span');
            spanswipe.className="bubble dislike"
            spanswipe.setAttribute('onclick','dislike('+response[i]["idGeotchatteur"]+')');
            let icondislike = document.createElement('ion-icon');
            icondislike.name="thumbs-down-outline"
            spanswipe.appendChild(icondislike)


            let spanswipe2 = document.createElement('span');
            spanswipe2.className="bubble like"
            spanswipe2.setAttribute('onclick','like('+response[i]["idGeotchatteur"]+')');
            
            let iconlike = document.createElement('ion-icon');
            iconlike.name="thumbs-up-outline"
            spanswipe2.appendChild(iconlike)

            divbox.appendChild(h1nomnomswipe)
            divbox.appendChild(imgswipe)
            divbox.appendChild(spanswipe)
            divbox.appendChild(spanswipe2)
            document.getElementById("b1").appendChild(divbox)

            /*document.getElementById("b1").insertAdjacentHTML("beforeend","<div id="+response[i]["idGeotchatteur"]+" class="+"siwpeBox"+">"+
            "<h1 id="+"nomswipe"+">"+response[i]["prenom"]+"</h1>"+
            "<img id="+"photoswipe"+" style=" +"height:100%;"+" src="+response[i]["photo"]+" alt="+""+">"+
                    "<span class=bubble dislike onclick="+"dislike()"+">"+
                        "<ion-icon name="+"thumbs-down-outline"+"></ion-icon>"+
                    "</span>"+
                    "<span class=bubble class=like onclick="+"like()"+">"+
                        "<ion-icon name="+"thumbs-up-outline"+"></ion-icon>"+
                    "</span>"+     
            "</div>")*/




            }
           

        }
    })
    //document.getElementById("nomswipe").innerHTML=utilisateur["nom"];
    //document.getElementById("photoswipe").innerHTML=utilisateur["photo"];
    



}
function afficheprofilepar(id){
    document.getElementById("b55").style.display='flex'
    stevenboxconversation2.style.display='none'
    fetch("https://proj.ruben-jeaurat.fr/selectgeo?id="+id, 
        {
            headers: { 'Accept': 'application/json'
        },
    })
    .then(response => response.json())

    .then(response=>{
    
    document.getElementById("prenomparametre").innerHTML=response[0]["prenom"];
    document.getElementById("nomparametre").innerHTML=response[0]["nom"];
    document.getElementById("pseudoparametre").innerHTML=response[0]["pseudo"];
    document.getElementById("mailparametre").innerHTML=response[0]["mail"];
    document.getElementById("photoparametre").src=response[0]["photo"];})

}

function lireparametre(){
    document.getElementById("b55").style.display='none'
    stevenboxconversation2.style.display='flex'
    // document.getElementById("prenomparametre").innerHTML=utilisateur["prenom"];
    // document.getElementById("nomparametre").innerHTML=utilisateur["nom"];
    // document.getElementById("pseudoparametre").innerHTML=utilisateur["pseudo"];
    // document.getElementById("mailparametre").innerHTML=utilisateur["mail"];
    // document.getElementById("photoparametre").src=utilisateur["photo"];

    const url = "https://proj.ruben-jeaurat.fr/selectinvi"
    
    var invit=[];
    
    
    //window.location='./home.html'  
    fetch(url, {
        headers: { 'Accept': 'application/json'
    },
})
    .then(response => response.json())
    .then(response =>  {
        //stevenboxconversation.innerHTML='';
        for (var i = 0; i < response.length; i++){


            if(response[i]["idEtat"]==2){

                if(response[i]["idInvite"] == utilisateur["idGeotchatteur"] || response[i]["idInviteur"] == utilisateur["idGeotchatteur"] ){
                    invit.push(response[i])


                }
            }


        }

    })
    .then(response =>{  for (var i = 0; i < invit.length; i++){
        talkto = utilisateur["idGeotchatteur"] ==invit[i]["idInvite"] ?  invit[i]["idInviteur"]:invit[i]["idInvite"] ;
        if(document.getElementById('Row2_'+ talkto)=== null){
            console.log(document.getElementById('Row2_'+ talkto))
            console.log('lol')
            let row=document.createElement('div');
                //utilisateur[0]["idGeotchatteur"]==invit[0]["idGeotchatteur"]? p_msg.className="from-me" : p_msg.className="from-them"
        console.log(invit[i])
                //invit[0]["idInviteur"]
        
        row.setAttribute('onclick','afficheprofilepar('+talkto+')');
        row.setAttribute('class','Row ' + talkto)
        row.id='Row2_' + talkto
                //row.innerHTML=talkto;

        let rowimg=document.createElement('img')
        rowimg.setAttribute('class','imagconv')

        let Boxrow=document.createElement('div')
        Boxrow.className="BoxRow"

        let afterBoxrow=document.createElement('div')

        let h1=document.createElement('h1')

        let span=document.createElement('span')
        span.innerHTML='Appuyez pour voir profil'

        let span2=document.createElement('span')

        let hr=document.createElement('hr')

        fetch("https://proj.ruben-jeaurat.fr/selectgeo?id="+talkto, 
        {
            headers: { 'Accept': 'application/json'
        },
    })
        .then(response => response.json())

    .then(response=>{console.log(response[0]);
        rowimg.src=response[0]["photo"];
        
        h1.innerHTML=response[0]["prenom"]})
        row.appendChild(rowimg)
        row.appendChild(Boxrow)
        Boxrow.appendChild(afterBoxrow)
        Boxrow.appendChild(span2)
        afterBoxrow.appendChild(h1)
        afterBoxrow.appendChild(span)
        stevenboxconversation2.appendChild(row);
        stevenboxconversation2.appendChild(hr)

        }
        
        
    
    
        

}


})


}


 function liremsg(talkto){
    //signIn();
    
    

    const url = "https://proj.ruben-jeaurat.fr/selectmess"
    //var messageBoxt=stevenboxconversation;
    console.log(sessionStorage.getItem('idtalkto'))
    //window.location='./home.html'  
    fetch(url, {
        headers: { 'Accept': 'application/json'
        },
    })
    .then(response => response.json())
    .then(response =>  {document.getElementById("messageBox").innerHTML='';
        for(var i = 0; i < response.length; i++){
           // console.log(utilisateur)
            //console.log(response[i]["idEnvoyeur"]==utilisateur["idGeotchatteur"])
           //console.log(response[i]["idEnvoyeur"]==talkto) 
           //console.log(response[i]["idRecepteur"])
           
           if((response[i]["idEnvoyeur"]==utilisateur["idGeotchatteur"] || response[i]["idEnvoyeur"]==talkto) && (response[i]["idRecepteur"]== utilisateur["idGeotchatteur"]||response[i]["idRecepteur"]==talkto)){
           
        let p_msg=document.createElement('p');
        utilisateur["idGeotchatteur"]==response[i]["idEnvoyeur"]? p_msg.className="from-me" : p_msg.className="from-them"
        //p_msg.className=r.messages[i].identite;

        let imess=document.createElement('div')
        imess.className="imessage "+talkto
        
        p_msg.innerHTML=response[i]["message"];
        imess.appendChild(p_msg);
        document.getElementById("messageBox").appendChild(imess);
        
        }  
        }
        fetch("https://proj.ruben-jeaurat.fr/selectgeo?id="+talkto, 
        {
            headers: { 'Accept': 'application/json'
        },
    })
        .then(response => response.json())
    .then(response=>{document.getElementById("nommessage").innerHTML=response[0]["prenom"]}
         )
       
        
    
    })
 }

 function envoyermsg(talkto){
	
	const url = "https://proj.ruben-jeaurat.fr/modifymess?message="+ document.querySelector('#inputmsg').value+"&idEnvoyeur="+utilisateur["idGeotchatteur"]+"&idRecepteur="+talkto
     
	//let formData = new FormData();
    /*formData.append("message",document.querySelector('#message').value)
    //formData.append('idMessage', '7');
    formData.append('dateMessage',Date.getDate());
    
    formData.append("idEnvoyeur",utilisateur["idGeotchatteur"]);
    formData.append("idRecepteur",talkto);
    formData.append("active",0);
    formData.append("creation","0000-00-00 00:00:00");
    formData.append("modification","0000-00-00 00:00:00");*/
    fetch(url, {
    method: 'get',
    headers: { 'Accept': 'application/json',"Content-Type": "multipart/form-data" 

    },
    //body: formData
})

    .then(document.querySelector('#inputmsg').value="")
    .catch(response=>console.log(response))


	
}


function calcCrow(lat1, lon1, lat2, lon2) 
{
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) 
{
    return Value * Math.PI / 180;
}

