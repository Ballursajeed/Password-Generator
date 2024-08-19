import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [characterAllowed,setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState('')

//ref hook

const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
           let pass = ""
           let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
           
           if (numberAllowed) {
              str += '0123456789' 
           }
           if(characterAllowed) str+= '!@#$%^&*()_?~'

           for (let i = 1; i <= length; i++){
              let char = Math.floor(Math.random() * str.length + 1)
              pass = pass + str.charAt(char)
          }

          setPassword(pass)

  },[length,numberAllowed,characterAllowed,setPassword])
  
  const copyClickBoard = useCallback(() => {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,length)
      window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  },[length,numberAllowed,characterAllowed,passwordGenerator])

  return (
  
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-900'>
      <h1 className='text-white text-center'>Password Generator</h1>
      <div className='flex shadow rounded-lg
      overflow-hidden mb-4'>
            <input 
             type='text'
             value={password}
             className='outline-none w-full py-1 px-3'
             placeholder='password'
             readOnly
             ref={passwordRef}
            />
            <button className='outline-none bg-blue-700 text-white
            px-3 py-0.5 shrink-0'
            onClick={copyClickBoard}
            >copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type='range' 
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label>length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
         type='checkbox'
         defaultChecked={numberAllowed}
         id='numberInput'
         onChange={() => {
          setNumberAllowed((prev) => !prev);
         }}
        />
        <label htmlFor='numberInput'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
         type='checkbox'
         defaultChecked={characterAllowed}
         id='characterInput'
         onChange={() => {
          setCharacterAllowed((prev) => !prev);
         }}
        />
        <label htmlFor='characterInput'>character</label>
      </div>
     </div>
     </div>
    </>
     
  )
}

export default App
