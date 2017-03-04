#!/usr/bin/env bash

# Decrypt the shared/secret `.env` file from `.env.encrypted`

ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"

read -s -p "Password: " PASSWORD && \
  echo $PASSWORD | openssl cast5-cbc -d -in "$ROOT_DIR/.env.encrypted" -out "$ROOT_DIR/.env" -pass stdin
