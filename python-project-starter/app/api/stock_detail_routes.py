from flask import Blueprint, jsonify
import requests
import os
import pandas as pd

stock_detail_routes = Blueprint("stonk", __name__)

@stock_detail_routes.route("/<ticker>")
def get_company_stats(ticker):

    company_stats = {}

    url = "https://yh-finance.p.rapidapi.com/stock/v2/get-profile"

    querystring = {"symbol": ticker.upper(),"region":"US"}

    headers = {
        'x-rapidapi-host': "yh-finance.p.rapidapi.com",
        'x-rapidapi-key': os.environ.get("RAPID_API_KEY")
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    object = response.json()

    try:
        company_stats["price"] = object["price"]["regularMarketPrice"]["raw"]
    except:
        company_stats["price"] = "N/A"
    try:
        company_stats["name"] = object["price"]["longName"]
    except:
        company_stats["name"] = "N/A"
    try:
        company_stats["about"] = object["assetProfile"]["longBusinessSummary"]
    except:
         company_stats["about"] = "N/A"
    try:
        company_stats["employees"] = object["assetProfile"]["fullTimeEmployees"]
    except:
        company_stats["employees"] = "N/A"
    company_stats["city"] = object["assetProfile"]["city"]
    try:
        company_stats["state"] = object["assetProfile"]["state"]
    except:
        company_stats["state"] = "N/A"
    try:
        company_stats["sector"] = object["assetProfile"]["sector"]
    except:
        company_stats["sector"] = "N/A"
    try:
        company_stats["volume"] = object["price"]["regularMarketVolume"]["fmt"]
    except:
        company_stats["volume"] = "N/A"
    try:
        company_stats["avgvolume"] = object["price"]["averageDailyVolume10Day"]["fmt"]
    except:
        company_stats["avgvolume"] = "N/A"
    try:
        company_stats["marketcap"] = object["price"]["marketCap"]["fmt"]
    except:
        company_stats["marketcap"] = "N/A"
    try:
        company_stats["peratio"] = object["summaryDetail"]["forwardPE"]["fmt"]
    except:
        company_stats["peratio"] = "N/A"
    try:
        company_stats["divyield"] = object["summaryDetail"]["dividendYield"]["fmt"]
    except:
        company_stats["divyield"] = "--"
    try:
        company_stats["52high"] = object["summaryDetail"]["fiftyTwoWeekHigh"]["raw"]
        company_stats["52low"] = object["summaryDetail"]["fiftyTwoWeekLow"]["raw"]
    except:
        company_stats["52high"] = "N/A"
        company_stats["52low"] = "N/A"
    #Code below is for historical prices.  "Outputsize": "compact" returns 100 results "full" returns 20 years

    url = "https://alpha-vantage.p.rapidapi.com/query"

    querystring = {"function":"TIME_SERIES_DAILY","symbol": ticker.upper(),"outputsize":"compact","datatype":"json"}

    headers = {
    'x-rapidapi-host': "alpha-vantage.p.rapidapi.com",
    'x-rapidapi-key': os.environ.get("RAPID_API_KEY")
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    object = response.json()

    values_to_destructure = object["Time Series (Daily)"]

    #Creates an array of all the dates
    dates = []
    for key in values_to_destructure:
        dates.append(key)

    #creates an array of all the historical prices
    values = []
    panda_data = pd.DataFrame(values_to_destructure)
    panda_data_t = panda_data.T
    for index, row in panda_data_t.iterrows():
        values.append(row["4. close"])

    company_stats["dates"] = dates
    company_stats["values"] = values

    # url = "https://stock-and-options-trading-data-provider.p.rapidapi.com/options/AAPL?length=100"

    # headers = {
    #     'x-rapidapi-proxy-secret': "a755b180-f5a9-11e9-9f69-7bf51e845926",
    #     'x-rapidapi-host': "stock-and-options-trading-data-provider.p.rapidapi.com",
    #     'x-rapidapi-key': "87f3ecae37msh3f216162a2c9eafp1df5c4jsn35365762bd67"
    #     }

    # response = requests.request("GET", url, headers=headers)

    # print("RESSSSSSS", response.text)

    return(company_stats)


#THIS CODE IS USED IN PROFILE COMPONENT TO PULL THE PRICE OF ALL TICKERS IN A USERS PORTFOLIO i.e.{AAPL: 171.77}


#We may no longer need to pull prices since the portfolio model now pulls price.

# @stock_detail_routes.route("/user/<tickers>")
# def get_values(tickers):

#     ticker_list = tickers.split(",")
#     ticker_array = []
#     [ticker_array.append(i) for i in ticker_list]

#     company_stats = {}

#     for x in range(len(ticker_array)):

#         url = "https://yh-finance.p.rapidapi.com/stock/v2/get-profile"

#         querystring = {"symbol": ticker_array[x].upper(),"region":"US"}

#         headers = {
#             'x-rapidapi-host': "yh-finance.p.rapidapi.com",
#             'x-rapidapi-key': os.environ.get("RAPID_API_KEY")
#             }

#         response = requests.request("GET", url, headers=headers, params=querystring)

#         object = response.json()

#         company_stats[ticker_array[x]] = object["price"]["regularMarketPrice"]["raw"]
#     print("COMPANYYYYY", company_stats)
#     obj_list = []
#     for key, val in company_stats.items():
#         obj_list.append([key, val])
#     return jsonify(obj_list)
