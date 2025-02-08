from selenium import webdriver
from selenium.webdriver.common.by import By
from datetime import datetime
import json
import os
import time

# Initializing Chrome Driver
driver = webdriver.Chrome()

#Get current date and time
current_datetime = datetime.now().strftime("%Y%m%d_%H%M%S")

#Create file path for json data
current_directory = os.getcwd()
file_name = f'moafrika_safaris-{current_datetime}.json'
file_path = os.path.join(current_directory, file_name)


# Opening the website
url = 'https://moafrikatours.com/search-results/?type=tours&terms=south-africa'
driver.get(url)
driver.implicitly_wait(5)

# Store the original tab
original_tab = driver.current_window_handle

# Load More Results
# load_more_btn = driver.find_element(By.XPATH, "//div[contains(@class, ts-load-more)]")

# i = 0
# while i < 5:
#     driver.implicitly_wait(20)
#     load_more_btn.click()

#Get Results Cards
safari_cards = driver.find_elements(By.XPATH, "//div[contains(@class, 'ts-preview')]")

# Array of Safaris
safaris = []

# Loop through available cards
for safari_card in safari_cards:
    title = safari_card.find_element(By.XPATH, ".//div[contains(@class, 'elementor-element-162b949c')]//h3").text
    price = safari_card.find_element(By.XPATH, ".//div[contains(@class, 'elementor-element-3c34de30')]//h3").text
    duration = safari_card.find_element(By.XPATH, ".//span[contains(@class, 'elementor-icon-list-text')]").text
    site_url = safari_card.find_element(By.XPATH, ".//a[contains(@class, 'elementor-button-link')]").get_attribute("href")
    
    
    
    # Get current date and time
    current_datetime = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    #Open the safari site to get description, location and images
    driver.execute_script(f"window.open('{site_url}', '_blank');")
    time.sleep(5)
    tabs = driver.window_handles
    
    #Switch to the safari site tab to get description, location and images
    driver.switch_to.window(tabs[-1])
    location = driver.find_element(By.XPATH, "//span[contains(@class, 'elementor-icon-list-text')]").text
    description = driver.find_element(By.XPATH, "//div[contains(@class, 'elementor-element-cdd5178')]//p[2]").text
    
    img_urls = driver.find_elements(By.XPATH, "//div[contains(@class, 'ts-gallery-grid')]//img")
    image_list = [img.get_attribute('src') for img in img_urls]
    print(image_list)
    #Close safari site tab
    driver.close()
    
    # Switch back to current tab
    driver.switch_to.window(tabs[0]) 
    
    safari = {
        "title": title,
        "description": description,
        "location": location,
        "country": "South Africa",
        "currency": "ZAR",
        "price": price.split()[1],
        "durationInDays": duration.split()[0],
        "imagesURl": image_list,
        "siteUrl": site_url,
        "rating": "",
        "dateOfScrape": current_datetime
    }
    
    safaris.append(safari)

# Open and save data to json file
with open(file_path, 'w') as json_file:
    json.dump(safaris, json_file, indent=4)
