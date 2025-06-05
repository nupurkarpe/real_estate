# Leo Properties : Your Trusted Real Estate Partner
Leo Properties is a full-featured MERN stack web application designed for listing, saving, and managing properties for sale and rent. It supports both user and admin roles, allowing for secure property listing creation, user interaction, and dashboard management.

## Features
- User and Admin Authentication 
- Browse Property Listings
- Buy , Sell and Rent Properties
- Save & Unsave Listings 
- Contact Property Landlord
- Admin Dashboard with user & property listing management


## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT, bcrypt
- **State Management**: Redux Toolkit, redux-persist
- **Storage**: FireBase 

## Setup Instructions

**1. Clone the repository**

```bash
git clone https://github.com/nupurkarpe/real_estate.git
cd real_estate
```

**2. Install Dependencies**

```bash
# For server
cd api
npm install

# For client
cd client
npm install
```

**3. Environment Variables**

Create a .env file in the server directory and add the following variables:

```bash
#Mongodb setup
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
VITE_FIREBASE_API_KEY=your_firebase_api_key

```

**4. Run the Application**

Start the Server:

```bash
cd api
npm run dev
```
Start the Client (in a new terminal):
```bash
cd client
npm run dev
```
