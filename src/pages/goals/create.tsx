import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import GoalsService from '@/services/goals/goals.service';
import { isDateRangeAllowed } from '@/common/helpers';
import { useRouter } from 'next/router';
import { GoalStatus, Frequency, CreateGoalDto as ApiCreateGoalDto, CommonRecurrenceDetails } from 'types';
import moment from 'moment';

interface RecurrenceDetailsDto extends CommonRecurrenceDetails {
  frequency: Frequency;
  interval: number;
  endDate: string;
  minute: number;
  hour: number;
}

interface FormValues extends Omit<ApiCreateGoalDto, 'recurrenceDetails'> {
  recurrenceDetails: RecurrenceDetailsDto;
}

const CreateGoalSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title is too short')
    .max(256, 'Title cannot exceed 256 characters')
    .required('Title is required'),
  description: Yup.string()
    .max(1000, 'Description cannot exceed 1000 characters'),
  startDate: Yup.date()
    .required('Start date is required'),
  endDate: Yup.date()
    .required('End date is required')
    .test('date-range', 'Date range cannot exceed 365 days', function(value) {
      const { startDate } = this.parent;
      if (startDate && value) {
        return isDateRangeAllowed({
          startDate: moment(startDate),
          endDate: moment(value),
          maxAllowedRange: 365
        });
      }
      return true;
    }),
  isGeneratedByAime: Yup.boolean(),
  isRecurring: Yup.boolean(),
  status: Yup.string().oneOf(Object.values(GoalStatus)),
  tagIds: Yup.array().of(Yup.string()),
  taskIds: Yup.array().of(Yup.string()),
  recurrenceDetails: Yup.object().shape({
    frequency: Yup.string()
      .oneOf(Object.values(Frequency), 'Invalid frequency')
      .required('Frequency is required'),
    interval: Yup.number()
      .min(1, 'Interval must be at least 1')
      .required('Interval is required'),
    endDate: Yup.date()
      .required('End date is required'),
    minute: Yup.number()
      .min(0, 'Minute must be between 0 and 59')
      .max(59, 'Minute must be between 0 and 59')
      .required('Minute is required'),
    hour: Yup.number()
      .min(0, 'Hour must be between 0 and 23')
      .max(23, 'Hour must be between 0 and 23')
      .required('Hour is required')
  })
});

const CreateGoal = () => {
  const router = useRouter();
  const goalsService = new GoalsService();

  const handleSubmit = async (values: FormValues) => {
    try {
      const createGoalDto: ApiCreateGoalDto = {
        ...values,
        recurrenceDetails: values.isRecurring ? values.recurrenceDetails : undefined
      };

      const response = await goalsService.createGoal({
        createGoalDto
      });

      if (response?.createGoal?._id) {
        router.push(`/goals/${response.createGoal._id}`);
      }
    } catch (error) {
      console.error('Failed to create goal:', error);
    }
  };

  const initialValues: FormValues = {
    title: '',
    description: '',
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().add(1, 'day').format('YYYY-MM-DD'),
    isGeneratedByAime: false,
    isRecurring: false,
    status: GoalStatus.Todo,
    tagIds: [],
    taskIds: [],
    recurrenceDetails: {
      frequency: Frequency.Daily,
      interval: 1,
      endDate: moment().add(1, 'month').format('YYYY-MM-DD'),
      minute: 0,
      hour: 0
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-normal">Create New Goal</h1>
      </div>
      
      <Formik
        initialValues={initialValues}
        validationSchema={CreateGoalSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, values, setFieldValue }) => (
          <Form className="space-y-6">
            <div>
              <label className="block text-sm font-normal mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={values.title || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md ${
                  touched.title && errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {touched.title && errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title as string}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-normal mb-2">Description</label>
              <textarea
                name="description"
                value={values.description || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md ${
                  touched.description && errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={4}
              />
              {touched.description && errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description as string}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-normal mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={values.startDate || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 border rounded-md ${
                    touched.startDate && errors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {touched.startDate && errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.startDate as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-normal mb-2">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={values.endDate || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 border rounded-md ${
                    touched.endDate && errors.endDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {touched.endDate && errors.endDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.endDate as string}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isGeneratedByAime"
                  checked={values.isGeneratedByAime || false}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>Generated by AIME</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isRecurring"
                  checked={values.isRecurring || false}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>Recurring Goal</label>
              </div>
            </div>

            {values.isRecurring && (
              <div className="space-y-4">
                <h3 className="text-lg font-normal">Recurrence Details</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-normal mb-2">Frequency</label>
                    <select
                      name="recurrenceDetails.frequency"
                      value={values.recurrenceDetails.frequency || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Frequency</option>
                      {Object.values(Frequency).map(freq => (
                        <option key={freq} value={freq}>
                          {freq}
                        </option>
                      ))}
                    </select>
                    {touched.recurrenceDetails?.frequency && errors.recurrenceDetails?.frequency && (
                      <p className="text-red-500 text-sm mt-1">{errors.recurrenceDetails.frequency as string}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-normal mb-2">Interval</label>
                    <input
                      type="number"
                      name="recurrenceDetails.interval"
                      value={values.recurrenceDetails.interval || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {touched.recurrenceDetails?.interval && errors.recurrenceDetails?.interval && (
                      <p className="text-red-500 text-sm mt-1">{errors.recurrenceDetails.interval as string}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-normal mb-2">End Date</label>
                    <input
                      type="date"
                      name="recurrenceDetails.endDate"
                      value={values.recurrenceDetails.endDate || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {touched.recurrenceDetails?.endDate && errors.recurrenceDetails?.endDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.recurrenceDetails.endDate as string}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-normal mb-2">Minute</label>
                    <input
                      type="number"
                      name="recurrenceDetails.minute"
                      value={values.recurrenceDetails.minute || ''}
                      onChange={handleChange}
                      min="0"
                      max="59"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {touched.recurrenceDetails?.minute && errors.recurrenceDetails?.minute && (
                      <p className="text-red-500 text-sm mt-1">{errors.recurrenceDetails.minute as string}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-normal mb-2">Hour</label>
                    <input
                      type="number"
                      name="recurrenceDetails.hour"
                      value={values.recurrenceDetails.hour || ''}
                      onChange={handleChange}
                      min="0"
                      max="23"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {touched.recurrenceDetails?.hour && errors.recurrenceDetails?.hour && (
                      <p className="text-red-500 text-sm mt-1">{errors.recurrenceDetails.hour as string}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-normal mb-2">Status</label>
              <select
                name="status"
                value={values.status || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {Object.values(GoalStatus).map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {touched.status && errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status as string}</p>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/goals')}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Goal
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateGoal;
