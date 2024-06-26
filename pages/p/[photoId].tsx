import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Carousel from "../../components/Carousel";
import getResults from "../../utils/cachedImages";
import cloudinary from "../../utils/cloudinary";
import getBase64ImageUrl from "../../utils/generateBlurPlaceholder";
import getImageMetadata from "../../utils/getImageMetadata";
import type { ImageProps } from "../../utils/types";

const Home: NextPage = ({ currentPhoto }: { currentPhoto: ImageProps }) => {
  const router = useRouter();
  const { photoId } = router.query;
  let index = Number(photoId);

  const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`;

  console.log(currentPhoto);

  return (
    <>
      <Head>
        <title>Darian's Photos</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const { photoId } = context.params;
  const results = await getResults();

  const currentPhotoMetadata = await getImageMetadata(
    results.resources[Number(photoId)].public_id
  );

  const blurDataUrl = await getBase64ImageUrl(currentPhotoMetadata);

  const currentPhoto: ImageProps = {
    id: Number(photoId),
    height: currentPhotoMetadata.height,
    width: currentPhotoMetadata.width,
    public_id: currentPhotoMetadata.public_id,
    format: currentPhotoMetadata.format,
    blurDataUrl: blurDataUrl,
    // Extracting custom metadata
    tags: currentPhotoMetadata.tags ?? null,
    caption: currentPhotoMetadata.context?.custom?.caption ?? null,
    location: currentPhotoMetadata.context?.custom?.location ?? null,
    year: currentPhotoMetadata.context?.custom?.year ?? null,
  };

  return {
    props: {
      currentPhoto,
    },
  };
};

export async function getStaticPaths() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();

  let fullPaths = [];
  for (let i = 0; i < results.resources.length; i++) {
    fullPaths.push({ params: { photoId: i.toString() } });
  }

  return {
    paths: fullPaths,
    fallback: false,
  };
}
