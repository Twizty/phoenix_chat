#!/bin/bash
while ! nc -z postgres 5432; do
  echo "Connection to postgres failed, trying again."
  sleep 3;
done
mix ecto.create
mix ecto.migrate
mix compile
mix phoenix.server
