let mediaRecorder;
let localStream;
let recordedChunks = [];
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const botMessage = document.getElementById('botMessage');


const botResponses = {
    "hello": "Hello! How can I assist you?",
    "how are you": "I'm just a bot, but I'm here to help!",
    "who are you": "I'm AI Bot, an artificial intelligence designed to assist you.",
    "what is your purpose": "My purpose is to provide assistance and answer your questions to the best of my ability.",
    "goodbye": "Goodbye! Feel free to come back anytime if you need assistance.",
    "how to do record in this application": "You need to click on the Record icon in the left sidebar. It will lead you to the Recording Window."
   
};


function botResponse(userInput) {
    userInput = userInput.toLowerCase().trim();
    const response = botResponses[userInput];
    if (response) {
        addBotMessage(response);
    } else {
        addBotMessage("I'm sorry, I didn't understand that.");
    }
}


function addBotMessage(message) {
    const botReply = document.createElement('p');
    botReply.textContent = message;
    chatBox.appendChild(botReply);
}


userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const userText = userInput.value.trim();
        if (userText !== '') {
            userInput.value = '';
            addBotMessage(userText);
            botResponse(userText);
        }
    }
}); 

function startRecording() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(function(stream) {
            localStream = stream;
            startMediaRecorder(stream);
            const videoElement = document.getElementById('videoElement');
            if (videoElement) {
                videoElement.srcObject = stream;
            } else {
                console.error('Video element not found.');
            }
        })
        .catch(function(error) {
            console.error('Error accessing microphone and camera:', error);
            alert('Please allow access to microphone and camera to proceed.');
        });
}

function startAudioRecording() {
    console.log('Start recording audio');
}


function openUploadDialog() {
    
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
}


document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0]; 
    if (file) {
        console.log('Selected file:', file);
        
    } else {
        console.warn('No file selected.');
    }
}


function startMediaRecorder(stream) {
    mediaRecorder = new MediaRecorder(stream);
    recordedChunks = []; 
    mediaRecorder.ondataavailable = function(event) {
        recordedChunks.push(event.data);
    };

    mediaRecorder.onstop = function() {
        saveRecordingToFile(); 
    };
    
    mediaRecorder.start();
    console.log('Recording started.');
}

function closeRecordModal() {
    document.getElementById('recordModal').style.display = 'none';
}
function closeBotModal() {
    document.getElementById('botModal').style.display = 'none';
}

function closeSettingsModal() {
    document.getElementById('settingsModal').style.display = 'none';
}

function stopMediaAccess() {
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        console.log('Media access stopped.');
    } else {
        console.warn('No active media access to stop.');
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        console.log('Recording stopped.');
        
        localStream.getTracks().forEach(track => track.stop());
        saveRecordingToFile();
        stopMediaAccess();
        closeRecordModal();
        
    } else {
        console.warn();
    }
}

function saveRecordingToFile() {
    if (recordedChunks.length === 0) {
        return;
    }

    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recording.webm';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}
function loadVideo() {
    const uploadInput = document.getElementById('uploadInput');
    const video = document.getElementById('myVideo');
    const videoSource = document.getElementById('videoSource');

    const files = uploadInput.files;
  
    if (!files || files.length === 0) return; 

    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        
        if (file.type && !file.type.startsWith('video/')) {
            console.error('Unsupported file type:', file.type);
            continue; 
        }

        const fileURL = URL.createObjectURL(file);

        
        const source = document.createElement('source');
        source.src = fileURL;
        source.type = file.type;

        
        video.appendChild(source);
    }

   
    video.load();
  }

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('recordBtn').addEventListener('click', function() {
        document.getElementById('recordModal').style.display = 'block';
    });
    document.getElementById('botBtn').addEventListener('click', function() {
        document.getElementById('botModal').style.display = 'block';
    });
    document.getElementById('settingsBtn').addEventListener('click', function() {
        document.getElementById('settingsModal').style.display = 'block';
    });

    const startRecordingBtn = document.getElementById('startRecordingBtn');
    if (startRecordingBtn) {
        startRecordingBtn.addEventListener('click', startRecording);
    } else {
        console.error('Start recording button not found.');
    }

    const stopRecordingBtn = document.getElementById('stopRecordingBtn');
    if (stopRecordingBtn) {
        stopRecordingBtn.addEventListener('click', stopRecording);
    } else {
        console.error('Stop recording button not found.');
    }
});


