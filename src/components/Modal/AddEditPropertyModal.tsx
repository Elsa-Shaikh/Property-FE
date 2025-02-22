/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { useFormik } from "formik";
import { IoClose } from "react-icons/io5";
import { z } from "zod";
import { PropertyRow } from "../../Utils/types";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addData, editData } from "../../Utils/helper";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  row?: PropertyRow | null;
  onSuccess: () => void;
}
const addPropertySchema = z.object({
  name: z
    .string()
    .min(1, "Property name is required")
    .min(3, "Property name must be at least 3 characters"),
  rent: z
    .number()
    .min(0, "Rent must be a positive number")
    .refine((val) => val >= 0, "Rent cannot be negative"),
  commission: z
    .number()
    .min(0, "Commission must be a positive number")
    .refine((val) => val >= 0, "Commission cannot be negative"),
});

type FormValues = z.infer<typeof addPropertySchema>;
const AddEditModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  type,
  row,
  onSuccess,
}) => {
  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: {
      name: row?.name || "",
      rent: row?.rent_per_month ?? 0,
      commission: row?.commission_percentage ?? 0,
    },
    validate: (values) => {
      try {
        addPropertySchema.parse(values);
      } catch (error) {
        const errors: Record<string, string | undefined> = {};
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            if (err.path.length) {
              const field = err.path[0] as keyof FormValues;
              errors[field] = err.message;
            }
          });
        }
        return errors;
      }
      return {};
    },
    onSubmit: async (values) => {
      try {
        if (type === "add") {
          const addValues = {
            name: values?.name,
            rent_per_month: values?.rent,
            commission_percentage: values?.commission,
          };
          const response = await addData("property", addValues);
          if (response) {
            formik.resetForm();
            toast.success(response?.message);
            onSuccess();
            onClose();
          } else {
            toast.error(response?.message);
          }
        }
        if (type === "edit") {
          const editValues = {
            name: values?.name,
            rent_per_month: values?.rent,
            commission_percentage: values?.commission,
          };
          const pId = row?.id ? row?.id : 0;
          const response = await editData("property", pId, editValues);
          if (response) {
            formik.resetForm();
            toast.success(response?.message);
            onSuccess();
            onClose();
          } else {
            toast.error(response?.message);
          }
        }
      } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(
          axiosError.response?.data?.message || "Failed to Edit Property!"
        );
      }
    },
  });

  useEffect(() => {
    if (!isOpen && type === "add") {
      formik.resetForm();
    }
  }, [isOpen]);
  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[400px]">
          <div className="flex justify-between items-center">
            <Typography variant="h6" className="font-bold text-gray-800">
              {type === "add" ? "Add" : "Edit"} Property
            </Typography>
            <IconButton
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              <IoClose size={20} />
            </IconButton>
          </div>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Property Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Property Name"
              />
              {formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="rent"
                className="block text-sm font-medium text-gray-700"
              >
                Property Rent
              </label>
              <input
                type="number"
                id="rent"
                name="rent"
                // onChange={formik.handleChange}
                onChange={(e) =>
                  formik.setFieldValue("rent", Number(e.target.value))
                }
                value={formik.values.rent}
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Property Rent"
              />
              {formik.errors.rent && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.rent}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="commission"
                className="block text-sm font-medium text-gray-700"
              >
                Property Commission
              </label>
              <input
                type="number"
                id="commission"
                name="commission"
                // onChange={formik.handleChange}
                onChange={(e) =>
                  formik.setFieldValue("commission", Number(e.target.value))
                }
                value={formik.values.commission}
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Property Commission"
              />
              {formik.errors.commission && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.commission}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {type === "add" ? "Add" : "Edit"}
            </button>
          </form>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default AddEditModal;
