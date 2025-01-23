import { useState } from 'react'
import './App.css'
import CreateChatbot from './component/createChatbot'

function App() {
 const [isBotConfigured, setIsBotConfigured] = useState(false)

  return (
    <>
     <CreateChatbot />
    </>
  )
}

export default App
