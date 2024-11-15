import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PieChart from "../components/PieChart";
import moment from "moment";
import { fetchBooksThunk } from "../redux/bookSlice";

const DashboardCard = ({ title, value }) => {
  return (
    <div className="relative bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg rounded-xl p-6 flex-1 m-2 text-white min-w-[200px] max-w-[300px]">
      <div className="absolute w-32 h-32 rounded-full bg-white opacity-20 animate-spin-slow top-2/4 left-0 transform -translate-y-2/4"></div>
      <div className="absolute w-56 h-56 rounded-full bg-white opacity-10 animate-spin-slow right-0 bottom-0"></div>

      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-4xl font-bold mt-4">{value}</p>
    </div>
  );
};

const calculateBooksCreatedPerMonth = (books) => {
  if (!Array.isArray(books)) {
    return []; // Return an empty array if books is not an array
  }

  const booksCreatedPerMonth = Array(12).fill(0);

  books.forEach((book) => {
    const createdAt = moment(book.createdAt);
    const month = createdAt.month();

    if (createdAt.isAfter(moment().subtract(12, "months"))) {
      booksCreatedPerMonth[month]++;
    }
  });

  return booksCreatedPerMonth;
};

const Dashboard = () => {
  const books = useSelector((state) => state?.book?.books || []); 
  const dispatch = useDispatch();

  const fetchBooks = async () => {
    await dispatch(fetchBooksThunk("low to high"));
  };

  useEffect(() => {
    fetchBooks();
  }, [dispatch]);

  const totalBooks = books.length || 0;

  const booksCreatedPerMonth = calculateBooksCreatedPerMonth(books);

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap justify-center">
        <DashboardCard title="Total Books" value={totalBooks} />
      
      </div>
      <div className="w-full md:p-4 md:mt-6 mt-2">
        <PieChart series={booksCreatedPerMonth} />
      </div>
    </div>
  );
};

export default Dashboard;
