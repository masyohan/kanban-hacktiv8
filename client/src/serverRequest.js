import axios from 'axios'

const serverRequest = axios.create({
    baseURL: 'https://kanban-yohan.herokuapp.com'
})

module.exports = serverRequest