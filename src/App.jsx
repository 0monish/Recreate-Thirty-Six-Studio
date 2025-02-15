import React from 'react'
import Canvas from './Canvas'
import CanvasDetails from './CanvasDetails'
import { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from "gsap";
import { FiMenu } from "react-icons/fi";



const App = () => {

  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null)
  const growingSpan = useRef(null)
  const curvedText = useRef(null)

  useEffect(() => {
    // Initialize CircleType inside useEffect
    if (curvedText.current) {
      new CircleType(curvedText.current);
    }
  }, []);

  useGSAP(() => {
    gsap.from("h1 span", {
      y: 200,
      delay: 0.5,
      opacity: 0,
      duration: 1,
      rotate: 10,
      stagger: 0.1,
      ease: "elastic.out(0.5,0.5)",
    });

    gsap.from("nav a", {
      y: 200,
      delay: 0,
      opacity: 0,
      duration: 2,
      stagger: 0.2,
      ease: "power2.out",
    })

    gsap.to(curvedText.current, {
      delay: 1, // Delay before the animation starts
      rotate: 360, // Rotate 360 degrees
      duration: 20, // Duration of one full rotation (in seconds)
      repeat: -1, // Repeat infinitely
      ease: "linear" // Use linear easing for smooth, constant rotation
    });
  })

  return (
    <div className="min-w-[320px] min-h-screen flex flex-col font-['Helvetica_Now_Display'] selection:bg-white selection:text-black ">
      {showCanvas &&
        CanvasDetails[0].map((details, index) => <Canvas details={details} />)}

      {/* Navigation */}
      <nav className="flex justify-between items-center py-5 px-5">
        <div className="text-2xl font-bold">Thirtysixstudio</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-gray-600 transition-colors">
            What we do
          </a>
          <a href="#" className="hover:text-gray-600 transition-colors">
            Who we are
          </a>
          <a href="#" className="hover:text-gray-600 transition-colors">
            How we give back
          </a>
          <a href="#" className="hover:text-gray-600 transition-colors">
            Talk to us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl"><FiMenu />
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col mt-5 ">
        <div className="w-full flex flex-col md:flex-row ">

          <div className="mx-5 md:w-2xs md:ml-[25%] space-y-8 border-1 pr-5">
            <h1 className="text-2xl md:text-3xl font-medium leading-tight">
              At Thirtysixstudio, we build digital assets
              and immersive experiences
              for purposeful brands.
            </h1>

            <p className="text-md">
              We're a boutique production studio focused on design,
              animation, and technology, constantly rethinking
              what digital craft can do for present-day ads
              and campaigns.
            </p>

            <p>Scroll </p>
          </div>

          <div className="ml-10 mr-0 relative w-full flex items-center justify-center border-1 border-red-600 overflow-hidden">
            <h2 className="text-2xl" ref={curvedText}>  THIRTYSIXSTUDIO — FOR ALL THINGS DIGITAL PRODUCTION —</h2>
          </div>

        </div>
      </main>


    </div>
  );
}

export default App