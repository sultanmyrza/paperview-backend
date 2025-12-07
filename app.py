import os

from flask import Flask, jsonify
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

app = Flask(__name__)

# Get the connection string from the environment variable
# If it's not set, it defaults to None (which will cause an error later, as intended)
MONGO_URI = os.environ.get("MONGO_URI")

# Connect to the Client
# connect=False prevents the app from trying to connect immediately on startup,
# which helps avoid timeouts during the build process.
client = MongoClient(MONGO_URI, connect=False)
db = client.paperview_db  # This creates a database named 'paperview_db' automatically


@app.route("/")
def hello():
    return jsonify({"status": "online", "service": "paperview-mvp"})


@app.route("/db-test")
def db_test():
    try:
        # The ismaster command is cheap and does not require auth.
        client.admin.command("ismaster")
        return jsonify(
            {"database_status": "Connected!", "details": str(client.address)}
        )
    except ConnectionFailure:
        return jsonify({"database_status": "Failed to connect"}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
