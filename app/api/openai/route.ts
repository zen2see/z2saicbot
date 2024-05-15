import { NextResponse } from "next/server"
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function GET(request: Request) {
  return new Response('Hello, from openai!')
}

export async function POST(request: Request) {
    const {userText} = await request.json()
    console.log(userText) // THIS IS FROM TextToSpeech.tsx handleUserText
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": userText}],
    })
    const aiMessage = chatCompletion.choices[0].message
    console.log(aiMessage?.content);
    return NextResponse.json({ message : aiMessage?.content }, { status: 200 })
}