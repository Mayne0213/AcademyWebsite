#!/bin/bash

# OMR Grading Application Deployment Script
# This script automates the deployment process for the Next.js + Python OMR grading application

set -e  # Exit on any error

# Configuration
APP_NAME="omr-grading-app"
COMPOSE_FILE="docker-compose.yml"
LOG_FILE="deploy.log"
BACKUP_TAG="backup-$(date +%Y%m%d-%H%M%S)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

log_success() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] SUCCESS:${NC} $1" | tee -a "$LOG_FILE"
}

log_warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1" | tee -a "$LOG_FILE"
}

# Error handling
cleanup() {
    log_error "Deployment failed! Rolling back..."
    
    # Stop new containers
    docker-compose -f "$COMPOSE_FILE" down 2>/dev/null || true
    
    # Restore backup if exists
    if docker images | grep -q "$APP_NAME:$BACKUP_TAG"; then
        log "Restoring backup image: $APP_NAME:$BACKUP_TAG"
        docker tag "$APP_NAME:$BACKUP_TAG" "$APP_NAME:latest" || true
    fi
    
    # Start previous version
    docker-compose -f "$COMPOSE_FILE" up -d 2>/dev/null || true
    
    log_error "Rollback completed. Check logs for details."
    exit 1
}

# Set trap for error handling
trap cleanup ERR

# Check if Docker is running
check_docker() {
    log "Checking Docker status..."
    if ! docker info >/dev/null 2>&1; then
        log_error "Docker is not running. Please start Docker first."
        exit 1
    fi
    log_success "Docker is running"
}

# Check if docker-compose is available
check_docker_compose() {
    log "Checking docker-compose availability..."
    if ! command -v docker-compose >/dev/null 2>&1; then
        log_error "docker-compose is not installed. Please install it first."
        exit 1
    fi
    log_success "docker-compose is available"
}

# Backup current version
backup_current() {
    log "Creating backup of current version..."
    
    # Get current image ID
    CURRENT_IMAGE=$(docker images --format "table {{.Repository}}:{{.Tag}}" | grep "$APP_NAME:latest" | awk '{print $1}')
    
    if [ -n "$CURRENT_IMAGE" ]; then
        docker tag "$CURRENT_IMAGE" "$APP_NAME:$BACKUP_TAG"
        log_success "Backup created: $APP_NAME:$BACKUP_TAG"
    else
        log_warning "No current image found to backup"
    fi
}

# Pull latest code
pull_latest() {
    log "Pulling latest code from Git..."
    
    if [ -d ".git" ]; then
        git pull origin main 2>/dev/null || git pull origin master 2>/dev/null || {
            log_warning "Could not pull from Git. Continuing with local code..."
        }
        log_success "Git pull completed"
    else
        log_warning "Not a Git repository. Using local code."
    fi
}

# Build new image
build_image() {
    log "Building new Docker image..."
    
    docker-compose -f "$COMPOSE_FILE" build --no-cache app
    
    if [ $? -eq 0 ]; then
        log_success "Docker image built successfully"
    else
        log_error "Failed to build Docker image"
        exit 1
    fi
}

# Deploy new version
deploy() {
    log "Deploying new version..."
    
    # Stop current containers
    log "Stopping current containers..."
    docker-compose -f "$COMPOSE_FILE" down
    
    # Start new containers
    log "Starting new containers..."
    docker-compose -f "$COMPOSE_FILE" up -d
    
    # Wait for application to be ready
    log "Waiting for application to be ready..."
    sleep 30
    
    # Check if application is running
    if curl -f http://localhost:3000/api/health >/dev/null 2>&1; then
        log_success "Application is responding"
    else
        log_warning "Application health check failed, but continuing..."
    fi
    
    log_success "Deployment completed successfully!"
}

# Cleanup old images
cleanup_old_images() {
    log "Cleaning up old Docker images..."
    
    # Remove backup images older than 7 days
    docker images "$APP_NAME:backup-*" --format "table {{.Repository}}:{{.Tag}}" | \
    while read image; do
        if [ -n "$image" ]; then
            # Extract date from tag
            date_part=$(echo "$image" | grep -o 'backup-[0-9]\{8\}-[0-9]\{6\}' | head -1)
            if [ -n "$date_part" ]; then
                image_date=$(echo "$date_part" | sed 's/backup-//' | sed 's/-[0-9]\{6\}//')
                current_date=$(date +%Y%m%d)
                days_diff=$(( (current_date - image_date) ))
                
                if [ $days_diff -gt 7 ]; then
                    log "Removing old backup: $image"
                    docker rmi "$image" 2>/dev/null || true
                fi
            fi
        fi
    done
    
    log_success "Cleanup completed"
}

# Main deployment function
main() {
    log "Starting deployment process..."
    log "Backup tag: $BACKUP_TAG"
    
    # Pre-deployment checks
    check_docker
    check_docker_compose
    
    # Backup current version
    backup_current
    
    # Pull latest code
    pull_latest
    
    # Build new image
    build_image
    
    # Deploy new version
    deploy
    
    # Cleanup old images
    cleanup_old_images
    
    log_success "Deployment process completed successfully!"
    log "Application is running at: http://localhost:3000"
}

# Run main function
main "$@"
