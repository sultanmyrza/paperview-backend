from flask import Flask

app = Flask(__name__)


@app.route("/")
def index():
    return {"message": "Hello, World!"}


@app.route("/public")
def public():
    return {"data": "anyone can see this"}


@app.route("/private")
def private():
    return {"data": "only authorized users should see this"}
