document.addEventListener("DOMContentLoaded", () => {
    const startVideoButton = document.querySelector("button#start_video");
    const stopVideoButton = document.querySelector("button#stop_video");

    if (!startVideoButton || !stopVideoButton) {
        console.error("Button elements not found!");
        return;
    }

    function ensureScriptInjected(tabId, callback) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['./content.js']
        }, () => {
            if (chrome.runtime.lastError) {
                console.error('Script injection failed:', chrome.runtime.lastError.message);
                return;
            }
            callback();
        });
    }

    function sendMessageToContentScript(action) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            if (tabs.length === 0) {
                console.error("No active tab found");
                return;
            }
            const tabId = tabs[0].id;
            ensureScriptInjected(tabId, () => {
                chrome.tabs.sendMessage(tabId, {action: action}, function(response){
                    if (!chrome.runtime.lastError) {
                        console.log("Response received:", response);
                    } else {
                        console.error("Error in messaging:", chrome.runtime.lastError);
                    }
                });
            });
        });
    }

    startVideoButton.addEventListener("click", () => {
        console.log("Start Recording button clicked");
        sendMessageToContentScript("request_recording");
    });

    stopVideoButton.addEventListener("click", () => {
        console.log("Stop Recording button clicked");
        sendMessageToContentScript("stopvideo");
    });
});

