let btn = document.querySelector("#btn");
let content = document.querySelector(".right");
let img = document.querySelector("#voice-img");


let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


if(speechRecognition){
    
let recognition = new speechRecognition();
window.onload = loadTranscripts;
btn.addEventListener("click",()=>{
    recognition.start();
    btn.style.display="none";
    img.style.display="block";
    console.log("speech recognition started");
} );
recognition.onresult = (event) =>{
    let index = event.resultIndex;
    let transcript = event.results[index][0].transcript;
    let list = document.createElement("li");
    list.textContent=transcript.toString();
    
    content.appendChild(list);
    saveTranscript(transcript);
    /* content.innerText = transcript; */
    let res = transcript.toString();
    console.log(res);
    performAction(transcript);
}
recognition.onerror = (event) => {
    console.log("Speech recognition error: ", event.error);
};
};
function saveTranscript(transcript) {
    let transcripts = localStorage.getItem('transcripts'); 
    transcripts = transcripts ? JSON.parse(transcripts) : []; 

    transcripts.push(transcript); 

    localStorage.setItem('transcripts', JSON.stringify(transcripts)); 
}


function loadTranscripts() {
    let transcripts = localStorage.getItem('transcripts');
    if (transcripts) {
        transcripts = JSON.parse(transcripts); 
        transcripts.forEach(transcript => {
            let list = document.createElement("li");
            list.textContent = transcript;
            content.appendChild(list);
        });
    }
}

function clearList() {
    localStorage.removeItem('transcripts'); 
    content.textContent = ''; 
    
}


function performAction(message) {
    message = message.toLowerCase(); 
    btn.style.display = "flex"; 
    img.style.display = "none"; 
    
    // Map of commands to actions
    const actions = {
        "hello": () => speak("Hi, welcome to AI assistance created by Sameer."),
        "who are you": () => speak("I am a virtual assistant, created by sameer."),
        "open youtube": () => openAndSpeak("Opening YouTube...", "https://youtube.com/"),
        "open google": () => openAndSpeak("Opening Google...", "https://google.com/"),
        "open instagram": () => openAndSpeak("Opening Instagram...", "https://instagram.com/"),
        "open whatsapp": () => openAndSpeak("Opening WhatsApp...", "https://whatsapp.com/"),
        "open facebook": () => openAndSpeak("Opening Facebook...", "https://facebook.com/"),
        "open calculator": () => openAndSpeak("Opening calculator...", "calculator://s"),
        "thank you for help": () => speak("You're most welcome! Is there anything else I can help you with?"),
        "nothing": () => speak("Ok, no problem. Nice to meet you. I hope we meet again soon!")
    };
    
   
    for (const [command, action] of Object.entries(actions)) {
        if (message.includes(command)) {
            action();
            return; 
        }
    }
    
    
    searchInternet(message);
}


function openAndSpeak(text, url) {
    speak(text); 
    window.open(url, "_blank"); 
}

function searchInternet(query) {
    const finalText = `This is what I found on the internet regarding ${query}`;
    speak(finalText);
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
}


function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    // Hindi language
    window.speechSynthesis.speak(text_speak);
}