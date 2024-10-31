import requests

def fetch_stats(request):
    username = request.args.get('username')
    response = requests.get(f"https://mcsr-stats.memerson.xyz/api/matches?timeframe=12 hours&username={username}")
    return response.json()
