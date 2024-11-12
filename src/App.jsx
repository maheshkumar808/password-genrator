import { useState, useCallback, useEffect, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [alphaAllowed, setAlphaAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef('null')

const passwordGenerator = useCallback(
  () => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@$"
    if(alphaAllowed) str += "%#"

    for(let i = 1; i <= length; i++ ){
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)

  }
  setPassword(pass)

  },
  [length, numberAllowed, charAllowed, alphaAllowed],
)

const copyPasswordToClipboard =  useCallback(() => {
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
},[password])



  useEffect(() => {
    passwordGenerator()
  },[length, numberAllowed, charAllowed, alphaAllowed, passwordGenerator])

  return (
  <div className='w-full my-20 max-w-2xl mx-auto shadow-md justify-item-center rounded-xl px-5 py-5 my-8  text-center text-orange-500 bg-gray-700'>
  <h1 className='text-white text-4xl my-3 mx-7'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-auto gap-x-2'>
    <input
    type='text'
    value={password}
    className='outline-none text-gray-400 w-full py-2 px-3 mb-5 rounded'
    placeholder='password'
    ref={passwordRef}
    readOnly
    />
    <button
    onClick={copyPasswordToClipboard}
    className=" bg-blue-700 hover:bg-blue-1000 focus:outline-none focus:ring-4 focus:ring-blue-300 font-xl rounded-lg text-xl px-8 py-2.5 text-center  mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">copy</button>

  </div>
    <div className='flex text-lg flex- wrap gap-x-2 '>
    <div className='flex item-center gap-x-2'>
    <input
    type="range"
    min={1}
    max={20}
    value={length}
    className='cursor-pointer'
    onChange={(e) =>{setLength(e.target.value)}}
    />
    <label>Length:{length}</label>
   </div>
   <div className='flex item-center gap-x-2'>
   <input
    type='checkbox'
    id='numberInput'
    defaultChecked={numberAllowed}
    onChange={() =>{setNumberAllowed((prev) => !prev);}}
   />
   <label htmlFor="numberInput">Number</label>
   </div>
   <div className='flex item-center gap-x-2'>
   <input
    type='checkbox'
    id='charinput'
    defaultChecked={charAllowed}
    onChange={() =>{setCharAllowed((prev) => !prev)}}
   />
   <label htmlFor='charinput'>Character</label>
   </div>
   <div className='flex item-center gap-x-2'>
   <input
    type='checkbox'
    id='alphainput'
    defaultChecked={alphaAllowed}
    onChange={() =>{setAlphaAllowed((prev) => !prev)}}
   />
   <label htmlFor='alphainput'>Alphabet</label>
   </div>
    </div>
    </div>

  )
}

export default App
