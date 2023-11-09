const API_URL = 'https://example.com/api';

async function fetchApi(endpoint, options = {}) {
    const response = await fetch(`${API_URL}/${endpoint}`, options);
    const data = await response.json();
    return data;
}

export async function login(username, password) {
    const data = await fetchApi('login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    return data;
}

export async function getTransactions() {
    const data = await fetchApi('transactions');
    return data;
}

// Example usage:
// const transactions = await getTransactions();
// console.log(transactions);
