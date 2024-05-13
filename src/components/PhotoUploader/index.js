import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { postNewPhoto } from "../../services/PhotoService";
import { useDispatch } from "react-redux";
import { upLoadPhotoAction } from "../../actions/UpLoadPhoto";

function PhotoUploader() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false); // State để kiểm soát việc hiển thị form
    const [selectedFile, setSelectedFile] = useState(null); // State để lưu trữ file được chọn

    const handleUpload = () => {
        setOpen(true); // Mở form khi click vào nút
    };

    const handleClose = () => {
        setOpen(false); // Đóng form khi click vào nút đóng hoặc nút xác nhận
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); // Lưu trữ file được chọn vào state
    };

    const handleConfirmUpload = async () => {
        try {
            if (selectedFile) {
                const formData = new FormData();
                formData.append('img', selectedFile);
                // console.log(formData);

                const result = await postNewPhoto(formData);

                if (result.ok) {
                    alert("Upload photo successful")
                    dispatch(upLoadPhotoAction());
                    // console.log(upLoadPhoto);
                } else {
                    console.error('Failed to upload');
                }
            } else {
                console.error('No file selected');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        handleClose();
    };

    return (
        <>
            <Button color="inherit" onClick={handleUpload}>Upload Photo</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload Photo</DialogTitle>
                <DialogContent>
                    {/* Thêm input để chọn file */}
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    {/* Nút để xác nhận upload */}
                    <Button onClick={handleConfirmUpload} color="primary">Upload</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PhotoUploader;
