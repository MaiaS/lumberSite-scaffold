import MainFeature from "../src/components/MainFeature";
import ThreeWayGrid from "../src/components/ThreeWayGrid";
import { queryPage } from "../lib/contentful/graphql/queries/queryPage";

export async function getStaticProps() {
  const content = await queryPage("home");

  return {
    props: { content }, // will be passed to the page component as props
  };
}

const Home = ({ content }) => {
  console.log(content);
  return (
    <>
      {content.map((c) => {
        if (c.__typename === "ThreeWayGrid")
          return (
            <ThreeWayGrid
              large={c.largeBox}
              smallCollection={c.smallBoxesCollection.items}
            />
          );
        if (c.__typename === "MainFeature") return <MainFeature content={c} />;
      })}
    </>
  );
};

export default Home;
