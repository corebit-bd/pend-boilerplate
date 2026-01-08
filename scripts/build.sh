#!/bin/bash

# PEND Boilerplate - Production Build Script
# Builds Production-Ready Docker Images & Assets in order to prepare for Deployment

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

print_warning() {
    echo -e "${YELLOW}⚠ $1${NO_COLOR}"
}

print_information() {
    echo -e "${BLUE}ℹ $1${NO_COLOR}"
}

# Cleanup Function to free Disk Space
cleanup_docker() {
    print_header "Clean Up of Docker Resources to free Disk Space..."
    
    # Show Initial Disk Usage
    print_information "Current Docker Disk Usage : "
    echo ""
    docker system df

    echo ""
    
    # Remove Stopped Containers
    print_information "Removing Stopped Containers..."
    docker container prune -f || true
    print_success "Stopped Containers Removed"
    
    # Remove Dangling Images
    print_information "Removing Dangling Images..."
    docker image prune -f || true
    print_success "Dangling Images Removed"
    
    # Remove Unused Build Cache (Keep Last 24 Hours)
    print_information "Removing Old Build Cache (Keeping Last 24 Hours)..."
    docker builder prune -f --filter until=24h || true
    print_success "Old Build Cache Removed"
    
    echo ""

    # Show Disk Usage After Cleanup
    print_success "Docker Disk Usage After Cleanup : "
    echo ""
    docker system df

    echo ""

    print_success "Cleanup Completed!"

    echo ""
}

# Function to Display Help
show_help() {
    print_header "PEND Boilerplate - Build Script"

    echo ""

    print_information "Usage : "
    echo "  ./scripts/build.sh [OPTIONS]"

    echo ""

    print_information "Options : "
    echo "  --env [development|staging|production]    Specify Environment (Default : Development)"
    echo "  --test                                    Run Tests Before Building"
    echo "  --frontend-only                           Build Only Frontend"
    echo "  --backend-only                            Build Only Backend"
    echo "  --mobile                                  Build Mobile"
    echo "  --cleanup                                 Run Docker Cleanup Before Build"
    echo "  --help                                    Show This Help Message"

    echo ""

    print_information "Examples : "
    echo "  ./scripts/build.sh --env production"
    echo "  ./scripts/build.sh --env staging --test"
    echo "  ./scripts/build.sh --frontend-only --cleanup"
    echo "  ./scripts/build.sh --env production --test --cleanup"
    echo "  ./scripts/build.sh --env development --mobile"

    echo ""
}

# Default Values
ENVIRONMENT="development"
RUN_TESTS=false
BUILD_FRONTEND=true
BUILD_BACKEND=true
BUILD_MOBILE=false
RUN_CLEANUP=false

# Parse Command Line Arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --env)
            ENVIRONMENT="$2"
            shift 2
            ;;
        --test)
            RUN_TESTS=true
            shift
            ;;
        --frontend-only)
            BUILD_BACKEND=false
            BUILD_MOBILE=false
            shift
            ;;
        --backend-only)
            BUILD_FRONTEND=false
            BUILD_MOBILE=false
            shift
            ;;
        --mobile)
            BUILD_MOBILE=true
            shift
            ;;
        --cleanup)
            RUN_CLEANUP=true
            shift
            ;;
        --help)
            show_help
            exit 0
            ;;
        *)
            print_error "Unknown Option : $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
done

# Validation of Environment
validate_environment() {
    if [[ ! "$ENVIRONMENT" =~ ^(development|staging|production|dev|prod)$ ]]; then
        print_error "Invalid Environment : $ENVIRONMENT"
        print_information "Valid Environments : development, staging, production"
        exit 1
    fi
    
    # Normalize Environment Names
    case $ENVIRONMENT in
        dev)
            ENVIRONMENT="development"
            ;;
        prod)
            ENVIRONMENT="production"
            ;;
    esac
    
    print_success "Building For : $ENVIRONMENT"
}

