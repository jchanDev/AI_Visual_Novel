//import './style.css';
//import { Configuration, OpenAIApi } from 'openai';
//
//const configuration = new Configuration({
//  apiKey: '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',
//});
//
//const openai = new OpenAIApi(configuration);
//
//const prompt = 'a hamster eating a peanut, with a white background';
//
//const result = await openai.createImage({
//  prompt,
//  n: 1,
//  size: '1024x1024',
//});
//
//const url = result.data.data[0].url;
//console.log(url);
//
//const url = 'https://t3.ftcdn.net/jpg/02/76/34/74/360_F_276347475_XLF6MQQ1hj85TN2TkfQtMPWju8a8Ktmh.jpg';
//document.querySelector(".character").innerHTML = `<img class="character-img" alt="Speaking character" src="${url}">`

let index = 0;
let characterImages = {};
const dialogue_box = document.querySelector('.dialogue-box');
dialogue_box.addEventListener('click', async () => {
    console.log('clicked');
    const res = await fetch("https://localhost:3000/start?name=Mateo&theme=xkfbkcck")
    const chatResponse = await res.json();
    const dialogue = chatResponse.dialogue;
    for (let c of chatResponse.characterImages) {
        characterImages[c[0]] = c[1];
    }

    if (index < dialogue.length) {
        let name = dialogue[index][name];
        document.querySelector('.character-name').innerHTML = name + ': ';
        //Display the character that is currently talking
        document.querySelector(".character").innerHTML = `<img class="character-img" alt="Speaking character" src="${characterImages[name]}">`;
        
        document.querySelector('.dialogue-text').innerHTML = '';
        let i = 0;
        const interval = setInterval(function () {

            document.querySelector('.dialogue-text').innerHTML += `${dialogue[index][text][i]}`;
            i++;

            if (i >= dialogue[index][text].length) {
                clearInterval(interval);
            }
        }, 25);

        index += 1;
    } else {
        //display the option choices
        document.querySelector('.options').style.display = "block";
    }

});
