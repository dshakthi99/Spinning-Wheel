// Deposit money
// Determine number of lines
// Collect money
// Spin the machine
// Check whether win or not
// Publish the status
// Play again or not
const prompt = require('prompt-sync')();

const ROWS = 3;
const COLS = 3;

const SYM_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};
const SYM_VALUES = {
    A: 4,
    B: 5,
    C: 2,
    D: 3,
};

let balance = 0;  // Initialize balance outside the Deposit function

const Deposit = () => {
    while (true) {
        const stDepamount = prompt("Enter deposit amount: ");
        const numDepamount = parseFloat(stDepamount);

        if (isNaN(numDepamount) || numDepamount <= 0) {
            console.log("Invalid Input");
        } else {
            balance = numDepamount;  // Set the global balance variable
            return numDepamount;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const strNoOfLines = prompt("Enter number of Lines (1-3): ");
        const numOfLines = parseInt(strNoOfLines);

        if (!isNaN(numOfLines) && numOfLines >= 1 && numOfLines <= 3) {
            return numOfLines;
        } else {
            console.log("Invalid Input");
        }
    }
};

const BetAmount = () => {
    while (true) {
        const bet = prompt("Enter total Bet Amount : ");
        const numOfBet = parseFloat(bet);

        if (!isNaN(numOfBet) && 0 <= numOfBet && numOfBet <= balance) {
            return numOfBet;
        } else {
            console.log("Invalid input ");
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYM_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reel = [];
    for (let i = 0; i < COLS; i++) {
        reel.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reel[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reel;
};

const transpose = (reel) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reel[j][i]);
        }
    }
    return rows;
};

const printRow = (rowData) => {
    for (const symbol of rowData) {
        let rowString = " ";
        for (const [i, s] of symbol.entries()) {
            rowString += s;
            if (i !== symbol.length - 1) {
                rowString += "|";
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, numOfLines) => {
    let winnings = 0;

    for (let rowNum = 0; rowNum < numOfLines; rowNum++) {
        const symbols = rows[rowNum];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol !== symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYM_VALUES[symbols[0]];
        }
    }

    return winnings;
};

const game = () => {
    Deposit();  // Call Deposit outside the loop

    while (true) {
        console.log("You have a balance of $" + balance);

        const numOfLines = getNumberOfLines();
        const bet = BetAmount();
        const reel = spin();
        const row = transpose(reel);
        console.log(row);

        const winnings = getWinnings(row, bet, numOfLines);
        console.log("You won $" + winnings.toString());

        balance += winnings;

        if (balance <= 0) {
            console.log("Your money is finished!");
            break;
        }

        const playAgain = prompt("Wanna try again? (Y/N)");

        if (playAgain.toUpperCase() !== 'Y') break;
    }
};

game();
