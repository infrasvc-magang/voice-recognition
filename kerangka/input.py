import requests

def input():
    text =[]
    try:
        text.append("apa itu mobil")
        return text

    except requests.exceptions.RequestException as e:
        return None