from flask import Flask
from flask_restful import Resource, Api, reqparse
from get_wiki import get_path
import json
app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('src')
parser.add_argument('dst')

class WikiList(Resource):
    def get(self):
        args = parser.parse_args()
        path = get_path(args.src, args.dst)
        result = {'path' : path}
        return result

api.add_resource(WikiList, '/')

if __name__ == '__main__':
    app.run(debug=True)