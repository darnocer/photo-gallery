# My Photo Gallery

I'm an amateur amateur photographer also known as a person that owns a camera and a phone with a camera. I love traveling and being in nature and have collected a number of photos in recent years. I'm not sure what else to do with the photos, so why not make a website?

https://www.darian.photos/

## Credit

I used this cool [Image Gallery Starter](https://vercel.com/templates/next.js/image-gallery-starter) template. It took less than an hour to setup.

## Usage

Create a `.env` file with your environment variables

```json
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=XXXX
CLOUDINARY_API_KEY=XXXX
CLOUDINARY_API_SECRET=XXXX
CLOUDINARY_FOLDER=XXXX
```

I've implemented a `data/siteData.js` file so most content including on-page content and metadata can be modified from there.

## ToDo

- [x] Add more photos
- [x] Font/styling
- [x] Image optimization
- [x] Image caption/location component
- [x] Image sorting
