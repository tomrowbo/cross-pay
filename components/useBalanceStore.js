import create from 'zustand'

const useBalanceStore = create((set) => ({
  balance: 54.80,  // Initial balance
  setBalance: (balance) => set({ balance }),  // Method to update balance
  addTransaction: (amount) => set((state) => ({ balance: state.balance + amount }))  // Method to add a transaction
}));

export default useBalanceStore;