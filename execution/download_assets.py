import os
import urllib.request

IMAGES = {
    "public/images/hero-pizza.jpg": "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    "public/images/pizza1.jpg": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "public/images/pizza2.jpg": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "public/images/pasta1.jpg": "https://images.unsplash.com/photo-1626844131082-256783844137?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "public/images/basil.png": "https://pngimg.com/uploads/basil/basil_PNG26.png",
    "public/images/tomato.png": "https://pngimg.com/uploads/tomato/tomato_PNG12510.png",
    "public/images/garlic.png": "https://pngimg.com/uploads/garlic/garlic_PNG12773.png",
    "public/images/chili.png": "https://pngimg.com/uploads/chili_pepper/chili_pepper_PNG10.png"
}

def download_images():
    os.makedirs('public/images', exist_ok=True)
    for path, url in IMAGES.items():
        print(f"Downloading {path}...")
        try:
            urllib.request.urlretrieve(url, path)
            print("Done.")
        except Exception as e:
            print(f"Failed to download {path}: {e}")

if __name__ == "__main__":
    download_images()
