import React, { useState, useEffect } from 'react';
import { fetchCustomers, fetchTransactions } from './api';
import CustomerTable from './CustomerTable';
import CustomerGraph from './CustomerGraph';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filter, setFilter] = useState({ name: '', amount: '' });

  useEffect(() => {
    const fetchData = async () => {
      const customerData = await fetchCustomers();
      const transactionData = await fetchTransactions();
      setCustomers(customerData);
      setTransactions(transactionData);
      setFilteredTransactions(transactionData);
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilter = () => {
    let filtered = transactions;

    if (filter.name) {
      const customer = customers.find(c => c.name.toLowerCase().includes(filter.name.toLowerCase()));
      if (customer) {
        filtered = filtered.filter(t => t.customer_id === customer.id);
      }
    }

    if (filter.amount) {
      filtered = filtered.filter(t => t.amount >= parseInt(filter.amount));
    }

    setFilteredTransactions(filtered);
  };

  const selectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const transactionsPerDay = selectedCustomer ? filteredTransactions.filter(t => t.customer_id === selectedCustomer.id)
    .reduce((acc, t) => {
      acc[t.date] = (acc[t.date] || 0) + t.amount;
      return acc;
    }, {}) : {};

  const graphData = Object.keys(transactionsPerDay).map(date => ({
    date,
    amount: transactionsPerDay[date]
  }));

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Customer Transactions</h1>
      <CustomerTable
        transactions={filteredTransactions}
        customers={customers}
        filter={filter}
        handleFilterChange={handleFilterChange}
        applyFilter={applyFilter}
        selectCustomer={selectCustomer}
      />
      {selectedCustomer && (
        <CustomerGraph
          graphData={graphData}
          customerName={customers.find(c => c.id === selectedCustomer)?.name}
        />
      )}
    </div>
  );
};

export default App;
