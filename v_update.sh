#!/bin/bash

# Specify the details of the third-party repository and your repository
THIRD_PARTY_REPO="karanshukla430/Todo_mern"
YOUR_REPO="SaurbhPandey/Todo_mern123"
BRANCH_NAME="update-from-upstream"

# Get the current date and time in the format YYYY-MM-DD_HH-MM-SS
DATE_TIME=$(date +"%Y-%m-%d_%H-%M-%S")

# Create the new branch name with date and time
BASE_BRANCH="master"
# NEW_BRANCH_NAME="${BRANCH_NAME}_${DATE_TIME}"
NEW_BRANCH_NAME="$BRANCH_NAME"
git remote add source https://github.com/karanshukla430/Todo_mern.git
# Check if the branch already exists
if git rev-parse --verify "$NEW_BRANCH_NAME" >/dev/null 2>&1; then
    echo "Branch '$NEW_BRANCH_NAME' already exists. Skipping."

else
    git checkout master
    git pull origin master
    git checkout -b "$NEW_BRANCH_NAME"
    echo "Created branch '$NEW_BRANCH_NAME'."   
    # git remote add source https://github.com/karanshukla430/Todo_mern.git
    git fetch source master
    git pull source master
    git merge source/master
    

    # Check if changes have been made
    if ! git diff --quiet master; then
        # Changes detected
        # Commit
        git add .
        git commit -m "version update '$DATE_TIME'"
        git push origin $NEW_BRANCH_NAME
        echo "package.json updated and changes pushed to branch '$NEW_BRANCH_NAME'."
        git checkout -b new-branch
        git checkout origin master
        git push origin new-branch


    else
        git checkout master
        git branch -D $NEW_BRANCH_NAME
        echo "No changes detected. Pull request will not be created."
    fi
fi