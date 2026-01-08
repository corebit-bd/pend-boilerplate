#!/bin/bash

# Script for starting All Development Servers for PEND Boilerplate

set -e  # Exit On Error

# Colors for Output
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
NO_COLOR="\033[0m" # No Color

print_header() {
    echo -e "${BLUE}========================================${NO_COLOR}"
    echo -e "${BLUE}$1${NO_COLOR}"
    echo -e "${BLUE}========================================${NO_COLOR}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NO_COLOR}"
}

print_error() {
    echo -e "${RED}✗ $1${NO_COLOR}"
}

print_information() {
    echo -e "${BLUE}ℹ $1${NO_COLOR}"
}

# Check if Setup has been Executed
check_setup() {
    if [ ! -d "backend/venv" ]; then
        print_error "Backend Virtual Environment Not Found!"
        print_information "Please run ./scripts/setup.sh first"
        exit 1
    fi

    if [ ! -d "frontend/node_modules" ]; then
        print_error "Frontend 'node_modules' Not Found!"
        print_information "Please run ./scripts/setup.sh first"
        exit 1
    fi

    if [ ! -f "backend/.env" ]; then
        print_error "Backend '.env' File Not Found!"
        print_information "Please run ./scripts/setup.sh first"
        exit 1
    fi

    if [ ! -f "frontend/.env.local" ]; then
        print_error "Frontend '.env.local' File Not Found!"
        print_information "Please run ./scripts/setup.sh first"
        exit 1
    fi
}

# Startup of Docker Services
start_docker() {
    print_header "Starting Docker Services"
    echo ""

    print_information "Starting PostgreSQL & Redis..."
    docker-compose up -d postgres redis

    print_information "Waiting for Services to be Ready..."

    sleep 5

    if docker-compose ps | grep -q "postgres.*Up"; then
        print_success "PostgreSQL is Running"
    else
        print_error "PostgreSQL Failed to Start"
        exit 1
    fi

    if docker-compose ps | grep -q "redis.*Up"; then
        print_success "Redis is Running"
    else
        print_error "Redis Failed to Start"
        exit 1
    fi

    echo ""
}

# Startup of Backend Server
start_backend() {
    print_header "Starting Backend (Django)"
    echo ""

    print_information "Starting Django Development Server On Port 8000..."
    cd backend
    source venv/bin/activate
    python manage.py runserver 0.0.0.0:8000 &
    BACKEND_PID=$!
    cd ..

    sleep 3

    if ps -p $BACKEND_PID > /dev/null; then
        print_success "Django Server Started (Process ID : $BACKEND_PID)"
    else
        print_error "Django Server Failed to Start"
        exit 1
    fi

    echo ""
}

# Startup of Frontend Server
start_frontend() {
    print_header "Starting Frontend (NextJS)"
    echo ""

    print_information "Starting NextJS Development Server On Port 3000..."
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..

    sleep 5

    if ps -p $FRONTEND_PID > /dev/null; then
        print_success "NextJS Server Started (Process ID : $FRONTEND_PID)"
    else
        print_error "NextJS Server Failed to Start"
        exit 1
    fi

    echo ""
}

# Print of Access URLs
print_urls() {
    print_header "Development Servers Ready!"
    echo ""

    print_success "All Services are Running!"
    echo ""
    print_information "Access URLs : "
    echo "  🌐 Frontend :          http://localhost:3000"
    echo "  🔧 Backend :           http://localhost:8000"
    echo "  📚 API Documentation : http://localhost:8000/swagger/"
    echo "  📖 Administrator :     http://localhost:8000/admin/"
    echo ""
    print_information "Database Connections : "
    echo "  🐘 PostgreSQL : localhost:5432"
    echo "  🔴 Redis :      localhost:6379"
    echo ""
    print_information "Additional Commands : "
    echo "  📖 Storybook :          cd frontend && npm run storybook"
    echo "  🧪 Tests Execution :    cd frontend && npm test"
    echo "  📱 Mobile Application : cd mobile && npm start"
    echo ""
    print_information "Press Ctrl+C to Stop All Servers"
    echo ""
}

# Cleanup On Exit
cleanup() {
    echo ""
    print_header "Shutting Down Services"
    echo ""

    print_information "Stopping Backend Server..."
    kill $BACKEND_PID 2>/dev/null || true
    print_success "Backend Stopped"

    print_information "Stopping Frontend Server..."
    kill $FRONTEND_PID 2>/dev/null || true
    print_success "Frontend Stopped"

    print_information "Docker Services (PostgreSQL, Redis) are still running"
    print_information "To stop Docker services, run: 'docker-compose down'"
    echo ""

    print_success "All Development Servers Stopped"
    exit 0
}

# Trap Ctrl+C
trap cleanup INT TERM

# Main Function
main() {
    print_header "PEND Boilerplate - Development Startup"
    echo ""

    # Check if Setup was Executed
    check_setup

    # Start Services
    start_docker
    start_backend
    start_frontend
    print_urls

    # Keep Script Running
    while true; do
        sleep 1
    done
}

# Run Main Function
main