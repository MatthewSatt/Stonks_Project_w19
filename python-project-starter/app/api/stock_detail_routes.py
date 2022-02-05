from flask import Blueprint, jsonify
import json, requests

stock_detail_routes = Blueprint("stonk", __name__)

@stock_detail_routes.route('/stonk/<ticker>')

def stockdetails(ticker):
    company_stats = {ticker: {}}
    ticker = ticker.upper()

    def get_data(ticker):
        company_stats = {}
