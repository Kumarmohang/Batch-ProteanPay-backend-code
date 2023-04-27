#!/bin/bash

dockerize -wait tcp://postgres_container:5432 -timeout 20s

echo "Start Wait psql"
