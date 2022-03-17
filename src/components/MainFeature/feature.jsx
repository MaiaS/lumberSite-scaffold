import RingFeature from "./ring";
import MarqueeFeature from "./marquee";

import CarouselFeature from "./carousel";

const FeatureContent = ({ type, content }) => {
  // type can be `carousel`, `rings`, or `manyMarquee`
  switch (type) {
    case "carousel":
      return (
        <CarouselFeature
          title={content.title}
          description={content.description}
          list={content.clientsCollection.items}
        />
      );

    case "rings":
      return (
        <RingFeature
          list={content.stringList || content.clientsCollection.items}
          title={content.title}
        />
      );

    case "manyMarquee":
      return (
        <MarqueeFeature
          list={content.stringList || content.clientsCollection.items}
          title={content.title}
        />
      );

    default:
      return null;
  }
};

export default FeatureContent;
