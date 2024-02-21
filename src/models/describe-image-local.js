import axios from 'axios';
import fs from 'fs';

async function getImageDescription(imagePath) {
  // Read the image file as a buffer
  const imageBuffer = fs.readFileSync(imagePath);

  // Base64 encode the image buffer
  const base64Image = Buffer.from(imageBuffer).toString('base64');

  try {
    // Send a POST request to the OpenAI API endpoint for image description
    const response = await axios.post('https://api.openai.com/v1/images/describe', {
      image: {
        base64: base64Image
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      }
    });

    // Extract and return the description from the response
    return response.data.description;
  } catch (error) {
    console.error('Error fetching image description:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Example usage:
const imagePath = '';
getImageDescription(imagePath)
  .then(description => {
    console.log('Image description:', description);
  })
  .catch(error => {
    console.error('Error:', error);
  });
