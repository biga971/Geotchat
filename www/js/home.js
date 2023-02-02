
document.addEventListener('deviceready', onDeviceReady, true);

var sreen = "b1"

function onDeviceReady() {

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version)
    document.getElementById('buttonShow').addEventListener('click', showTable, false);
    document.getElementById('buttonShowConnection').addEventListener('click', showConnexion, false);
    //document.getElementById('buttonValidate').addEventListener('click', showHello, false);
    document.getElementById('buttonLoard').addEventListener('click', takePicturFromGalerie, false);
    document.getElementById('picture').addEventListener('click', takePic, false);
    document.getElementById('buttonLocation').addEventListener('click', takeLocation, false);
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
}

function onFail(message) {
    alert("Echec car :" + message)
}


function takeLocation () {
    
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

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}


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

function like() {
    const siwpeBox = document.querySelector('.siwpeBox')
    siwpeBox.style.transform = `translateX(500px) rotateY(40deg)`
}

function dislike() {
    const siwpeBox = document.querySelector('.siwpeBox')
    siwpeBox.style.transform = `translateX(-500px) rotateY(-40deg)`
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