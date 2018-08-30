git add .
git commit -m "updated report"
git push origin dev
ng build --prod --base-href "/"
ngh --dir dist/therapy --no-silent
