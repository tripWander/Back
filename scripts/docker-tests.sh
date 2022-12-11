#!/usr/bin/env bash

docker compose -f ../docker/docker-compose.yml up -d
npm run test
docker compose -f ../docker/docker-compose.yml down