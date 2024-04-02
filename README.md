# 📸 My Photo Gallery

I'm an amateur amateur photographer (aka someone that owns a camera but doesn't know how to use it). I love traveling, camping, hiking, biking, and solo road trips and like most people, have amassed a number of photos I'm not sure what to do with. So, naturally, why not make a website?

https://www.darian.photos/

## Credit

I used this cool [Image Gallery Starter](https://vercel.com/templates/next.js/image-gallery-starter) template. It took less than an hour to do the initial setup. I've added some customizations outlined below.

## Development

### Cloudinary setup

Setup a [Cloudinary](https://cloudinary.com) account and upload your photos to a folder.

Create a `.env` file with your environment variables from Cloudinary:

```json
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=XXXX
CLOUDINARY_API_KEY=XXXX
CLOUDINARY_API_SECRET=XXXX
CLOUDINARY_FOLDER=XXXX
```

#### Metadata

The following Contextual metadata fields from Cloudinary will populate on the front-end:

- The `Title (Caption)` field - shown on hover with the `Caption` component
- Custom Key/Value pairs:
  - `location` - shown on hover with the `Location` component
  - `year` - shown on hover with the `Year` component (hidden by default)

### Content

I've implemented a `data/siteData.js` file so most content including on-page content and metadata can be modified from there.

### Getting Started

```bash
npm i
```

```bash
npm run dev
```

## ToDo

- [x] Update custom button / styles
- [x] Add caption / metadata to modal
- [x] Image optimization
- [x] Tag images
- [x] Implement sorting
- [x] Move page metadata content to `siteData`
