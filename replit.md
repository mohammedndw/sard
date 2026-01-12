# Sard Cultural Center Website

## Overview
This is a static HTML/CSS/JavaScript website for Sard Cultural Center (مركز سرد الثقافي), the first private cultural center in Saudi Arabia. The website is in Arabic with RTL (right-to-left) layout.

## Project Structure
- `sard.html` - Main homepage
- `aboutus.html` - About us page
- `service.html` - Services page
- `Courses.html` - Courses overview
- `musical-courses.html`, `guitar-course.html` - Music course pages
- `booking.html` - Workshop and event booking
- `calendar.html` - Event calendar
- `cart.html` - Shopping cart
- `contactus.html` - Contact page
- `*.css` - Corresponding stylesheets for each page
- `calendar.js` - Calendar functionality
- `dropdown.js` - Dropdown menu functionality
- `imgsardculturalc/` - Image assets folder

## Running the Project
The website is served using a Python HTTP server on port 5000:
```bash
python server.py
```

## Deployment
This is a static website deployment. The server.py file handles:
- Serving static files
- Redirecting root URL to sard.html
- Disabling cache for development
