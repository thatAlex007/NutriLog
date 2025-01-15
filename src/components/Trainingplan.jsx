  import React, { useState, useEffect } from "react";
  import { useUser } from "../context/UserContext";

  const TrainingPlan = () => {
    const [plan, setPlan] = useState([
      { day: "Montag", exercises: [] },
      { day: "Dienstag", exercises: [] },
      { day: "Mittwoch", exercises: [] },
      { day: "Donnerstag", exercises: [] },
      { day: "Freitag", exercises: [] },
      { day: "Samstag", exercises: [] },
      { day: "Sonntag", exercises: [] },
    ]);  
    const [newExercise, setNewExercise] = useState("");
    const [selectedDay, setSelectedDay] = useState("Montag");
    const { userEmail } = useUser();
    const [error, setError] = useState(null);

    useEffect(() => {
      if (!userEmail) {
        setError("Fehler: User not logged in");
      }
    }, [userEmail]);

    const fetchPlan = async () => {
      try {
        const response = await fetch(`http://localhost:3000/get-plan?t_u_email=${userEmail}`);
        const data = await response.json();
        console.log('Fetched data:', data);  // Debugging output
        if (response.ok) {
          // Wenn die Daten als Objekt zurückgegeben werden, das Tage als Schlüssel hat,
          // dann strukturiere sie als Array, um mit dem plan zu arbeiten
          const updatedPlan = Object.keys(data).map((day) => ({
            day,
            exercises: data[day] || [],
          }));
          setPlan(updatedPlan);
        }
      } catch (err) {
        console.error('Error fetching plan:', err);
      }
    };

    useEffect(() => {
      if (userEmail) {
        fetchPlan();
      }
    }, [userEmail]);

    const addExercise = async () => {
      try {
        const response = await fetch('http://localhost:3000/add-exercise', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            t_u_email: userEmail,
            t_day: selectedDay,
            t_exercise: newExercise,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          // Update local state with the new exercise without fetching the entire plan again
          setPlan(prevPlan =>
            prevPlan.map(day => {
              if (day.day === selectedDay) {
                return { ...day, exercises: [...day.exercises, newExercise] };
              }
              return day;
            })
          );
          setNewExercise(""); // Clear input field after adding the exercise
        }
      } catch (err) {
        console.error('Error adding exercise:', err);
      }
    };

    const removeExercise = async (exercise) => {
      try {
        const response = await fetch('http://localhost:3000/remove-exercise', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            t_u_email: userEmail,
            t_day: selectedDay,
            t_exercise: exercise,
          }),
        });
    
        if (response.ok) {
          // Lokalen Plan aktualisieren, ohne den gesamten Plan neu zu laden
          setPlan((prevPlan) =>
            prevPlan.map((day) =>
              day.day === selectedDay
                ? {
                    ...day,
                    exercises: day.exercises.filter((ex) => ex !== exercise),
                  }
                : day
            )
          );
        } else {
          const data = await response.json();
          console.error('Error removing exercise:', data.message);
        }
      } catch (err) {
        console.error('Error removing exercise:', err);
      }
    };
        

    const loadPlan = async () => {
      try {
        const response = await fetch(`http://localhost:3000/get-plan?t_u_email=${userEmail}`);
        const data = await response.json();
        if (response.ok) {
          // Wenn die Antwort als Objekt kommt, das die Tage als Schlüssel hat, dann
          // strukturiere es um, um es als Array von Tagen zu verwenden
          const updatedPlan = Object.keys(data).map((day) => ({
            day,
            exercises: data[day] || [],
          }));
          setPlan(updatedPlan);
        } else {
          console.error('Failed to load plan:', data.message);
        }
      } catch (err) {
        console.error('Error loading plan:', err);
      }
    };

    if (error) {
      return (
        <div style={{ textAlign: "center", fontSize: "18px", color: "#ff3b30" }}>
          {error}
        </div>
      );
    }

    return (
      <div style={{
        fontFamily: "Arial, sans-serif",
        margin: "0 auto",
        maxWidth: "700px",
        padding: "20px",
        color: "#f0f0f0",
        backgroundColor: "#1e1e1e",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      }}>
        <header style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "bold", color: "#ffffff" }}>7-Tägiger Trainingsplan</h1>
        </header>

        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
          {plan.map((entry) => (
            <button
              key={entry.day}
              onClick={() => setSelectedDay(entry.day)}
              style={{
                backgroundColor: selectedDay === entry.day ? "#007aff" : "#333",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            >
              {entry.day}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "10px", color: "#cccccc" }}>Neue Übung hinzufügen</h2>
          <input
            type="text"
            value={newExercise}
            onChange={(e) => setNewExercise(e.target.value)}
            placeholder="Übung hinzufügen"
            style={{
              display: "block",
              width: "80%",
              margin: "10px auto",
              padding: "10px",
              border: "1px solid #555",
              borderRadius: "8px",
              fontSize: "16px",
              backgroundColor: "#333",
              color: "#ffffff",
            }}
          />
          <button
            onClick={addExercise}
            style={{
              display: "block",
              width: "80%",
              margin: "10px auto",
              padding: "10px",
              backgroundColor: "#007aff",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            Hinzufügen
          </button>
        </div>

        {plan.map((entry) => (
          <div key={entry.day} style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#ffffff" }}>{entry.day}</h3>
            {entry.exercises.length > 0 ? (
              <ul style={{ listStyle: "none", padding: "0" }}>
                {entry.exercises.map((exercise, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px",
                      borderBottom: "1px solid #555",
                      fontSize: "16px",
                      color: "#dddddd",
                    }}
                  >
                    {exercise} {/* Display exercise name */}
                    <button onClick={() => removeExercise(exercise)} style={{
                      marginLeft: "10px",
                      backgroundColor: "#ff3b30",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}>
                      Entfernen
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#aaaaaa" }}>Keine Übungen geplant.</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  export default TrainingPlan;
