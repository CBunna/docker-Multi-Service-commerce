My E-Commerce App with Docker 🛒
This is my learning project where I built an online shopping website using Docker. It's like having multiple small apps working together to create one big website!
What does this project do?

Shows a list of products (like an online store)
Users can register and login
Add items to shopping cart
Place orders
All running in separate Docker containers

What I used to build this

React - For the website frontend (what users see)
Node.js - For the backend (handles data and logic)
PostgreSQL - Database to store users, products, and orders
Redis - Makes the website faster by caching data
Nginx - Helps route traffic between different parts
Docker - Puts everything in containers so it works anywhere

How the app works
User visits website → Nginx → React App → Node.js API → Database
                                    ↓
                               Redis (for speed)
What you need to run this

Docker installed on your computer
Docker Compose (usually comes with Docker)
That's it! No need to install Node.js, PostgreSQL, etc.

How to run my project
Step 1: Download the project
bashgit clone <your-repo-url>
cd multi-service-ecommerce
Step 2: Start everything
bashdocker-compose up --build
This might take a few minutes the first time
Step 3: Open your browser
Go to: http://localhost
That's it! The website should be running.
What each folder does
my-project/
├── frontend/          # React website code
├── backend/           # Node.js server code  
├── nginx/             # Configuration for web routing
├── database/          # Database setup files
├── docker-compose.yml # Tells Docker how to run everything
└── README.md          # This file!
How to stop the project
Press Ctrl + C in the terminal, or run:
bashdocker-compose down
Useful commands I learned
bash# Start everything
docker-compose up

# Start in background
docker-compose up -d

# Stop everything
docker-compose down

# See what's running
docker-compose ps

# See the logs (helpful for debugging)
docker-compose logs

# Rebuild if I change code
docker-compose up --build
Testing if it works

Go to http://localhost - you should see the homepage
Try registering a new user
Look at the products
Add something to your cart
Check http://localhost/health - should say the API is working
