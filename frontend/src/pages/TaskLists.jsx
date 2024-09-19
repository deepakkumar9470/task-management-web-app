import React, { useState } from "react";
import {
  useGetAllTasksQuery,
  useDeleteTaskByIdMutation,
} from "../redux/taskApi";
import { useSelector } from "react-redux";
import {
  CirclePlus,
  FileText,
  Hourglass,
  RefreshCcw,
  SquareCheckBig,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TaskAdd from "./TaskAdd";
import ModalContainer from "../components/ModalContainer";
import toast from "react-hot-toast";
import TaskEdit from "./TaskEdit";
import FilterTask from "../components/FilterTask";
import TableC from "../components/TableC";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import PriorityFilter from "../components/PriorityFilter";

const TaskLists = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("all");

  const { data, isLoading, isError, refetch } = useGetAllTasksQuery({
    userId: userInfo._id,
    status: filter ==="all" ? undefined :filter,   
    priority: priority==="all" ? undefined :priority,
    sortBy: "asc", 
  });
  const [deleteTask] = useDeleteTaskByIdMutation();
  const [openTaskAddModal, setOpenTaskAddModal] = useState(false);
  const [openTaskUpdateModal, setOpenTaskUpdateModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);


  const handleOpenModal = () => {
    setOpenTaskAddModal(true);
  };
  const handleOpenUpdateModal = (data) => {
    setTaskToUpdate(data);
    setOpenTaskUpdateModal(true);
  };
  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
  };
  const filteredTasks = data?.tasks?.filter((item) => {
    const statusMatch = filter === "all" || item.status === filter;
    const priorityMatch = priority === "all" || item.priority === priority;
    return statusMatch && priorityMatch;
  });
  
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-2xl text-center mt-60">
        Failed to load tasks!
      </div>
    );
  }
  const totalTasks = data?.tasks?.length || 0;

  const pendingTasks = filteredTasks.filter((task) => task.status === "todo").length || 0;
  const completedTasks = filteredTasks.filter((task) => task.status === "done").length || 0;
  const progressTasks = filteredTasks.filter((task) => task.status === "inprogress").length || 0;
  
  const handleTaskDelete = async (id) => {
    try {
      const response = await deleteTask(id);
      if (response?.data) {
        toast.success(response.data.message);
        refetch();
        navigate("/tasklists");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "opps failed to delete task.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="px-10 py-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 cursor-pointer rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Total Tasks</h2>
              <span className="text-3xl">
                <FileText />
              </span>
            </div>
            <p className="mt-4 text-5xl font-extrabold">{totalTasks}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 cursor-pointer rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Completed Tasks</h2>
              <span className="text-3xl">
                <SquareCheckBig />
              </span>
            </div>
            <p className="mt-4 text-5xl font-extrabold">{completedTasks}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-6 cursor-pointer rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Pending Tasks</h2>
              <span className="text-3xl">
                <Hourglass />
              </span>
            </div>
            <p className="mt-4 text-5xl font-extrabold">{pendingTasks}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 cursor-pointer rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Progress Tasks</h2>
              <span className="text-3xl">
                <RefreshCcw />
              </span>
            </div>
            <p className="mt-4 text-5xl font-extrabold">{progressTasks}</p>
          </motion.div>
        </div>

        {/* Filter & Priority section Task Section */}
          <div className="flex-col flex lg:flex-row justify-between">
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FilterTask
            filter={filter}
            filterTasks={data}
            handleFilterChange={handleFilterChange}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        <PriorityFilter priority={priority} handlePriorityChange={handlePriorityChange}/>
        </motion.div>
          </div>
        
        {/* Task List */}
        <TableC
          tasksList={filteredTasks || []}
          handleOpenUpdateModal={handleOpenUpdateModal}
          handleTaskDelete={handleTaskDelete}
        />
      </div>

      {/* Add Task Button */}
      <motion.button
        onClick={handleOpenModal}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-5 right-5 rounded-full w-16 h-16 flex items-center justify-center bg-green-600 text-white shadow-lg hover:bg-green-700 transition-transform transform"
      >
        <CirclePlus color="white" fontSize={45} />
      </motion.button>

      {/* Task Add Modal Container */}
      <ModalContainer
        showModal={openTaskAddModal}
        setShowModal={setOpenTaskAddModal}
      >
        <TaskAdd
          refetchTasks={refetch}
          onClose={() => setOpenTaskAddModal(false)}
        />
      </ModalContainer>

      {/* Task Update Modal Container */}
      <ModalContainer
        showModal={openTaskUpdateModal}
        setShowModal={setOpenTaskUpdateModal}
      >
        <TaskEdit
          task={taskToUpdate}
          onClose={() => setOpenTaskUpdateModal(false)}
        />
      </ModalContainer>
    </>
  );
};

export default TaskLists;
