import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Button, Box, CircularProgress, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllDestinations, createDestination, updateDestination, deleteDestination as apiDeleteDestination } from '../../services/api';
import DestinationForm from '../../components/admin/DestinationForm'; // To be created

const AdminDestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null); // null for create, object for edit

  const fetchDestinations = () => {
    setLoading(true);
    getAllDestinations()
      .then(data => {
        setDestinations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching destinations:", err);
        setError('Failed to load destinations.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleFormSubmit = async (formData) => {
    setError(null);
    try {
      if (editingDestination && editingDestination.id) {
        await updateDestination(editingDestination.id, formData);
      } else {
        await createDestination(formData);
      }
      setShowForm(false);
      setEditingDestination(null);
      fetchDestinations(); // Refresh list
    } catch (err) {
      console.error("Error saving destination:", err);
      setError(err.response?.data?.message || 'Failed to save destination.');
    }
  };

  const handleAddNew = () => {
    setEditingDestination(null); // Clear any editing state
    setShowForm(true);
  };

  const handleEdit = (destination) => {
    setEditingDestination(destination);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      setError(null);
      try {
        await apiDeleteDestination(id);
        fetchDestinations(); // Refresh list
      } catch (err) {
        console.error("Error deleting destination:", err);
        setError(err.response?.data?.message || 'Failed to delete destination.');
      }
    }
  };

  if (loading && !showForm) { // Don't show main loader if form is active for quicker UI response
    return <Container sx={{ textAlign: 'center', py: 5 }}><CircularProgress /><Typography>Loading destinations...</Typography></Container>;
  }

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>Manage Destinations</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddNew}
        sx={{ mb: 2 }}
        disabled={showForm && !editingDestination} // Disable if create form is already open
      >
        Add New Destination
      </Button>

      {showForm && (
        <DestinationForm
          formTitle={editingDestination ? "Edit Destination" : "Create New Destination"}
          initialData={editingDestination}
          onSubmit={handleFormSubmit}
        />
      )}

      <Button onClick={() => setShowForm(false)} sx={{ mb: 2, display: showForm ? 'block' : 'none' }}>Cancel</Button>


      {!showForm && ( // Only show table if form is not visible
        loading ? <CircularProgress /> :
        destinations.length === 0 && !loading ? <Typography>No destinations found.</Typography> :
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell sx={{width: '40%'}}>Description (Excerpt)</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {destinations.map((dest) => (
                <TableRow key={dest.id}>
                  <TableCell>{dest.name}</TableCell>
                  <TableCell>{dest.location}</TableCell>
                  <TableCell>{dest.description ? dest.description.substring(0, 70) + '...' : ''}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(dest)} color="primary"><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDelete(dest.id)} color="error"><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminDestinationsPage;
