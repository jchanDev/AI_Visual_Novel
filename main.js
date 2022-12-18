const diff_dialog = ["As Connor walked down the winding path, he couldn't help but feel a sense of unease wash over him. The trees towered over him, their branches rustling in the wind as if they were trying to communicate some secret message. Connor's heart pounded in his chest as he tried to steady his breathing. He had never been one for adventure, but he had agreed to come on this quest with his friends", "As he approached the clearing, he saw three figures standing before him. One was a tall, muscular man with piercing green eyes and a sly grin on his face. The second was a petite woman with long, flowing blonde hair and a kind expression. The third was a hooded figure, their face obscured by the shadows of their cloak", "Connor had no idea who these people were or what they wanted, but he knew he had to be cautious. He scanned the area for any signs of danger, but everything seemed peaceful. He took a deep breath and stepped forward, determined to find out the truth."];

let index = 0;
const dialogue_box = document.querySelector('.dialogue-box');
dialogue_box.addEventListener('click', () => {
    console.log('clicked');
    document.querySelector('.dialogue-text').innerHTML = ''
    if (index < diff_dialog.length) {
        let i = 0;
        const interval = setInterval(function () {

            document.querySelector('.dialogue-text').innerHTML += `${diff_dialog[index][i]}`;
            i++;

            if (i >= diff_dialog[index].length) {
                clearInterval(interval);
            }
        }, 25);

        index += 1;
    } else {
        document.querySelector('.options').style.display = "block";
    }

});