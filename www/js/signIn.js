
document.addEventListener('deviceready', onDeviceReady, true);


function onDeviceReady() {
    
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version)
    document.getElementById('buttonLoard').addEventListener('click', takePicturFromGalerie, false);
    document.getElementById('picture').addEventListener('click', takePic, false);
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
    picture = imageData;
}

function onFail(message) {
    alert("Echec car :" + message)
}

function signIn() {
    const url = "http://erickstattner.com/service/user.php"
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    window.location='./home.html'
    console.log('error')
/*
    var bodyFormData = new FormData();
    bodyFormData.append('action', 'create');
    bodyFormData.append('pseudo', login);
    bodyFormData.append('mdp', password);
     axios({
        method: "post",
        url: url,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
    })
    .then(function (response) {
    //handle success
    console.log(response);
    window.location='../index.html'
    
    })
    .catch(function (response) {
    //handle error
    console.log(response);
    alert(response);
    }); */


     /* on wait */
   
 }