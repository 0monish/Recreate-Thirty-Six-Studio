import { useEffect, useRef, useState } from "react"
import images from "./assets/images.js"
import { useGSAP } from "@gsap/react"
import gsap from "gsap";


const Canvas = ({ startIndex }) => {


  const [imgIndex, setImgIndex] = useState({ value: startIndex });
  const canvasRef = useRef(null);


  useGSAP(() => {
    gsap.to(imgIndex, {
      value: startIndex + 149,
      duration: 3,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {
        setImgIndex({ value: Math.round(imgIndex.value) })
      }
    })
  })


  useEffect(() => {
    // const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    // console.log(startIndex)
    img.src = images[imgIndex.value]
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      // canvas.style.width = canvas.offsetWidth + "px";
      // canvas.style.height = canvas.offsetHeight + "px";

      // ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
    };
  }, [imgIndex]);

  return <canvas ref={canvasRef}></canvas>
}

export default Canvas