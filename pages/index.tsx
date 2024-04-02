import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import Logo from "../components/Icons/Logo";
import Badge from "../components/Badge";
import Location from "../components/Location";

import Modal from "../components/Modal";
import cloudinary from "../utils/cloudinary";
import getImageMetadata from "../utils/getImageMetadata";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";

import siteData from "../data/siteData";

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Head>
        <title>{siteData.title}</title>
        <meta property="og:image" content="../public/og-image.png" />
        <meta name="twitter:image" content="../public/og-image.png" />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )}
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="after:content relative mb-5 flex h-[540px] flex-col items-center justify-center gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            <Logo />
            <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
              {siteData.content.heading}
            </h1>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
              {siteData.content.description}
            </p>
            <a
              className="pointer z-10 mt-6 rounded-md border border-black bg-white px-3 py-2 text-xs font-semibold uppercase text-black transition hover:bg-white/10 hover:text-white md:mt-4"
              href={siteData.content.button.link}
              target="_blank"
              rel="noreferrer"
            >
              {siteData.content.button.text}
            </a>
          </div>
          {images.map(
            ({
              id,
              public_id,
              format,
              blurDataUrl,
              year,
              caption,
              location,
            }) => (
              <Link
                key={id}
                href={`/?photoId=${id}`}
                as={`/p/${id}`}
                ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                shallow
                className="after:content group relative mb-5 block w-full cursor-zoom-in overflow-hidden rounded-lg after:pointer-events-none after:absolute after:inset-0 after:shadow-highlight"
              >
                <Image
                  alt="Image description"
                  className="transform rounded-lg brightness-90 transition duration-300 ease-in-out group-hover:brightness-110"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                  width={720}
                  height={480}
                  layout="responsive"
                />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                  {year ? <Badge text={year} /> : null}
                  {location ? <Location text={location} /> : null}
                </div>
                {caption && (
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/70 p-2 text-sm text-white transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                    <p>{caption}</p>
                  </div>
                )}
              </Link>
            )
          )}
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        <p className="text-xs">{siteData.content.footer.content}</p>
      </footer>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();

  const metadataPromises = results.resources.map((image) =>
    getImageMetadata(image.public_id)
  );
  const metadataResults = await Promise.all(metadataPromises);

  let reducedResults = results.resources.map((result, index) => {
    const metadata = metadataResults[index];
    const tags = metadata?.tags || [];
    const caption = metadata?.context?.custom?.caption || null;
    const location = metadata?.context?.custom?.location || null;
    const year = metadata?.context?.custom?.year || null;

    return {
      id: index,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
      blurDataUrl: null,
      tags,
      caption,
      location,
      year,
    };
  });

  const blurImagePromises = reducedResults.map((image) =>
    getBase64ImageUrl(image)
  );
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  reducedResults = reducedResults.map((image, index) => ({
    ...image,
    blurDataUrl: imagesWithBlurDataUrls[index],
  }));

  return {
    props: {
      images: reducedResults,
    },
  };
}
