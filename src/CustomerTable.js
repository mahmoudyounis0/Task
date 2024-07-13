import React from 'react';
import { useEffect } from 'react';
import { fetchCustomers } from './api';
let cutsomersss=[]
const CustomerTable = ({ transactions, customers, filter, handleFilterChange, applyFilter, selectCustomer }) => {
    const getCustomerName = (id) => {
        const customer = customers.find(c => c.id === id);
        return customer ? customer : 'Unknown';
    };

    useEffect(() => {
        const fetchData = async () => {
            const customerData = await fetchCustomers();
            cutsomersss=customerData

        };
        fetchData();
    }, []);
    return (
        <div className="mb-4">
            <div className="form-group">
                <label htmlFor="filterName">Filter by Customer Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="filterName"
                    name="name"
                    value={filter.name}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="filterAmount">Filter by Transaction Amount (greater than or equal)</label>
                <input
                    type="number"
                    className="form-control"
                    id="filterAmount"
                    name="amount"
                    value={filter.amount}
                    onChange={handleFilterChange}
                />
            </div>
            <button className="btn btn-primary mt-3" onClick={applyFilter}>Apply Filter</button>

            <table className="table table-striped table-bordered table-hover mt-4">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Transaction Date</th>
                        <th>Transaction Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{getCustomerName(transaction.customer_id)}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.amount}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => selectCustomer(transaction.customer_id)}>View Graph</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerTable;
