// import React, { useEffect, useState } from "react";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import TablePagination from "@mui/material/TablePagination";
// import { useDispatch, useSelector } from "react-redux";
// import IconButton from "@mui/material/IconButton";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { deleteBookThunk, fetchBooksThunk } from "../redux/bookSlice";
// // import UpdateStockDialog from "../components/UpdateStockDialog";
// // import DeleteStockDialog from "../components/DeleteStockDialog";
// // import { fetchStocksThunk, deleteStockThunk } from "../redux/stockSlice";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const BookList = () => {
//   const dispatch = useDispatch();
//   const books = useSelector((state) => state?.book?.books);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [sortOrder, setSortOrder] = useState("low-to-high");

//   useEffect(() => {
//     dispatch(fetchBooksThunk(sortOrder));
//   }, [dispatch, sortOrder]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleClick = (event, book) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedBook(book);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleEdit = () => {
//     handleClose();
//     setDialogOpen(true);
//   };

//   const handleDeleteOpen = () => {
//     handleClose();
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (selectedBook) {
//       await dispatch(deleteBookThunk(selectedBook._id));
//       setDeleteDialogOpen(false);
//       setSelectedBook(null);
//     }
//   };

//   const handleSortChange = (event) => {
//     setSortOrder(event.target.value);
//   };

//   if (!books) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Book List</h2>

       
//       </div>

//       <Paper
//         sx={{
//           width: { xs:280, sm: 350, md: 500, lg: "100%"},
//           minHeight:{ xs:300, sm: 350, md: 500, lg: "100%" },
//         }}
//       >
//         <TableContainer>
//           <Table aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell>Title</StyledTableCell>
//                 <StyledTableCell align="center">Author</StyledTableCell>
//                 <StyledTableCell align="center">MRP</StyledTableCell>
//                 <StyledTableCell align="right">Sell Price</StyledTableCell>
//                 <StyledTableCell align="right">Action</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {books.length > 0 ? (
//                 books
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((book) => (
//                     <StyledTableRow key={book.symbol}>
//                       <StyledTableCell component="th" scope="row">
//                         {book.title}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {book.author}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {book.mrp}
//                       </StyledTableCell>
//                       <StyledTableCell align="right">
//                         {book.sellPrice}
//                       </StyledTableCell>
                     
//                       <StyledTableCell align="right">
//                         <IconButton
//                           aria-label="more"
//                           onClick={(event) => handleClick(event, book)}
//                         >
//                           <MoreVertIcon />
//                         </IconButton>
//                       </StyledTableCell>
//                     </StyledTableRow>
//                   ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     No Books found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={books.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//         >
//           <MenuItem onClick={handleEdit}>Edit</MenuItem>
//           <MenuItem onClick={handleDeleteOpen}>Delete</MenuItem>
//         </Menu>
//         {/* <UpdateBookDialog
//           open={dialogOpen}
//           handleClose={() => setDialogOpen(false)}
//           stockToEdit={selectedBook}
//         />
//         <DeleteBookDialog
//           open={deleteDialogOpen}
//           handleClose={() => setDeleteDialogOpen(false)}
//           handleConfirm={handleDeleteConfirm} */}
//         {/* /> */}
//       </Paper>
//     </div>
//   );
// };

// export default BookList;



// import React, { useEffect, useState } from "react";
// import { styled } from "@mui/material/styles";
// import { Card, CardContent, CardActions, Button, Typography, Grid, Box } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import IconButton from "@mui/material/IconButton";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { deleteBookThunk, fetchBooksThunk } from "../redux/bookSlice";

// // Styled component for Card shadow and hover effect
// const StyledCard = styled(Card)(({ theme }) => ({
//   maxWidth: 345,
//   transition: "transform 0.3s ease-in-out",
//   "&:hover": {
//     transform: "scale(1.05)",
//     boxShadow: theme.shadows[10],
//   },
// }));

// const BookList = () => {
//   const dispatch = useDispatch();
//   const books = useSelector((state) => state?.book?.books);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedBook, setSelectedBook] = useState(null);
  // const [dialogOpen, setDialogOpen] = useState(false);
  // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

//   useEffect(() => {
//     dispatch(fetchBooksThunk());
//   }, [dispatch]);

//   const handleClick = (event, book) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedBook(book);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleEdit = () => {
//     handleClose();
//     setDialogOpen(true);
//   };

//   const handleDeleteOpen = () => {
//     handleClose();
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (selectedBook) {
//       await dispatch(deleteBookThunk(selectedBook._id));
//       setDeleteDialogOpen(false);
//       setSelectedBook(null);
//     }
//   };

//   if (!books) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Book List</h2>
//       </div>

//       <Grid container spacing={3} justifyContent="center">
//         {books.length > 0 ? (
//           books.map((book) => (
//             <Grid item key={book._id} xs={12} sm={6} md={4} lg={3}>
//               <StyledCard>
//                 <CardContent>
//                   <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "#333" }}>
//                     {book.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ color: "#555" }}>
//                     Author: {book.author}
//                   </Typography>
//                   <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 2 }}>
//                     <Typography variant="body2" color="text.secondary" sx={{ color: "#777" }}>
//                       MRP: ₹{book.mrp}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ color: "#f50057", fontWeight: "bold" }}>
//                       Sell Price: ₹{book.sellPrice}
//                     </Typography>
//                   </Box>
//                 </CardContent>
//                 <CardActions>
//                   <IconButton aria-label="more" onClick={(event) => handleClick(event, book)}>
//                     <MoreVertIcon />
//                   </IconButton>
//                 </CardActions>
//               </StyledCard>
//             </Grid>
//           ))
//         ) : (
//           <div>No books found.</div>
//         )}
//       </Grid>

//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//         <MenuItem onClick={handleEdit}>Edit</MenuItem>
//         <MenuItem onClick={handleDeleteOpen}>Delete</MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default BookList;


// import React, { useEffect, useState } from "react";
// import { styled } from "@mui/material/styles";
// import { Card, CardContent, CardActions, Typography, Grid, Box } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";

// import { deleteBookThunk, fetchBooksThunk } from "../redux/bookSlice";
// import { FaTrashAlt } from "react-icons/fa";

// // Styled component for Card shadow and hover effect
// const StyledCard = styled(Card)(({ theme }) => ({
//   maxWidth: 345,
//   position: "relative", 
//   transition: "transform 0.3s ease-in-out",
//   "&:hover": {
//     transform: "scale(1.05)",
//     boxShadow: theme.shadows[10],
//   },
// }));

// const BookList = () => {
//   const dispatch = useDispatch();
//   const books = useSelector((state) => state?.book?.books);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

//   useEffect(() => {
//     dispatch(fetchBooksThunk());
//   }, [dispatch]);

//   const handleClick = (event, book) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedBook(book);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };


//   const handleDeleteOpen = () => {
//     handleClose();
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (selectedBook) {
//       await dispatch(deleteBookThunk(selectedBook._id));
//       setDeleteDialogOpen(false);
//       setSelectedBook(null);
//     }
//   };

//   if (!books) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Book List</h2>
//       </div>

//       <Grid container spacing={3} justifyContent="center">
//         {books.length > 0 ? (
//           books.map((book) => {
//             // Discount calculation
//             const discount = Math.round(((book.mrp - book.sellPrice) / book.mrp) * 100);

//             return (
//               <Grid item key={book._id} xs={12} sm={6} md={4} lg={3}>
//                 <StyledCard>
//                   {/* Delete Icon */}
//                   <div className="absolute top-2 right-2">
//                     <FaTrashAlt
//                       onClick={() => {
//                         setSelectedBook(book);
//                         setDeleteDialogOpen(true);
                        
//                       }}
//                       className="text-red-500 cursor-pointer"
//                     />
//                   </div>

//                   <CardContent>
//                     <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "#333" }}>
//                       {book.title}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ color: "#555" }}>
//                       Author: {book.author}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ color: "#555" }}>
//                       Description : {book.description}
//                     </Typography>
//                     <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 2 }}>
//                       <Typography variant="body2" color="text.secondary" sx={{ color: "#777", textDecoration: "line-through" }}>
//                         ₹{book.mrp}
//                       </Typography>
//                       <Box display="flex" alignItems="center">
//                         <Typography variant="body2" color="text.secondary" sx={{ color: "#f50057", fontWeight: "bold" }}>
//                           ₹{book.sellPrice}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary" sx={{ color: "#4caf50", marginLeft: 1 }}>
//                           ({discount}% OFF)
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </CardContent>
              
//                 </StyledCard>
//               </Grid>
//             );
//           })
//         ) : (
//           <div>No books found.</div>
//         )}
//       </Grid>

//     </div>
//   );
// };

// export default BookList;


import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Card, CardContent, CardActions, Typography, Grid, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookThunk, fetchBooksThunk } from "../redux/bookSlice";
import { FaTrashAlt } from "react-icons/fa";

// Styled component for Card shadow and hover effect
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  position: "relative", 
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[10],
  },
}));

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state?.book?.books);
  const [selectedBook, setSelectedBook] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);

  // Discount calculation
  const calculateDiscount = (mrp, sellPrice) => {
    return Math.round(((mrp - sellPrice) / mrp) * 100);
  };

  const handleDeleteOpen = (book) => {
    setSelectedBook(book);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedBook) {
      // Dispatch deleteBookThunk action to delete the book
      await dispatch(deleteBookThunk(selectedBook._id));
      setDeleteDialogOpen(false); // Close the dialog
      setSelectedBook(null); // Reset selected book
    }
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false); // Close the dialog without deleting
    setSelectedBook(null); // Reset selected book
  };

  if (!books) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Book List</h2>
      </div>

      <Grid container spacing={3} justifyContent="center">
        {books.length > 0 ? (
          books.map((book) => {
            const discount = calculateDiscount(book.mrp, book.sellPrice);
            return (
              <Grid item key={book._id} xs={12} sm={6} md={4} lg={3}>
                <StyledCard>
                  {/* Delete Icon */}
                  <div className="absolute top-2 right-2">
                    <FaTrashAlt
                      onClick={() => handleDeleteOpen(book)} // Open delete dialog
                      className="text-red-500 cursor-pointer"
                    />
                  </div>

                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "#333" }}>
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ color: "#555" }}>
                      Author: {book.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ color: "#555" }}>
                      Description : {book.description}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ color: "#777", textDecoration: "line-through" }}>
                        ₹{book.mrp}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Typography variant="body2" color="text.secondary" sx={{ color: "#f50057", fontWeight: "bold" }}>
                          ₹{book.sellPrice}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ color: "#4caf50", marginLeft: 1 }}>
                          ({discount}% OFF)
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
            );
          })
        ) : (
          <div>No books found.</div>
        )}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this book?</Typography>
        </DialogContent>
        <DialogActions>
          <button onClick={handleDeleteClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
          <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BookList;
