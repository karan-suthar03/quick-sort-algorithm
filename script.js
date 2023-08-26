let values = [];
let states = [];
let num = 10;
let ls = 10;

function setup() {
    var canvas = createCanvas(windowWidth, 400);
    canvas.parent("canvas-container");
    num = 1000;
    for (let i = 0; i < num; i++) {
        values.push(random());
        states.push(-1);
    }
    quickSort(values, 0, values.length - 1);
}

async function quickSort(arr, start, end) {
    if (start >= end) {
        return;
    }
    let index = await partition(arr, start, end);
    states[index] = -1;
    await Promise.all([
        quickSort(arr, start, index - 1),
        quickSort(arr, index + 1, end)
    ]);
}

async function partition(arr, start, end) {
    let pivotValue = arr[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        states[i] = 1;
    }
    states[pivotIndex] = 0;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            await swap(arr, i, pivotIndex);
            states[pivotIndex] = -1;
            pivotIndex++;
            states[pivotIndex] = 0;
        }

    }
    await swap(arr, pivotIndex, end);
    for (let i = start; i < end; i++) {
        if (i != pivotIndex) {
            states[i] = -1;
        }
    }
    return pivotIndex;
}

async function swap(arr, a, b) {
    await sleep(ls);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function draw() {
    background(255);
    noStroke();
    for (let i = 0; i < values.length; i++) {
        if (states[i] == 1) {
            fill(255, 0, 0);
        } else if (states[i] == 0) {
            fill(0, 0, 255);
        } else {
            fill(0)
        }
        rect(i * width / num, height, width / num, -values[i] * height);
    }
}

let inputs = document.getElementById("inputs");
inputs.addEventListener("input", function (event) {
    if (inputs.value != 0 && inputs.value != "") {
        ls = inputs.value;
    }
})
inputs.value = ls;

function speed(x) {
    ls = ls + x;
    inputs.value = ls;
}