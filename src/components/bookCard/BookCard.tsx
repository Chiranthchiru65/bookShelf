// import * as React from "react";
// import { Book } from "../../assets/dummyData/DummyData";
// interface BookCardProps {
//     books: Book[];
// }

// const BookCard: React.FunctionComponent<BookCardProps> = ({ books }) => {
//   return (
//     <>
//       {books.map((book) => (
//         <div key={book.id} className="book-card">
//           <div className="book-card__cover">
//             <div className="book-placeholder">📖</div>
//           </div>
//           <div className="book-card__info">
//             <h4 className="book-title">{book.title}</h4>
//             <p className="book-author">{book.author}</p>
//             <span className="book-genre">{book.genre}</span>
//             <div className="book-card__footer">
//               <div className="book-status">
//                 <span className="status-icon">
//                   {/* {getStatusIcon(book.status)} */}
//                 </span>
//                 <span className="status-text">
//                   {/* {getStatusText(book.status)} */}
//                 </span>
//               </div>
//               <div className="book-actions">
//                 <button className="action-btn">❤️</button>
//                 <button className="action-btn">⋮</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default BookCard;
