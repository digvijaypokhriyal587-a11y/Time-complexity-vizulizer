// Global Array
let array = [];

// Generate Random Array
function generateArray(size) {

    array = [];

    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 300) + 10);
    }

    drawArray();
}

// Draw Array Bars
function drawArray() {

    const container = document.getElementById("array-container");

    container.innerHTML = "";

    array.forEach(value => {

    const barContainer = document.createElement("div");

    barContainer.classList.add("bar-container");

    const bar = document.createElement("div");

    bar.classList.add("bar");

    bar.style.height = `${value}px`;

    const label = document.createElement("span");

    label.classList.add("bar-label");

    label.innerText = value;

    barContainer.appendChild(label);
    barContainer.appendChild(bar);

    container.appendChild(barContainer);
        });
}

// Delay Function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort Visualization
async function bubbleSort() {

    let bars = document.querySelectorAll(".bar");

    for (let i = 0; i < array.length; i++) {

        for (let j = 0; j < array.length - i - 1; j++) {

            // Comparing
            bars[j].style.background = "red";
            bars[j + 1].style.background = "red";

            await sleep(speed);

            if (array[j] > array[j + 1]) {

                // Swap
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                drawArray();

                bars = document.querySelectorAll(".bar");

                bars[j].style.background = "yellow";
                bars[j + 1].style.background = "yellow";

                await sleep(speed);
            }

            bars[j].style.background = "blue";
            bars[j + 1].style.background = "blue";
        }

        // Mark Sorted
        bars = document.querySelectorAll(".bar");
        bars[array.length - i - 1].style.background = "green";
    }
}

// Controls
const generateBtn = document.getElementById("generate");
const sizeSlider = document.getElementById("size");
const speedSlider = document.getElementById("speed");
const startBtn = document.getElementById("start");
const linearSearchBtn =
document.getElementById("linearSearch");

const binarySearchBtn =
document.getElementById("binarySearch");

const targetInput =
document.getElementById("target");

// Speed Variable
let speed = 50;

// Generate New Array Button
generateBtn.addEventListener("click", () => {
    generateArray(sizeSlider.value);
});

// Array Size Slider
sizeSlider.addEventListener("input", () => {
    generateArray(sizeSlider.value);
});

// Speed Slider
speedSlider.addEventListener("input", () => {
    speed = 101 - speedSlider.value;
});

// Start Sorting
startBtn.addEventListener("click", async () => {

    generateBtn.disabled = true;
    startBtn.disabled = true;

    const algorithm =
    document.getElementById("algorithm").value;

    if (algorithm === "bubble") {
        await bubbleSort();
    }

    else if (algorithm === "selection") {
        await selectionSort();
    }

    else if (algorithm === "insertion") {
        await insertionSort();
    }
    else if (algorithm === "merge") {
        await runMergeSort();
    }

    generateBtn.disabled = false;
    startBtn.disabled = false;
});


async function selectionSort() {

    let bars = document.querySelectorAll(".bar");

    for (let i = 0; i < array.length; i++) {

        let minIndex = i;

        bars[i].style.background = "orange";

        for (let j = i + 1; j < array.length; j++) {

            bars[j].style.background = "red";

            await sleep(speed);

            if (array[j] < array[minIndex]) {

                if (minIndex !== i) {
                    bars[minIndex].style.background = "blue";
                }

                minIndex = j;

                bars[minIndex].style.background = "purple";
            }
            else {
                bars[j].style.background = "blue";
            }
        }

        let temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;

        drawArray();

        bars = document.querySelectorAll(".bar");

        bars[i].style.background = "green";

        await sleep(speed);
    }
}

