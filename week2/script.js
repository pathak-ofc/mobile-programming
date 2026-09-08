
function sum() {
    const first = Number(document.getElementById("first").value);
    const second = Number(document.getElementById("second").value);

    msg(`The sum is ${first + second}`);
}

function diff() {
    const first = Number(document.getElementById("first").value);
    const second = Number(document.getElementById("second").value);

    msg(`The difference is ${first - second}`);
}

function mult() {
    const first = Number(document.getElementById("first").value);
    const second = Number(document.getElementById("second").value);

    msg(`The product is ${first * second}`);
}

