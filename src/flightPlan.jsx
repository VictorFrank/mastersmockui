import React, { useState } from 'react';

const CreateFlightPlanForm = () => {
    const [flightPlanName, setFlightPlanName] = useState('');
    const [userId, setUserId] = useState(1);
    const [missionId, setMissionId] = useState(2);
    const [requests, setRequests] = useState([
        { id: 0, o_type: "" },
    ]);




    const handleRequestChange = (index, field, value) => {
        const updated = [...requests];
        updated[index][field] = value;
        setRequests(updated);
    };

    const addObservationRequest = () => {
        setRequests([...requests, { id: 0, o_type: "" }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const flightPlan = {
            name: flightPlanName,
            user_id: userId,
            mission_id: missionId,
            observation_requests: requests
        };

        const formData = new FormData();
        console.log(JSON.stringify(flightPlan))
        formData.append("flightPlan", JSON.stringify(flightPlan));
        try {
            const response = await fetch("http://localhost:8080/flightPlan", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error(`Server error: ${response.status}`);

            const data = await response.json();
            alert(`Flight plan created! ID: ${data.flightPlanId}`);
        } catch (err) {
            console.error("Error creating flight plan:", err);
            alert("Failed to create flight plan.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flightplan-form">
            <h2>Create Flight Plan</h2>

            <label>
                Flight Plan Name:
                <input value={flightPlanName} onChange={(e) => setFlightPlanName(e.target.value)} required />
            </label>

            <label>
                User ID:
                <input type="number" value={userId} onChange={(e) => setUserId(parseInt(e.target.value))} required />
            </label>
            <label>
                Mission Id:
                <input type="number" value={missionId} onChange={(e) => setMissionId(parseInt(e.target.value))} required />
            </label>

            <h3>Observation Requests</h3>
            {requests.map((req, index) => (
                <div key={index} className="request-block">
                    <label>
                        Observation request id:
                        <input type="number" value={req.target} onChange={(e) => handleRequestChange(index, 'id', parseInt(e.target.value))} required />
                    </label>
                    <label>
                        Observation Type:
                        <input type="text" value={req.startTime} onChange={(e) => handleRequestChange(index, 'o_type', e.target.value)} required />
                    </label>
                </div>
            ))}

            <button type="button" onClick={addObservationRequest}>Add Another Request</button>
            <br /><br />
            <button type="submit">Submit Flight Plan</button>
        </form>
    );
};

export default CreateFlightPlanForm;
