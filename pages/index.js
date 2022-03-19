import dynamic from "next/dynamic";
import { queryPage } from "lib/contentful/graphql/queries/queryPage";
import Layout from "~/components/Layout";
import GameStartProvider from "~/components/Context/GameStartContext";

const MainFeature = dynamic(() => import("~/components/MainFeature"));
const ThreeWayGrid = dynamic(() => import("~/components/ThreeWayGrid"));

export async function getStaticProps() {
  const content = await queryPage("home");

  return {
    props: { content }, // will be passed to the page component as props
  };
}

const Page = ({ content }) => {
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

Page.getLayout = function getLayout(page) {
  return (
    <GameStartProvider>
      <Layout>{page}</Layout>
    </GameStartProvider>
  );
};
export default Page;
