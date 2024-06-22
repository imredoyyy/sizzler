import EditUser from "./EditUser";

const EditUserPage = async () => {
  return (
    <>
      <div className="w-full py-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 md:gap-12 md:px-8">
          <EditUser />
        </div>
      </div>
    </>
  );
};

export default EditUserPage;
