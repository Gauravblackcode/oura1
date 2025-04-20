import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import NotesService from '@/services/notes/notes.service';
import Navigation from '@/components/navigation/Navigation';
import useSWR from 'swr';
import GoalsService from '@/services/goals/goals.service';
import TasksService from '@/services/tasks/tasks.service';
import { DefaultPagination, DefaultSort } from '@/common/helpers';
import { EventService } from '@/services/event/event.service';

interface FormValues {
  title: string;
  content?: string;
  goalId: string;
  isGeneratedByAime?: boolean;
  taskIds?: string[];
  eventIds?: string[];
  tagIds?: string[];
}

const CreateNoteSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string(),
  goalId: Yup.string().required('Goal ID is required'),
  isGeneratedByAime: Yup.boolean(),
  taskIds: Yup.array().of(Yup.string()),
  eventIds: Yup.array().of(Yup.string()),
  tagIds: Yup.array().of(Yup.string())
});

const CreateNote = () => {
  const router = useRouter();
  const notesService = new NotesService();
  const goalsService = new GoalsService();
  const tasksService = new TasksService();
  const eventsService = new EventService();

  // Fetch goals for the selector
  const { data: goalsData } = useSWR('goals', () => 
    goalsService.getGoals({
      pagination: DefaultPagination,
      sort: DefaultSort
    })
  );

  // Fetch tasks for the selector
  const { data: tasksData } = useSWR('tasks', () => 
    tasksService.getTasks({
      pagination: DefaultPagination,
      sort: DefaultSort
    })
  );

  // Fetch events for the selector
  const { data: eventsData } = useSWR('events', () => 
    eventsService.getEvents({
      pagination: DefaultPagination,
      sort: DefaultSort
    })
  );

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await notesService.createNote({
        createNoteDto: {
          title: values.title,
          content: values.content,
          goalId: values.goalId,
          isGeneratedByAime: values.isGeneratedByAime,
          taskIds: values.taskIds,
          eventIds: values.eventIds,
          tagIds: values.tagIds
        }
      });

      if (response?.createNote?._id) {
        router.push(`/notes/${response.createNote._id}`);
      }
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const initialValues: FormValues = {
    title: '',
    content: '',
    goalId: '',
    isGeneratedByAime: false,
    taskIds: [],
    eventIds: [],
    tagIds: []
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* <Navigation /> */}
      
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-semibold mb-6">Create New Note</h1>
            
            <Formik
              initialValues={initialValues}
              validationSchema={CreateNoteSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, handleChange, handleBlur, values, setFieldValue }) => (
                <Form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2 border rounded-md ${
                        touched.title && errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {touched.title && errors.title && (
                      <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Associated Goal ID
                    </label>
                    <input
                      type="text"
                      name="goalId"
                      value={values.goalId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2 border rounded-md ${
                        touched.goalId && errors.goalId ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {touched.goalId && errors.goalId && (
                      <div className="text-red-500 text-sm mt-1">{errors.goalId}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content
                    </label>
                    <textarea
                      name="content"
                      value={values.content}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={8}
                      className={`w-full px-3 py-2 border rounded-md ${
                        touched.content && errors.content ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {touched.content && errors.content && (
                      <div className="text-red-500 text-sm mt-1">{errors.content}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Associated Task IDs (comma separated)
                    </label>
                    <input
                      type="text"
                      name="taskIds"
                      value={values.taskIds?.join(',')}
                      onChange={(e) => {
                        const ids = e.target.value.split(',').map(id => id.trim()).filter(Boolean);
                        setFieldValue('taskIds', ids);
                      }}
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2 border rounded-md ${
                        touched.taskIds && errors.taskIds ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Associated Event IDs (comma separated)
                    </label>
                    <input
                      type="text"
                      name="eventIds"
                      value={values.eventIds?.join(',')}
                      onChange={(e) => {
                        const ids = e.target.value.split(',').map(id => id.trim()).filter(Boolean);
                        setFieldValue('eventIds', ids);
                      }}
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2 border rounded-md ${
                        touched.eventIds && errors.eventIds ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isGeneratedByAime"
                        checked={values.isGeneratedByAime}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Generated by AIME</span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={() => router.push('/notes')}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Create Note
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;