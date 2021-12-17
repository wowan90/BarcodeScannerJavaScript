
var cameraId;
var html5QrCode;

async function getCameras() {
    // This method will trigger user permissions

    var devices = await Html5Qrcode.getCameras();

    if (devices && devices.length) {
        cameraId = devices[0].id;
        // .. use this to start scanning.
        setStyle("get-camera", "none");
    }

    return devices;
}

function setSelectedDeviceId(deviceid) {
    this.cameraId = deviceid
}

function startQrCodeReader() {
    html5QrCode = new Html5Qrcode(/* element id */ "qr-reader");
    setQrResult('qr-reader-results', '');
    html5QrCode.start(
        cameraId,
        {
            fps: 10,    // Optional, frame per seconds for qr code scanning
            qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
        },
        (decodedText, decodedResult) => {
            // do something when code is read
            setQrResult('qr-reader-results', decodedText);
            stopScanning();
        },
        (errorMessage) => {
            // parse error, ignore it.
        })
        .catch((err) => {
            // Start failed, handle it.
        });

    //try { myFunction("block"); }
    //catch (e) {
    //    // Anweisung für jeden Fehler
    //    console.log(e);
    //}


}


function setStyle(elementId, option) {
    var x = document.getElementById(elementId);
    x.style.display = option;
}

function stopScanning() {

    try {
        html5QrCode.stop().then((ignore) => {
            // QR Code scanning is stopped.
        }).catch((err) => {
            // Stop failed, handle it.
        });

        setStyle("qr-shaded-region", "none");
    } catch (e) { console.log(e) }
}

function setQrResult(id, result) {
    document.getElementById(id).innerText = result;
}




