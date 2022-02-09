import os
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True
    JOBS = [
        {
            'id': 'update_daily_values',
            'func': 'app.api.scheduler:update_daily_value',
            'trigger': 'interval',
            'hours': 24, # call the task function every 24 hours
            'replace_existing': True
        }
    ]
    SCHEDULER_JOBSTORES = {
        'default': SQLAlchemyJobStore(url=os.environ.get("DATABASE_URL"))
    }
    SCHEDULER_API_ENABLED = True
    SCHEDULER_TIMEZONE = "US/EASTERN"
