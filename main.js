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
