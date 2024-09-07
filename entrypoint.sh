#!/bin/sh
set -e
exec node -r source-map-support/register dist/server.js
