

let camera_button = document.querySelector('#start-camera');
const download = document.getElementById('download');
let video = document.querySelector('#video');
let click_button = document.querySelector('#click-photo');
let canvas = document.querySelector('#canvas');
var Name = document.getElementById('name');
var PatientNumber = document.getElementById('patientnumber');
var DOS = document.getElementById('dos');
const Form = document.querySelector('form');
const OrderNumber = document.getElementById('orderNumber');





// Video Quality
    let hdConstraints = {
        video: {
            width: { ideal: 2560 },
            height: { ideal: 1440 }

        }
    };

// Camera start on Button
camera_button.addEventListener('click', async function() {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false});
    video.srcObject = stream;
});


// Zoom feature
navigator.mediaDevices.getUserMedia({ video: { zoom: true }})
    .then(mediaStream => {
    document.querySelector('video').srcObject = mediaStream;

    const [track] = mediaStream.getVideoTracks();
    const capabilities = track.getCapabilities();
    const settings = track.getSettings();

    const input = document.querySelector('input[type="range"]');

    // Check Whether Zoom is Supported or not
    if (!('zoom' in settings)) {
        return Promise.reject('Zoom is not supported by ' + track.label);
    }

    //  Map Zoom to a Slider element.
    input.min = capabilities.zoom.min;
    input.max = capabilities.zoom.max;
    input.step = capabilities.zoom.step;
    input.value = settings.zoom;
    input.oninput = function(event) {
        track.applyConstraints({
            advanced: [{ zoom: event.target.value }]
        });
    };
    input.hidden = false;
})
.catch(error => console.log('Argh!', error.name, error.message)); 

// Take Picture
click_button.addEventListener('click', function() {
    canvas.getContext('2d', { alpha: true }).drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.imageSmoothingEnabled = true;
    canvas.imageSmoothingQuality = "high";
    const dataURL = canvas.toDataURL('image/png');
   
 
    
});

// form Validation 
download.disabled = true;
PatientNumber.addEventListener("change", stateHandle);
Name.addEventListener("change", stateHandle);

function stateHandle() {
    if (document.getElementById("patientnumber").value === "") {
        download.disabled = true;
    } else if (document.getElementById("name").value === "") { 
        download.disabled = true;
        } else {
            download.disabled = false;
        }
    }   

// Picture Save button
download.addEventListener('click', function(e) {

    const link = document.createElement('a');
    link.download = Name.value + ' ' + '#' + PatientNumber.value + ' ' + DOS.value + '.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
    Name.value='';
    PatientNumber.value='';
    download.disabled= true;
});

//  this is the search form to find the information from the server. 

// TODO finish the connect to the server 
Form.addEventListener('submit', searchit => {
    searchit.preventDefault();

    const searchTerm = OrderNumber.value;

    fetch('./Server/server.js', {
        method: 'Post',
        headers: {
            'Content-Type': application/json
        },
        body: JSON.stringify({ searchTerm })
    })
    .then(res => res.json())
    .then(data => {
        Name.Value = data.PatientName,
        PatientNumber.Value = data.PatientNum,
        DOS.Value = data.ShipDate

      // Populate the form fields with the data received from the server
    })
    .catch(err => console.log(err));
})