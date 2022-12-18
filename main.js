import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: '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',
});

console.log("HI!!!");

const form = document.querySelector(".story-setup");
//name, theme, charDesc, and goal are needed
async function fetchStart(evt){
    evt.preventDefault();
    const data = new URLSearchParams();
    for (const [key, val] of new FormData(form)) {
        data.append(key, val);
    }
    const response = await fetch('http://localhost:3000/start?' + data);
    return response.json();
}
form.onsubmit = fetchStart;


const openai = new OpenAIApi(configuration);

const prompt = 'a hamster eating a peanut, with a white background';

//const result = await openai.createImage({
//  prompt,
//  n: 1,
//  size: '1024x1024',
//})
//
//const url = result.data.data[0].url;
//console.log(url);

const url = 'https://t3.ftcdn.net/jpg/02/76/34/74/360_F_276347475_XLF6MQQ1hj85TN2TkfQtMPWju8a8Ktmh.jpg';
document.querySelector(".character").innerHTML = `<img class="character-img" alt="Speaking character" src="${url}">`

const diff_dialog = ["As Connor walked down the winding path, he couldn't help but feel a sense of unease wash over him. The trees towered over him, their branches rustling in the wind as if they were trying to communicate some secret message. Connor's heart pounded in his chest as he tried to steady his breathing. He had never been one for adventure, but he had agreed to come on this quest with his friends", "As he approached the clearing, he saw three figures standing before him. One was a tall, muscular man with piercing green eyes and a sly grin on his face. The second was a petite woman with long, flowing blonde hair and a kind expression. The third was a hooded figure, their face obscured by the shadows of their cloak", "Connor had no idea who these people were or what they wanted, but he knew he had to be cautious. He scanned the area for any signs of danger, but everything seemed peaceful. He took a deep breath and stepped forward, determined to find out the truth."];

let index = 0;
let characterImages = {};
const dialogue_box = document.querySelector('.dialogue-box');
dialogue_box.addEventListener('click', async () => {
    console.log('clicked');
    const res = await fetch("https://localhost:3000/start?name=Mateo&theme=xkfbkcck")
    const chatResponse = await res.json();
    const dialogue = chatResponse.dialogue;
    for (let c of chatResponse[characterImages]) {
        characterImages[c] = chatResponse[characterImages][c];
    }

    if (index < dialogue.length) {
        let name = dialogue[index][name];
        if (name === 'NARRATOR') {
            name = AIVN;
        }
        document.querySelector('.character-name').innerHTML = name + ': ';
        //Display the character that is currently talking
        if (name !== 'AIVN') {
            document.querySelector(".character").innerHTML = `<img class="character-img" alt="Speaking character" src="${characterImages[name]}">`;
        }
        
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
