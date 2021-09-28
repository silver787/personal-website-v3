const container = document.querySelector(".visualizer");
// Gets the first element in the document with class "visualizer"
// and assigns it to a variable so it can be used/accessed later

var audio = new Audio()

/* function playNote(rate) {
  soundPlayer.src = "sound/beep-sound-effect"
  soundPlayer.mozPreservesPitch = false;
  soundPlayer.playbackRate = rate;
  soundPlayer.play();
}
*/

const range = 1000;
let blockNumber = 100;
let sectionWidth = window.innerWidth - 40;
// Makes the width of the section available to work with equal to the
// size of the whole window minus 40 pixels for margins of 20 on each side
let margin = 1;
let width = (sectionWidth / blockNumber) - margin;
 
function generateBlocks() {
  for (let i = 0; i < blockNumber; i += 1) {
    const value = Math.floor(Math.random() * range);
    // Generates a random value between 0 and the range of the blocks number

    const block = document.createElement("div");
    // Create an element of type "div" and assign it to the variable "block"
    // Since this section of code is inside a loop it will be executed as many
    // times as is needed.

    block.classList.add("block");
    // Add the class "block" to the block variable

    block.style.height = `${(value / range) * 300}px`;
    // Updates the height of the block element to a value
    
    console.log(window.innerWidth);
    block.style.width = `${(width)}px`;
    block.style.transform = `translateX(${(i * (width + margin)) + 1}px)`;
    // Moves the block to a position
    // i * means that the space of the block from the left will
    // be equal to the space per block multiplied by the current blocks
    // position


    const blockLabel = document.createElement("label");
    blockLabel.innerHTML = value;
    /* Creates a label HTML element for the block that can be used to access
    it later.
    
    The innerHTML of the block is set to null, so no numbers appear above it.*/

    block.appendChild(blockLabel);
    container.appendChild(block);
    /* Puts the block label element inside the block element and the 
    block element inside the container element(div) */
  }
}

function swap(el1, el2) {
  return new Promise(resolve => {
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);

    const transform1 = style1.getPropertyValue("transform");
    const transform2 = style2.getPropertyValue("transform");

    el1.style.transform = transform2;
    el2.style.transform = transform1;

    window.requestAnimationFrame(function() {
      setTimeout(() => {
        container.insertBefore(el2, el1);
        resolve();
      }, 1);
    });
  });
}

async function bubbleSort(delay = 1) {
  let blocks = document.querySelectorAll(".block");
  for (let i = 0; i < blocks.length - 1; i += 1) {
    for (let j = 0; j < blocks.length - i - 1; j += 1) {
      blocks[j].style.backgroundColor = "#9d4242";
      blocks[j + 1].style.backgroundColor = "#9d4242";

      // console.log(`${(blocks.length / 100)}`)
      // playNote(`${(blocks.length / 100)}`);


      const value1 = Number(blocks[j].childNodes[0].innerHTML);
      const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

      if (value1 > value2) {
        await swap(blocks[j], blocks[j + 1]);
        blocks = document.querySelectorAll(".block");
      }

      blocks[j].style.backgroundColor = "#113e53";
      blocks[j + 1].style.backgroundColor = "#113e53";
    }

    blocks[blocks.length - i - 1].style.backgroundColor = "#429d93";
  }
}

// This is a test comment

generateBlocks();
bubbleSort();