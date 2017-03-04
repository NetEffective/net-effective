#!/usr/bin/env bash

# Encrypt the shared/secret `.env` file to `.env.encrypted` so it can be easily shared.

ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"

read -s -p "Password (ask the team): " PASSWORD && \
  echo $PASSWORD | openssl cast5-cbc -e -in "$ROOT_DIR/.env" -out "$ROOT_DIR/.env.encrypted" -pass stdin
