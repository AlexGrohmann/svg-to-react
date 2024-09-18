import os

# from scour import scour
import shutil

print("script started")

# start dir
start_path = "./svg/"
# target dir
target_path = "./demo/src/results/python/"

# Create the target directory if it doesn't exist
if not os.path.exists(target_path):
    os.makedirs(target_path)

# Get all the files in the start directory
for file in os.listdir(start_path):
    if file.endswith(".svg"):
        print("found:", file)
        with open(os.path.join(start_path, file), "r", encoding="utf-8") as f:
            data = f.read()

        # Optimize the SVG
        # options = scour.sanitizeOptions()
        # options.remove_metadata = True
        # result = scour.scourString(data, options)
        optimized_data = data

        print(f"SVG optimized: {len(data)} to {len(optimized_data)}")

        # Create React component filename
        filename = file[:-4][0].upper() + file[:-4][1:]

        # Write to a .tsx file
        tsx_content = (
            f"import React from 'react';\n"
            f"function {filename}() {{\n"
            f"\treturn (\n\t{optimized_data}\n\t);\n"
            f"}}\n"
            f"export default {filename};"
        )
        with open(
            os.path.join(target_path, f"{filename}.tsx"), "w", encoding="utf-8"
        ) as f:
            f.write(tsx_content)

        print("created:", f"{filename}.tsx")
