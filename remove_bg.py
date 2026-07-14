from PIL import Image

def remove_white_bg(img_path, out_path, threshold=220):
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Check if the pixel is near white
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            # Check how close it is to pure white for anti-aliasing
            # Alternatively just hard transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    
    # Let's also crop the image to its bounding box of non-transparent pixels
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(out_path, "PNG")

remove_white_bg("public/forever_dream_spaces.jpeg", "public/forever_dream_spaces.png")
print("Done")
