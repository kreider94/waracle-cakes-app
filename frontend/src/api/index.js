import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001',
});

// Function to get all cakes
export const getCakes = async () => {
    try {
        const response = await api.get('/api/cakes');
        return response.data;
    } catch (error) {
        console.error('Error fetching cakes:', error);
        throw error; // Propagate the error to be handled in the component
    }
};

// Function to get a single cake by ID
export const getCakeById = async (id) => {
    try {
        const response = await api.get(`/api/cakes/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching cake with id ${id}:`, error);
        throw error;
    }
};

// Function to add a new cake
export const addCake = async (newCake) => {
    try {
        const response = await api.post('/api/cakes', newCake);
        return response.data;
    } catch (error) {
        console.error('Error adding cake:', error);
        throw error;
    }
};

// Function to delete a cake by ID
export const deleteCake = async (id) => {
    try {
        const response = await api.delete(`/api/cakes/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting cake with id ${id}:`, error);
        throw error;
    }
};

// Function to update an existing cake
export const updateCake = async (id, updatedCake) => {
    try {
        const response = await api.put(`/api/cakes/${id}`, updatedCake);
        return response.data;
    } catch (error) {
        console.error(`Error updating cake with id ${id}:`, error);
        throw error;
    }
};
