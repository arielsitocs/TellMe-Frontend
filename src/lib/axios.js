import axios from 'axios';

// Se instancia la api base //
const api = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json'
    }
})

export { api };

