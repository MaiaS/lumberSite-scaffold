// import MainFeature from "~/src/components/MainFeature";
// import ThreeWayGrid from "~/src/components/ThreeWayGrid";

import { queryPage } from "lib/contentful/graphql/queries/queryPage";
import MainFeature from "~/components/MainFeature";
import ThreeWayGrid from "~/components/ThreeWayGrid";

// import { queryPage } from "~/lib/contentful/graphql/queries/queryPage";

export async function getStaticProps() {
  const content = await queryPage("home");

  return {
    props: { content }, // will be passed to the page component as props
  };
}

const Home = ({ content }) => {
  return (
    <>
      {content.map((c) => {
        if (c.__typename === "ThreeWayGrid")
          return (
            <ThreeWayGrid
              key={c.sys.id}
              large={c.largeBox}
              smallCollection={c.smallBoxesCollection.items}
              position={c.position}
            />
          );
        if (c.__typename === "MainFeature")
          return <MainFeature key={c.sys.id} content={c} />;
      })}
    </>
  );
};

export default Home;
