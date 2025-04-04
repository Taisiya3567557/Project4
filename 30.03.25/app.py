import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import csv
import time
import chromedriver_autoinstaller

def get_books_data(url):
    options = Options()
    chromedriver_autoinstaller.install()
    # options.add_argument("--headless")  # Uncomment to run without UI (headless mode)
    driver = webdriver.Chrome(options=options)
    driver.get(url)
    time.sleep(3)  # Wait for the page to load
    
    books = []
    book_elements = driver.find_elements(By.CSS_SELECTOR, ".genres-carousel__item")  # Limit to first 10 
    
    for book in book_elements:
        try:
            title = book.find_element(By.CSS_SELECTOR, "a.product-title-link").text.strip()
            author = book.find_element(By.CSS_SELECTOR, "div.product-author a").text.strip()
            price = book.find_element(By.CSS_SELECTOR, "span.price-val").text.strip()
            rating_element = book.find_elements(By.CSS_SELECTOR, "div.rating")
            rating = rating_element[0].get_attribute("class").split(" ")[-1] if rating_element else "N/A"
            books.append([title, author, price, rating])
            print("--------------------")
            print(title)
        except Exception as e:
            print(f"Error processing book: {e}")
    
    driver.quit()
    return books

def save_to_csv(data, filename="books.csv"):
    if os.path.exists(filename):
        os.remove(filename)  # Delete the file if it already exists
    
    with open(filename, mode="w", encoding="utf-8", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["Название", "Автор", "Цена", "Рейтинг"])  # Column headers
        writer.writerows(data)

if __name__ == "__main__":
    category_url = "https://www.labirint.ru/genres/2306/"  # Category "Fiction"
    books_data = get_books_data(category_url)
    save_to_csv(books_data)
    print("Data successfully saved to books.csv")