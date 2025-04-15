import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, Modal, TextField, CircularProgress, Alert } from '@mui/material';
import Card from '@mui/material/Card';
import Mosaicstyles from '../styles/mosaicstyles.module.css';

export default function Homepage(props) {
  // State for modal visibility
  const [open, setOpen] = useState(false);
  // State for selected image
  const [image, setImage] = useState(null);
  // State for API response or error
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  // State for loading during API call
  const [loading, setLoading] = useState(false);

  // Handle modal open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImage(null);
    setResponse(null);
    setError(null);
  };

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setError(null);
    }
  };

  // Handle image upload to backend
  const handleUpload = async () => {
    if (!image) {
      setError('Please select an image to upload.');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await fetch('http://your-backend-url/api/scan-medicine/', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to scan medicine. Please try again.');
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Box border={0} sx={{ borderBottom: 0, mt: 7, width: '100%', display: 'flex', flexWrap: 'wrap' }}>
        <Box sx={{ mb: 2, ml: 5, mt: 2, width: '10%' }}></Box>
        <Box sx={{ mb: 2, ml: 5, mt: 2, width: '60%' }}>
          <Typography variant="h4">
            Welcome to your <span style={{ color: '#2027C5' }}>Dashboard</span>
          </Typography>
        </Box>
        <Box sx={{ mb: 2, ml: 5, mt: 2, width: '20%' }}>
          <Button
            sx={{
              backgroundColor: '#F1F3FF',
              color: 'black',
              border: '3px solid #2027C5',
              borderRadius: '25px',
              mt: 1,
              mr: 2,
            }}
            variant="contained"
            onClick={handleOpen}
          >
            Scan medicine
          </Button>
        </Box>
        <Box sx={{ mb: 2, ml: 5, mt: 2, width: '10%' }}></Box>
      </Box>

      {/* Modal for Image Upload */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Scan Medicine
          </Typography>

          {/* Image Upload Input */}
          <TextField
            type="file"
            inputProps={{ accept: 'image/*' }}
            onChange={handleImageChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          {/* Display selected image name */}
          {image && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              Selected: {image.name}
            </Typography>
          )}

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* API Response */}
          {response && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                <strong>Medicine:</strong> {response.medicine_name || 'N/A'}
              </Typography>
              <Typography variant="body1">
                <strong>Details:</strong> {response.details || 'No details available'}
              </Typography>
            </Box>
          )}

          {/* Upload Button with Loading State */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#5C6AFF',
              color: 'white',
              borderRadius: '10px',
            }}
            onClick={handleUpload}
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Upload and Scan'}
          </Button>
        </Box>
      </Modal>

      <Box border={0} sx={{ borderBottom: 0, mt: 6, width: '100%', display: 'flex', flexWrap: 'wrap' }}>
        <Box sx={{ mb: 2, ml: 5, width: '10%' }}></Box>
        <Box sx={{ mb: 2, ml: 5, width: '80%', display: 'flex', flexWrap: 'wrap' }}>
          <Card sx={{ color: '#2027C5', width: '20%', border: 3, borderRadius: '30px', mr: 5 }}>
            <Box sx={{ mt: 2, ml: 3 }}>
              <Typography variant="h5">Total medicines</Typography>
            </Box>
            <Box sx={{ mt: 5, ml: 3, mb: 2 }}>
              <Typography variant="h5">4230</Typography>
            </Box>
          </Card>

          <Card sx={{ color: '#2027C5', width: '20%', border: 3, borderRadius: '30px', mr: 5 }}>
            <Box sx={{ mt: 2, ml: 3 }}>
              <Typography variant="h5">Damaged stock</Typography>
            </Box>
            <Box sx={{ mt: 5, ml: 3, mb: 2 }}>
              <Typography variant="h5">23</Typography>
            </Box>
          </Card>

          <Card sx={{ color: '#2027C5', width: '20%', border: 3, borderRadius: '30px', mr: 5 }}>
            <Box sx={{ mt: 2, ml: 3 }}>
              <Typography variant="h5">Expiring soon</Typography>
            </Box>
            <Box sx={{ mt: 5, ml: 3, mb: 2 }}>
              <Typography variant="h5">1</Typography>
            </Box>
          </Card>

          <Card sx={{ color: '#2027C5', width: '20%', border: 3, borderRadius: '30px', mr: 5 }}>
            <Box sx={{ mt: 2, ml: 3 }}>
              <Typography variant="h5">Warnings</Typography>
            </Box>
            <Box sx={{ mt: 5, ml: 3, mb: 2 }}>
              <Typography variant="h5">0</Typography>
            </Box>
          </Card>
        </Box>
        <Box sx={{ mb: 2, ml: 5, width: '10%' }}></Box>
      </Box>

      <Box border={0} sx={{ borderBottom: 0, mt: 2, width: '100%', display: 'flex', flexWrap: 'wrap' }}>
        <Box sx={{ mb: 2, ml: 5, mt: 2, width: '10%' }}></Box>
        <Box border={0} sx={{ mb: 2, ml: 5, mt: 2, width: '60%' }}>
          <Box sx={{ mt: 8 }}>
            <Typography variant="h4">
              Recent <span style={{ color: '#2027C5' }}>Activity</span>
            </Typography>
          </Box>
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5">Aspirin</Typography>{' '}
            <Typography variant="h7" sx={{ color: '#637387' }}>
              +12 units, 12/2/2025
            </Typography>
          </Box>
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5">Loratadine</Typography>{' '}
            <Typography variant="h7" sx={{ color: '#637387' }}>
              -2 units, 8/2/2025
            </Typography>
          </Box>
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5">Acetaminophine</Typography>
            <Typography variant="h7" sx={{ color: '#637387' }}>
              -4 units, 12/2/2025
            </Typography>
          </Box>
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5">Ibuprofen</Typography>{' '}
            <Typography variant="h7" sx={{ color: '#637387' }}>
              Stock verification, 21/1/2025
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mb: 2, ml: 5, mt: 2, width: '20%' }}></Box>
        <Box sx={{ mb: 2, ml: 5, mt: 2, width: '10%' }}></Box>
      </Box>
    </div>
  );
}