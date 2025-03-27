import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";
import "../index.css";

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [noCandidatesLeft, setNoCandidatesLeft] = useState<boolean>(false);

  // Function to fetch a random candidate
  const fetchCandidate = async () => {
    setLoading(true);
    setError(null);
    setNoCandidatesLeft(false);

    try {
      const users = await searchGithub();
      if (!users || users.length === 0) {
        setNoCandidatesLeft(true);
        setLoading(false);
        return;
      }

      let userDetails = null;
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        userDetails = await searchGithubUser(user.login);

        if (userDetails) break; // Stop if we find a valid user
      }

      if (!userDetails) {
        setError("No valid candidates found.");
        setNoCandidatesLeft(true);
      } else {
        setCandidate(userDetails);
      }
    } catch (err) {
      setError("Failed to fetch candidate data.");
    } finally {
      setLoading(false);
    }
  };

  // Function to save the candidate
  const saveCandidate = () => {
    if (!candidate) return;

    const savedCandidates = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    localStorage.setItem(
      "savedCandidates",
      JSON.stringify([...savedCandidates, candidate])
    );

    fetchCandidate(); // Load next candidate
  };

  // Function to skip the candidate
  const skipCandidate = () => {
    fetchCandidate(); // Load next candidate
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  return (
    <div className="candidate-container">
      <h1 className="title">Candidate Search</h1>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {noCandidatesLeft && (
        <p className="no-candidates-message">No more candidates available.</p>
      )}

      {candidate && !noCandidatesLeft && (
        <><div className="candidate-card">
          <img
            src={candidate.avatar_url}
            alt={`${candidate.login}'s avatar`}
            className="candidate-avatar" />
          <h2 className="candidate-name">
            {candidate.name || "No name available"}
          </h2>
          <p>
            <strong>Username:</strong> {candidate.login}
          </p>
          <p>
            <strong>Location:</strong> {candidate.location || "Not provided"}
          </p>
          <p>
            <strong>Email:</strong> {candidate.email || "Not provided"}
          </p>
          <p>
            <strong>Company:</strong> {candidate.company || "Not provided"}
          </p>
          <p>
            <a
              href={candidate.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-link"
            >
              View Profile on GitHub
            </a>
          </p>
        </div><div className="button-group">
            <button className="save-button" onClick={saveCandidate}>+</button>
            <button className="skip-button" onClick={skipCandidate}>-</button>
          </div></>
      )}
    </div>
  );
};

export default CandidateSearch;
