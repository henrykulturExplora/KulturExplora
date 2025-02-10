from selenium import webdriver
from selenium.webdriver.common.by import By
from datetime import datetime
import json
import csv
import os
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import ElementClickInterceptedException, NoSuchElementException, ElementNotInteractableException

# Initializing Chrome Driver
driver = webdriver.Chrome()

# Get the current working directory
current_directory = os.getcwd()

# Define the country and JSON & CSV filenames
country = "south-africa"
current_datetime = datetime.now().strftime("%Y%m%d_%H%M%S")
json_file_name = f'moafrika_safaris-{current_datetime}.json'
csv_file_name = f'moafrika_safaris-{current_datetime}.csv'

# Construct the JSON & CSV file paths
json_file_path = os.path.join(current_directory, 'safaris', country, json_file_name)
csv_file_path = os.path.join(current_directory, 'safaris', country, csv_file_name)

# Opening the website
url = 'https://moafrikatours.com/search-results/?type=tours&terms=south-africa'
driver.get(url)
time.sleep(5)

# Store the original tab
original_tab = driver.current_window_handle

i = 0
# While load more button exists, click on it
while True:
    try:
        # Find load more button and wait for it to be clickable
        time.sleep(5)
        load_more_btn = driver.find_element(By.XPATH, "//a[contains(@class, 'ts-load-more')]")
        
        # Scroll to load more and click on it
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", load_more_btn)
        time.sleep(5)
        load_more_btn.click()
        i+=1
        print(i)
    
    #If load more button is not found all results have been loaded 
    except NoSuchElementException:
        print("All results have been loaded")
        break
    #If load more button is not clickable, all elements have been loaded
    except ElementNotInteractableException:
        print("All results have been loaded")
        break
    # If button is taking long to be clickable, wait longer
    except ElementClickInterceptedException:
        print("Element is taking a bit longer to be clickable")
        time.sleep(8)
        continue

time.sleep(5)
#Get Results Cards
safari_cards = driver.find_elements(By.XPATH, "//div[contains(@class, 'ts-preview')]")

# Array of Safaris
safaris = []

#Index of each Safari
safari_index = 0

# Loop through available Safari cards
for safari_card in safari_cards:
    title = safari_card.find_element(By.XPATH, ".//div[contains(@class, 'elementor-element-162b949c')]//h3").text
    
    #Get price, duration, site_url || return "" if not found
    try:
        get_price = safari_card.find_element(By.XPATH, ".//div[contains(@class, 'elementor-element-3c34de30')]//h3").text
        price = get_price.split()[1]
    except NoSuchElementException:
        print(f'Price not found for: {title}')
        price = ""
    try:
        get_duration = safari_card.find_element(By.XPATH, ".//span[contains(@class, 'elementor-icon-list-text')]").text
        duration = get_duration.split()[0]
    except NoSuchElementException:
        print(f'Duration not found for: {title}')
        duration = ""
    try:
        site_url = safari_card.find_element(By.XPATH, ".//a[contains(@class, 'elementor-button-link')]").get_attribute("href")
    except NoSuchElementException:
        print(f'Site Url not found for: {title}')
        site_url = ""
    
    
    # Get current date and time
    current_datetime = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    #Open the safari site or skip if url doesn't exist
    try:
        driver.execute_script(f"window.open('{site_url}', '_blank');")
    except NoSuchElementException:
        print(f'Site Url not found for: {title}, skipping')
        continue
    
    time.sleep(5)
    tabs = driver.window_handles
    
    #Switch to the safari site tab to get description, location and images
    driver.switch_to.window(tabs[-1])
    
    #Get location, description, image_urls || return "" if not found
    try:
        location = driver.find_element(By.XPATH, "//span[contains(@class, 'elementor-icon-list-text')]").text
    except NoSuchElementException:
        print(f'Location not found for: {title}')
        location = ""
    try:
        description = driver.find_element(By.XPATH, "//div[contains(@class, 'elementor-element-cdd5178')]//p[2]").text
    except NoSuchElementException:
        print(f'Description not found for: {title}')
        description = ""
    
    try:
        #Get list of the image urls
        img_urls = driver.find_elements(By.XPATH, "//div[contains(@class, 'ts-gallery-grid')]//img")
        image_list = [img.get_attribute('src') for img in img_urls]
    except NoSuchElementException:
        print(f'Image Urls not found for: {title}')
        image_list = []
    
    #Close safari site tab
    driver.close()
    
    # Switch back to first tab
    driver.switch_to.window(tabs[0])
    print(f'title: {title}, index: {safari_index + 1}')
    
    # Safari json data  structure
    safari = {
        "index": safari_index,
        "title": title,
        "description": description,
        "location": location,
        "country": "South Africa",
        "currency": "ZAR",
        "price": price,
        "durationInDays": duration,
        "imagesURL": image_list,
        "siteURL": site_url,
        "rating": "",
        "dateOfScrape": current_datetime
    }
    
    # Append to safari list
    safaris.append(safari)
    
    # Increment Safari Index
    safari_index += 1

# Open and save data to a json file
with open(json_file_path, 'w') as json_file:
    json.dump(safaris, json_file, indent=4)


# Open and save data to a CSV file
with open(csv_file_path, 'w', newline='') as csv_file:
    fieldnames = ['index', 'title', 'description',
                  'location', 'country','currency',
                  'price', 'durationInDays', 'imagesURL',
                  'siteURL', 'rating', 'dateOfScrape']
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(safaris)
    