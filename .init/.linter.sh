#!/bin/bash
cd /home/kavia/workspace/code-generation/basic-calculator-259318b1/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

