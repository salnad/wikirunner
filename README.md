# wiki-graph
Exploration of wikipedia using graph. Currently working on a chrome extension for theWikiGame

## How it Works
1. Wiki-graph essentially breaks down into two main components: API and the Chrome Extension itself

### API
API effectively works by creating a flask app on your local server that makes use of a GET URL call. The API.py program is actually responsible for creating the Flask app on your local server while the get_wiki.py actually uses the chrome driver. get_wiki.py works by using selenium. The API driver effectively uses a chrome driver to make a url call with the specified start/end points passed into the function and returning a path. The selenium tool effectively creates a invisible browser that passes in our arguments and then returns our desired path (in html format)

### Chrome Extension


