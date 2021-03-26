import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts () {
  try {
    const rsp = await axios.get('/api/products');
    return rsp.data;
  } catch (err) {
    throw err;
  }
}

export async function getProductById (id) {
  try {
    const rsp = await axios.get(`/api/products/${id}`);
    return rsp.data;
  } catch (err) {
    throw err;
  }
}
