// PARSIING THE RESPONSE
export function parseResponse(response) {
  const lines = response.split('\n');
  const items = [];
  for (const line of lines) {
    // find the trunk section and add items to the items array
    console.log(line);
    if (line[0] === '-') {
      items.push({ name: line.slice(1,).trim(), url: null });
    }
  }
  return items;
}