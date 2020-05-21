
for folder in projects about contact; do
    echo $folder
    html-minifier --use-short-doctype --collapse-whitespace --remove-comments --use-short-doctype --minify-js --minify-css --output ${folder}/index.html ${folder}/.src.html
done
