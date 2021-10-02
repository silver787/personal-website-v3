const container = document.querySelector(".visualizer");
const containerWidth = window.innerWidth - 40 - 1;
const delay = 1;
const range = 325;

const blockNumber = 50;
const blockMargin = 1;
const blockWidth = (containerWidth / blockNumber) - blockMargin;

const audioArray = [];

for (let i = 0; i < 20; i++) {
    audioArray[i] = new Audio("sound/click-sound-effect.mp3");
}

var audioCount = 0;


function playAudio() {
    audioArray[audioCount].play();
    audioCount += 1;

    if (audioCount > 19) {
        audioCount = 0;
    }
}


function randomArrayGenerator(){
    let usedNumsArray = [];

    for (let i = 0; i < blockNumber; i++){
        num = Math.floor(Math.random() * blockNumber);

        if (usedNumsArray.includes(num) == false){
            usedNumsArray.push(num);
        }
        else {
            i -= 1;
            continue;
        }
    }

    return usedNumsArray;
}


function generateBlocks() {
    let count = 0;

    for (const value of randomArrayGenerator()){
        const block = document.createElement("div");

        block.classList.add("block");
        block.style.height = `${((value / blockNumber) * range) + 0.1 * range}px`;
        block.style.width = blockWidth + `px`;
        block.style.transform = `translateX(${count * (blockWidth + blockMargin) + 1}px)`;
        block.id = ((value / blockNumber) * range) + 0.1 * range;

        container.appendChild(block);

        count += 1;
        
    }
}

function swap(block1, block2) {
    return new Promise((resolve) => {
        const style1 = window.getComputedStyle(block1);
        const style2 = window.getComputedStyle(block2);
    
        const transform1 = style1.getPropertyValue("transform");
        const transform2 = style2.getPropertyValue("transform");
    
        block1.style.transform = transform2;
        block2.style.transform = transform1;
    
        window.requestAnimationFrame(function() {
            setTimeout(() => {
                container.insertBefore(block1, block2)
                resolve();
            }, delay)
        });
    });
}

async function bubbleSort() {
    let blocks = document.querySelectorAll(".block");

    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks.length - i - 1; j++) {

            blocks[j].style.backgroundColor = "#9d4242"; //red
            blocks[j + 1].style.backgroundColor = "#9d4242";


            if (Number(blocks[j].id) > Number(blocks[j + 1].id)) {
                await swap(blocks[j + 1], blocks[j]);

                blocks = document.querySelectorAll(".block")
            }
            else {
                setTimeout(() => { }, delay);
            }

            blocks[j].style.backgroundColor = "#113e53"; //blue
            blocks[j + 1].style.backgroundColor = "#113e53";
        }

        blocks[blocks.length - i - 1].style.backgroundColor = "#429d93";
        playAudio();
    }
}


generateBlocks();

