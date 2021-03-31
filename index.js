const firebaseConfig = {
    apiKey: "AIzaSyBC9U4HgKEfLSLHh5h0_C2IS40R27D2gZU",
    authDomain: "fir-firebase3.firebaseapp.com",
    databaseURL: "https://fir-firebase3-default-rtdb.firebaseio.com",
    projectId: "fir-firebase3",
    storageBucket: "fir-firebase3.appspot.com",
    messagingSenderId: "50218022522",
    appId: "1:50218022522:web:ca3b9a1b20e470c228adc3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


//loadAll
let storage = firebase.storage();
let storageRef = storage.ref();

var i = 0;
storageRef.listAll().then(function(result) {
    result.items.forEach(function(imageRef) {
        i++;
        displayImage(i, imageRef);
    });
});

function displayImage(row, images) {
    images.getDownloadURL().then(function(url) {

        let new_html = '';
        new_html += '<div class="col-lg-3 col-md-4 col-6 image">';
        new_html += '<img class="img-fluid img-thumbnail" src="' + url + '" alt="">';
        new_html += '</div>';

        document.getElementById('listBody').innerHTML += new_html;
    })
}

//signIn
var app_firebase = {};

app_firebase = firebase;

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'main.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: 'main.html',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  ui.start('#firebaseui-auth-container', uiConfig);


//upload
function uploadImage() {
  const ref = firebase.storage().ref();
  const file = document.querySelector('#photo').files[0];
  const name = file.name;
  const metadata = {
      contentType: file.type
  }
  const task = ref.child(name).put(file, metadata);

  task
  .then(snapshot => snapshot.ref.getDownloadURL())
  .then(url => {
      console.log(url)
      alert('Upload successful');
  })


}















