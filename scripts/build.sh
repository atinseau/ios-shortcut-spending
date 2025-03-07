#!/bin/bash


# Build the project
rm -rf dist

FUNCTIONS=$(ls src/public | awk -F. '{print $1}')

for FUNCTION_NAME in $FUNCTIONS; do
    cp scripts/template src/public/build-$FUNCTION_NAME.ts
    sed -i '' "s/{{FUNCTION_NAME}}/$FUNCTION_NAME/g" src/public/build-$FUNCTION_NAME.ts
    sed -i '' "s/{{FUNCTION_PATH}}/.\/$FUNCTION_NAME.ts/g" src/public/build-$FUNCTION_NAME.ts

    bun build src/public/build-$FUNCTION_NAME.ts \
        --outdir dist \
        --entry-naming $FUNCTION_NAME.js > /dev/null

    rm -rf src/public/build-$FUNCTION_NAME.ts

    echo "✅ Building $FUNCTION_NAME done"
done
