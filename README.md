# 🚗 Sri Gurudatta Car Bazzar - MERN App

Full stack second-hand car listing website.

---

## 📁 Project Structure
```
sri-gurudatta/
├── backend/         → Express + MongoDB API
└── frontend/        → React UI
```

---

## ⚙️ Setup & Run

### 1. Prerequisites
- Node.js installed
- MongoDB running locally (or use MongoDB Atlas)

### 2. Backend Setup
```bash

Backend runs on: http://localhost:5000

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend runs on: http://localhost:3000

---








## 🚗 Car Schema Fields
| Field | Type | Description |
|-------|------|-------------|
| name | String | Brand name (e.g. Maruti) |
| model | String | Model (e.g. Swift VXI) |
| year | Number | Manufacturing year |
| price | Number | Selling price in ₹ |
| km | Number | Kilometers driven |
| fuel | String | Petrol/Diesel/CNG/Electric |
| transmission | String | Manual/Automatic |
| color | String | Car color |
| owner | String | 1st/2nd/3rd/4th+ Owner |
| tireCondition | Number | Tyre condition % (10–100) |
| financeAvailable | Boolean | Finance badge shown |
| frontImage | File | Front photo (slideshow) |
| backImage | File | Back photo (slideshow) |
| leftImage | File | Left side photo (slideshow) |
| rightImage | File | Right side photo (slideshow) |
| interiorImages | Files[] | Interior photos (More Pics) |
| exteriorImages | Files[] | Exterior photos (More Pics) |

---

## 🔑 Admin Access
- Click **⚙ Admin** button (top right of website)
- Enter password
- **Add Car** tab: Fill form + upload photos
- **Manage** tab: View and delete listings
