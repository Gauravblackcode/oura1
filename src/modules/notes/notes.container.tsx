import { NextPage } from 'next';
import Head from 'next/head';
import Navigation from '@/components/navigation/Navigation';
import NotesService from '@/services/notes/notes.service';
import useSWR from 'swr';
import { DefaultSort } from '@/common/helpers';
import { DefaultPagination } from '@/common/helpers';
import { NotesQueryVariables } from 'types';
import { useState } from 'react';
import Link from 'next/link';

const NotesPage: NextPage = () => {
  const [filters, setFilters] = useState<NotesQueryVariables>({
    pagination: DefaultPagination,
    sort: DefaultSort,
  });

  const notesService = new NotesService();
  const { data: notesData, error, isLoading } = useSWR('notes', () => notesService.getNotes(filters));

  console.log(notesData);
  if (isLoading) {
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
        <div className="text-red-500">Failed to load notes</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Notes | Dashboard</title>
        <meta name="description" content="Notes management for Oura 1" />
      </Head>
      <main>
        <div style={{
          height: "1024px",
          background: "white",
          overflow: "hidden",
          borderRadius: "8px",
          outline: "2px #CED4DA solid",
          outlineOffset: "-2px",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          display: "inline-flex",
          width: "100%"
        }}>
          <div style={{
            width: "100%",
            height: "1024px",
            position: "relative",
            background: "#F9FAFB"
          }}>
            {/* <Navigation /> */}

            <div style={{
              padding: "30px",
              width: "100%"
            }}>
              {/* Header with Create Button */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-normal">Notes</h1>
                <Link href="/notes/create">
                  <button className="bg-[#D24D21] text-white px-4 py-2 rounded-full hover:bg-[#B23D11]">
                    + Create Note
                  </button>
                </Link>
              </div>

              {/* Notes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notesData?.notes?.data?.map((note) => (
                  <Link href={`/notes/${note._id}`} key={note._id}>
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <h2 className="text-lg font-medium mb-2">{note.title}</h2>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.content}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                        {note.isGeneratedByAime && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            AI Generated
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotesPage; 