function updateComplexity(algo){

    if(algo==="bubble"){

        document.getElementById("best").innerText =
        "Best Case: O(n)";

        document.getElementById("average").innerText =
        "Average Case: O(n²)";

        document.getElementById("worst").innerText =
        "Worst Case: O(n²)";

        document.getElementById("space").innerText =
        "Space Complexity: O(1)";
    }

    if(algo==="selection"){

        document.getElementById("best").innerText =
        "Best Case: O(n²)";

        document.getElementById("average").innerText =
        "Average Case: O(n²)";

        document.getElementById("worst").innerText =
        "Worst Case: O(n²)";

        document.getElementById("space").innerText =
        "Space Complexity: O(1)";
    }
    if(algo==="insertion"){

    document.getElementById("best").innerText =
    "Best Case: O(n)";

    document.getElementById("average").innerText =
    "Average Case: O(n²)";

    document.getElementById("worst").innerText =
    "Worst Case: O(n²)";

    document.getElementById("space").innerText =
    "Space Complexity: O(1)";
    }
    if(algo==="merge"){

    document.getElementById("best").innerText =
    "Best Case: O(n log n)";

    document.getElementById("average").innerText =
    "Average Case: O(n log n)";

    document.getElementById("worst").innerText =
    "Worst Case: O(n log n)";

    document.getElementById("space").innerText =
    "Space Complexity: O(n)";
    }
}


const algorithmDropdown =
document.getElementById("algorithm");

algorithmDropdown.addEventListener("change", () => {

    updateComplexity(
        algorithmDropdown.value
    );

});

async function insertionSort() {

    let bars = document.querySelectorAll(".bar");

    for (let i = 1; i < array.length; i++) {

        let key = array[i];
        let j = i - 1;

        bars[i].style.background = "orange";

        await sleep(speed);

        while (j >= 0 && array[j] > key) {

            bars[j].style.background = "red";

            array[j + 1] = array[j];

            drawArray();

            bars = document.querySelectorAll(".bar");

            await sleep(speed);

            bars[j].style.background = "blue";

            j--;
        }

        array[j + 1] = key;

        drawArray();

        bars = document.querySelectorAll(".bar");

        for(let k=0;k<=i;k++){
            bars[k].style.background="green";
        }

        await sleep(speed);
    }

    bars = document.querySelectorAll(".bar");

    bars.forEach(bar=>{
        bar.style.background="green";
    });
}
async function merge(left, mid, right) {

    let n1 = mid - left + 1;
    let n2 = right - mid;

    let leftArr = [];
    let rightArr = [];

    for(let i = 0; i < n1; i++)
        leftArr.push(array[left + i]);

    for(let j = 0; j < n2; j++)
        rightArr.push(array[mid + 1 + j]);

    let i = 0;
    let j = 0;
    let k = left;

    while(i < n1 && j < n2) {

        if(leftArr[i] <= rightArr[j]) {
            array[k] = leftArr[i];
            i++;
        }
        else {
            array[k] = rightArr[j];
            j++;
        }

        drawArray();

        let bars = document.querySelectorAll(".bar");
        bars[k].style.background = "orange";

        await sleep(speed);

        k++;
    }

    while(i < n1) {

        array[k] = leftArr[i];

        drawArray();

        await sleep(speed);

        i++;
        k++;
    }

    while(j < n2) {

        array[k] = rightArr[j];

        drawArray();

        await sleep(speed);

        j++;
        k++;
    }
}
async function mergeSort(left, right) {

    if(left >= right)
        return;

    let mid = Math.floor((left + right) / 2);

    await mergeSort(left, mid);

    await mergeSort(mid + 1, right);

    await merge(left, mid, right);
}
async function runMergeSort() {

    await mergeSort(0, array.length - 1);

    let bars = document.querySelectorAll(".bar");

    bars.forEach(bar => {
        bar.style.background = "green";
    });
}

// Create Initial Array
generateArray(30);
updateComplexity("bubble");
// ================================
// CODE COMPLEXITY ANALYZER
// ================================

const analyzeBtn = document.getElementById("analyzeBtn");

