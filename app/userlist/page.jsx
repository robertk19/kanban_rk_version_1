import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TableUsers from "@/components/Tables/TableUsers";

// import DefaultLayout from "@/components/Layouts/DefaultLaout";

const UsersPage = () => {
  return (
    <>
      {/* <DefaultLayout> */}
      <Navbar />
      <Breadcrumb pageName="Tables" />
      <div className="flex flex-col gap-10">
        <TableUsers />
      </div>
      <Footer />

      {/* </DefaultLayout> */}
    </>
  );
};

export default UsersPage;
