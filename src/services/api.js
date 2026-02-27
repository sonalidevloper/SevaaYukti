const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth APIs
export const authAPI = {
  login: async (credentials) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  signup: async (userData) => {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  register: async (userData) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  getProfile: async (token) => {
    return apiCall('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Patient APIs
export const patientAPI = {
  create: async (patientData) => {
    return apiCall('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    });
  },
  
  getAll: async () => {
    return apiCall('/patients');
  },
  
  getById: async (id) => {
    return apiCall(`/patients/${id}`);
  },
  
  update: async (id, patientData) => {
    return apiCall(`/patients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patientData),
    });
  },
  
  delete: async (id) => {
    return apiCall(`/patients/${id}`, {
      method: 'DELETE',
    });
  },
};

// Card Application APIs
export const cardAPI = {
  apply: async (applicationData) => {
    return apiCall('/cards', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  },
  
  getAll: async (status = '') => {
    const query = status ? `?status=${status}` : '';
    return apiCall(`/cards${query}`);
  },
  
  getById: async (id) => {
    return apiCall(`/cards/${id}`);
  },
  
  approve: async (id, approvedBy) => {
    return apiCall(`/cards/${id}/approve`, {
      method: 'PUT',
      body: JSON.stringify({ approvedBy }),
    });
  },
  
  reject: async (id, rejectionReason) => {
    return apiCall(`/cards/${id}/reject`, {
      method: 'PUT',
      body: JSON.stringify({ rejectionReason }),
    });
  },
};

// Vaccination APIs
export const vaccinationAPI = {
  create: async (vaccinationData) => {
    return apiCall('/vaccinations', {
      method: 'POST',
      body: JSON.stringify(vaccinationData),
    });
  },
  
  getAll: async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    return apiCall(`/vaccinations${query ? '?' + query : ''}`);
  },
  
  getById: async (id) => {
    return apiCall(`/vaccinations/${id}`);
  },
  
  update: async (id, vaccinationData) => {
    return apiCall(`/vaccinations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(vaccinationData),
    });
  },
  
  delete: async (id) => {
    return apiCall(`/vaccinations/${id}`, {
      method: 'DELETE',
    });
  },
};

// Visit APIs
export const visitAPI = {
  create: async (visitData) => {
    return apiCall('/visits', {
      method: 'POST',
      body: JSON.stringify(visitData),
    });
  },
  
  getAll: async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    return apiCall(`/visits${query ? '?' + query : ''}`);
  },
  
  getById: async (id) => {
    return apiCall(`/visits/${id}`);
  },
  
  update: async (id, visitData) => {
    return apiCall(`/visits/${id}`, {
      method: 'PUT',
      body: JSON.stringify(visitData),
    });
  },
  
  delete: async (id) => {
    return apiCall(`/visits/${id}`, {
      method: 'DELETE',
    });
  },
};

const api = {
  auth: authAPI,
  patient: patientAPI,
  card: cardAPI,
  vaccination: vaccinationAPI,
  visit: visitAPI,
  get: (endpoint) => apiCall(endpoint),
  post: (endpoint, data) => apiCall(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint, data) => apiCall(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (endpoint) => apiCall(endpoint, { method: 'DELETE' }),
};

export default api;
