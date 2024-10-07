# Chrome-Extension-Screen-Recorder
Chrome Extension Application where you can record your screen and save the file.

# Key Features
Start and stop screen recording with the click of a button
Seamless integration with Chrome's tabs and messaging system
Error handling and logging for improved debugging

# Code Overview
The extension's main script performs the following tasks:

Event Listener Setup: The code sets up event listeners for the DOM content loaded event, ensuring that the script runs after the popup HTML has fully loaded.
Button Initialization: It initializes two buttons: one for starting the video recording and another for stopping it.
Script Injection: The ensureScriptInjected function injects the content script (content.js) into the active tab. This ensures that the necessary recording functionality is available in the current web page.
Message Passing: The sendMessageToContentScript function handles communication between the popup and the content script. It sends messages to trigger recording actions.
User Interaction Handling: Event listeners are attached to the start and stop buttons. When clicked, they trigger the appropriate recording actions through message passing.
Error Handling: The code includes error checking and logging throughout, helping to identify and troubleshoot potential issues.

# How It Works
When the user clicks the "Start Recording" button, a message is sent to the content script to initiate the recording process.
Similarly, clicking the "Stop Recording" button sends a message to stop the ongoing recording.
The content script (not shown in this snippet) handles the actual recording functionality based on these messages.
This extension demonstrates effective use of Chrome's extension APIs, particularly for tab management and content script communication, providing a robust foundation for screen recording functionality within the browser.
