const form = document.querySelector(".story-setup");
//name, theme, charDesc, and goal are needed
async function fetchStart(evt){
    evt.preventDefault();
    const params = new URLSearchParams();
    for (const [key, val] of new FormData(form)) {
        params.append(key, val);
    }
    document.getElementById("startMenu").style.display = "none";
    return;
}

form.onsubmit = fetchStart;

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
        let characterName = dialogue[index].name;
        if (characterName === 'NARRATOR') {
            document.querySelector('.character-name').innerHTML = '';
            if (index == 0)
                document.querySelector(".character").innerHTML = '';
        } else {
            document.querySelector('.character-name').innerHTML = characterName + ': ';
            //Display the character that is currently talking
            document.querySelector(".character").innerHTML = `<img class="character-img" alt="Speaking character" src="${characterImages.name}">`;
        }

        document.querySelector('.dialogue-text').innerHTML = '';
        let i = 0;
        const interval = setInterval(function () {

            document.querySelector('.dialogue-text').innerHTML += `${dialogue[index].text[i]}`;
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
