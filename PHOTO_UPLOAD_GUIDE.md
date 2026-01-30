# FPC Construction - Photo Upload Guide

This guide explains how to easily add photos from Google Drive to your website.

## Google Drive Folder

Your photos should be uploaded to this Google Drive folder:
**https://drive.google.com/drive/folders/1mtkzCuw_zNsbeDa5N_P5yDJTL6lhLrF-**

## How to Add Photos to the Website

### Step 1: Upload Photo to Google Drive

1. Go to your Google Drive folder (link above)
2. Click "New" → "File upload"
3. Select the photo(s) you want to upload
4. Wait for upload to complete

### Step 2: Make Photo Publicly Accessible

1. Right-click on the uploaded photo
2. Click "Share"
3. Under "General access", change from "Restricted" to **"Anyone with the link"**
4. Click "Copy link"
5. Click "Done"

### Step 3: Get the File ID

From the copied link, you need to extract the **File ID**.

Example link:
```
https://drive.google.com/file/d/1ABC123xyz789DEF/view?usp=sharing
```

The File ID is: `1ABC123xyz789DEF` (the part between `/d/` and `/view`)

### Step 4: Update the Gallery Config

1. Open the file: `assets/data/gallery-config.json`
2. Find the project or gallery item you want to update
3. Paste the File ID into the `"imageId"` field

**Example:**
```json
{
  "id": "project-1",
  "title": "Residential Driveway",
  "category": "driveways",
  "location": "North Augusta, SC",
  "imageId": "1ABC123xyz789DEF",
  "imageFallback": "assets/images/placeholder/project-1.jpg"
}
```

## Adding New Gallery Photos

To add more photos to the dynamic gallery section:

1. In `gallery-config.json`, find the `"gallery"` array
2. Add a new entry:

```json
{
  "id": "gallery-4",
  "title": "New Project Photo",
  "imageId": "YOUR_GOOGLE_DRIVE_FILE_ID_HERE",
  "description": "Description of the photo"
}
```

3. Save the file
4. The photo will automatically appear in the "More Project Photos" section

## Updating Project Photos

The main project photos (shown in the "Featured Projects" section) are in the `"projects"` array.
Each project has:

- `id` - Unique identifier
- `title` - Project name shown on the card
- `category` - Used for filtering (driveways, land-clearing, foundations, grading)
- `location` - City/area where project was completed
- `imageId` - **Your Google Drive File ID goes here**
- `imageFallback` - Backup image if Google Drive fails

## Tips

- **Image Size**: For best results, upload images that are at least 800px wide
- **Format**: JPG and PNG work best
- **Naming**: Give your files descriptive names for easier management
- **Fallback**: The `imageFallback` field ensures images still show if Google Drive is unavailable

## Troubleshooting

**Photo not showing?**
1. Make sure the file is shared with "Anyone with the link"
2. Verify the File ID is correct (no extra spaces)
3. Check browser console for errors

**Photo loads slowly?**
- Google Drive images may load slower than local images
- Consider optimizing photos before upload (compress large files)

## Need Help?

Contact your web developer or open an issue on the GitHub repository.
