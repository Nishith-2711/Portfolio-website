# Adding Your LinkedIn Photo

## Instructions:

1. **Download your LinkedIn photo:**

   - Go to your LinkedIn profile
   - Right-click on your profile photo
   - Select "Save image as..." or "Copy image address"
   - Save it as `linkedin-photo.jpg` in this folder

2. **Update the Hero component:**

   - Open `src/components/Hero.jsx`
   - Uncomment the import line: `import linkedinPhoto from '../assets/images/linkedin-photo.jpg';`
   - Replace the `src` attribute in the img tag with `{linkedinPhoto}`

3. **Alternative - Use direct URL:**
   - Copy your LinkedIn photo URL
   - Replace the placeholder URL in the `src` attribute with your actual LinkedIn photo URL

## Current setup:

- The component is ready to display your photo
- It has a fallback to the emoji placeholder if the image fails to load
- The styling includes a professional circular frame with hover effects
- Mobile responsive design is included

## File formats supported:

- JPG, JPEG, PNG, WebP
- Recommended size: 400x400px or larger (square aspect ratio)

