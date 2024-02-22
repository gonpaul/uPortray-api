import OpenAI from "openai";
import rs from "readline-sync";
import { machineLearning } from "./test_examples/machine-learning.js";
import { knowledgeTree } from "./src/models/knowledgeTree.js";
import { parseResponse } from "./src/utils/messageProcessing.js";
import searchYouTubeVideosAsync from "./src/services/searchYouTubeVideosAsync.js";
import { run } from "googleapis/build/src/apis/run/index.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const subject = rs.question("Enter the subject: ");
// request completion from the API, no configurabable parameters
async function runCompletion() {
  return await openai.chat.completions.create({
    messages: [{ role: "system", content: `${knowledgeTree}
    ` + `/n =subject= ${subject}` }],
    model: "gpt-3.5-turbo",
    max_tokens: 1500,
  });
}

const messages = await runCompletion().then(response => response.choices.map((choice) => choice.message));
console.log(messages);

// PARSING THE RESPONSE
const subjectItems = await parseResponse(messages[0].content);
console.log(subjectItems);
// 

for (const { name } of subjectItems) {
  await searchYouTubeVideosAsync(name)
    .then(videoUrl => {
      subjectItems.map(item => {
        if (item.name === name) {
          item.url = videoUrl;
        }
      })
      console.log(`Most liked ${name} video`, videoUrl);
    })
    .catch(error => console.error('Error:', error));
}

console.log(subjectItems);