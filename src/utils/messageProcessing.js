// PARSIING THE RESPONSE
export function parseResponse(response) {
  try {
    if (response === undefined) {
      throw new Error('No response');
    }
    const lines = response.split('\n');
    const items = [];
    for (const line of lines) {
      // find the trunk section and add items to the items array
      // console.log(line);
      if (line[0] === '-') {
        items.push({ name: line.slice(1,).trim(), url: null });
      }
    }
    return items;
  }
  catch (error) {
    console.error('parseResponse error:', error);
  }
}