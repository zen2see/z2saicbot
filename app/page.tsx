import Image from "next/image";
import { TextToSpeech } from "./components/TextToSpeech";
import ChatBotCanvas from "./components/ChatBotCanvas";
import { IsPlayingProvider } from "./context/isPlayingcontext";

export default function Home() {
  return (
    <main className='h-screen'>
      <IsPlayingProvider>
        <TextToSpeech />
        <ChatBotCanvas />
      </IsPlayingProvider>
      
    </main>

  )
}