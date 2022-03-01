/** @jsxImportSource theme-ui */
import Image from "next/image";
import { Box } from "theme-ui";

/**
 * @image a mapped Contentful Asset, see ./cms/utils/mappers/image.js
 * @quality a value that can be used to override the default image quality of 75
 */
const ResponsiveImage = ({
  image,
  quality = 50,
  objectPosition,
  heightOut,
  widthOut,
  forwardSx = {},
}) => {
  const { url, title, width, height } = image;
  return (
    <Box sx={{ width: "100%", ...forwardSx }}>
      <Image
        alt={title}
        src={`${url}?fm=webp`}
        objectFit="cover"
        objectPosition={objectPosition}
        blurDataURL={`${url}?fm=webp`}
        // placeholder="blur"
        layout={
          !height && !width && !heightOut && !widthOut ? "fill" : "responsive"
        }
        width={widthOut ?? width}
        height={heightOut ?? height}
        quality={quality}
      />
    </Box>
  );
};

export default ResponsiveImage;
