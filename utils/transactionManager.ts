// Define a Transaction interface for better type checking
export interface Transaction {
    from: string;
    to: string;
    amount: number;
}

// This array will hold all transactions in memory
export const transactions: Transaction[] = [];

export const balances: { [key: string]: number } = {
    "0x77f5504acf4712D8dB92a6C34b4bba49724acEE6": 125,
    "0x4296A6cbdCdcEb9F2314c9d7481686DdA8b48e51": 100,
};


/**
 * Adds a transaction to the in-memory transaction list and updates balances.
 * 
 * @param from - The wallet address of the sender.
 * @param to - The recipient address.
 * @param amount - The amount of the transaction.
 */
export function addTransaction(from: string, to: string, amount: number): void {
    // Check if the sender has enough balance
    if (balances[from] >= amount) {
        // Create a new transaction object
        const newTransaction: Transaction = {
            from,
            to,
            amount
        };

        // Add the new transaction to the array
        transactions.push(newTransaction);

        // Update balances
        balances[from] -= amount;  // Deduct the amount from the sender's balance
        if (balances[to]) {
            balances[to] += amount*1.13;  // Add the amount to the recipient's balance if already exists
        } else {
            balances[to] = amount;   // Initialize balance if recipient address does not exist
        }

        // Optionally, log the current state of transactions and balances for debugging
        console.log('Transaction Added:', newTransaction);
        console.log('Updated Balances:', balances);
    } else {
        console.error('Transaction failed: insufficient funds.');
    }
}

export function getBalance(address: string): number {
    return balances[address] || 0;
}