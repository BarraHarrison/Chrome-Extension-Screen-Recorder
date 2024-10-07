// Log to confirm loading
console.log('Background service worker loaded');

// Simple tab update listener
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log('Tab updated:', tab.url);
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        console.log('Executing script on:', tab.url);
        chrome.scripting.executeScript({
            target: { tabId },
            files: ['./content.js']
        }).then(() => {
            console.log("Content script injected successfully");
        }).catch(err => {
            console.error("Injection failed:", err);
        });
    }
});

// Empty message listener, consider adding functionality here
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Message received');
});

