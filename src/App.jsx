import React from 'react'
import Canvas from './Canvas'
import CanvasDetails from './CanvasDetails'
import { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from "gsap";
import { FiMenu } from "react-icons/fi";
import scrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(scrollTrigger);

const App = () => {

  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null)
  const growingSpan = useRef(null)
  const curvedText = useRef(null)

  useEffect(() => {
   
    if (curvedText.current) {
      new CircleType(curvedText.current);
    }
  }, []);

  useGSAP(() => {
    gsap.from("h1 span", {
      y: 200,
      delay: 1,
      opacity: 0,
      duration: 1.5,
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

    const animation = gsap.to("#curved-text", {
      delay: 1,
      rotate: 360,
      duration: 20, // Default duration
      repeat: -1,
      ease: "linear"
    });

    let timeout;
    // Adjust the timeScale to smoothly transition the duration on scroll
    const handleScroll = () => {
      // Increase the speed by changing timeScale to simulate shorter duration
      gsap.to(animation, {
        timeScale: 20 / 5, // This is the ratio of the new duration to the old duration
        duration: 0.2, // Smooth transition duration
        ease: "linear",
      });
    };

    // Reset the speed after scrolling stops, transitioning it smoothly back to original speed
    const handleStopScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        gsap.to(animation, {
          timeScale: 1, // Reset timeScale to default
          duration: 1, // Smooth transition duration
          ease: "linear",
        });
      }, 150); // 150ms delay after scroll stops
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleStopScroll);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleStopScroll);
    };

  })

  return (
    <div className="min-w-[320px] w-full relative min-h-screen flex flex-col selection:bg-white selection:text-black overflow-hidden ">
      {showCanvas &&
        CanvasDetails[0].map((details, index) => <Canvas details={details} key={index} />)}

      {/* Navigation */}
      <nav className="flex justify-between items-center py-5 px-5 ">
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
        <div className="w-full flex flex-col md:flex-row items-center">

          <div className="md:w-xs ml-5 md:ml-[25%] md:mr-[10%] space-y-8 pr-5">
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


          <div className='w-xs ml-[4%] relative '>

            <div id="curved-text" className="flex items-center justify-center ">
              <p className="text-xl" ref={curvedText}> THIRTYSIXSTUDIO — FOR ALL THINGS DIGITAL PRODUCTION —</p>
            </div>
          </div>

        </div>
      </main>


      <div className="w-full">
        <h1 className="text-[6rem] md:text-[11.5rem] mx-5">
          <span>Thirty</span><span>Six</span><span>Studios</span>
        </h1>
      </div>


    </div>
  );
}

export default App  