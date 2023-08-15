import { captureFrame } from "./captureFrame.js";

const inp = document.querySelector("input[type=file]");

inp.onchange = async (e) => {
  captureFrame(e.target.files[0]);
  for(let i = 0; i < 10; i++){
    const frame = await captureFrame(e.target.files[0],i*1);
    createPreview(frame);
  }
};

function createPreview(frame){
  const img = document.createElement("img");
  img.src = frame.url
  document.body.appendChild(img);
}
