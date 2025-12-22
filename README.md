# LeatherCAD 🧥✨

**LeatherCAD** is a premium web platform for designing and ordering custom leather products. It bridges the gap between digital customization and manufacturing, featuring real-time 3D configuration, user role management, and a powerful Admin Dashboard for order and design oversight.

---

## 🚀 Key Features

### 🎨 For Designers & Users
*   **3D Customizer**: Design jackets, bags, and accessories in real-time.
*   **User Dashboard**: Track orders and view submitted designs.
*   **Role-Based Access**: Specialized views for standard Users and Designers.

### 🛠️ For Admins (New!)
*   **Comprehensive Dashboard**: A centralized hub to manage the entire business.
    *   **Overview**: Real-time revenue charts, order counts, and activity feeds.
    *   **Review Queue**: Approve or reject custom designs submitted by users.
    *   **Order Management**: Track orders from processing to delivery.
    *   **Product Catalog**: Add, edit, or delete base products.
    *   **Project Board**: Kanban-style tracking for ongoing internal projects.
    *   **User Management**: View and manage system users.

---

## 🛠️ Technology Stack

*   **Frontend**: React (Vite), Tailwind CSS, Lucide React (Icons), Recharts (Data Viz).
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB (Mongoose ODM).
*   **Authentication**: Clerk (Production) + Custom Dev Bypass (Development).
*   **Testing**: Custom mock data seeding scripts.

---

## 📦 Getting Started

Follow these steps to set up the project locally.

### 1. Prerequisites
*   Node.js (v16+)
*   MongoDB (Local or Atlas URI)

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone [https://github.com/KAILASH-C12/LeatherCAD.git](https://github.com/KAILASH-C12/LeatherCAD.git)
cd LeatherCAD
npm install

3. Environment Variables
Create a .env file in the root directory:

env
MONGO_URI=mongodb://localhost:27017/leathercad
JWT_SECRET=your_jwt_secret_dev_only
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
4. Seed the Database
Populate your local database with test users (Kailash, Siddhant, Varsha), orders, and products:

bash
node server/seedAdminData.js
You should see "Admin Data Seeded Successfully!" in the console.

5. Run the App
You need to run both the backend server and the frontend client.

Backend Server (Port 3000):

bash
npm run server
Frontend Client (Port 5173):

bash
npm run dev
Visit http://localhost:5173 to view the app.

🔐 Development Login (Admin Bypass)
To make development easier, we have implemented a Dev Login mode that bypasses Clerk authentication.

Navigate to the Login Page.
Enable the "Dev Mode" toggle.
Click "Sign in as Admin (Dev)".
You will be logged in immediately as Kailash (Admin).
Note: The Admin Dashboard also includes a "Hybrid Mock Data" system. If your local database is empty or offline, the dashboard will automatically populate with rich mock data so you can still work on the UI.

🤝 Contributing
Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
