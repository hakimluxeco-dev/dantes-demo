import json
import os
import datetime
# import requests # Uncomment when adding real scraping
# from bs4 import BeautifulSoup

# Configuration
OUTPUT_FILE = 'public/data/content.json'
FACEBOOK_URL = 'https://www.facebook.com/DantesPizzaKlerksdorp/'

def fetch_facebook_data():
    """
    Fetches latest posts from Facebook. 
    Currently returns mock data to ensure site stability until 
    proper scraping/API logic is verified.
    """
    print(f"Fetching updates from {FACEBOOK_URL}...")
    
    # Mock Data representing what we would scrape
    # In a real scenario, we would use requests.get() and BeautifulSoup
    # or the Graph API.
    
    current_date = datetime.date.today().isoformat()
    
    data = {
        "last_updated": current_date,
        "specials": [
            {
                "id": 1,
                "title": "Family Feast",
                "description": "2 Large Pizzas + 2L Coke for only R250!",
                "image": "/images/special1.jpg",
                "valid_until": "2024-12-31"
            },
            {
                "id": 2,
                "title": "Pasta Tuesday",
                "description": "Buy any pasta and get a second one half price.",
                "image": "/images/special2.jpg",
                "valid_until": "2024-12-31"
            }
        ],
        "announcements": [
            {
                "date": current_date,
                "text": "We are open for sit-down and collection! Come taste the difference."
            }
        ]
    }
    
    return data

def save_data(data):
    """Saves the data to the JSON file."""
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Data saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    try:
        content = fetch_facebook_data()
        save_data(content)
        print("Update successful.")
    except Exception as e:
        print(f"Update failed: {e}")
        exit(1)
