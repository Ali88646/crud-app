import Wrapper from "@/components/Wrapper";

const page = () => {
  return (
    <main className="min-w-screen min-h-screen bg-neutral-500 flex items-center justify-center">
      <div className="w-full md:w-[65vw] h-full md:h-[80vh] bg-white border-2 border-black rounded-xl flex flex-col">
        <div className="p-3 border-b">
          <h2 className="text-4xl font-semibold text-center">
            User Management
          </h2>
        </div>
        <Wrapper />
      </div>
    </main>
  );
};

export default page;
