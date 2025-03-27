# Candidate Search App

## Description
The **Candidate Search App** is a React + TypeScript application that allows employers to browse GitHub user profiles as potential candidates. Users can **accept** candidates, **skip** candidates, and **view saved candidates** in a separate list.

## Features
- Fetches **GitHub users** using the **GitHub API**.
- Displays **user details**: avatar, name, username, location, email, company, and bio.
- Allows users to:
  - **Save candidates** (adds them to a saved list).
  - **Skip candidates** (loads a new random candidate).
  - **Remove saved candidates** from the list.
- Uses **local storage** to persist saved candidates.
- **Styled UI** with a **dark-themed candidate card & table**.

## Preview
### 🔹 Candidate Search Page
![Candidate Search Page](./Assets/candidate-search.png)

### 🔹 Saved Candidates Page
![Saved Candidates Page](./Assets/saved-candidates.png)

## Technologies Used
- **React** (with TypeScript)
- **React Router DOM** (for navigation)
- **GitHub API** (fetches user data)
- **Vite** (React build tool)
- **CSS** (custom styling)

## Deployment
The app is deployed on Render. You can access it here: 🔗 Live Demo