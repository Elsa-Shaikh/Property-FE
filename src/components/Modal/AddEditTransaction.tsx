/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { useFormik } from "formik";
import { IoClose } from "react-icons/io5";
import { z } from "zod";
import { Transaction } from "../../Utils/types";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addData, editData, propertyList } from "../../Utils/helper";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  row?: Transaction | null;
  onSuccess: () => void;
}
const addSchema = z.object({
  pid: z.number().min(1, "Property name is required"),
  amount: z
    .number()
    .min(0, "Amount must be a positive number")
    .refine((val) => val >= 0, "Amount cannot be negative"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(5, "Description must be at least 5 characters"),
  transaction_type: z.string().min(1, "Type is required"),
});

type FormValues = z.infer<typeof addSchema>;
const AddEditModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  type,
  row,
  onSuccess,
}) => {
  const [properties, setProperties] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    if (isOpen) {
      const fetchProperties = async () => {
        try {
          const data = await propertyList("property");
          setProperties(data?.data);
        } catch (error) {
          console.log("error: ", error);
        }
      };
      fetchProperties();
    }
  }, [isOpen]);
  console.log(properties);
  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: {
      description: row?.description || "",
      amount: row?.amount ?? 0,
      transaction_type: row?.type || "",
      pid: row?.property_id || 0,
    },
    validate: (values) => {
      try {
        addSchema.parse(values);
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
            type: values?.transaction_type,
            amount: values?.amount,
            description: values?.description,
            property_id: values?.pid,
          };
          const response = await addData("transaction", addValues);
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
            type: values?.transaction_type,
            amount: values?.amount,
            description: values?.description,
            property_id: values?.pid,
          };
          const pId = row?.id ? row?.id : 0;
          const response = await editData("transaction", pId, editValues);
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
        console.log(axiosError);
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
              {type === "add" ? "Add" : "Edit"} Transaction
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
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Transaction Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                // onChange={formik.handleChange}
                onChange={(e) =>
                  formik.setFieldValue("amount", Number(e.target.value))
                }
                value={formik.values.amount}
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter transaction amount"
              />
              {formik.errors.amount && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.amount}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="transaction_type"
                className="block text-sm font-medium text-gray-700"
              >
                Transaction Type
              </label>
              <select
                id="transaction_type"
                name="transaction_type"
                onChange={formik.handleChange}
                value={formik.values.transaction_type}
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Type</option>
                <option value="DEBIT">DEBIT</option>
                <option value="CREDIT">CREDIT</option>
              </select>
              {formik.errors.transaction_type && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.transaction_type}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="pid"
                className="block text-sm font-medium text-gray-700"
              >
                Property Name
              </label>
              <select
                id="pid"
                name="pid"
                onChange={(e) =>
                  formik.setFieldValue("pid", Number(e.target.value))
                }
                value={formik.values.pid}
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Property</option>
                {properties?.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.name}
                  </option>
                ))}
              </select>
              {formik.errors.pid && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.pid}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                rows={4}
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Enter description"
              />
              {formik.errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
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
