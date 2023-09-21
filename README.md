
# GReQL - Converter

GReQL converter is an application that converts PLANTUML code into GReQL for use with the JACK
platform at the University of Duisburg Essen.

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

```
project-root/
├── backend/
│   ├── app.js
│   
├── frontend/
│   ├── src/
│   └── ...
├── README.md
└── ...
```

- `backend/`: Contains the Express.js backend code.
- `frontend/`: Contains the Vue.js frontend code.
- `README.md`: This README file.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed (You can download them from [nodejs.org](https://nodejs.org/)).

## Getting Started

### Frontend Setup

1. Open a terminal and navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install the frontend dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   Your Vue.js app will be accessible at `http://localhost:8080`.

### Backend Setup

1. Open another terminal and navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install the backend dependencies:

   ```bash
   npm install
   ```

3. Start the Express.js server:

   ```bash
    node app.js
   ```

   The Express.js server will start and listen on a port (e.g., 3000) specified in your `app.js` file.



## Contributing

If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to your forked repository: `git push origin feature/your-feature`.
5. Create a pull request on the original repository.
