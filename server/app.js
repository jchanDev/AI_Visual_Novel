import { ChatGPTAPIBrowser } from "chatgpt";
import express from "express";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
const OPENAI_EMAIL = "matildapittaly@gmail.com";
const OPENAI_PASSWORD = "AIHacks22!";

const api = new ChatGPTAPIBrowser({
  email: OPENAI_EMAIL,
  password: OPENAI_PASSWORD,
  isGoogleLogin: true,
  // executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
});
await api.initSession();

async function parseResponse(response) {
  let dialogues = response.split("\n\n");
  let charImgs = {};
  let parsedDialogue = []; //if length is 4 it has character description. If length is 3 it does not.
  let choices = []; //access first choice at 1
  let bgPrompt = /\[BACKGROUND\]: (.*)$/gm.exec(response)?.[1];

  //generate the background
  const configuration = new Configuration({
    apiKey: process.env.API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  let bgUrl;
  if (bgPrompt) {
    // const imgResult = await openai.createImage({
    //   prompt: bgPrompt,
    //   n: 1,
    //   size: '1024x1024',
    // });
    bgUrl = "imgResult.data.data[0].url";
  }

  let isProcessingChoices = false;
  for (let dialogue of dialogues) {
    if (dialogue === "[CHOICES]") {
      isProcessingChoices = true;
      continue;
    }
    if (isProcessingChoices) {
      choices = [...dialogue.matchAll(/^\d\. (.*)$/gm)].map(
        (result) => result[1]
      );
    }
    if (!isProcessingChoices) {
      const dialoguePts = [
        ...dialogue.matchAll(/^\[(.*)\]( \((.*)\)){0,1}: (.*)$/gm),
      ][0];

      let tempObj;
      console.log(dialoguePts);
      if (dialoguePts.length === 5) {
        tempObj = {
          name: dialoguePts[1],
          description: dialoguePts[3],
          text: dialoguePts[4],
        };
        console.log("AAAAAAAAAAAAA", tempObj.description);
        if (tempObj.description) {
          //generate the image for the character
          const charPrompt = `A watercolor painting of ${tempObj.description}, with a transparent background`;
          const imgResult = await openai.createImage({
            prompt: charPrompt,
            n: 1,
            size: "1024x1024",
          });
          const url = imgResult.data.data[0].url;
          charImgs[tempObj.name] = url;
        }
      } else {
        tempObj = { name: dialoguePts[1], text: dialoguePts[4] };
      }
      parsedDialogue.push(tempObj);
    }
  }

  return { parsedDialogue, choices, bgUrl, charImgs };
}

app.get("/start", async (req, res) => {
  //name, theme, charDesc, and goal are needed
  const result = await api.sendMessage(
    "I want you to act as a visual novel narrator and its characters with unique specific names. My name is " +
      req.query.name +
      " and I will be the main character in the story, and I should be able to interact with the other characters. The theme of the story will be:" +
      req.query.theme +
      " . The background of the main character is " +
      req.query.charDesc +
      "  and his goal is " +
      req.query.goal +
      " .You should only talk as the narrator in third person, or as the characters in first person. Before each of your responses, you must describe the physical appearance of the scene’s background using the format [BACKGROUND]: PHYSICAL APPEARANCE OF THE SCENE’S BACKGROUND. When a scene changes, write the text: [SCENE CHANGE]. I want you to write character dialogue in the format, [NAME]: “dialogue”. You must always describe the physical appearance of a character when they are speaking for the first time, using the format [NAME OF THE CHARACTER SPEAKING] (CHARACTER DESCRIPTION): “dialogue”. Write  [OPTIONS]: and then add another line. I want you to always prompt the text box with 3 choices in order to progress the story at the end of the scene. The choices should be presented in the format of a numbered list and alter the storyline. You must stop writing after options are given."
  );

  //   const result = {
  //     response: `[BACKGROUND]: The scene is set in a bustling marketplace in a fantasy kingdom. The sun is high in the sky, casting a warm glow on the colorful stalls and vendors shouting to attract customers.

  // [Mateo] (a Chinese eccentric CS major with a playful glint in his eyes): "Wow, this place is amazing! So many sights and sounds, it's like a sensory overload. I wonder what kind of adventures I'll have here."

  // [NARRATOR]: You see a group of merchants huddled together, whispering amongst themselves. One of them seems to be glancing in your direction.

  // [CHOICES]

  // 1. Approach the merchants and ask what they're talking about.
  // 2. Ignore them and continue browsing the stalls.
  // 3. Go back to the inn and rest for the night.

  // What do you choose to do, Mateo?`,
  //     messageId: "msg",
  //     conversationId: "conv"
  //   }

  console.log(result.response);

  const { parsedDialogue, choices, bgUrl, charImgs } = await parseResponse(
    result.response
  );

  res.send(
    JSON.stringify({
      dialogue: parsedDialogue,
      choices: choices,
      background: bgUrl,
      characterImages: charImgs,
      conversationId: result.conversationId,
      messageId: result.messageId,
    })
  );
});

app.get("/choose", async (req, res) => {
  const result = await api.sendMessage(req.query.choice, {
    conversationId: req.query.conversationId,
    parentMessageId: req.query.messageId,
  });
  console.log(result.response);

  const { parsedDialogue, choices, bgUrl, charImgs } = await parseResponse(
    result.response
  );

  console.log(onlyText + "\n" + choiceText);
  res.send(
    JSON.stringify({
      dialogue: parsedDialogue,
      choices: choices,
      background: bgUrl,
      characterImages: charImgs,
      conversationId: result.conversationId,
      messageId: result.messageId,
    })
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
