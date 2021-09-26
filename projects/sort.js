const container = document.querySelector(".data-container");
const range = 1000;

function generateBlocks() {
  for (let i = 0; i < 100; i += 1) {
    const value = Math.floor(Math.random() * range);

    const block = document.createElement("div");
    block.classList.add("block");
    block.style.height = `${(value / range) * 300}px`;
    block.style.transform = `translateX(${i * 5}px)`;

    const blockLabel = document.createElement("label");
    blockLabel.innerHTML = value;

    block.appendChild(blockLabel);
    container.appendChild(block);
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

      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      const value1 = Number(blocks[j].childNodes[0].innerHTML);
      const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

      if (value1 > value2) {
        await swap(blocks[j], blocks[j + 1]);
        blocks = document.querySelectorAll(".block");
      }

      blocks[j].style.backgroundColor = "#0b7189";
      blocks[j + 1].style.backgroundColor = "#0b7189";
    }

    blocks[blocks.length - i - 1].style.backgroundColor = "#429d93";
  }
}

generateBlocks();
bubbleSort();