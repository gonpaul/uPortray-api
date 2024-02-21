import OpenAI from "openai";

const openai = new OpenAI();

async function main(url) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What’s in this image? Give a detailed answer" },
          {
            type: "image_url",
            image_url: {
              "url": url,
            },
          },
        ],
      },
    ],
    "max_tokens": 300,
  });
  return response;
}
main('https://akm-img-a-in.tosshub.com/businesstoday/images/story/202311/untitled_design_-_2023-11-08t170807-sixteen_nine.jpg?size=1200:675').then((response) => {
  console.log(response.choices[0]);
});