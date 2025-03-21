# Game Deals Dashboard

A web application that shows the most interesting game deals on Steam, GOG, and Humble Store.

## Key Features:

- **For Unregistered Users:** The homepage shows one deal from each store with a prompt to register in order to unlock all features.
  
- **For Registered Users:** Once logged in, users can:
  - View all the latest deals from Steam, GOG, and Humble Store.
  - Filter deals by store or price range.
  - Sort deals by price, savings, or deal rating.
  - Click on any deal to view more details and be redirected to the store’s page.

- **Deal Details:** Registered users can see detailed information about each offer and easily access the store’s page.

## Tech Stack:
- **Backend:** A Django app that fetches data from the Cheapshark API and serves a REST API for the frontend.
- **Frontend:** Built with React and Bootstrap for responsive and user-friendly design.

---

## Setup and Documentation for Linux System

#### Running Backend

1. **Clone the repository:**
    ```bash
    git clone https://github.com/tijanaigrutinovic/game-deals-dashboard.git
    cd game-deals-dashboard
    ```

2. **Install Python:**
    ```bash
    sudo apt update
    sudo apt install python3 python3-venv python3-pip
    python3 --version
    sudo ln -sf /usr/bin/python3 /usr/bin/python
    python --version


    ```

3. **Create and activate the virtual environment:**
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate
    ```

4. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

5. **Run migrations:**
    ```bash
    cd .\backend\backend
    python manage.py makemigrations
    python manage.py migrate
    ```

6. **Fetch game deals from the CheapShark API (custom Django command):**
    ```bash
    python manage.py fetch_deals
    ```

7. **Run tests:**
    ```bash
    python manage.py test
    ```

8. **Run the Django server:**
    ```bash
    python manage.py runserver
    ```

   The server will be available at [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

---

#### Running Frontend

1. **Install Node.js and npm:**
    ```bash
    open new terminal
    sudo apt update
    sudo apt install nodejs npm
    ```

   Verify the versions:
    ```bash
    node -v
    npm -v
    ```

2. **Navigate to the frontend directory:**
    ```bash
    cd .\backend\backend\frontend\
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Start the frontend server:**
    ```bash
    npm start
    ```

   The server will be available at [http://localhost:3000/](http://localhost:3000/).

---



