import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
    const request = await axios.get(baseUrl);
    const response = await request.data;
    return response;
}

const create = async (newObject) => {
    const request = await axios.post(baseUrl, newObject);
    const response = await request.data;
    return response;
}

const remove = async (id, newObject) => {
    const request = await axios.delete(`${baseUrl}/${id}`, newObject);
    const response = await request.data;
    return response;
}

const update = async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    const response = await request;
    return response;
}

export default { getAll, create, remove, update }