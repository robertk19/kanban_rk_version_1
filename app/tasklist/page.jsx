import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TableTasks from "@/components/Tables/TableTasks";

// import DefaultLayout from "@/components/Layouts/DefaultLaout";

const TablesPage = () => {
  return (
    <>
      {/* <DefaultLayout> */}
      <Navbar />
      <div className="flex flex-col gap-10 py-20 px-20">
        <TableTasks />
      </div>
      <Footer />

      {/* </DefaultLayout> */}
    </>
  );
};

export default TablesPage;
