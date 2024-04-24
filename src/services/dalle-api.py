from openai import OpenAI
import os

# it eats around 10 cents per image
# authentication 
client = OpenAI()

# Prompt for generating a crumpled white paper background
prompt = "Generate a crumpled white paper background image with only one color illusion, strictly limited to white. Ensure that the paper appears crumpled and textured, resembling real paper. The image should depict only the paper texture, with no additional elements or objects visible. The paper texture should cover the entire image canvas, filling it completely from edge to edge. The crumpled texture should be subtle yet noticeable, providing a realistic appearance to the paper background. The final image should have dimensions suitable for use as a full HD background, with a width of 1920 pixels and a height of 1080 pixels."
response = client.images.generate(
    model="dall-e-3",
    prompt=prompt,
    n=1,  # Number of images to generate
    size="1792x1024",  # Image size
)


# Get the URL of the generated image
image_url = response.data[0].url
print("Generated image URL:", image_url)

