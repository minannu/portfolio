# Portfolio Admin Panel

Admin panel for managing portfolio content. Adds and edits content using the same HTML structure as the live site (sectioned publications, projects, teaching, gallery articles, etc.).

## Features

- **7 Content Types**: Publications, Experiences, Awards, Projects, Teaching/Service, Events, Gallery
- **Section-aware inserts**: Publications, projects, and teaching go into the correct page sections
- **Live Preview** and form validation
- **Auto-save** to website HTML files (with backups)
- **Edit / Delete** existing items
- **Gallery** URL or file upload support

## How to Use

1. From the `admin` folder: `npm install && npm start` (or run `start.bat`)
2. Open http://localhost:3001/admin
3. Choose **Add** or **Edit**, pick a content type, fill the form, submit

## Content Types

### Publications
- Section: Journal Papers / Under Review / Conference Papers
- Fields: title, status badge, venue, authors, description, tags, link

### Projects
- Section: Research Projects / Application Projects
- Fields: title, year/label, description, technologies, tags, link

### Teaching & Services
- Section: Teaching / Mentoring / Community Service
- Fields: title, dates, institution, description, tags, link

### Experiences / Awards / Events
- Same page containers as before; dates format as `Mon YYYY` (e.g. `Mar 2026`)

### Gallery
- Category badge + title + description + caption
- Generates `<article class="gallery-item">` with lightbox-ready images

## Required Website Structure

| File | Insert targets |
|------|----------------|
| `publications.html` | `#journal-papers`, `#under-review`, `#conference-papers` |
| `projects.html` | `#research-projects`, `#application-projects` |
| `teaching.html` | `#teaching`, `#mentoring`, `#community-service` |
| `gallery.html` | `.gallery-grid` → `article.gallery-item` |
| `experiences.html` | `.experiences-content` |
| `awards.html` | `.awards-content` |
| `index.html` | `.news-grid` |

## Tips

1. Always choose the correct **section** for publications, projects, and teaching
2. Prefer gallery image paths like `public/gallery/your-image.png`
3. Refresh the website after saving to see updates
4. Keep this `admin/` folder local — do not deploy it publicly

## Security Note

This admin panel is for local use only. It has no authentication.
