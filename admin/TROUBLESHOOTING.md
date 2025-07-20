# Admin Panel Troubleshooting Guide

## Issues Fixed

### 1. Gallery Add Issue ✅
**Problem**: Gallery items were not being added to the website automatically.
**Solution**: Modified `handleGalleryFormSubmit` to call `showGeneratedCode` instead of `showPreview`, which automatically adds content to the website.

### 2. Delete Functionality Issue ✅
**Problem**: Items were not being deleted properly.
**Solution**: 
- Added gallery selector to delete function
- Added better error handling and logging
- Improved success messages

## Common Issues and Solutions

### Issue: "Item not found for deletion"
**Cause**: The HTML structure doesn't match the expected selectors.
**Solution**: 
1. Check that the HTML file contains the correct CSS classes
2. Verify the selector mapping in the code
3. Check browser console for detailed error messages

### Issue: "Could not find .gallery-grid section"
**Cause**: The gallery.html file doesn't have the expected structure.
**Solution**:
1. Ensure gallery.html has a `<div class="gallery-grid">` section
2. Check that the file is accessible to the server

### Issue: "Error saving file"
**Cause**: File permissions or server configuration issues.
**Solution**:
1. Check that the server has write permissions to the project directory
2. Verify the file path is correct
3. Check server logs for detailed error messages

### Issue: Gallery form shows preview instead of adding to website
**Cause**: The form submission is calling the wrong method.
**Solution**: ✅ Fixed - Now calls `showGeneratedCode` which automatically adds to website.

## Debugging Steps

1. **Check Browser Console**: Open developer tools and look for error messages
2. **Check Server Logs**: Look at the terminal where the server is running
3. **Test File Access**: Try accessing `/get-file/gallery.html` directly in browser
4. **Verify HTML Structure**: Check that the HTML files have the correct CSS classes

## Testing the Fixes

1. **Start the server**: `npm start` or `node server.js`
2. **Open admin panel**: `http://localhost:3001/admin`
3. **Test gallery add**:
   - Go to "Add" mode
   - Select "Gallery"
   - Fill in title and description
   - Add image URLs or upload files
   - Submit form
   - Should see "Gallery item successfully added to your website!" message
4. **Test delete functionality**:
   - Go to "Edit" mode
   - Select any content type
   - Click delete on an item
   - Confirm deletion
   - Should see success message and item removed from list

## File Structure Requirements

For the admin panel to work correctly, ensure these files exist with the correct structure:

- `gallery.html` - Must contain `<div class="gallery-grid">` and `<div class="gallery-item">` elements
- `publications.html` - Must contain `.publications-content` and `.publication-item` elements
- `experiences.html` - Must contain `.experiences-content` and `.experience-item` elements
- `awards.html` - Must contain `.awards-content` and `.award-item` elements
- `projects.html` - Must contain `.projects-list` and `.project-item` elements
- `teaching.html` - Must contain `.teaching-content` and `.teaching-item` elements
- `index.html` - Must contain `.news-grid` and `.news-item` elements for events

## Success Messages

After the fixes, you should see these success messages:

- **Gallery Add**: "Gallery item successfully added to your website!"
- **Gallery Delete**: "Gallery Item deleted successfully!"
- **Other Content**: "[Content Type] successfully added to your website!"
- **Other Delete**: "[Content Type] deleted successfully!" 