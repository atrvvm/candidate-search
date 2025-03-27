import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import '../index.css';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Load saved candidates from localStorage when the page loads
    const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(storedCandidates);
  }, []);

  // Remove a candidate from the saved list
  const removeCandidate = (username: string) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.login !== username);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div className="candidate-container">
      <h1 className="title">Potential Candidates</h1>

      {savedCandidates.length === 0 ? (
        <p className="no-candidates-message">No saved candidates available.</p>
      ) : (
        <table className="candidate-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.login}>
                <td>
                  <img
                    src={candidate.avatar_url}
                    alt={candidate.login}
                    className="potential-candidate-avatar"
                  />
                </td>
                <td>
                  <strong>{candidate.name || "No name available"}</strong>
                  <br />
                  <em>({candidate.login})</em>
                </td>
                <td>{candidate.location || "Not provided"}</td>
                <td>
                  <a href={`mailto:${candidate.email}`} className="email-link">
                    {candidate.email || "Not provided"}
                  </a>
                </td>
                <td>{candidate.company || "Not provided"}</td>
                <td>{candidate.bio || "No bio available"}</td>
                <td>
                  <button className="reject-button" onClick={() => removeCandidate(candidate.login)}>
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;
