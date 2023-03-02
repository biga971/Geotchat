
document.addEventListener('deviceready', onDeviceReady, true);

var picture = ''
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

function signUp() {
     //const url = "http://erickstattner.com/service/user.php"
     const url = "https://proj.ruben-jeaurat.fr/api/modifygeo?"
     var name = document.getElementById("inputName").value;
     var lastname = document.getElementById("inputLastName").value;
     var sexe = document.getElementById("inputSexe").value;
     var mail = document.getElementById("inputMail").value;
     var password = document.getElementById("inputPasswordForm").value;
     var passwordConfirm = document.getElementById("inputConfirmPassword").value;
     //var country = document.getElementById("inputCountry").value;
 
     console.log("ok ")
     if (password == passwordConfirm) {
        console.log("password confirm")
       /*  var bodyFormData = new FormData();
       bodyFormData.append('action', 'create');
       bodyFormData.append('nom', name);
       bodyFormData.append('prenom', lastname);
       bodyFormData.append('pseudo', login);
       bodyFormData.append('mail', mail);
       bodyFormData.append('mdp', password);
       bodyFormData.append('pays', country);
       bodyFormData.append('photo', picture); */
       const urlfinal = url+"nom="+name+"&prenom="+lastname+"&pseudo="+sexe+"&mail="+mail+"&mdp="+password
       axios({
         method: "post",
         url: urlfinal,
         /* data: bodyFormData, */
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
         });
     }
       
 }