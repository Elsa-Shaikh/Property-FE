import { Modal, Box, Typography, Button } from "@mui/material";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  onDelete: () => void;
}

const ConfirmModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  type,
  onDelete,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <div className="flex justify-between items-center">
          <Typography variant="h6" className="font-bold text-gray-800">
            Confirm Delete
          </Typography>
        </div>
        <div className="h-10 mt-3 flex justify-center align-middle">
          {" "}
          <Typography className="text-gray-600">
            Are you sure you want to delete this {type}?
          </Typography>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outlined" onClick={onClose} size="small">
            Close
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
