# Waracle Cakes App

## Project Description
A cake application that allows users to view, add, and delete cakes.

## Getting Started

### Clone the repository
```bash
git clone https://github.com/kreider94/waracle-cakes-app
cd waracle-cakes-app
```

## Frontend Setup

```bash
cd frontend
npm install
npm start
```
## Backend Setup

```bash
cd backend
npm install
npm start
```

## API Endpoints
`GET /api/cakes`: Retrieve all cakes
`POST /api/cakes`: Add a new cake
`DELETE /api/cakes/:id`: Delete a cake by ID

## Environment Variables
Create a .env file in the backend directory with the following variables:

```
MONGODB_URI=<mongodb-uri>
PORT=<your-port>
```
