#!/bin/bash
rm -rf server/public/*
cd client
npm run build
cd ..
mv client/build/* server/public