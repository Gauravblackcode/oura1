import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NotesService from '@/services/notes/notes.service';
import { Note } from 'types';
import moment from 'moment';
import Navigation from '@/components/navigation/Navigation';

const NoteDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const notesService = new NotesService();

  useEffect(() => {
    const fetchNoteDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await notesService.getNoteById({ id: id as string });
        if (response?.note) {
          setNote(response.note);
        } else {
          setError('Note not found');
        }
      } catch (err) {
        setError('Failed to fetch note details');
        console.error('Error fetching note:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNoteDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="p-6">
        <div>Note not found</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* <Navigation /> */}
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">{note.title}</h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => router.push(`/notes/edit/${note._id}`)}
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    if (window.confirm('Are you sure you want to delete this note?')) {
                      await notesService.deleteNote({ id: note._id });
                      router.push('/notes');
                    }
                  }}
                  className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <span>Created: {moment(note.createdAt).format('MMM D, YYYY')}</span>
                {note.isGeneratedByAime && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    AI Generated
                  </span>
                )}
              </div>
              
              <div className="prose max-w-none">
                {note.content}
              </div>
            </div>

            {(note.taskIds?.length > 0 || note.eventIds?.length > 0) && (
              <div className="border-t pt-6 mt-6">
                <h2 className="text-lg font-medium mb-4">Related Items</h2>
                
                {note.taskIds?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Related Tasks</h3>
                    <div className="space-y-2">
                      {note.taskIds.map(taskId => (
                        <div key={taskId} className="text-blue-600 hover:underline cursor-pointer">
                          Task ID: {taskId}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {note.eventIds?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Related Events</h3>
                    <div className="space-y-2">
                      {note.eventIds.map(eventId => (
                        <div key={eventId} className="text-blue-600 hover:underline cursor-pointer">
                          Event ID: {eventId}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails; 