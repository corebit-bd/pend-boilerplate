#!/bin/bash

# Initial Setup Script for PEND Boilerplate
# Run this Script once when setting up the project for the first time

set -e  # Exit On Error

# Colors for Output
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
NO_COLOR="\033[0m" # No Color

# Helper Functions
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

print_warning() {
    echo -e "${YELLOW}⚠ $1${NO_COLOR}"
}

print_information() {
    echo -e "${BLUE}ℹ $1${NO_COLOR}"
}

# Check If Command Exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Main Setup Process
main() {
    print_header "PEND Boilerplate - Initial Setup"
    echo ""

    # Check Pprerequisites
    print_information "Checking Prerequisites..."
    echo ""

    if ! command_exists docker; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    print_success "Docker is installed"

    if ! command_exists docker-compose; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    print_success "Docker Compose is installed"

    if ! command_exists python3; then
        print_error "Python 3 is not installed. Please install Python 3 first."
        exit 1
    fi
    print_success "Python 3 is installed"

    if ! command_exists node; then
        print_error "NodeJS is not installed. Please install NodeJS first."
        exit 1
    fi
    print_success "NodeJS is installed"

    if ! command_exists npm; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    print_success "npm is installed"

    echo ""
    print_header "Setting Up Backend (Django)"
    echo ""

    # Backend Setup
    cd backend

    # Creation of Virtual Environment if it doesn't exist
    if [ ! -d "venv" ]; then
        print_information "Creating Python Virtual Environment..."
        python3 -m venv venv
        print_success "Virtual Environment Created"
    else
        print_information "Virtual Environment Already Exists"
    fi

    # Activation of Virtual Environment
    print_information "Activating Virtual Environment..."
    source venv/bin/activate

    # Installation of Python Dependencies
    print_information "Installing Python Dependencies..."
    pip install --upgrade pip
    pip install -r requirements.txt
    pip install -r requirements-dev.txt
    print_success "Python Dependencies Installed"

    # Creation of ".env" File if it doesn't exist
    if [ ! -f ".env" ]; then
        print_information "Creating '.env' File from '.env.example'..."
        cp .env.example .env
        print_warning "Please Update '.env' with your Actual Configuration"
    else
        print_information "'.env' File Already Exists"
    fi

    cd ..
    echo ""

    print_header "Setting Up Frontend (NextJS)"
    echo ""

    # Frontend Setup
    cd frontend

    # Installation of npm Dependencies
    print_information "Installing npm Dependencies (This may take a while)..."
    npm install
    print_success "npm Dependencies Installed"

    # Creation of ".env.local" File if it doesn't exist
    if [ ! -f ".env.local" ]; then
        print_information "Creating '.env.local' File from '.env.local.example'..."
        cp .env.local.example .env.local
        print_warning "Please Update '.env.local' with your Actual Configuration"
    else
        print_information "'.env.local' File Already Exists"
    fi

    cd ..
    echo ""

    print_header "Setting up Mobile (Expo)"
    echo ""

    # Mobile Setup
    cd mobile

    # Installation of npm Dependencies
    print_information "Installing npm Dependencies..."
    npm install
    print_success "npm Dependencies Installed"

    # Creation of ".env" File if it doesn't exist
    if [ ! -f ".env" ]; then
        print_information "Creating '.env' File from '.env.example'..."
        cp .env.example .env
        print_warning "Please Update '.env' with your Actual Configuration"
    else
        print_information "'.env' File Already Exists"
    fi

    cd ..
    echo ""

    print_header "Setting Up Docker Services"
    echo ""

    # Docker Setup
    print_information "Starting Docker Services (PostgreSQL & Redis)..."
    docker-compose up -d postgres redis
    print_success "Docker Services Started"

    print_information "Waiting for PostgreSQL to be ready..."
    sleep 10
    print_success "PostgreSQL is Ready"

    print_header "Setup Completed!"
    echo ""

    print_success "All Setup Tasks Completed Successfully!"
    echo ""
    print_information "Next Steps : "
    echo "  1. REQUIRED : Update Environment Variables in '.env' Files (Especially the Database Settings)"
    echo "  2. Run Database Migrations Manually : cd backend && source venv/bin/activate && python manage.py migrate)"
    echo "  3. Create Django SuperUser : cd backend && python manage.py createsuperuser"
    echo "  4. Start Development Servers : ./scripts/dev-start.sh"
    echo ""
    print_information "Development URLs : "
    echo -e "  • Frontend :  http://localhost:3000"
    echo -e "  • Backend :   http://localhost:8000"
    echo -e "  • API Documentation :  http://localhost:8000/swagger/"
    echo -e "  • Storybook : http://localhost:6006 (run : cd frontend && npm run storybook)"
    echo ""
    print_warning "Don't Forget to Update Passwords in Production Environment!"
    echo ""
}

# Run Main Function
main