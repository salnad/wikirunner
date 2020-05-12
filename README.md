# 🏁 WikiRunner 🏁
A chrome extension built to help you beat the Wikipedia Game (works for embedded wikipedia page based games like https://www.thewikigame.com/group or on the actual website.

## How it Works
WikiRunner is composed of two components, an API which returns the "shortest path" between two pages given a start and end page, and the chrome extension which auto-clicks links associated with pages in the path.

### API
Our API is located in the api directory and can be run locally using the following steps:
1. Install virtualenv and python3, and install all dependencies (using the requirements.txt)
2. Run api.py using python3 while in the virtualenv

Our API is created using a flask application that accepts GET requests (with a start and end point) and returns a json formatted array of pages to traverse (or an error in case of an invalid path). 

Our API currently works by using selenium / beautifulsoup to make a request to another persons website (https://degreesofwikipedia.com/) and returns their computed answer.

In the future we hope to host our API on a webserver (using proper use of auth tokens) to allow users to use WikiRunners chrome extension without running the API locally. We also plan to use DBPedia's dump of parsed wikipedia links and graph traversal algorithms used like in this project (https://www.sixdegreesofwikipedia.com/) to calculate paths ourselves.

### Chrome Extension
Our chrome extension can be installed by doing the following:
1. Go to chrome://extensions/ in Chrome, turning developer mode on, and adding the chrome-extension directory as a chrome extension. 
2. To use the extension in game or on wikipedia, ensure you are on the starting page, and type the starting page name and the ending page name and hit Find Path to generate a path and automatically traverse that path.

The Chrome Extension can be broken down into a few different components: popup.js/background.js. Specifics can be seen in the code but the general idea is that the popup.js calls our flask application to get the necessary path and sends the data to background.js for storage. Another js scripts focuses on opening each of the links and sending the appropiate messages to our console.

In the future, we hope to refactor the extension to build in more app logic like reporting errors in a more user friendly fashion, listing the path on the popup as it is traversed, and opening the page in a new tab if not already on the page.

#### Authors
salnad and aveekd

