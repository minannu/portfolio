# Portfolio Admin Panel

A comprehensive admin panel for managing your portfolio website content. This tool allows you to easily add new publications, experiences, awards, projects, teaching activities, and events to your portfolio website.

## Features

- **7 Content Types**: Publications, Experiences, Awards, Projects, Teaching/Service, Events, and Gallery
- **Live Preview**: See how your content will look before generating the code
- **Form Validation**: Real-time validation with helpful error messages
- **HTML Code Generation**: Automatically generates properly formatted HTML code
- **One-Click Copy**: Copy generated code to clipboard instantly
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Automatic File Updates**: Server version automatically saves content to your website files
- **File Upload Support**: Gallery items support both URL and file uploads
- **Delete Functionality**: Edit mode allows you to delete existing content

## How to Use

### 1. Getting Started

#### Option A: Using the Server (Recommended)
1. **Install Node.js** if you haven't already (download from https://nodejs.org/)
2. **Start the server**:
   - **Windows**: Double-click `start.bat`
   - **Mac/Linux**: Run `./start.sh` in terminal
   - **Manual**: Open terminal in admin folder and run `npm install && npm start`
3. **Open the admin panel**: Go to http://localhost:3001/admin in your browser

#### Option B: Direct File Access
1. Open `admin/index.html` directly in your web browser
2. Note: This method requires manual copying of generated code

### 2. Adding Content

1. **Select Content Type**: Choose from Publications, Experiences, Awards, Projects, Teaching/Service, Events, or Gallery
2. **Fill the Form**: Complete all required fields (marked with *)
3. **Preview**: Click "Preview" to see how your content will look
4. **Add Automatically**: Click "Add [Content Type]" to automatically add to your website
5. **Success**: Content is automatically added to the correct file!

### 3. Editing/Deleting Content

1. **Switch to Edit Mode**: Click the "Edit" button in the top navigation
2. **Select Content Type**: Choose the type of content you want to edit
3. **View Content List**: See all existing content for that type
4. **Edit or Delete**: Click "Edit" to modify content or "Delete" to remove it
5. **Confirm Actions**: Confirm any deletions in the popup dialog

### 4. Automatic File Updates

When you use the server version, the admin panel will:
- ✅ **Automatically read** your current website files
- ✅ **Add new content** to the correct sections
- ✅ **Save files** with your new content
- ✅ **Create backups** before making changes
- ✅ **Show success messages** when complete

**No manual copying or pasting required!**

## Content Types & Fields

### Publications
- **Title**: Publication title
- **Status**: Publication status (Accepted, Submitted, Under Review, etc.)
- **Authors**: Author names
- **Description**: Brief description of the publication
- **Link**: Publication URL (optional)

### Experiences
- **Position Title**: Job title or position
- **Start Date**: When you started (month/year)
- **End Date**: When you ended (month/year) or "Present"
- **Company/Institution**: Organization name
- **Description**: Role and responsibilities

### Awards
- **Award Title**: Name of the award
- **Year**: Year received
- **Organization**: Awarding organization
- **Description**: Brief description
- **Link**: Award URL (optional)

### Projects
- **Project Title**: Project name
- **Project Type**: Research, Thesis, Competition, or Collaboration
- **Description**: Project description
- **Technologies**: Technologies used (optional)
- **Link**: Project URL (optional)

### Teaching/Service
- **Position/Activity Title**: Role or activity name
- **Start Date**: When you started (month/year)
- **End Date**: When you ended (month/year) or "Present"
- **Institution/Organization**: Organization name
- **Description**: Description of activities
- **Link**: Organization URL (optional)

### Events
- **Event Title**: Event name
- **Date**: Event date (month/year)
- **Description**: Event description
- **Link**: Event URL (optional)

### Gallery
- **Title**: Gallery item title
- **Description**: Description of the gallery item
- **Images**: Upload files or provide image URLs (one per line)

## Tips

1. **Always Preview**: Use the preview feature to see how your content will look
2. **Add at the Top**: Paste new content at the beginning of sections to keep newest items first
3. **Use Links**: Add relevant links when available for better user experience
4. **Be Consistent**: Use consistent formatting and style in your descriptions
5. **Test After Adding**: Always test your website after adding new content

## File Structure

```
admin/
├── index.html          # Main admin panel
├── styles.css          # Admin panel styles
├── script.js           # Admin panel functionality
├── server.js           # Node.js server for file operations
├── package.json        # Node.js dependencies
├── start.bat           # Windows startup script
├── start.sh            # Unix/Linux/Mac startup script
└── README.md           # This file
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Security Note

This admin panel is designed for local use only. Do not upload the `admin/` folder to your web server as it contains no security measures and could expose your content management interface.

## Troubleshooting

### Form Not Working
- Make sure JavaScript is enabled in your browser
- Try refreshing the page
- Check browser console for errors

### Code Not Copying
- Make sure you're using a modern browser
- Try selecting and copying manually if the button doesn't work
- Check if your browser allows clipboard access

### Preview Not Showing
- Make sure all required fields are filled
- Check for validation errors (red text under fields)
- Try refreshing the page

### Items Not Deleting
- Check browser console for error messages
- Verify that the HTML files have the correct CSS classes
- Ensure the server has write permissions to the project directory

### Gallery Not Adding
- Make sure you've provided at least one image (URL or file upload)
- Check that gallery.html has a `.gallery-grid` section
- Verify the server is running and accessible

### Recent Fixes
- ✅ **Gallery Add Issue**: Fixed - Gallery items now automatically add to website
- ✅ **Delete Functionality**: Fixed - All content types can now be deleted properly
- ✅ **Success Messages**: Improved - More specific success messages for each content type

## Support

If you encounter any issues:
1. Check that all files are in the correct location
2. Ensure your browser supports modern JavaScript features
3. Try opening the browser's developer console for error messages

---

**Note**: This admin panel generates HTML code that matches the styling of your main portfolio website. The generated code uses the same CSS classes and structure as your existing content. 