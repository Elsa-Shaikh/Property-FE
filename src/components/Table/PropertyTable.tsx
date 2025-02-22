/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { IoAdd, IoEye, IoPencil, IoTrash } from "react-icons/io5";
import ConfirmModal from "../Modal/ConfirmModal";
import ViewModal from "../Modal/ViewModal";
import AddEditModal from "../Modal/AddEditPropertyModal";
import { PropertyRow } from "../../Utils/types";
import { deleteData, fetchData } from "../../Utils/helper";
import { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../Pagination/PaginationComponent";
import SearchBar from "./SearchbarComponent";

export const PropertyTable = () => {
  const [properties, setProperties] = useState<PropertyRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const propertiesPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isView, setIsView] = useState(false);
  const [modalType, setModalType] = useState<string>("add");
  const [filteredProperties, setFilteredProperties] = useState<PropertyRow[]>(
    []
  );
  const [row, setRow] = useState<PropertyRow | null>(null);
  const loadProperties = async () => {
    try {
      const response = await fetchData(
        "property",
        currentPage,
        propertiesPerPage
      );
      setProperties(response.data);
      setTotalPages(response.pagination.totalPage);
      setFilteredProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };
  useEffect(() => {
    loadProperties();
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleView = (row: PropertyRow) => {
    setIsView(true);
    setRow(row);
  };

  const handleEdit = (row: PropertyRow) => {
    setIsOpen(true);
    setModalType("edit");
    setRow(row);
  };
  const handleAdd = () => {
    setIsOpen(true);
    setModalType("add");
  };
  const onSuccess = async () => {
    loadProperties();
  };

  const handleDelete = async () => {
    try {
      if (row) {
        const response = await deleteData("property", row?.id);
        if (response) {
          toast.success(response.message || "Property deleted successfully!");
          onSuccess();
          setIsModalOpen(false);
        } else {
          toast.error(response.message || "Failed to Delete Property!");
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.log(axiosError);
      toast.error(
        axiosError.response?.data?.message || "Failed to Delete Property!"
      );
    }
  };
  const handleSearch = (query: string) => {
    const filtered = properties.filter((property) =>
      property.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProperties(filtered);
  };
  console.log(filteredProperties);
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="mt-5">
          <SearchBar onSearch={handleSearch} />
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
        >
          <IoAdd className="mr-2" /> Add Property
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left border-b font-bold text-gray-700">
                ID
              </th>
              <th className="py-3 px-6 text-left border-b font-bold text-gray-700">
                Property Name
              </th>
              <th className="py-3 px-6 text-left border-b font-bold text-gray-700">
                Rent Per Month
              </th>
              <th className="py-3 px-6 text-left border-b font-bold text-gray-700">
                Commission %
              </th>
              <th className="py-3 px-6 text-left border-b font-bold text-gray-700">
                No. of Transactions
              </th>
              <th className="py-3 px-6 text-left border-b font-bold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr
                key={property.id}
                className="hover:bg-blue-500 hover:text-white"
              >
                <td className="py-3 px-6 border-b">{property.id}</td>
                <td className="py-3 px-6 border-b">{property.name}</td>
                <td className="py-3 px-6 border-b">
                  {property.rent_per_month}
                </td>
                <td className="py-3 px-6 border-b">
                  {property.commission_percentage}
                </td>
                <td className="py-3 px-6 border-b">
                  {property.transactions?.length}
                </td>
                <td className="py-3 px-6 border-b">
                  <div className="flex flex-row gap-2">
                    <button
                      className="cursor-pointer text-gray-700 hover:text-gray-500"
                      onClick={() => handleView(property)}
                    >
                      <IoEye size={20} />
                    </button>
                    <button
                      className="text-green-600 hover:text-green-400 cursor-pointer"
                      onClick={() => handleEdit(property)}
                    >
                      <IoPencil size={20} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-400 cursor-pointer"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <IoTrash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="property"
        onDelete={handleDelete}
      />
      <AddEditModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type={modalType}
        row={row}
        onSuccess={onSuccess}
      />
      <ViewModal
        isOpen={isView}
        onClose={() => setIsView(false)}
        type="Property"
        row={row}
      />

      <ToastContainer />
    </>
  );
};
