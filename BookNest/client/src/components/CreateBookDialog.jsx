import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select as MuiSelect,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import {  addBookThunk, fetchBooksThunk } from "../redux/bookSlice";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  author: yup.string().required("Author is required"),
  mrp: yup.number().required("Mrp is required"),
  sellPrice: yup.number().required("sellPrice is required"),
});

const CreateBookDialog = ({ open, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title:"",
      author:"",
      description:"",
      mrp:"",
      sellPrice:""
    },
  });

  const onSubmit = async (formData) => {
    try {
      // debugger;
      const res = await dispatch(addBookThunk(formData));

      if (res.payload.error) {
        enqueueSnackbar(res?.payload?.error, { variant: "error" });
      } else {
        enqueueSnackbar("Book added successfully", { variant: "success" });
      }
      await dispatch(fetchBooksThunk());
      handleClose();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        height: "90%",
        margin: "4rem 0 0 0",
      }}
    >
      <DialogTitle>Create New Book</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                margin="dense"
                variant="outlined"
                error={!!errors.title}
                helperText={errors.title ? errors.title.message : ""}
                className="mb-4"
              />
            )}
          />

          <Controller
            name="author"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Author Name"
                fullWidth
                margin="dense"
                variant="outlined"
                error={!!errors.author}
                helperText={errors.author ? errors.author.message : ""}
                className="mb-4"
              />
            )}
          />

<Controller
  name="description"
  control={control}
  render={({ field }) => (
    <TextField
      {...field}
      label="Description"
      fullWidth
      margin="dense"
      variant="outlined"
      error={!!errors.description}
      helperText={errors.description ? errors.description.message : ""}
      className="mb-4"
    />
  )}
/>


          <Controller
            name="mrp"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="MRP."
                type="number"
                fullWidth
                margin="dense"
                variant="outlined"
                error={!!errors.mrp}
                helperText={errors.mrp ? errors.mrp.message : ""}
                className="mb-4"
              />
            )}
          />


<Controller
            name="sellPrice"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Sell Price"
                type="number"
                fullWidth
                margin="dense"
                variant="outlined"
                error={!!errors.sellPrice}
                helperText={errors.sellPrice ? errors.sellPrice.message : ""}
                className="mb-4"
              />
            )}
          />

        
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            borderColor: "#673AB7",
            color: "#673AB7",
            "&:hover": { borderColor: "#673AB7", backgroundColor: "#EDE7F6" },
          }}
          color="primary"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          sx={{
            backgroundColor: "#673AB7",
            "&:hover": {
              backgroundColor: "#5e35b1",
            },
          }}
        >
          Create Book
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBookDialog;
