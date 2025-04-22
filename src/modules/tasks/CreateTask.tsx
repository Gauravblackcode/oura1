import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { TaskPriority, TaskStatus, DaysOfWeek, CommonRecurrenceDetails, Frequency } from 'types';
import moment from 'moment';
import TasksService from '@/services/tasks/tasks.service';

interface FormValues {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  goalId?: string;
  isGeneratedByAime?: boolean;
  isRecurring?: boolean;
  recurrenceDetails?: {
    frequency?: Frequency;
    interval?: number;
    daysOfWeek?: DaysOfWeek[];
    endDate?: string;
    hour?: number;
    minute?: number;
  };
}

const CreateTaskSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required'),
  description: Yup.string()
    .optional(),
  dueDate: Yup.date()
    .optional(),
  priority: Yup.string()
    .oneOf(Object.values(TaskPriority))
    .optional(),
  status: Yup.string()
    .oneOf(Object.values(TaskStatus))
    .optional(),
  goalId: Yup.string()
    .optional(),
  isGeneratedByAime: Yup.boolean()
    .optional(),
  isRecurring: Yup.boolean()
    .optional(),
  recurrenceDetails: Yup.object().shape({
    frequency: Yup.string()
      .oneOf(Object.values(Frequency))
      .optional(),
    interval: Yup.number()
      .min(1)
      .optional(),
    daysOfWeek: Yup.array()
      .of(Yup.string().oneOf(Object.values(DaysOfWeek)))
      .optional(),
    endDate: Yup.date()
      .optional(),
    hour: Yup.number()
      .min(0)
      .max(23)
      .optional(),
    minute: Yup.number()
      .min(0)
      .max(59)
      .optional()
  }).optional()
});

const CreateTask = () => {
  const router = useRouter();
  const tasksService = new TasksService();

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await tasksService.createTask({
        ...values,
        dueDate: values.dueDate ? moment(values.dueDate).toISOString() : undefined,
        recurrenceDetails: values.isRecurring && values.recurrenceDetails ? {
          frequency: values.recurrenceDetails.frequency || Frequency.Daily,
          interval: values.recurrenceDetails.interval || 1,
          daysOfWeek: values.recurrenceDetails.daysOfWeek?.length ? values.recurrenceDetails.daysOfWeek[0] : undefined,
          endDate: values.recurrenceDetails.endDate,
          hour: values.recurrenceDetails.hour || 0,
          minute: values.recurrenceDetails.minute || 0
        } : undefined
      });

      if (response?.createTask?._id) {
        router.push(`/tasks/${response.createTask._id}`);
      }
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const initialValues: FormValues = {
    title: '',
    description: '',
    dueDate: moment().format('YYYY-MM-DD'),
    priority: TaskPriority.Medium,
    status: TaskStatus.Todo,
    isGeneratedByAime: false,
    isRecurring: false,
    recurrenceDetails: {
      frequency: Frequency.Daily,
      interval: 1,
      hour: 0,
      minute: 0
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-normal">Create New Task</h1>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={CreateTaskSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, values, setFieldValue }) => (
          <Form className="space-y-6">
            <div>
              <label className="block text-sm font-normal mb-2">Titleaa</label>
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md ${touched.title && errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {touched.title && errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-normal mb-2">Description</label>
              <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md ${touched.description && errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                rows={4}
              />
              {touched.description && errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-normal mb-2">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={values.dueDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 border rounded-md ${touched.dueDate && errors.dueDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {touched.dueDate && errors.dueDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-normal mb-2">Priority</label>
                <select
                  name="priority"
                  value={values.priority}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${touched.priority && errors.priority ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                  {Object.values(TaskPriority).map(priority => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
                {touched.priority && errors.priority && (
                  <p className="text-red-500 text-sm mt-1">{errors.priority}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-normal mb-2">Status</label>
              <select
                name="status"
                value={values.status}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${touched.status && errors.status ? 'border-red-500' : 'border-gray-300'
                  }`}
              >
                {Object.values(TaskStatus).map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {touched.status && errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status}</p>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isGeneratedByAime"
                  checked={values.isGeneratedByAime}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>Generated by AIME</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isRecurring"
                  checked={values.isRecurring}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>Is Recurring</label>
              </div>
            </div>

            {values.isRecurring && (
              <div className="space-y-4">
                <h3 className="text-lg font-normal">Recurrence Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal mb-2">Frequency</label>
                    <select
                      name="recurrenceDetails.frequency"
                      value={values.recurrenceDetails?.frequency}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      {Object.values(Frequency).map(freq => (
                        <option key={freq} value={freq}>
                          {freq}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-normal mb-2">Interval</label>
                    <input
                      type="number"
                      name="recurrenceDetails.interval"
                      value={values.recurrenceDetails?.interval}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-normal mb-2">Hour</label>
                    <input
                      type="number"
                      name="recurrenceDetails.hour"
                      value={values.recurrenceDetails?.hour}
                      onChange={handleChange}
                      min="0"
                      max="23"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-normal mb-2">Minute</label>
                    <input
                      type="number"
                      name="recurrenceDetails.minute"
                      value={values.recurrenceDetails?.minute}
                      onChange={handleChange}
                      min="0"
                      max="59"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-normal mb-2">End Date</label>
                    <input
                      type="date"
                      name="recurrenceDetails.endDate"
                      value={values.recurrenceDetails?.endDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-normal mb-2">Days of Week</label>
                    <div className="space-y-2">
                      {Object.values(DaysOfWeek).map(day => (
                        <div key={day} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={values.recurrenceDetails?.daysOfWeek?.includes(day)}
                            onChange={(e) => {
                              const currentDays = values.recurrenceDetails?.daysOfWeek || [];
                              const newDays = e.target.checked
                                ? [...currentDays, day]
                                : currentDays.filter(d => d !== day);
                              setFieldValue('recurrenceDetails.daysOfWeek', newDays);
                            }}
                            className="mr-2"
                          />
                          <label>{day}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/tasks')}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Task
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateTask;