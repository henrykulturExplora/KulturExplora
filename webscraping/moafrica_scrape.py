from selenium import webdriver
from selenium.webdriver.common.by import By
from datetime import datetime

# Initializing Chrome Driver
driver = webdriver.Chrome()

# Opening the website
url = 'https://moafrikatours.com/search-results/?type=tours&terms=south-africa'
driver.get(url)
driver.implicitly_wait(5)

#Get Results Cards
safari_cards = driver.find_elements(By.XPATH, "//div[contains(@class, 'ts-preview')]")

# Loop through available cards
for safari_card in safari_cards:
    title = safari_card.find_element(By.XPATH, ".//div[contains(@class, 'elementor-element-162b949c')]//h3").text
    price = safari_card.find_element(By.XPATH, ".//div[contains(@class, 'elementor-element-3c34de30')]//h3").text
    duration = safari_card.find_element(By.XPATH, ".//span[contains(@class, 'elementor-icon-list-text')]").text
    siteUrl = safari_card.find_element(By.XPATH, ".//a[contains(@class, 'elementor-button-link')]").get_attribute("href")
    
    # Get current date and time
    current_datetime = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    safari = {
        "title": title,
        "location": "Loading...",
        "country": "South Africa",
        "currency": "ZAR",
        "price": price,
        "durationInDays": duration,
        "imagesURl": "Loading...",
        "siteUrl": siteUrl,
        "rating": "loading",
        "dateOfScrape": current_datetime
    }
    
    print(safari)