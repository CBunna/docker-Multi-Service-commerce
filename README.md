# E-Commerce App with Docker

This is my learning project where I built an online shopping website using Docker. It's like having multiple small apps working together to create one big website.

## What does this project do

- Shows a list of products like an online store
- Users can register and login
- Add items to shopping cart
- Place orders
- All running in separate Docker containers

## Technologies used

- **React** - Frontend website
- **Node.js** - Backend server
- **PostgreSQL** - Database 
- **Redis** - Caching for speed
- **Nginx** - Web server and routing
- **Docker** - Containerization

## How it works

```
User → Nginx → React App → Node.js API → Database
                              ↓
                           Redis Cache
```

## Requirements

- Docker
- Docker Compose

## How to run

1. Clone this project
```bash
git clone <your-repo-url>
cd multi-service-ecommerce
```

2. Start all services
```bash
docker-compose up --build
```

3. Open your browser and go to: http://localhost

## Project structure

```
project/
├── frontend/          # React app
├── backend/           # Node.js API
├── nginx/             # Web server config
├── database/          # Database setup
├── docker-compose.yml # Docker configuration
└── README.md          # This file
```

## Useful commands

Start everything:
```bash
docker-compose up
```

Start in background:
```bash
docker-compose up -d
```

Stop everything:
```bash
docker-compose down
```

See running containers:
```bash
docker-compose ps
```

View logs:
```bash
docker-compose logs
```

Rebuild after code changes:
```bash
docker-compose up --build
```

## Testing the app

1. Go to http://localhost
2. Register a new user
3. Browse products
4. Add items to cart
5. Check API health at http://localhost/health
