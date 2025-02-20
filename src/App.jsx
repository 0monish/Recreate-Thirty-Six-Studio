import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from "gsap"
import scrollTrigger from 'gsap/ScrollTrigger'
import scrollToPlugin from "gsap/ScrollToPlugin";
import Canvas from './Canvas'
import CanvasDetails from './CanvasDetails'
import { FiMenu } from "react-icons/fi"
import LocomotiveScroll from 'locomotive-scroll'
import pepper from './assets/pepper.png';

gsap.registerPlugin(scrollTrigger);
gsap.registerPlugin(scrollToPlugin);

const App = () => {

  // LOCAMOTIVE SCROLL FOR SMOOTH SCROLLING
  const locomotiveScroll = new LocomotiveScroll()

  const [showCanvas, setShowCanvas] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(false)
  const [isImageVisible, setIsImageVisible] = useState(false)

  const headingRef = useRef(null)
  const growingSpan = useRef(null)
  const cursorRef = useRef(null)
  const curvedText = useRef(null)


  const text = "We provide you with captivating design, interactive animations, reliable code, and immaculate project coordination. Whether you need a campaign built from scratch or assistance at a specific phase, we've got you covered.";

  // SPLIT THE TEXT INTO INDIVIDUAL LETTERS AND ADD SPAN TAGS TO EACH LETTER
  const newText = text.split(" ").map((word, wordIndex) => {
    const letters = [...word].map((char, charIndex) => <span key={charIndex}>{char}</span>);
    return (
      <span key={wordIndex}>
        {letters}
        {wordIndex < text.split(" ").length - 1 && <span>&nbsp;</span>}
      </span>
    );
  });


  useEffect(() => {
    // MAKE THE TEXT CURVED
    if (curvedText.current) {
      new CircleType(curvedText.current);
    }
  }, []);


  useGSAP(() => {

    // CURSOR SECTION
    const cursorSize = 20;

    const handleMouseMove = (e) => {
      if (!isCursorVisible) {
        setIsCursorVisible(true);
      }

      // THIS IS TO MAKE THE CURSOR FOLLOW THE MOUSE
      gsap.to(cursorRef.current, {
        x: e.clientX - cursorSize / 2,
        y: e.clientY - cursorSize / 2,
        ease: "back.out(2)",
        duration: 1,
      })
    }

    document.addEventListener("mousemove", handleMouseMove)

    const heading = headingRef.current;

    // WHEN MOUSE ENTERS THE HEADING THEN THE CURSOR WILL GROW AND IMAGE WILL BE VISIBLE
    heading.addEventListener("mouseenter", () => {
      //console.log("mouse enter")
      setIsImageVisible(true)

      gsap.to(cursorRef.current, {
        scale: 4,
        duration: 0.5,
      })
    })

    // WHEN MOUSE LEAVES THE HEADING THEN THE CURSOR WILL SHRINK AND IMAGE WILL BE INVISIBLE
    heading.addEventListener("mouseleave", () => {
      //console.log("mouse leave")
      setIsImageVisible(false)
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.5,
      })
    })

    // CANVAS(CHILLIES) SECTION i.e. WHEN CLICKING ON THE HEADING TO SHOW THE CANVAS(CHILLIES) SECTION AND HIDE WHEN CLICKING  AGAIN
    heading.addEventListener('click', (e) => {
    
      // SCROLLING TO THE TOP WHEN CLICKING ON THE HEADING
      gsap.to(window, {
        duration: 1,
        scrollTo: 0
      });

      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {

          // TO MAKE THE EFFECT TO TRIGGER THE GROWING SPAN TO GROW FROM THE CURSOR POSITION
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          // TO MAKE THE EFFECT OF GROWING SPAN WHICH COVERS THE WHOLE SCREEN
          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              // console.log("Animation complete");
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });

          // TO SET THE CURSOR COLOR TO WHITE
          gsap.set(cursorRef.current, {
            backgroundColor: "#fff",
            delay: 0.5,
            duration: 0.5,
            ease: "back.out(2)",
          })

          // TO SET THE BODY COLOR TO RED
          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fb2c36",
            duration: 1.2,
            ease: "back.out(2)",
          });

        } else {

          // TO SET THE CURSOR COLOR TO RED
          gsap.set(cursorRef.current, {
            backgroundColor: "#fb2c36",
            delay: 0.5,
            duration: 0.5,
            ease: "back.out(2)",
          })

          // TO SET THE BODY COLOR TO BLACK
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "back.out(2)",
          });
        }

        return !prevShowCanvas;
      })
    });


    // PARAGRAPH SECTION
    gsap.from("#paras p", {
      x: -200,
      delay: 1,
      opacity: 0,
      duration: 2,
      stagger: 0.5,
      ease: "expoScale(0.5,7,none)",
    })

    // NAVIGATION SECTION
    gsap.from("nav a", {
      y: 200,
      delay: 0,
      opacity: 0,
      duration: 2,
      stagger: 0.2,
      ease: "power2.out",
    })

    // HEADING SECTION
    gsap.from("h1 span", {
      y: 200,
      delay: 0.5,
      opacity: 0,
      duration: 1.5,
      rotate: 10,
      stagger: 0.1,
      ease: "elastic.out(0.5,0.5)",
      scrollTrigger: "h1 span"
    });

    // WHAT WE DO SECTION
    gsap.from("h3", {
      y: 20,
      opacity: 0,
      stagger: 2,
      duration: 8,
      ease: "elastic.out(0.5,0.5)",
      scrollTrigger: {
        trigger: "h3",
        scrub: 1,
        start: "50% 50%",
        end: "50% 20%",
        // markers: true
      }
    })

    // SERVICES SECTION
    gsap.from("#services", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 1,
      ease: "elastic.out(0.2,0.5)",
      scrollTrigger: {
        trigger: "#services",
        scrub: 1,
        start: "top 50%",
        end: "top 20%",
        // markers: true
      }
    })

    // SERVICES PARAGRAPH SECTION
    gsap.from("h2 span span", {
      y: 100,
      opacity: 0,
      stagger: 0.8,
      rotate: 10,
      duration: 60,
      ease: "back.out(0.5,0.5)",
      scrollTrigger: {
        trigger: "h2",
        scrub: 1,
        start: "-200% 50%",
        end: "300% 50%",
        // markers: true
      }
    })

    // CURVED TEXT SECTION
    const animation = gsap.to("#curved-text", {
      delay: 1,
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "linear"
    });

    let timeout;

    // INCREASE THE SPEED BY CHANGING TIMESCALE TO SIMULATE SHORTER DURATION
    const handleScroll = () => {

      gsap.to(animation, {
        timeScale: 20 / 5, // THIS IS THE RATIO OF THE NEW DURATION TO THE OLD DURATION
        duration: 0.2,
        ease: "linear",
      });
    };

    // RESET THE SPEED AFTER SCROLLING STOPS, TRANSITIONING IT SMOOTHLY BACK TO ORIGINAL SPEED
    const handleStopScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        gsap.to(animation, {
          timeScale: 1, // RESET TIMESCALE TO DEFAULT
          duration: 1,
          ease: "linear",
        });
      }, 150); // 150MS DELAY AFTER SCROLL STOPS
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleStopScroll);

  })


  return (
    <>
      <div className="min-w-[320px] w-full relative min-h-screen flex flex-col selection:bg-white selection:text-black overflow-hidden ">

        {/* THIS IS USED TO SHOW THE OPENING EFFECT WHEN CLICKED ON HEADING */}
        <span
          ref={growingSpan}
          className="rounded-full block bg-red-500 fixed top-[-20px] left-[-20px] w-5 h-5"
        ></span>

        {/* CURSOR SECTION */}
        <div
          id="cursor"
          className="h-[20px] w-[20px] bg-red-500 flex justify-center items-center fixed top-0 left-0 z-2 pointer-events-none rounded-full"
          ref={cursorRef}
          style={{ opacity: isCursorVisible ? 1 : 0 }}
        >

          {/* THS IMAGE WIL BE DISPLAYED ON HOVERING OVER THE HEADING  */}
          <img
            src={pepper}
            className={`${isImageVisible ? 'block' : 'hidden'} object-contain h-full w-full ml-[10%]`}
          />

        </div>

        {/* SCREEN 1 */}
        <div className='w-full relative min-h-screen'>
          {showCanvas &&
            CanvasDetails[0].map((details, index) => <Canvas details={details} key={index} />)}

          {/* NAVIGATION */}
          <nav className="flex justify-between items-center py-5 px-5 ">
            <div className="text-2xl font-bold">Thirtysixstudio</div>

            {/* DESKTOP MENU */}
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

            {/* MOBILE MENU BUTTON */}
            <button className="md:hidden text-2xl"><FiMenu />
            </button>
          </nav>

          <main className="flex-1 flex flex-col mt-5 ">

            <div className="w-full flex flex-col md:flex-row items-center">

              <div id="paras" className="md:w-xs ml-5 md:ml-[25%] md:mr-[10%] space-y-8 pr-5">
                <p className="text-2xl md:text-3xl font-medium leading-tight">
                  At Thirtysixstudio, we build digital assets
                  and immersive experiences
                  for purposeful brands.
                </p>

                <p className="text-md">
                  We're a boutique production studio focused on design,
                  animation, and technology, constantly rethinking
                  what digital craft can do for present-day ads
                  and campaigns.
                </p>

                <p>Scroll</p>
              </div>

              {/* CIRCULAR TEXT */}
              <div className='w-xs ml-[4%] relative '>

                <div id="curved-text" className="flex items-center justify-center ">
                  <p className="text-xl" ref={curvedText}> THIRTYSIXSTUDIO — FOR ALL THINGS DIGITAL PRODUCTION —</p>
                </div>
              </div>

            </div>
          </main>

        </div>

        {/* SCREEN 2 */}

        <div className="w-full relative min-h-screen">
          {showCanvas &&
            CanvasDetails[1].map((details, index) => <Canvas details={details} key={index} />)}

          {/* HEADING SECTION */}
          <div>
            <h1 ref={headingRef} className="text-[6rem] md:text-[11.5rem] mx-5 leading-none">
              <span>
                <span>T</span><span>h</span><span>i</span><span>r</span><span>t</span><span>y</span>
              </span>
              <span>
                <span>S</span><span>i</span><span>x</span>
              </span>
              <span>
                <span>S</span><span>t</span><span>u</span><span>d</span><span>i</span><span>o</span><span>s</span>
              </span>
            </h1>
          </div>

          <div className="w-full flex flex-col md:flex-row mt-30 space-y-8">

            {/* WHAT WE DO SECTION */}
            <div className="max-w-3xl mx-5 md:ml-[25%] md:mr-[21%]">
              <h3 className="text-2xl">
                1 - What We Do
              </h3>
            </div>

            <div className="md:max-w-xs mx-5 md:mr-[10%] space-y-8">
              <h3 className="text-3xl ">
                We aim to elevate digital production in the advertising space, bringing your ideas to life.
              </h3>

              <h3 className="mt-30">As a contemporary studio, we use cutting-edge design practices and the latest technologies to deliver current digital work.

              </h3>
              <h3>Our commitment to innovation and simplicity, paired with our agile approach, ensures your journey with us is smooth and enjoyable from start to finish.</h3>
            </div>
          </div>
        </div>


        {/* SCREEN 3 */}
        <div className="w-full relative min-h-screen ">
          {showCanvas &&
            CanvasDetails[2].map((details, index) => <Canvas details={details} key={index} />)}

          {/* OUR SERVICES SECTION */}
          <div className="w-full flex flex-col mt-40 space-y-8">
            <div className="mx-5 md:ml-[25%] md:mr-[21%]">
              <h2 id="services" className="text-2xl">
                2 - Our Services
              </h2>
            </div>

            {/* OUR SERVICES TEXT SECTION */}
            <div >
              <h2 className="text-4xl mx-5 md:ml-[25%] md:mr-[15%] text-wrap">
                {newText}
              </h2>

            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App