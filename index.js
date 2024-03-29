import OpenAI from "openai";
import rs from "readline-sync";
import { knowledgeTree } from "./src/models/knowledgeTree.js";
import { parseResponse } from "./src/utils/messageProcessing.js";
import searchYouTubeVideosAsync from "./src/services/searchYouTubeVideosAsync.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const subject = rs.question("Enter the subject: ");
// request completion from the API, no configurabable parameters
let conversationHistory = [{ role: 'system', content: knowledgeTree }];

async function runCompletion(subject) {
  // Add the user's message to the conversation history
  conversationHistory.push({ role: "user", content: subject });

  const response = await openai.chat.completions.create({
    messages: conversationHistory,
    model: "gpt-3.5-turbo",
    max_tokens: 1500,
  });

  // Add the API's response to the conversation history
  const resultContent = response.choices[0].message;
  conversationHistory.push({ role: "assistant", content: resultContent.content });

  console.log(response.choices[0].message.content); // it's better to display content right away
  return resultContent.content;
}

// // legacy code
// async function runCompletion() {
//   return await openai.chat.completions.create({
//     messages: [{ role: "system", content: `${knowledgeTree}
//     ` + `/n =subject= ${subject}` }],
//     model: "gpt-3.5-turbo",
//     max_tokens: 1500,
//   });
// }

// const messages = await runCompletion().then(response => response.choices.map((choice) => choice.message));
// console.log(messages);

// PARSING THE RESPONSE
// const subjectItems = await parseResponse(messages[0].content);
// console.log(subjectItems);
// 

let validationCounter = 0;
let content = await runCompletion(subject).catch(err => console.error('runCompletion error',err));

let usersValidation = rs.question("Is the outline good? (yes/no): ");
while (usersValidation !== "yes" && validationCounter < 3) {
  // console.log("Invalid input");
  const change = rs.question("What do you want to change? ");
  content = await runCompletion('Based on previous chats, apply the next change', change).catch(err => console.error(err));
  usersValidation = rs.question("Is the outline good? (yes/no): ");
  validationCounter++;
}

// PARSING THE RESPONSE
const subjectItems = parseResponse(content);
// console.log(subjectItems);

// SEARCHING YOUTUBE VIDEOS
for (const { name } of subjectItems) {
  await searchYouTubeVideosAsync(name)
    .then(videoUrl => {
      subjectItems.map(item => {
        if (item.name === name) {
          item.url = videoUrl;
        }
      })
      console.log(`${name} video`, videoUrl);
    })
    .catch(error => console.error('Error:', error));
}

console.log(subjectItems);