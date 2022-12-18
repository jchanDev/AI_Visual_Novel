import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: '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'
});

const openai = new OpenAIApi(configuration);

const prompt = 'a hamster eating a peanut'

const result = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
});

const url = result.data.data[0].url;
var img = document.createElement("img");
img.src = url;
var src = document.getElementsByClassName("character");
src.appendChild(img);
