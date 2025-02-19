import { useEffect, useRef, useState } from "react"
import images from "./assets/images.js"
import { useGSAP } from "@gsap/react"
import gsap from "gsap";


const Canvas = ({ details }) => {

  const { startIndex, numImages, duration, size, top, left, zIndex } = details;

  const [imgIndex, setImgIndex] = useState({ value: startIndex });
  const canvasRef = useRef(null);


  useGSAP(() => {
    gsap.to(imgIndex, {
      value: startIndex + 149,
      duration: duration,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {
        setImgIndex({ value: Math.round(imgIndex.value) })
      }
    })
  })


  useEffect(() => {

    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    // console.log(startIndex)
    img.src = images[imgIndex.value]
    img.onload = () => {
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
      canvas.style.width = canvas.offsetWidth + "px";
      canvas.style.height = canvas.offsetHeight + "px";


      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
    };
  }, [imgIndex]);

  return <canvas ref={canvasRef}
    className="absolute"
    data-scroll
    data-scroll-speed={Math.random().toFixed(1)} 
    style={{
      width: `${size * 1.8}px`,
      height: `${size * 1.8}px`,
      top: `${top}%`,
      left: `${left}%`,
      zIndex: `${zIndex}`,
    }}
    id="canvas"
  ></canvas>
}

export default Canvas