import React, { useState, useEffect } from "react";
import { fetchQuestionsByTitle, fetchQuestionsByType } from "./grpcClient";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [selectedType, setSelectedType] = useState("ALL"); // Selected question type
  const [questions, setQuestions] = useState([]); // Fetched questions
  const [pageNumber, setPageNumber] = useState(1); // Current page number
  const [error, setError] = useState(""); // Error message
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isFreshSearch, setIsFreshSearch] = useState(true); // Flag for fresh search

  // Function to fetch questions by title or type
  const handleSearch = async () => {
    if (isFreshSearch) {
      setPageNumber(1);
    }

    if (!searchQuery.trim() && selectedType === "ALL") {
      setError("Please enter a search query or select a question type.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      let data;
      if (selectedType !== "ALL") {
        // Fetch by question type
        data = await fetchQuestionsByType(selectedType, pageNumber, 10);
      } else {
        // Fetch by title
        data = await fetchQuestionsByTitle(searchQuery, pageNumber, 10);
      }
      setQuestions(data.questionsList || []);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
      setIsFreshSearch(false); // After successful search, set it to false
    }
  };

  // Handle Next Page
  const handleNextPage = async () => {
    setPageNumber((prev) => prev + 1);
    handleSearch();
  };

  // Handle Previous Page
  const handlePrevPage = async () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
    handleSearch();
  };

  const dismissError = () => setError("");

  // Automatically switch back to "ALL" when the search bar is clicked
  const handleSearchBarClick = () => {
    if (selectedType !== "ALL") {
      setSelectedType("ALL");
    }
  };

  // Automatically trigger fetch when type changes
  useEffect(() => {
    if (selectedType !== "ALL") {
      // If user selects a type, fetch the questions automatically
      handleSearch();
    }
  }, [selectedType]); // Trigger on selectedType change

  // Function to render MCQ options with the correct one tagged
  const renderMCQOptions = (options) => {
    return options.map((option, idx) => (
      <div
        key={idx}
        style={{
          backgroundColor: option.isCorrectAnswer ? "#d4edda" : "#f8d7da",
          padding: "5px 10px",
          margin: "5px 0",
          borderRadius: "5px",
        }}
      >
        {option.text}{" "}
        {option.isCorrectAnswer && <span>(Correct Answer)</span>}
      </div>
    ));
  };

  // Function to render Anagram blocks with the correct one tagged
  const renderAnagramBlocks = (blocks) => {
    return blocks.map((block, idx) => (
      <div
        key={idx}
        style={{
          backgroundColor: block.isAnswer ? "#d4edda" : "#f8d7da",
          padding: "5px 10px",
          margin: "5px 0",
          borderRadius: "5px",
        }}
      >
        {block.text} {block.isAnswer && <span>(Correct Answer)</span>}
      </div>
    ));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Search Questions</h1>

        {/* Search bar container */}
        <div className="search-bar-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter search query"
              value={searchQuery}
              onClick={handleSearchBarClick} // Switch type to "ALL" on click
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} disabled={isLoading}>
              Search
            </button>
          </div>

          {/* Dropdown for selecting question type */}
          <div className="dropdown-container">
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setIsFreshSearch(true); // Mark this as fresh search when changing type
              }}
            >
              <option value="ALL">All Types</option>
              <option value="ANAGRAM">Anagrams</option>
              <option value="MCQ">MCQs</option>
              <option value="READ_ALONG">Read Along</option>
              <option value="CONTENT_ONLY">Content Only</option>
              <option value="CONVERSATION">Conversation</option>
            </select>
          </div>
        </div>
      </header>

      {error && (
        <div className="error">
          <span>{error}</span>
          <button onClick={dismissError}>✖</button>
        </div>
      )}

      {isLoading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <div className="results">
          <h2>Results</h2>
          {questions.length > 0 ? (
            <ul>
              {questions.map((q, idx) => (
                <li key={idx} style={{ marginBottom: "20px" }}>
                  <strong>{q.title}</strong> - <em>{q.type}</em>

                  {/* Render MCQ options */}
                  {q.type === "MCQ" && renderMCQOptions(q.optionsList)}

                  {/* Render Anagram blocks */}
                  {q.type === "ANAGRAM" && renderAnagramBlocks(q.blocksList)}

                  {/* Solution display */}
                  {q.solution && (
                    <div
                      style={{
                        marginTop: "10px",
                        fontStyle: "italic",
                        color: "#555",
                      }}
                    >
                      Solution: {q.solution}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            !isLoading && <p>No results found.</p>
          )}
        </div>
      )}

      <div className="pagination">
        {pageNumber > 1 && (
          <button onClick={handlePrevPage} disabled={isLoading}>
            Prev
          </button>
        )}
        <span> Page {pageNumber} </span>
        {questions.length > 0 && (
          <button onClick={handleNextPage} disabled={isLoading}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
