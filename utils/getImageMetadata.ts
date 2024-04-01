import cloudinary from "cloudinary";

export default async function getImageMetadata(publicId) {
  try {
    const resource = await cloudinary.v2.api.resource(publicId, {
      image_metadata: true,
      context: true,
    });
    return resource;
  } catch (error) {
    console.error("Error fetching image metadata:", error);
    return null;
  }
}
