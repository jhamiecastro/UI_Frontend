import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    gender: 'Male',
    study_hours_per_week: '',
    attendance_rate: '',
    past_exam_scores: '',
    internet: 'Yes',
    extracurricular: 'Yes',
    final_exam_score: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.prediction) {
        setResult(`Prediction: ${data.prediction}`);
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (error) {
      setResult("Error connecting to server.");
    }
  };

  return (
    <div className="App">
      <h2>Student Performance Predictor</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
          </select>
        </label>

        <label>
          Study Hours per Week:
          <input type="number" name="study_hours_per_week" value={formData.study_hours_per_week} onChange={handleChange} required />
        </label>

        <label>
          Attendance Rate (%):
          <input type="number" name="attendance_rate" value={formData.attendance_rate} onChange={handleChange} required />
        </label>

        <label>
          Past Exam Scores:
          <input type="number" name="past_exam_scores" value={formData.past_exam_scores} onChange={handleChange} required />
        </label>

        <label>
          Internet Access at Home:
          <select name="internet" value={formData.internet} onChange={handleChange}>
            <option>Yes</option>
            <option>No</option>
          </select>
        </label>

        <label>
          Extracurricular Activities:
          <select name="extracurricular" value={formData.extracurricular} onChange={handleChange}>
            <option>Yes</option>
            <option>No</option>
          </select>
        </label>

        <label>
          Final Exam Score:
          <input type="number" name="final_exam_score" value={formData.final_exam_score} onChange={handleChange} required />
        </label>

        <button type="submit">Predict</button>
      </form>

      {result && <div className="result">{result}</div>}
    </div>
  );
}

export default App;
