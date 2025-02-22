import { Modal, Box, Typography, IconButton, Stack } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { PropertyRow, Transaction } from "../../Utils/types";
import moment from "moment";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "Property" | "Transaction";
  row: PropertyRow | Transaction | null;
}

const ViewModal: React.FC<ModalProps> = ({ isOpen, onClose, type, row }) => {
  if (!row) return null;

  const isProperty = type === "Property";
  const isTransaction = type === "Transaction";

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <div className="flex justify-between items-center">
          <Typography variant="h6" className="font-semibold text-gray-800">
            View {isProperty ? "Property" : "Transaction"} Details
          </Typography>
          <IconButton onClick={onClose} className="hover:text-red-800">
            <IoClose size={20} />
          </IconButton>
        </div>

        {isProperty && (row as PropertyRow) && (
          <>
            <div className="h-36 mt-3 flex flex-col gap-2">
              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography className="text-gray-900 font-bold">
                  Property Name
                </Typography>
                <Typography className="text-gray-600">
                  {(row as PropertyRow).name}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography className="text-gray-900 font-bold">
                  Property Rent
                </Typography>
                <Typography className="text-gray-600">
                  {(row as PropertyRow).rent_per_month}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography className="text-gray-900 font-bold">
                  Property Commission (%)
                </Typography>
                <Typography className="text-gray-600">
                  {(row as PropertyRow).commission_percentage}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography className="text-gray-900 font-bold">
                  Created At
                </Typography>
                <Typography className="text-gray-600">
                  {moment((row as PropertyRow).created_at).format(
                    "ddd DD MMMM YYYY"
                  )}
                </Typography>
              </Stack>
            </div>
          </>
        )}

        {isTransaction && (row as Transaction) && (
          <>
            <div className="h-52 mt-3 flex flex-col gap-2">
              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography className="text-gray-900 font-bold">
                  Transaction Type
                </Typography>
                <Typography className="text-gray-600">
                  {(row as Transaction).type}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography className="text-gray-900 font-bold">
                  Transaction Amount
                </Typography>
                <Typography className="text-gray-600">
                  {(row as Transaction).amount}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography className="text-gray-900 font-bold">
                  Created At
                </Typography>
                <Typography className="text-gray-600">
                  {moment((row as Transaction).created_at).format(
                    "ddd DD MMMM YYYY"
                  )}
                </Typography>
              </Stack>
              <Stack direction="column" justifyContent="space-between">
                <Typography className="text-gray-900 font-bold">
                  Transaction Description
                </Typography>
                <Typography className="text-gray-600 indent-10">
                  {(row as Transaction).description}
                </Typography>
              </Stack>
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ViewModal;
