#!/usr/bin/env bash

BRANCHES=$(fish -c 'git branch -r | grep dependabot | string split0 | string trim')


for branch in $BRANCHES; do
  git merge $branch
done
