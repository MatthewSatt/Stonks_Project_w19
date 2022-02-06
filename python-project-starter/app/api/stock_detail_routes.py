from flask import Blueprint
import json, requests
import os

stock_detail_routes = Blueprint("stonk", __name__)

@stock_detail_routes.route("/<ticker>")
def get_company_stats(ticker):

    company_stats = {}
    print("ROUTE TICKER", ticker)

    url = "https://yh-finance.p.rapidapi.com/stock/v2/get-profile"

    querystring = {"symbol": ticker.upper(),"region":"US"}

    headers = {
        'x-rapidapi-host': "yh-finance.p.rapidapi.com",
        'x-rapidapi-key': os.environ.get("RAPID_API_KEY")
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    object = response.json()

    company_stats["price"] = object["price"]["regularMarketPrice"]["raw"]
    company_stats["name"] = object["price"]["longName"]
    company_stats["about"] = object["assetProfile"]["longBusinessSummary"]
    company_stats["employees"] = object["assetProfile"]["fullTimeEmployees"]
    company_stats["city"] = object["assetProfile"]["city"]
    company_stats["state"] = object["assetProfile"]["state"]
    company_stats["sector"] = object["assetProfile"]["sector"]
    company_stats["volume"] = object["price"]["regularMarketVolume"]["fmt"]
    company_stats["avgvolume"] = object["price"]["averageDailyVolume10Day"]["fmt"]
    company_stats["marketcap"] = object["price"]["marketCap"]["fmt"]
    company_stats["peratio"] = object["summaryDetail"]["forwardPE"]["fmt"]
    company_stats["divyield"] = object["summaryDetail"]["dividendYield"]["fmt"]
    company_stats["52high"] = object["summaryDetail"]["fiftyTwoWeekHigh"]["raw"]
    company_stats["52low"] = object["summaryDetail"]["fiftyTwoWeekLow"]["raw"]

    return(company_stats)
