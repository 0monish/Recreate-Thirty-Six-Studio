import React from 'react'
import Canvas from './Canvas'

const App = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-black text-white">
        <Canvas startIndex={0} />
        <Canvas startIndex={150} />
        <Canvas startIndex={300} />
        <Canvas startIndex={450} />
        <Canvas startIndex={600} />
        <Canvas startIndex={750} />
        <Canvas startIndex={900} />
        


      </div>
    </>
  )
}

export default App