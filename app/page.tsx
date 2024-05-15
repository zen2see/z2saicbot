import Image from "next/image";
import { TextToSpeech } from "./components/TextToSpeech";
import ChatBotCanvas from "./components/ChatBotCanvas";

export default function Home() {
  return (
    <main className='h-screen'>
      <TextToSpeech />
      <ChatBotCanvas />
    </main>

  )
}