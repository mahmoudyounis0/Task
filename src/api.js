
const API_URL = 'http://localhost:3001';

export const fetchCustomers = async () => {
  const response = await fetch(`${API_URL}/customers`);
  const data = await response.json();
  return data;
};

export const fetchTransactions = async () => {
  const response = await fetch(`${API_URL}/transactions`);
  const data = await response.json();
  return data;
};
