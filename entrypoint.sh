#!/bin/sh

ROOT_DIR=/usr/share/nginx/html

echo "Replacing env constants in JS"
export EXISTING_VARS=$(printenv | grep 'VUE_APP_' | awk -F= '{print $1}' | sed 's/^/$/g' | paste -sd,);
echo "Vars to replace: $EXISTING_VARS";
for file in $ROOT_DIR/js/app.*.js*
do
  echo "Processing $file ...";
  cat $file | envsubst $EXISTING_VARS | tee $file > /dev/null
done