# Display Build Configuration
show_build_config() {
    print_header "Build Configuration"
    echo ""
    print_information "Environment :     $ENVIRONMENT"
    print_information "Run Tests :       $RUN_TESTS"
    print_information "Build Backend :   $BUILD_BACKEND"
    print_information "Build Frontend :  $BUILD_FRONTEND"
    print_information "Build Mobile :    $BUILD_MOBILE"
    print_information "Run Cleanup :     $RUN_CLEANUP"
    echo ""
}

# Execution of Tests
run_tests() {
    if [ "$RUN_TESTS" = true ]; then
        print_header "Executing Tests"
        echo ""

        if [ "$BUILD_BACKEND" = true ]; then
            print_information "Executing Backend Tests..."
            cd backend
            
            if [ ! -d "venv" ]; then
                print_error "Virtual Environment Not Found!"
                print_information "Run './scripts/setup.sh' first"
                exit 1
            fi
            
            source venv/bin/activate
            pytest --cov
            deactivate
            print_success "All Backend Tests Passed"
            cd ..
            echo ""
        fi

        if [ "$BUILD_FRONTEND" = true ]; then
            print_information "Executing Frontend Tests..."
            cd frontend
            npm test -- --coverage --watchAll=false
            print_success "All Frontend Tests Passed"
            cd ..
            echo ""
        fi
    fi
}

# Build Backend
build_backend() {
    if [ "$BUILD_BACKEND" = true ]; then
        print_header "Building Backend"
        echo ""

        cd backend

        if [ ! -d "venv" ]; then
            print_error "Virtual Environment Not Found!"
            print_information "Run './scripts/setup.sh' First"
            exit 1
        fi

        print_information "Collecting Static Files..."
        source venv/bin/activate
        DJANGO_SETTINGS_MODULE=core.settings.$ENVIRONMENT python manage.py collectstatic --noinput
        deactivate
        print_success "Static Files Collected"

        print_information "Building Docker Image..."
        docker build -t pend-backend:$ENVIRONMENT .
        print_success "Backend Docker Image Built : pend-backend:$ENVIRONMENT"

        cd ..
        echo ""
    fi
}

# Build Frontend
build_frontend() {
    if [ "$BUILD_FRONTEND" = true ]; then
        print_header "Building Frontend"
        echo ""

        cd frontend

        if [ ! -d "node_modules" ]; then
            print_warning "'node_modules' Not Found. Installing Dependencies..."
            npm ci --production=false
        else
            print_information "Dependencies Already Installed"
        fi
        print_success "Dependencies Ready"

        print_information "Building NextJS Application..."
        npm run build
        print_success "NextJS Build Completed"

        print_information "Building Docker Image..."
        docker build -t pend-frontend:$ENVIRONMENT .
        print_success "Frontend Docker Image Built : pend-frontend:$ENVIRONMENT"

        if [ -d ".next" ]; then
            print_success "Build Artifacts Created in '.next/'"
        fi

        cd ..
        echo ""
    fi
}

# Build Mobile
build_mobile() {
    if [ "$BUILD_MOBILE" = true ]; then
        print_header "Building Mobile Application"
        echo ""

        cd mobile

        if [ ! -d "node_modules" ]; then
            print_warning "'node_modules' Not Found. Installing Dependencies..."
            npm ci --production=false
        else
            print_information "Dependencies Already Installed"
        fi
        print_success "Dependencies Ready"

        print_information "Preparing Expo Application..."
        print_warning "Mobile Build requires Expo EAS Build"
        echo ""
        print_information "To build for Production, Run :"
        echo "  cd mobile"
        echo "  eas build --platform all"
        echo ""
        print_information "For more Information : https://docs.expo.dev/build/setup/"
        print_success "Mobile Application Ready for EAS Build"

        cd ..
        echo ""
    fi
}

# Build Storybook
build_storybook() {
    if [ "$BUILD_FRONTEND" = true ]; then
        print_header "Building Storybook"
        echo ""

        cd frontend

        print_information "Building Storybook Static Site..."
        npm run build-storybook
        print_success "Storybook Build Completed"

        if [ -d "storybook-static" ]; then
            print_success "Storybook Artifacts Created in 'storybook-static/'"
        fi

        cd ..
        echo ""
    fi
}

