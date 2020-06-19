import axios from 'axios'

const serverRequest = axios.create({
    baseURL: 'http://localhost:3000'
})

module.exports = serverRequest