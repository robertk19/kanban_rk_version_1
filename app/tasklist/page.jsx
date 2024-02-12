import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TableOne from "@/components/Tables/TableOne";
import TableTasks from "@/components/Tables/TableTasks";

// import DefaultLayout from "@/components/Layouts/DefaultLaout";

const TablesPage = () => {
  return (
    <>
      {/* <DefaultLayout> */}
      <Navbar />
      <Breadcrumb pageName="Tasks" />
      <div className="flex flex-col gap-10">
        <TableTasks />
      </div>
      <Footer />

      {/* </DefaultLayout> */}
    </>
  );
};

export default TablesPage;
