#!/bin/bash
# Run this script to set up GitHub branches after cloning

echo "Setting up GitHub branches..."

# Initialize git
git init
git add .
git commit -m "initial commit: MERN stock trading platform"

# Create main branches
git checkout -b main
git checkout -b dev
git checkout -b feature/frontend
git checkout -b feature/backend
git checkout -b feature/dashboard
git checkout -b hotfix

# Go back to dev
git checkout dev

echo "Branches created:"
echo " - main         (production)"
echo " - dev          (development)"
echo " - feature/frontend"
echo " - feature/backend"
echo " - feature/dashboard"
echo " - hotfix"
echo ""
echo "Now run: git remote add origin https://github.com/YOUR_USERNAME/stock-trading-platform.git"
echo "Then push: git push -u origin --all"
