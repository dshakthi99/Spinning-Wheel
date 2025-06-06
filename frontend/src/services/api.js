import axios from 'axios';

const API_BASE_URL = '/api'; // Proxied to http://localhost:8080/api

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  config.withCredentials = true; // Ensure cookies are sent with requests
  return config;
});

// --- Public/User-facing API calls ---
export const getAllDestinations = () => {
  return apiClient.get('/destinations').then(res => res.data);
};

export const getDestinationById = (id) => {
  return apiClient.get(`/destinations/${id}`).then(res => res.data);
};

export const getAllTourPackages = (destinationId = null) => {
  const params = destinationId ? { destinationId } : {};
  return apiClient.get('/tourpackages', { params }).then(res => res.data);
};

export const getTourPackageById = (id) => {
  return apiClient.get(`/tourpackages/${id}`).then(res => res.data);
};

// --- Auth API calls ---
export const registerUser = (userData) => {
  return apiClient.post('/auth/register', userData);
};

export const loginUser = async (credentials) => {
  const formData = new URLSearchParams();
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);
  try {
    await apiClient.post('/login', formData, { // Default Spring Security login endpoint
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return getCurrentUser(); // Fetch user details to confirm
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = () => {
  // Backend needs to provide this endpoint: GET /api/users/me or similar
  return apiClient.get('/users/me').then(res => res.data)
    .catch(err => {
      // If 401 or 403, it means user is not authenticated or session expired
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        return null; // Explicitly return null for not authenticated
      }
      throw err; // Re-throw other errors
    });
};

export const logoutUser = () => {
  return apiClient.post('/logout', {}); // Default Spring Security logout endpoint
};

// --- Admin API calls for Destinations ---
export const createDestination = (destinationData) => {
  return apiClient.post('/destinations', destinationData).then(res => res.data);
};

export const updateDestination = (id, destinationData) => {
  return apiClient.put(`/destinations/${id}`, destinationData).then(res => res.data);
};

export const deleteDestination = (id) => {
  return apiClient.delete(`/destinations/${id}`).then(res => res.data);
};

// --- Admin API calls for Tour Packages (Placeholders) ---
export const createTourPackage = (packageData) => {
  return apiClient.post('/tourpackages', packageData).then(res => res.data);
};

export const updateTourPackage = (id, packageData) => {
  return apiClient.put(`/tourpackages/${id}`, packageData).then(res => res.data);
};

export const deleteTourPackage = (id) => {
  return apiClient.delete(`/tourpackages/${id}`).then(res => res.data);
};

export default apiClient;
