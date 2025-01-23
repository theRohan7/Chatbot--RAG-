import { useState } from 'react'
import './App.css'
import CreateBot from './component/CreateChatbot.jsx'


function App() {
 const [isBotConfigured, setIsBotConfigured] = useState(false)

  return (
    <>
     <CreateBot />
    </>
  )
}

export default App
