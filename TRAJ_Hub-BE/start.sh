gunicorn "run:app"

# build command for celery
# celery -A app.celery.celery_worker:celery worker --autoscale=4,0 --loglevel=info