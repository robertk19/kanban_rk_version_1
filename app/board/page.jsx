import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Footer from "@/components/Footer";
import KanbanBoard from "@/components/KanbanBoard";
import Navbar from "@/components/Navbar";
import TableOne from "@/components/Tables/TableOne";
import TableTasks from "@/components/Tables/TableTasks";

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
