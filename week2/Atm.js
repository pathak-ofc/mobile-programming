let blc = false;
let balance = 1000;
let balanceTxt = document.getElementById("balance");
balanceTxt.innerText = " Balance = ******";
let pin = "1234";

function toggleBalance() {
    blc = !blc;
    balanceTxt.innerText = blc ? "Balance = " + balance : "Balance = ******";
}

function withDraw() {
    let money = Number(prompt(`enter amount to withdraw  
                            ** it should be multiple of 100 **`));

    if (balance < money) {
        alert("Not enough balance");
    } else {
        if (money % 100 == 0) {
            let epin = prompt("enter pin");


            if (epin == pin) {
                balance -= money;
                alert(`${money} Withdrawed from account`);
            } else {
                alert("worng pin")
            }

        } else {
            alert("NOt multiple of 100");
        }
    }
}

function deposit() {
    let money = Number(prompt("Enter amunt to deposit"));
    if (money % 100 == 0) {
        let epin = prompt("enter pin");
        if (epin == pin) {
            balance += money;
            alert(`${money} deposited to account`);
        } else {
            alert("worng pin")
        }
    } else {
        alert("NOt multiple of 100");
    }

}



