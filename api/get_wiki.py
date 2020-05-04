import selenium
import bs4
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

CHROMEDRIVER_PATH = r"./drivers/chromedriver"

options = Options()
options.headless = True
options.add_argument("--log-level=3")
driver = webdriver.Chrome(executable_path=CHROMEDRIVER_PATH, options=options)

def get_path(start_point, end_point):
    start_point = start_point.replace(' ', '+')
    end_point = end_point.replace(' ', '+')
    url = f'https://degreesofwikipedia.com/?a1={start_point}&linktype=1&a2={end_point}&skips=&allowsideboxes=1&allowyears=1&submit=1588518849%7C0bf85377469ee6e2efddbabe55a60f8a&currentlang=en'

    driver.get(url)

    html = driver.page_source
    soup = bs4.BeautifulSoup(html, "html.parser")
    pages = soup.find("pre").get_text().split('\n')[2:-2]

    def modify_page(page):
        return page[page.find("=> ") + 3:].replace('_', ' ')

    pages = [modify_page(page) for page in pages]
    return pages
