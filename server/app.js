import { ChatGPTAPIBrowser } from 'chatgpt'
import express from 'express'
const app = express()
const port = 3000
const OPENAI_EMAIL = "matildapittaly@gmail.com"
const OPENAI_PASSWORD = "AIHacks22!"

const api = new ChatGPTAPIBrowser({
  email: OPENAI_EMAIL,
  password: OPENAI_PASSWORD,
  isGoogleLogin: true,
  executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
})

app.get('/start', async (req, res) => {

  await api.initSession()
//name, theme, charDesc, and goal are needed
  const result = await api.sendMessage("I want you to act as a visual novel narrator and its characters with unique names. My name is " + req.query.name + " and I will be the main character in the story, and I should be able to interact with the other characters. The theme of the story will be:" + req.query.theme + " . The background of the main character is " + req.query.charDesc + "  and his goal is " + req.query.goal + " . You should only talk as the narrator in third person, or as the characters in first person. Before each of your responses, I want you to describe the physical appearance of the scene's background using the format [BACKGROUND]: PHYSICAL APPEARANCE OF THE SCENE’S BACKGROUND. I want you to write character dialogue in the format, [NAME]: “DIALOGUE”. You must always describe the physical appearance of a character when they are speaking for the first time, using the format [NAME OF CHARACTER] (CHARACTER DESCRIPTION): “DIALOGUE”. I want you to always give me 3 choices in order to progress the story once per scene. The choices should be presented in the format of a numbered list. Never choose the decision for me. Always ask me what choice I want to make, and I can only respond in the chat box with one of the options; it should alter the storyline. When a scene changes, write the text: [SCENE CHANGE].")
  //const result = await api.sendMessage("I want you to act as a visual novel narrator and its characters. My name is " + req.query.name + " and I will be the main character in the story, and I should be able to interact with the other characters. The narrator should refer to me using pronouns. The theme of the story will be: " + req.query.theme + " .You should only talk as the narrator in third person, or as the characters in first person. Before each of your responses, I want you to describe the physical appearance of the scene’s background using the format [BACKGROUND]: PHYSICAL APPEARANCE OF THE SCENE’S BACKGROUND. I want you to write character dialogue in the format, [NAME]: “DIALOGUE”. You must always describe the physical appearance of a character when they are speaking for the first time, using the format [NAME] (CHARACTER DESCRIPTION): “DIALOGUE”. I want you to give me 3 choices whenever the story needs to progress. The choices should be presented in the format of a numbered list. The narrator will ask me what choice I want to make, and you must wait for a response from the chat. The choice that I type in the chat will alter the storyline. The scene should change 5 times, and when a scene changes, write the text: [SCENE CHANGE]. You should prompt me with the choices at least one time per scene.")
  //const result = await api.sendMessage("I want you to act as a visual novel narrator and it's side charactors. I want you to set the scene and then only reply to me in conversation as characters. I want you to give me 4 choices everytime options are needed.")
  console.log(result.response)

  res.send(JSON.stringify({
    text: result.response,
    conversationId: result.conversationId,
    messageId: result.messageId
  }))
})

app.get('/choose', async (req, res) => {
  const result = await api.sendMessage(req.query.choice,{
    conversationId: req.query.conversationId,
    parentMessageId: req.query.messageId
  })
  console.log(result.response)

  res.send(JSON.stringify({
    text: result.response,
    conversationId: result.conversationId,
    messageId: result.messageId
    //choices: result - choices
  }))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})