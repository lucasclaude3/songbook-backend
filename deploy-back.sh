while read p; do
    eval "heroku config:set " "$p";
done < .env.production
git push heroku master;
