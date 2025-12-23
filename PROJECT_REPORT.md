# PROJECT REPORT: LeatherCAD

## Table of Contents

- [REVISION HISTORY](#revision-history)
- [1. INTRODUCTION](#1-introduction)
  - [1.1 PURPOSE](#11-purpose)
  - [1.2 SCOPE](#12-scope)
  - [1.3 DEFINITIONS, ACRONYMS, AND ABBREVIATIONS](#13-definitions-acronyms-and-abbreviations)
  - [1.4 REFERENCES](#14-references)
  - [1.5 OVERVIEW](#15-overview)
- [2. GENERAL DESCRIPTION](#2-general-description)
  - [2.1 PRODUCT PERSPECTIVE](#21-product-perspective)
  - [2.2 PRODUCT FUNCTIONS](#22-product-functions)
  - [2.3 USER CHARACTERISTICS](#23-user-characteristics)
  - [2.4 GENERAL CONSTRAINTS](#24-general-constraints)
  - [2.5 ASSUMPTIONS AND DEPENDENCIES](#25-assumptions-and-dependencies)
- [3. SPECIFIC REQUIREMENTS](#3-specific-requirements)
  - [3.1 EXTERNAL INTERFACE REQUIREMENTS](#31-external-interface-requirements)
  - [3.2 FUNCTIONAL REQUIREMENTS](#32-functional-requirements)
  - [3.5 NON-FUNCTIONAL REQUIREMENTS](#35-non-functional-requirements)
  - [3.7 DESIGN CONSTRAINTS](#37-design-constraints)
  - [3.9 OTHER REQUIREMENTS](#39-other-requirements)
- [4. ANALYSIS MODELS](#4-analysis-models)
  - [4.1 DATA FLOW DIAGRAMS (DFD)](#41-data-flow-diagrams-dfd)
- [5. GITHUB LINK](#5-github-link)
- [6. DEPLOYED LINK](#6-deployed-link)
- [7. CLIENT APPROVAL PROOF](#7-client-approval-proof)
- [8. CLIENT LOCATION PROOF](#8-client-location-proof)
- [9. TRANSACTION ID PROOF](#9-transaction-id-proof)
- [10. EMAIL ACKNOWLEDGEMENT](#10-email-acknowledgement)
- [11. GST No](#11-gst-no)
- [A. APPENDICES](#a-appendices)

---

## REVISION HISTORY

| Date       | Version | Description       | Author     |
|------------|---------|-------------------|------------|
| 2024-05-20 | 1.0     | Initial Release   | LeatherCAD Team |

---

## 1. INTRODUCTION

### 1.1 PURPOSE
The purpose of this document is to define the requirements and specifications for **LeatherCAD**, a premium web-based platform designed to facilitate the customization and ordering of leather products. This document serves as a guideline for developers, stakeholders, and testers to understand the system's functionality and constraints.

### 1.2 SCOPE
LeatherCAD is a comprehensive e-commerce and design solution that allows users to customize leather products such as jackets and bags in a 3D environment. The system includes:
- A customer-facing interface for browsing, designing (via a 3D customizer), and ordering products.
- A designer interface for managing custom designs.
- An administrative dashboard for managing orders, users, products, and analyzing business performance.
- Role-based access control to ensure secure and appropriate access to features.

### 1.3 DEFINITIONS, ACRONYMS, AND ABBREVIATIONS
- **3D Customizer**: A tool enabling real-time visualization and modification of product attributes.
- **Admin**: Administrator with full system access.
- **Clerk**: A third-party authentication service provider.
- **JWT**: JSON Web Token, used for secure transmission of information.
- **MERN**: MongoDB, Express.js, React, Node.js stack.
- **API**: Application Programming Interface.
- **UI/UX**: User Interface / User Experience.

### 1.4 REFERENCES
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Three.js / React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)

### 1.5 OVERVIEW
The LeatherCAD system is a web application built using the MERN stack. It leverages modern frontend technologies like React and Three.js for an immersive user experience and a robust Node.js/Express backend for handling data and logic.

---

## 2. GENERAL DESCRIPTION

### 2.1 PRODUCT PERSPECTIVE
LeatherCAD replaces or connects with traditional catalog-based ordering systems by introducing an interactive design layer. It operates as a standalone web application that communicates with a centralized database to persist user data, orders, and product configurations.

### 2.2 PRODUCT FUNCTIONS
The major functions of the system include:
1.  **User Authentication**: Secure signup and login for Admins, Designers, and standard Users using Clerk or custom credentials.
2.  **3D Product Customization**: Real-time rendering of leather products with options to change colors, materials, and add accessories.
3.  **Order Management**: Detailed tracking of orders from placement to delivery, accessible by users and admins.
4.  **Admin Dashboard**: comprehensive view of sales analytics, order queues, and inventory (product catalog) management.
5.  **Design Management**: Ability for users to save and submit designs, and for admins/designers to review them.
6.  **AI Integration**: Generative AI features for assisting with design or content (using Google Gemini API).

### 2.3 USER CHARACTERISTICS
- **End Users**: General customers who wish to buy custom leather goods. They require an intuitive and responsive UI.
- **Designers**: Professional or power users who create templates or specific custom designs. They need advanced tools for visualization.
- **Administrators**: Business owners or managers. They require detailed reports, control over user accounts, and content management capabilities.

### 2.4 GENERAL CONSTRAINTS
- The 3D customizer requires a device with WebGL support.
- Reliable internet connection is necessary for loading 3D assets and database transactions.
- The application must be compliant with data privacy regulations regarding user information.

### 2.5 ASSUMPTIONS AND DEPENDENCIES
- Ideally run on modern browsers (Chrome, Edge, Firefox, Safari).
- Backend relies on the availability of the MongoDB database service.
- Authentication relies on Clerk services (in production mode).

---

## 3. SPECIFIC REQUIREMENTS

### 3.1 EXTERNAL INTERFACE REQUIREMENTS

#### 3.1.1 User Interfaces
- **Frontend Framework**: Built with React and Vite for high performance.
- **Styling**: Tailwind CSS is used for a responsive, modern, and consistent design language.
- **Navigation**: Intuitive navigation bar with role-based links (e.g., Dashboard link for Admins).
- **Visualization**: Canvas elements for rendering 3D models using `@react-three/fiber`.

#### 3.1.2 Hardware Interfaces
- **Server**: Run on standard Cloud VPS or PaaS providers (e.g., AWS, Vercel, Render) capable of running Node.js.
- **Client**: Any personal computer or mobile device with a modern web browser.

#### 3.1.3 Software Interfaces
- **Database**: MongoDB (v6.0 or higher) for data storage.
- **OS**: Cross-platform (Windows, Linux, macOS) for development and deployment.
- **External APIs**:
    - Clerk for Authentication.
    - Google Gemini AI for generative features.
    - Payment Gateway integration (implied functionality).

#### 3.1.4 Communications Interfaces
- **Protocol**: HTTP/HTTPS for client-server communication.
- **Data Format**: JSON for API request and response bodies.

### 3.2 FUNCTIONAL REQUIREMENTS

#### 3.2.1 Product Customization Module
- **Inputs**: User selects base model, colors for different parts, material types.
- **Processing**: Frontend updates the 3D model state; Backend saves the configuration string.
- **Outputs**: Visual representation of the customized product; Saved design record in the database.

#### 3.2.2 Admin Dashboard
- **Inputs**: Admin navigates to the dashboard route.
- **Processing**: Backend aggregates order data, user stats, and revenue metrics.
- **Outputs**: Graphical charts (using Recharts), data tables for orders and products, project Kanban board.

#### 3.2.3 Order Processing
- **Inputs**: User initiates checkout with a selected design.
- **Processing**: System validates stock/availability, processes payment (demonstration), and creates an order record.
- **Outputs**: Order confirmation details, email notification (mock), update in Admin/User order history.

### 3.5 NON-FUNCTIONAL REQUIREMENTS

#### 3.5.1 Performance
- Initial load time should be under 2 seconds.
- 3D model interactions should be smooth (target 60fps).

#### 3.5.2 Reliability
- The system handles database connection errors gracefully with user feedback.
- Data validation ensures no corrupt data enters the system.

#### 3.5.3 Availability
- The service aims for 99.9% uptime during business hours.

#### 3.5.4 Security
- Passwords (if not using Clerk) are hashed using `bcryptjs`.
- API endpoints are protected using JWT verification middlewares (`auth.js`).
- `helmet` middleware is used to set secure HTTP headers.

#### 3.5.5 Maintainability
- The code follows a modular structure (Components, Pages, Server Routes, Models).
- Codebase is written in modern JavaScript/ES6+ modules.

#### 3.5.6 Portability
- The web app is responsive and works across desktop, tablet, and mobile breakpoints.

### 3.7 DESIGN CONSTRAINTS
- Strict adherence to the provided design aesthetic (premium, leather-themed).
- Must use specific libraries defined in `package.json` to maintain compatibility (e.g., `three`, `framer-motion`).

### 3.9 OTHER REQUIREMENTS
- **Testing**: Includes scripts for seeding mock data (`seedAdminData.js`) to facilitate testing without manual entry.

---

## 4. ANALYSIS MODELS

### 4.1 DATA FLOW DIAGRAMS (DFD) -> Textual Description
1.  **Level 0 (Context Level)**: The **User** interacts with the **LeatherCAD Web App**. The App sends **Credentials/Design Data** to the Server and receives **Views/Confirmation**. The Server interacts with the **Database** and **Auth Provider**.
2.  **Level 1 (Order Flow)**:
    - User -> Submit Order -> **Order Controller**.
    - **Order Controller** -> Validate Data -> **Product Model**.
    - **Order Controller** -> Save Order -> **Order Model** -> Database.
    - Database -> Confirmation -> **Order Controller** -> **User Interface**.

---

## 5. GITHUB LINK
https://github.com/KAILASH-C12/LeatherCAD.git

---

## 6. DEPLOYED LINK
[Insert Deployed Application Link Here]

---

## 7. CLIENT APPROVAL PROOF
[Attach Screenshot or Document of Client Approval]

---

## 8. CLIENT LOCATION PROOF
[Attach Proof of Client Location if applicable]

---

## 9. TRANSACTION ID PROOF
[Attach Screenshot of Transaction/Payment Proof]

---

## 10. EMAIL ACKNOWLEDGEMENT
[Attach Screenshot of Email Thread/Acknowledgement]

---

## 11. GST No
[Insert GST Number if applicable]

---

## A. APPENDICES

### A.1 APPENDIX 1
**User Manual**: [Link or Text]

### A.2 APPENDIX 2
**API Documentation**:
- `GET /api/users/profile`: Get user profile.
- `POST /api/orders`: Create a new order.
- `GET /api/products`: List all products.
