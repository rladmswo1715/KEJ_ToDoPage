import InnerLayout from "@/components/layout/InnerLayout";
import BoardSection from "@/components/page/main/BoardSection";

const Home = () => {
  return (
    <InnerLayout className="mt-10 overflow-x-auto">
      <BoardSection />
    </InnerLayout>
  );
};

export default Home;
