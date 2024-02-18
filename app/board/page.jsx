import Footer from "@/components/Footer";
import KanbanBoard from "@/components/KanbanBoard";
import Navbar from "@/components/Navbar";

// import DefaultLayout from "@/components/Layouts/DefaultLaout";

const KanbanPage = () => {
  return (
    <>
      {/* <DefaultLayout> */}
      <Navbar />
      {/* <Breadcrumb pageName="Tasks" /> */}
      <KanbanBoard />
      <Footer />

      {/* </DefaultLayout> */}
    </>
  );
};

export default KanbanPage;
