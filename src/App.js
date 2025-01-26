import React, { useState, useEffect } from "react";
import { fetchQuestionsByTitle, fetchQuestionsByType } from "./grpcClient";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [questions, setQuestions] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFreshSearch, setIsFreshSearch] = useState(true);

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
        data = await fetchQuestionsByType(selectedType, pageNumber, 10);
      } else {
        data = await fetchQuestionsByTitle(searchQuery, pageNumber, 10);
      }
      setQuestions(data.questionsList || []);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
      setIsFreshSearch(false);
    }
  };

  const handleNextPage = async () => {
    setPageNumber((prev) => prev + 1);
    handleSearch();
  };

  const handlePrevPage = async () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
    handleSearch();
  };

  const dismissError = () => setError("");

  const handleSearchBarClick = () => {
    if (selectedType !== "ALL") {
      setSelectedType("ALL");
    }
  };

  useEffect(() => {
    if (selectedType !== "ALL") {
      handleSearch();
    }
  }, [selectedType]);

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

        <div className="search-bar-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter search query"
              value={searchQuery}
              onClick={handleSearchBarClick}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} disabled={isLoading}>
              Search
            </button>
          </div>

          <div className="dropdown-container">
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setIsFreshSearch(true);
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

                  {q.type === "MCQ" && renderMCQOptions(q.optionsList)}

                  {q.type === "ANAGRAM" && renderAnagramBlocks(q.blocksList)}

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
