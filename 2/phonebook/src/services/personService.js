import axios from 'axios';

const BASE_URL = '/api/persons';

const getAll = () => {
  const response = axios.get(BASE_URL);
  return response.then(response => response.data);
}

const create = newPerson => {
  const response = axios.post(BASE_URL, newPerson);
  return response.then(response => response.data);
}

const update = (id, changedPerson) => {
  const response = axios.put(`${BASE_URL}/${id}`, changedPerson);
  return response.then(response => response.data);
}

const deleteOne = id => {
  const response = axios.delete(`${BASE_URL}/${id}`);
  return response.then(response => response.data);
}

export default { getAll, create, update, deleteOne };