/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { IoAdd, IoEye, IoPencil, IoTrash } from "react-icons/io5";
import { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../Pagination/PaginationComponent";
import ConfirmModal from "../Modal/ConfirmModal";
import { deleteData, fetchData, monthlyReport } from "../../Utils/helper";
import { Transaction } from "../../Utils/types";
import AddEditModal from "../Modal/AddEditTransaction";
import ViewModal from "../Modal/ViewModal";
import SearchBar from "./SearchbarComponent";

export const TransactionTable = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const propertiesPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isView, setIsView] = useState(false);
  const [modalType, setModalType] = useState<string>("add");
  const [filteredProperties, setFilteredProperties] = useState<Transaction[]>(
    []
  );
  const [row, setRow] = useState<Transaction | null>(null);
  const loadProperties = async () => {
    try {
      const response = await fetchData(
        "transaction",
        currentPage,
        propertiesPerPage
      );
      setData(response.data);
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

  const handleView = (row: Transaction) => {
    setIsView(true);
    setRow(row);
  };

  const handleEdit = (row: Transaction) => {
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
        const response = await deleteData("transaction", row?.id);
        if (response) {
          toast.success(
            response.message || "Transaction deleted successfully!"
          );
          onSuccess();
          setIsModalOpen(false);
        } else {
          toast.error(response.message || "Failed to Delete transaction!");
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.log(axiosError);
      toast.error(
        axiosError.response?.data?.message || "Failed to Delete transaction!"
      );
    }
  };
  const handleMonthlyReport = async () => {
    try {
      const response = await monthlyReport();

      const blob = new Blob([response], { type: "text/csv" });

      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = "monthly-report.csv";
      link.click();
    } catch (error) {
      console.log(error);
      toast.error("Failed to Download Monthly Report!");
    }
  };
  const handleSearch = (query: string) => {
    const filtered = data.filter((transaction) =>
      transaction.type.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProperties(filtered);
  };
  console.log(filteredProperties);
  return (
    <>
    <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div className="mt-5">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex flex-row">
          <button
            onClick={handleMonthlyReport}
            className="mt-4 px-4 py-2 mr-2 bg-green-400 text-white rounded-[5px]  flex items-center cursor-pointer"
          >
            View Monthly Report
          </button>
        
          <button
            onClick={handleAdd}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
          >
            <IoAdd className="mr-2" /> Add Transaction
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left border-b font-bold text-gray-700">
                ID
              </th>

              <th className="py-3 px-6 text-left border-b font-bold text-gray-700">
                Transaction Type
              </th>
              <th className="py-3 px-6 text-left border-b font-bold text-gray-700">
                Transaction Amount
              </th>
              <th className="py-3 px-6 text-left border-b font-bold text-gray-700">
                Transaction Description
              </th>
              <th className="py-3 px-6 text-left border-b font-bold text-gray-700">
                Property Name
              </th>
              <th className="py-3 px-6 text-left border-b font-bold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-blue-500 hover:text-white"
              >
                <td className="py-3 px-6 border-b">{transaction.id}</td>
                <td className="py-3 px-6 border-b">{transaction.type}</td>
                <td className="py-3 px-6 border-b">{transaction.amount}</td>
                <td className="py-3 px-6 border-b">
                  {transaction.description}
                </td>
                <td className="py-3 px-6 border-b">
                  {transaction?.property?.name}
                </td>

                <td className="py-3 px-6 border-b">
                  <div className="flex flex-row gap-2">
                    <button className="text-gray-700 hover:text-gray-200 mr-2 cursor-pointer">
                      <IoEye
                        size={20}
                        onClick={() => handleView(transaction)}
                      />
                    </button>
                    <button className="text-green-700 hover:text-green-400 mr-2 cursor-pointer">
                      <IoPencil
                        size={20}
                        onClick={() => handleEdit(transaction)}
                      />
                    </button>
                    <button
                      className="text-red-700 hover:text-red-400 cursor-pointer"
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
        type="transaction"
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
        type="Transaction"
        row={row}
      />
      <ToastContainer />
    </>
  );
};
