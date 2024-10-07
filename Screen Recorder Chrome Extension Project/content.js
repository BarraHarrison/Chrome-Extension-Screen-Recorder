console.log("Content script loaded into the chrome extension");

var recorder = null;

function onAccessApproved(stream) {
    recorder = new MediaRecorder(stream);
    recorder.start();

    recorder.onstop = function() {
        stream.getTracks().forEach(function(track) {
            if (track.readyState === "live") {
                track.stop();
            }
        });
    };

    recorder.ondataavailable = function(event) {
        let recorderBlob = event.data;
        let url = URL.createObjectURL(recorderBlob);

        let a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "screen-recording.webm";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "request_recording") {
        console.log("Request to start recording received");
        sendResponse(`processed: ${message.action}`);

        navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video: { width: 1280, height: 720 } // Changed to more realistic values
        }).then(onAccessApproved).catch(error => {
            console.error("Error obtaining display media: ", error);
        });
    }

    if (message.action === "stopvideo") {
        console.log("Request to stop recording received");
        sendResponse(`processed: ${message.action}`);
        if (!recorder) return console.log("No recorder initialized");
        recorder.stop();
    }
});
