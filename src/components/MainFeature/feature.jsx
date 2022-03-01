import RingFeature from "./ring";

const FeatureContent = ({ type, content }) => {
  // type can be `carousel`, `rings`, or `manyMarquee`
  switch (type) {
    case "carousel":
      return <pre>{JSON.stringify(content, null, 2)}</pre>;

    case "rings":
      return (
        <RingFeature
          list={content.stringList || content.clientsCollection.items}
          title={content.title}
        />
      );

    case "manyMarquee":
      return null;

    default:
      return null;
  }
};

export default FeatureContent;
