import { NextResponse } from "next/server"

export async function GET(request: Request) {
  return new Response('Hello, from openai!')
}

export async function POST(request: Request) {
    const {userText} = await request.json()
    console.log(userText) // THIS IS FROM TextToSpeech.tsx handleUserText
    return NextResponse.json({ message : userText }, { status: 200 })
}