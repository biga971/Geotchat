
document.addEventListener('deviceready', onDeviceReady, true);




var longitude;
var latitude;

takeLocation ();

function onDeviceReady() {
    
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version)
    document.getElementById('buttonLoard').addEventListener('click', takePicturFromGalerie, false);
    document.getElementById('picture').addEventListener('click', takePic, false);
    
    
}

function takeLocation () {
    
    const options = {
        maximumAge: 3000,
        timeout: 5000, 
        enableHighAccuracy: true 
    }

    var onSuccess = function(position) {
        
        
        console.log('Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n');
            latitude=position.coords.latitude ;
            longitude=position.coords.longitude;

    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
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

/*function signIn() {
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
   
 

 //steven
 function signIn() {
    
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    //window.location='./home.html';
    //console.log('dfdf')
    // var bodyFormData = new FormData();
    // bodyFormData.append('id', '15');

    fetch("https://proj.ruben-jeaurat.fr/api/selectlog?pseudo="+login+"&mdp="+password, {
        headers: { 'Accept': 'application/json'
        },
    })
    .then(response =>response.json())
    .then(response=>
        fetch("https://proj.ruben-jeaurat.fr/api/modifygeo?id="+response[0]["idGeotchatteur"]+"?DerniereLongitude="+longitude+"?DerniereLatitude="+latitude, {
        headers: { 'Accept': 'application/json'},
    })
    .then(response=>{
            fetch("https://proj.ruben-jeaurat.fr/api/selectlog?pseudo="+login+"&mdp="+password, {
                headers: { 'Accept': 'application/json'
                },
            })
           .then(response =>response.json())
           .then(response =>{sessionStorage.setItem('utilisateur2',JSON.stringify(response[0]))})
           .then(console.log(sessionStorage.getItem('utilisateur2')))
           .then(response =>{window.location.assign('./views/home.html')})
           .catch(response=>{console.log(response );window.location='./signIn.html';return false})
        
            }
        )
       )
    


   
     
    
    
    
    //.then(window.location='./home.html')
    
 }

 /*function signIn() {
    
    console.log(this);

    if(true){
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    }
    else{
        
    } 
    var url = "https://proj.ruben-jeaurat.fr/selectgeo?id=5"
    
    axios({
        method: "get",
        url: url,
        headers: {'Accept': 'application/json'  },
    })
    .then(response =>response.data)
   .then(response =>{utilisateur=response[0];})
   .then(response =>console.log(utilisateur))
    
   
    
   return false
     
    
    

    
 }*/