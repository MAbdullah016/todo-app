# To-Do App

A simple **To-Do web application** built with **React.js and Vite**. The application allows users to add, edit, and delete names through a simple and clean interface.

The project demonstrates important React concepts such as **functional components, useState, useContext, React Router, controlled inputs, conditional rendering, list rendering, reusable components, and API integration**.

The application uses a **Node.js backend** to handle name operations. The Node.js **File System (`fs`) module** is used to read and write data to a `data.json` file for simple file-based data persistence.

## Features

* Add new names
* Choose the name format while adding a name:

  * Normal
  * UPPERCASE
  * lowercase
* Edit existing names
* Delete names
* Display names in a list
* Shared state management using Context API
* Multiple pages using React Router
* GitHub profile page using the GitHub API
* REST API integration
* Data persistence using `data.json`
* Node.js `fs` module for reading and writing data
* Reusable Button component
* Simple and clean user interface

## Technologies Used

### Frontend

* React.js
* Vite
* JavaScript
* HTML
* CSS
* React Router
* Context API

### Backend

* Node.js
* REST API
* File System (`fs`) module
* JSON (`data.json`) for data storage

### External API

* GitHub API

## Application Flow

```text
User
  ↓
React Frontend
  ↓
fetch()
  ↓
Node.js REST API
  ↓
File System (fs)
  ↓
data.json
```

### Add Name

```text
User enters name
       ↓
Selects format
       ↓
Clicks Add Name
       ↓
POST /api/names
       ↓
Node.js backend
       ↓
data.json updated
       ↓
Updated data returned to React
       ↓
Name displayed in the list
```

### Edit Name

```text
User clicks Edit
       ↓
Changes name
       ↓
Clicks Save
       ↓
PUT /api/names/:id
       ↓
Node.js backend
       ↓
data.json updated
       ↓
Updated name returned to React
       ↓
UI updated
```

### Delete Name

```text
User clicks Delete
       ↓
DELETE /api/names/:id
       ↓
Node.js backend
       ↓
Name removed from data.json
       ↓
React state updated
       ↓
Name removed from UI
```

## Pages

The application contains three main pages:

* **Home** — Add, view, and delete names
* **Edit** — Edit existing names
* **GitHub** — Displays GitHub profile information using the GitHub API

## Project Structure

```text
src/
│
├── components/
│   └── Button.jsx
│
├── context/
│   ├── NamesContext.jsx
│   └── NamesProvider.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Edit.jsx
│   └── Github.jsx
│
├── styles/
│   ├── Home.css
│   ├── Edit.css
│   ├── Github.css
│   └── App.css
│
├── App.jsx
└── main.jsx

data.json
```

## API Endpoints

| Method | Endpoint         | Purpose                 |
| ------ | ---------------- | ----------------------- |
| POST   | `/api/names`     | Add a new name          |
| PUT    | `/api/names/:id` | Update an existing name |
| DELETE | `/api/names/:id` | Delete a name           |

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Go to the project folder

```bash
cd <project-folder>
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Learning Objectives

This project was built to practice and understand:

* React components
* React Hooks
* `useState`
* `useContext`
* Context API
* React Router
* Controlled components
* Conditional rendering
* Array methods such as `map()` and `filter()`
* `fetch()` and REST APIs
* HTTP methods: POST, PUT, and DELETE
* Node.js
* File System (`fs`)
* JSON file-based data storage
* Git and GitHub
