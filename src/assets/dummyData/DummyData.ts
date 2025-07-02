import atomic from "../images/atomic-habits.jpg";
import sapiens from "../images/sapiens.jpg";
export interface Book {
  id: string;
  title: string;
  author: string;
  genre?:
    | "Fiction"
    | "Non-Fiction"
    | "Mystery"
    | "Romance"
    | "Sci-Fi"
    | "Fantasy"
    | "Biography"
    | "History"
    | "Self-Help"
    | "Other"; // Optional
  publishedYear?: number; // Optional, e.g. 1949
  coverImage?: string; // URL string
  isRead: boolean;
  isFavorite: boolean;
  createdAt: string; // ISO date string
  status: "to-read" | "reading" | "finished";
  description?: string; // Long-form notes or reading summary
  tags?: string[]; // e.g. ["classic", "political", "dystopia"]
  readingProgress?: {
    currentPage: number;
    totalPages: number;
    updatedAt: string;
  }; // Only shown if status is "reading"
}

export const books: Book[] = [
  {
    id: "1",
    title: "1984",
    author: "George Orwell",
    genre: "Fiction",
    publishedYear: 1949,
    coverImage: `${atomic}`,
    isRead: true,
    isFavorite: true,
    createdAt: "2024-03-15T10:00:00Z",
    status: "finished",
    description: "A dystopian novel about totalitarianism and surveillance.",
    tags: ["dystopia", "political", "classic"],
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    publishedYear: 1960,
    coverImage: `${sapiens}`,
    isRead: false,
    isFavorite: false,
    createdAt: "2024-04-01T09:30:00Z",
    status: "to-read",
    description:
      "A novel about racial injustice and childhood in the Deep South.",
    tags: ["classic", "race", "justice"],
  },
  {
    id: "3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    publishedYear: 1925,
    coverImage: `${atomic}`,
    isRead: true,
    isFavorite: true,
    createdAt: "2024-01-10T12:45:00Z",
    status: "finished",
    description:
      "A story of wealth, love, and the American Dream in the 1920s.",
    tags: ["classic", "1920s", "tragedy"],
  },
  {
    id: "4",
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    genre: "Sci-Fi",
    publishedYear: 1953,
    coverImage: `${sapiens}`,
    isRead: false,
    isFavorite: true,
    createdAt: "2024-05-05T14:00:00Z",
    status: "reading",
    description: "A dystopian novel where books are outlawed and burned.",
    tags: ["dystopia", "technology"],
    readingProgress: {
      currentPage: 45,
      totalPages: 200,
      updatedAt: "2025-06-28T10:00:00Z",
    },
  },
  {
    id: "5",
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Sci-Fi",
    publishedYear: 1932,
    coverImage: `${atomic}`,
    isRead: true,
    isFavorite: false,
    createdAt: "2024-06-10T08:30:00Z",
    status: "finished",
    description: "A futuristic society obsessed with control and consumerism.",
    tags: ["dystopia", "sci-fi", "future"],
  },
  {
    id: "6",
    title: "Becoming",
    author: "Michelle Obama",
    genre: "Biography",
    publishedYear: 2018,
    coverImage: `${sapiens}`,
    isRead: true,
    isFavorite: false,
    createdAt: "2024-03-01T10:20:00Z",
    status: "finished",
    description: "The memoir of former First Lady Michelle Obama.",
    tags: ["memoir", "inspirational", "politics"],
  },
  {
    id: "7",
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    publishedYear: 2018,
    coverImage: `${atomic}`,
    isRead: false,
    isFavorite: true,
    createdAt: "2024-06-15T11:45:00Z",
    status: "reading",
    description: "A guide to building better habits for personal growth.",
    tags: ["habits", "productivity", "self-improvement"],
    readingProgress: {
      currentPage: 102,
      totalPages: 250,
      updatedAt: "2025-06-29T13:10:00Z",
    },
  },
  {
    id: "8",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    publishedYear: 1813,
    coverImage: `${sapiens}`,
    isRead: true,
    isFavorite: true,
    createdAt: "2024-02-14T07:00:00Z",
    status: "finished",
    description: "A classic romance exploring love, class, and reputation.",
    tags: ["romance", "classic", "society"],
  },
  {
    id: "9",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    publishedYear: 2011,
    coverImage: `${atomic}`,
    isRead: false,
    isFavorite: false,
    createdAt: "2024-04-20T16:00:00Z",
    status: "to-read",
    description: "A brief history of humankind, from ancient to modern times.",
    tags: ["history", "evolution", "culture"],
  },
  {
    id: "10",
    title: "The Power of Now",
    author: "Eckhart Tolle",
    genre: "Self-Help",
    publishedYear: 1997,
    coverImage: `${sapiens}`,
    isRead: false,
    isFavorite: false,
    createdAt: "2024-06-01T18:00:00Z",
    status: "to-read",
    description: "A spiritual guide to living in the present moment.",
    tags: ["mindfulness", "spirituality", "wellness"],
  },
];
