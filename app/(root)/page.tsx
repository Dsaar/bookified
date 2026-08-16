import React from 'react';
import { auth } from '@clerk/nextjs/server';

import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/lib/actions/book.actions";
import Search from "@/components/Search";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) => {
  const { userId } = await auth();
  const { query } = await searchParams;

  if (!userId) {
    return (
      <main className="wrapper container">
        <HeroSection />

        <div className="flex flex-col items-center justify-center text-center py-20">
          <h2 className="text-3xl font-serif font-bold text-[#212a3b] mb-4">
            Your Library Awaits
          </h2>

          <p className="text-lg text-gray-600 max-w-xl">
            Please log in to access your library and add books to Bookified.
          </p>
        </div>
      </main>
    );
  }

  const bookResults = await getAllBooks(query);
  const books = bookResults.success ? bookResults.data ?? [] : [];

  return (
    <main className="wrapper container">
      <HeroSection />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
        <h2 className="text-3xl font-serif font-bold text-[#212a3b]">
          Your Library
        </h2>

        <Search />
      </div>

      {books.length > 0 ? (
        <div className="library-books-grid">
          {books.map((book) => (
            <BookCard
              key={book._id}
              title={book.title}
              author={book.author}
              coverURL={book.coverURL}
              slug={book.slug}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <h3 className="text-2xl font-serif font-bold text-[#212a3b] mb-3">
            Your library is empty
          </h3>

          <p className="text-gray-600">
            Add your first book to start building your library.
          </p>
        </div>
      )}
    </main>
  );
};

export default Page;