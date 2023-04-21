import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = async () => {
    const request = await axios.get(baseUrl);
    return await request.data;
}

const create = async (newObject) => {
    const request = await axios.post(baseUrl, newObject);
    return await request.data;
}

const remove = async (id, newObject) => {
    const request = await axios.delete(`${baseUrl}/${id}`, newObject);
    return await request.data;
}

const update = async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return await request;
}

export default { getAll, create, remove, update }