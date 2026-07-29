import {
  useNavigate,
} from "react-router-dom";

import toast, {
  Toaster,
} from "react-hot-toast";

import HostelForm from "../../components/HostelForm";

import {
  createHostel,
} from "../../services/hostelService";

function CreateHostel() {

  const navigate = useNavigate();

  const handleCreateHostel =
    async (formData) => {

      try {

        await createHostel(formData);

        toast.success(
          "Hostel created successfully"
        );

        setTimeout(() => {

          navigate(
            "/landlord/hostels"
          );

        }, 1500);

      } catch (error) {

        console.error(error);

        toast.error(
          error?.response?.data?.message ||
          "Failed to create hostel"
        );
      }
    };

  return (

    <div className="min-h-screen bg-[#020617] text-white px-8 py-20">

      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto">

        <div className="mb-14">

          <h1 className="text-5xl font-black">

            Create Hostel

          </h1>

          <p className="text-slate-400 mt-4 text-lg">

            Add a new hostel property.

          </p>

        </div>

        <HostelForm
          onCreate={handleCreateHostel}
        />

      </div>

    </div>
  );
}

export default CreateHostel;