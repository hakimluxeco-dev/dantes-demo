
import os
import urllib.request

CATS = [
    # Authentic looking pizzas and pastas
    ("https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop", "fb-pizza-1.jpg"),
    ("https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop", "fb-pizza-2.jpg"),
    ("https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?q=80&w=800&auto=format&fit=crop", "fb-pizza-3.jpg"),
    ("https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=800&auto=format&fit=crop", "fb-pizza-4.jpg"),
    ("https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop", "fb-pizza-5.jpg"), 
    ("https://images.unsplash.com/photo-1571407970349-bc16e6961601?q=80&w=800&auto=format&fit=crop", "fb-pizza-6.jpg"),
    ("https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800&auto=format&fit=crop", "fb-pizza-7.jpg"),
    ("https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=800&auto=format&fit=crop", "fb-pizza-8.jpg"),
    ("https://images.unsplash.com/photo-1579751626657-929ad80697f6?q=80&w=800&auto=format&fit=crop", "fb-pizza-9.jpg"),
    ("https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop", "fb-pizza-10.jpg"),
    ("https://images.unsplash.com/photo-1605807646983-377bc5a76493?q=80&w=800&auto=format&fit=crop", "fb-pizza-11.jpg"),
    ("https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop", "fb-pizza-12.jpg"), # Pasta
    ("https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=800&auto=format&fit=crop", "fb-pizza-13.jpg"), # Pasta
    ("https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=800&auto=format&fit=crop", "fb-pizza-14.jpg"), # Pasta
    ("https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=800&auto=format&fit=crop", "fb-pizza-15.jpg"), # Pasta
]

IMG_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public", "images")
os.makedirs(IMG_DIR, exist_ok=True)

print(f"Downloading {len(CATS)} images to {IMG_DIR}...")

for url, filename in CATS:
    dest = os.path.join(IMG_DIR, filename)
    if not os.path.exists(dest):
        try:
            print(f"Downloading {filename}...")
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(dest, 'wb') as out_file:
                data = response.read()
                out_file.write(data)
            print(f"Saved {filename}")
        except Exception as e:
            print(f"Failed to download {filename}: {e}")
    else:
        print(f"Skipping {filename} (exists)")