function detectComplexity(code) {

    let result = {
        time: "O(1)",
        space: "O(1)",
        reason: ""
    };

    // Remove comments
    code = code.replace(/\/\/.*$/gm, "");
    code = code.replace(/\/\*[\s\S]*?\*\//g, "");

    const forLoops = (code.match(/for\s*\(/g) || []).length;
    const whileLoops = (code.match(/while\s*\(/g) || []).length;

    const totalLoops = forLoops + whileLoops;

    if (
        code.includes("mid") &&
        code.includes("low") &&
        code.includes("high")
    ) {

        result.time = "O(log n)";
        result.space = "O(1)";
        result.reason = "Binary Search pattern detected.";

        return result;
    }

    if (
        code.includes("mergeSort") ||
        code.includes("merge(")
    ) {

        result.time = "O(n log n)";
        result.space = "O(n)";
        result.reason = "Merge Sort detected.";

        return result;
    }

    if (
        code.includes("quickSort") ||
        code.includes("partition(")
    ) {

        result.time = "O(n log n)";
        result.space = "O(log n)";
        result.reason = "Quick Sort detected.";

        return result;
    }

    if (
        code.includes("linearSearch") ||
        code.includes("target")
    ) {

        result.time = "O(n)";
        result.space = "O(1)";
        result.reason = "Linear Search pattern detected.";

        return result;
    }

    const functionNames =
        code.match(/(?:void|int|float|double|long|char|bool|string)\s+([a-zA-Z_]\w*)\s*\(/g);

    if (functionNames) {

        for (let fn of functionNames) {

            let name =
                fn.split(" ")[1].split("(")[0];

            let regex =
                new RegExp(name + "\\s*\\(", "g");

            let calls =
                (code.match(regex) || []).length;

            if (calls > 1) {

                result.time = "O(2ⁿ)";
                result.space = "O(n)";
                result.reason = "Recursive function detected.";

                return result;
            }
        }
    }

    if (totalLoops === 0) {

        result.time = "O(1)";
        result.space = "O(1)";
        result.reason = "No loops detected.";

        return result;
    }

    if (totalLoops === 1) {

        result.time = "O(n)";
        result.space = "O(1)";
        result.reason = "Single loop detected.";

        return result;
    }

    if (totalLoops === 2) {

        result.time = "O(n²)";
        result.space = "O(1)";
        result.reason = "Nested loops detected.";

        return result;
    }

    if (totalLoops === 3) {

        result.time = "O(n³)";
        result.space = "O(1)";
        result.reason = "Triple nested loops detected.";

        return result;
    }

    result.time = "Complex";
    result.space = "Unknown";
    result.reason = "Pattern not recognized.";

    return result;
}
const themeBtn =
document.getElementById("themeBtn");

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

});
async function linearSearch() {

    let target =
    parseInt(targetInput.value);

    let bars =
    document.querySelectorAll(".bar");

    for(let i=0;i<array.length;i++){

        bars[i].style.background = "red";

        await sleep(speed);

        if(array[i] === target){

            bars[i].style.background = "green";

            alert(
                "Element Found at Index " + i
            );

            return;
        }

        bars[i].style.background = "blue";
    }

    alert("Element Not Found");
}

async function binarySearch() {

    let target =
    parseInt(targetInput.value);

    // Create sorted copy
    array.sort((a,b)=>a-b);

    drawArray();

    let bars =
    document.querySelectorAll(".bar");

    let low = 0;
    let high = array.length - 1;

    while(low <= high){

        let mid =
        Math.floor((low + high)/2);

        bars[mid].style.background =
        "orange";

        await sleep(speed);

        if(array[mid] === target){

            bars[mid].style.background =
            "green";

            alert(
                "Element Found at Index " + mid
            );

            return;
        }

        if(array[mid] < target){

            low = mid + 1;
        }
        else{

            high = mid - 1;
        }

        bars[mid].style.background =
        "blue";
    }

    alert("Element Not Found");
}
linearSearchBtn.addEventListener(
    "click",
    async ()=>{
        await linearSearch();
    }
);

binarySearchBtn.addEventListener(
    "click",
    async ()=>{
        await binarySearch();
    }
);
