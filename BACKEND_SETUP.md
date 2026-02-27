# SwasthyaSaathi - Complete Setup Guide

## 🎯 Backend + Frontend Integration

### Prerequisites
- Node.js (v14+)
- MongoDB (installed and running on localhost:27017)

---

## 🚀 Quick Start

### 1. Start MongoDB
Make sure MongoDB is running on `mongodb://localhost:27017`

```bash
# Check if MongoDB is running
mongosh
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start backend server
npm start
```

Backend will run on: `http://localhost:5000`

### 3. Frontend Setup

Open new terminal:

```bash
# Go back to root directory
cd ..

# Start React app (if not already running)
npm start
```

Frontend will run on: `http://localhost:3000`

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register ASHA worker
- `POST /api/auth/login` - Login ASHA worker
- `GET /api/auth/profile` - Get profile (requires token)

### Patients
- `POST /api/patients` - Register new patient
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get single patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Card Applications
- `POST /api/cards` - Apply for card
- `GET /api/cards` - Get all applications
- `GET /api/cards/:id` - Get single application
- `PUT /api/cards/:id/approve` - Approve application
- `PUT /api/cards/:id/reject` - Reject application

### Vaccinations
- `POST /api/vaccinations` - Log vaccination
- `GET /api/vaccinations` - Get all vaccinations
- `GET /api/vaccinations/:id` - Get single record
- `PUT /api/vaccinations/:id` - Update record
- `DELETE /api/vaccinations/:id` - Delete record

### Visits
- `POST /api/visits` - Record visit
- `GET /api/visits` - Get all visits
- `GET /api/visits/:id` - Get single visit
- `PUT /api/visits/:id` - Update visit
- `DELETE /api/visits/:id` - Delete visit

---

## 🗄️ Database Collections

1. **ashas** - ASHA worker accounts
2. **patients** - Patient records
3. **cardapplications** - Swasthya Saathi card applications
4. **vaccinations** - Vaccination records
5. **visits** - Visit records

---

## 🔧 Configuration

### Backend (.env file)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/swasthyasaathi
JWT_SECRET=your_jwt_secret_key
```

### Frontend (src/services/api.js)
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

---

## 🧪 Testing

### 1. Test Backend
```bash
# Check if server is running
curl http://localhost:5000

# Expected response:
# {"message":"✅ SwasthyaSaathi Backend API","version":"1.0.0",...}
```

### 2. Create Test ASHA Worker

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test ASHA",
    "email": "test@asha.com",
    "password": "123456",
    "phone": "9876543210",
    "area": "Test Village"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@asha.com",
    "password": "123456"
  }'
```

---

## 📝 Usage Flow

1. **Start MongoDB** → `mongosh`
2. **Start Backend** → `cd backend && npm start`
3. **Start Frontend** → `npm start`
4. **Open Browser** → `http://localhost:3000`
5. **Login/Register** → Use ASHA login page
6. **Use Features**:
   - Register patients
   - Log vaccinations
   - Record visits
   - Apply for cards

---

## 🛠️ Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

### Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution**: Change PORT in backend/.env or kill the process

### CORS Error
If you see CORS errors in browser console, make sure:
- Backend is running on port 5000
- Frontend is running on port 3000
- CORS is enabled in backend/server.js

---

## 📦 Dependencies

### Backend
- express - Web framework
- mongoose - MongoDB ODM
- cors - Enable CORS
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- dotenv - Environment variables

### Frontend
- react - UI library
- react-router-dom - Routing
- lucide-react - Icons
- tailwindcss - Styling

---

## 🎓 Development Tips

1. Use **Postman** or **Thunder Client** to test APIs
2. Check **MongoDB Compass** to view database
3. Use **React DevTools** for frontend debugging
4. Check browser console for errors
5. Check terminal for backend logs

---

## ✅ Features Implemented

- ✅ ASHA Worker Authentication
- ✅ Patient Registration
- ✅ Vaccination Logging
- ✅ Visit Recording
- ✅ Card Application
- ✅ MongoDB Integration
- ✅ RESTful API
- ✅ Frontend-Backend Connection

---

## 🔜 Next Steps

1. Add authentication middleware
2. Implement file uploads
3. Add data validation
4. Create admin dashboard
5. Deploy to production

---

Need help? Check the API at: http://localhost:5000
