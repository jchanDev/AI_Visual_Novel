import './style.css';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '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',
});

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

const url = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-Phxuz2pO5iszQWB0QdKawuwf/user-GGaETe6eVvY2E6fu25XHVx76/img-wmr1LBzpmtzanx27Rvdwq40u.png?st=2022-12-18T05%3A14%3A19Z&se=2022-12-18T07%3A14%3A19Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-17T21%3A47%3A56Z&ske=2022-12-18T21%3A47%3A56Z&sks=b&skv=2021-08-06&sig=hLCxBLUz3SdfUl87n0xUftEdxbdq154zCxUaC%2Bwkj4k%3D';
document.querySelector(".character").innerHTML = `<img alt="Speaking character" src="${url}">`

const diff_dialog = ["As Connor walked down the winding path, he couldn't help but feel a sense of unease wash over him. The trees towered over him, their branches rustling in the wind as if they were trying to communicate some secret message. Connor's heart pounded in his chest as he tried to steady his breathing. He had never been one for adventure, but he had agreed to come on this quest with his friends", "As he approached the clearing, he saw three figures standing before him. One was a tall, muscular man with piercing green eyes and a sly grin on his face. The second was a petite woman with long, flowing blonde hair and a kind expression. The third was a hooded figure, their face obscured by the shadows of their cloak", "Connor had no idea who these people were or what they wanted, but he knew he had to be cautious. He scanned the area for any signs of danger, but everything seemed peaceful. He took a deep breath and stepped forward, determined to find out the truth."];

let index = 0;
const dialogue_box = document.querySelector('.dialogue-box');
dialogue_box.addEventListener('click', () => {
  console.log('clicked');
  if (index < diff_dialog.length) {
    document.querySelector('.dialogue-text').innerHTML = `<p>${diff_dialog[index]}</p>`;
    const words = diff_dialog[index].split(' ');
    let i = 0;
    const interval = setInterval(function() {
        document.querySelector('.dialogue-text').innerHTML += `${words[i]} `;
        i++;

        if (i >= words.length) {
            clearInterval(interval);
        }
    }, 125);

    
    index += 1;
  }

});
