from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/fetch-stats', methods=['GET'])
def fetch_stats():
    username = request.args.get('username')
    response = requests.get(f"https://mcsr-stats.memerson.xyz/api/matches?timeframe=12 hours&username={username}")
    return jsonify(response.json())

if __name__ == "__main__":
    app.run()
