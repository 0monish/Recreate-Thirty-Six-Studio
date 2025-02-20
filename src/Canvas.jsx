import { useEffect, useRef, useState } from "react"
import images from "./assets/images.js"
import { useGSAP } from "@gsap/react"
import gsap from "gsap";


const Canvas = ({ details }) => {

  const { startIndex, numImages, duration, size, top, left, zIndex } = details; // DESTRUCTURE PROPS
  const [scrollSpeed, setScrollSpeed] = useState(Math.random().toFixed(1)); // SET RANDOM SPEED FOR EACH CANVAS

  const [imgIndex, setImgIndex] = useState({ value: startIndex });
  const canvasRef = useRef(null);


  useGSAP(() => {
    gsap.to(imgIndex, {
      value: startIndex + numImages - 1,
      duration: duration,
      repeat: -1, // LOOP INFINITELY
      ease: "linear",
      onUpdate: () => {
        setImgIndex({ value: Math.round(imgIndex.value) })
      }
    })
  })

  useEffect(() => {

    const scale = window.devicePixelRatio; // FOR HIGH DPI SCREENS
    const canvas = canvasRef.current; // GET CANVAS ELEMENT FROM REFERENCE
    const ctx = canvas.getContext("2d"); // GET 2D CONTEXT FROM CANVAS ELEMENT
    const img = new Image(); // CREATE NEW IMAGE ELEMENT
    // console.log(startIndex)
    img.src = images[imgIndex.value] // SET IMAGE SOURCE TO CURRENT IMAGE INDEX
    img.onload = () => {
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
      canvas.style.width = canvas.offsetWidth + "px";
      canvas.style.height = canvas.offsetHeight + "px";

      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight); // DRAW IMAGE ON CANVAS
    };
  }, [imgIndex]);

  return <canvas ref={canvasRef}
    className="absolute pointer-events-none"
    data-scroll // THIS IS THE KEY TO MAKING CANVASES SCROLL.THIS ATTRIBUTE IS FROM LOCOMOTIVE SCROLL
    data-scroll-speed={scrollSpeed} // THIS IS THE KEY TO MAKING CANVASES SCROLL AT DIFFERENT SPEEDS.THIS ATTRIBUTE IS FROM LOCOMOTIVE SCROLL
    style={{
      width: `${size * 1.8}px`,
      height: `${size * 1.8}px`,
      top: `${top}%`,
      left: `${left}%`,
      zIndex: `${zIndex}`,
    }}
  ></canvas>
}

export default Canvas