import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useCreateTasMutation } from "../redux/taskApi";

const TaskAdd = ({ refetchTasks, onClose }) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const { userInfo } = useSelector((state) => state.auth);
  const [createTask] = useCreateTasMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      user: userInfo._id,
      date: new Date(),
      status: "",
      priority :""
    },
  });

  const onSubmit = async (data) => {
    const formattedDate = format(data.duedate, "MM/dd/yyyy");
    try {
      const response = await createTask({
        ...data,
        duedate: formattedDate,
      });
      if (response.data) {
        refetchTasks();
        toast(response.data.message);
        onClose();
        navigate("/tasklists");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "opps failed to add task.";
      toast.error(errorMessage);
    }
  };
  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg max-w-md mx-auto">
    <h2 className="text-2xl text-white font-semibold mb-4">Add New Task</h2>
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-white">User ID</label>
        <input
          type="text"
          {...register("user")}
          className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md"
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="block text-white">Title</label>
        <input
          type="text"
          {...register("title", { required: "Title is required.." })}
          placeholder="Enter task title.."
          className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md"
        />
        {errors.title && (
          <div className="text-red-500">{errors.title.message}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-white">Description</label>
        <textarea
          rows={3}
          type="text"
          {...register("desc", { required: "Description is required.." })}
          placeholder="Enter task desc.."
          className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md"
        />
        {errors.desc && (
          <div className="text-red-500">{errors.desc.message}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-white">Select Due date</label>
        <Controller
          name="duedate"
          control={control}
          defaultValue={startDate}
          rules={{ required: "Date is required" }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date) => {
                setStartDate(date);
                field.onChange(date);
              }}
              dateFormat="MM/dd/yyyy"
              className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md"
            />
          )}
        />
        {errors.duedate && (
          <div className="text-red-500">{errors.duedate.message}</div>
        )}
      </div>
  
      {/* Flexbox container for Status and Priority */}
      <div className="mb-4 flex space-x-4">
        {/* Status */}
        <div className="flex-1">
          <label className="block text-white">Status</label>
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md"
          >
            <option value="">Select Status</option>
            <option value="todo">To Do</option>
            <option value="done">Done</option>
            <option value="inprogress">In Progress</option>
          </select>
          {errors.status && (
            <div className="text-red-500">{errors.status.message}</div>
          )}
        </div>
  
        {/* Priority */}
        <div className="flex-1">
          <label className="block text-white">Priority</label>
          <select
            {...register("priority", { required: "Priority is required" })}
            className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md"
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <div className="text-red-500">{errors.priority.message}</div>
          )}
        </div>
      </div>
  
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-500 text-white px-4 py-2 rounded-md"
      >
        {isSubmitting ? "Adding task...." : "Add Task"}
      </button>
    </form>
  </div>
  
  );
};

export default TaskAdd;
