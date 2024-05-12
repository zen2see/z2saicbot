export const sendTextToOpenAI = async (userText: string): Promise<string> => {
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ userText })
  })
  const { message } : {message : string} = await response.json()
  return message
}