# Post-Build Cleanup
post_build_cleanup() {
    print_header "Post-Build Cleanup"
    echo ""
    
    print_information "Running Cleanup to Free Disk Space..."
    cleanup_docker
}

# Create Build Summary
create_summary() {
    print_header "Build Summary"
    echo ""

    print_success "Build Completed Successfully for $ENVIRONMENT Environment"
    echo ""

    if [ "$BUILD_BACKEND" = true ]; then
        print_information "Backend : "
        echo "  • Docker Image :  pend-backend:$ENVIRONMENT"
        echo "  • Static Files :  backend/staticfiles/"
        echo ""
    fi

    if [ "$BUILD_FRONTEND" = true ]; then
        print_information "Frontend : "
        echo "  • Docker Image :     pend-frontend:$ENVIRONMENT"
        echo "  • Build Artifacts :  frontend/.next/"
        echo "  • Storybook :        frontend/storybook-static/"
        echo ""
    fi

    if [ "$BUILD_MOBILE" = true ]; then
        print_information "Mobile : "
        echo "  • Status :  Ready for EAS Build"
        echo "  • Command : cd mobile && eas build --platform all"
        echo ""
    fi

    print_header "Docker Images"
    echo ""
    docker images | grep pend || print_warning "No PEND Images Found"
    echo ""

    print_header "Next Steps"
    echo ""
    
    if [ "$ENVIRONMENT" = "production" ]; then
        print_information "Production Deployment : "
        echo "  1. Tag Images : "
        echo "     docker tag pend-backend:production your-registry/pend-backend:latest"
        echo "     docker tag pend-frontend:production your-registry/pend-frontend:latest"
        echo ""
        echo "  2. Push Images to Production Registry : "
        echo "     docker push your-registry/pend-backend:latest"
        echo "     docker push your-registry/pend-frontend:latest"
        echo ""
        echo "  3. Deploy to Production Environment"
        echo ""
        echo "  4. Run Health Checks"
        echo ""
        print_warning "Ensure All Production Environment Variables Are Set!"
        
    elif [ "$ENVIRONMENT" = "staging" ]; then
        print_information "Staging Deployment : "
        echo "  1. Tag Images : "
        echo "     docker tag pend-backend:staging your-registry/pend-backend:staging"
        echo "     docker tag pend-frontend:staging your-registry/pend-frontend:staging"
        echo ""
        echo "  2. Push Images to Staging Registry : "
        echo "     docker push your-registry/pend-backend:staging"
        echo "     docker push your-registry/pend-frontend:staging"
        echo ""
        echo "  3. Deploy to Staging Environment"
        echo ""
        echo "  4. Run Smoke Tests"
        echo ""
        echo "  5. Verify All Features"
        
    else
        print_information "Development Testing : "
        echo "  1. Start Services : "
        echo "     docker-compose up -d"
        echo ""
        echo "  2. Access Applications : "
        echo "     • Frontend :          http://localhost:3000"
        echo "     • Backend :           http://localhost:8000"
        echo "     • API Documentation:  http://localhost:8000/swagger/"
        echo "     • Storybook :         http://localhost:6006"
        echo ""
        echo "  3. View Logs : "
        echo "     docker-compose logs -f"
        echo ""
        echo "  4. Run Tests : "
        echo "     ./scripts/build.sh --test"
    fi

    echo ""
    print_success "Build Process Completed!"
    echo ""
}

# Main Function
main() {
    print_header "PEND Boilerplate - Production Build"
    echo ""

    # Validate Environment
    validate_environment
    echo ""

    # Show Build Configuration
    show_build_config

    # Run Cleanup If Requested (Before Build)
    if [ "$RUN_CLEANUP" = true ]; then
        cleanup_docker
    fi

    # Execute Build Steps
    run_tests
    build_backend
    build_frontend
    build_mobile
    build_storybook

    # Post-Build Cleanup
    post_build_cleanup

    # Create Summary
    create_summary
}

# Run Main Function
main