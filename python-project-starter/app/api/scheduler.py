# from flask import Flask
# from datetime import datetime
# from flask_apscheduler import APScheduler
# from datetime import date, datetime
# from app.models import db, User, PortfolioValue

# scheduler = APScheduler()

# def update_daily_value():
#     app = scheduler.app
#     with app.app_context():
#         users = User.query.all()
#         for user in users:
#             port_val_today = PortfolioValue(value=user.to_dict()["value_of_holdings"], date=datetime.now(), user_id=user.to_dict()['id'])
#             db.session.add(port_val_today)
#             db.session.commit()
#     return str("update complete")
