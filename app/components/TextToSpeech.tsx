
'use client'

import { FormEvent, useContext, useState } from "react"
import { sendTextToOpenAi } from "../utils/sendTextToOpenAi"
import { AppContext } from "../context/isPlayingcontext"

export const TextToSpeech = () => {
  const [userText, setUserText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const synth = typeof window != 'undefined' ? window.speechSynthesis : null
  const voices = synth?.getVoices()
  // console.log('Voices:', voices)
  // const selectedVoices = voices?.find((voice) => voice.name == 'Google 日本語')
  const selectedVoices = voices?.find((voice) => voice.name == 'Zira')
  const { isPlaying, setIsPlaying } = useContext(AppContext)
  const speak = (textToSpeak: string) => {
    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.voice = selectedVoices!
    utterance.rate = 0.8
    synth?.speak(utterance)
    // setIsLoading(true)
    setIsPlaying(true)
    utterance.onend = () => {
      // setIsLoading(false)
      setIsPlaying(false)
    }
  }
  // const handleUserText = async (e: FormEvent<HTMLFormElement>) => {
  async function handleUserText(event: FormEvent<HTMLFormElement>) {  
    event.preventDefault()
    setIsLoading(true)
    try {
      const message = await sendTextToOpenAi(userText)
      speak(message)
    } catch (error) {
      let message = ''
      if (error instanceof Error) message = error.message
      console.log(message)
    } finally {
      setIsLoading(false)
      setUserText('')
    }
    // speak(userText)
  }

  return (
    <div className='relative top-0 z-50'>
      <form className='space-x-2 pt-2 absolute top-[800px] left-[30px]'
            onSubmit={handleUserText}
      >
        <input 
          className='bg-transparent w-[510px] p-2 text-[#b00c3f] 
                  border border-[#b00c3f]/80 outline-none rounded lg'
          placeholder='What do you want to know human...'
          type='text'
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
        />
        <button className='text-[#b00c3f] p-2 border border-[#b00c3f]
                  rounded-lg disabled:text-blue-100 disabled:cursor-not-allowed
                  disabled:bg-gray-500 hover:scale-110 hover:text-black 
                  hover:bg-[#b00c3f] duration-300 transition-all'
                  disabled={isLoading}
        >
          {isLoading ? 'thinking...' : 'Ask'}
        </button>
      </form>
    </div>
  )
}