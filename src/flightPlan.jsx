import React, { useState } from 'react';

const CreateFlightPlanForm = () => {
    const [flightPlanName, setFlightPlanName] = useState('');
    const [satelliteId, setSatelliteId] = useState('');
    const [requests, setRequests] = useState([
        { target: '', startTime: '', endTime: '', camera: '', lat: '', lon: '' },
    ]);

    const handleRequestChange = (index, field, value) => {
        const updated = [...requests];
        updated[index][field] = value;
        setRequests(updated);
    };

    const addObservationRequest = () => {
        setRequests([...requests, { target: '', startTime: '', endTime: '', camera: '', lat: '', lon: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const flightPlan = {
            name: flightPlanName,
            satelliteId,
            observationRequests: requests.map(req => ({
                target: req.target,
                startTime: parseInt(req.startTime),
                endTime: parseInt(req.endTime),
                camera: req.camera,
                coordinates: {
                    lat: parseFloat(req.lat),
                    lon: parseFloat(req.lon),
                },
            })),
        };

        const formData = new FormData();
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
                Satellite ID:
                <input value={satelliteId} onChange={(e) => setSatelliteId(e.target.value)} required />
            </label>

            <h3>Observation Requests</h3>
            {requests.map((req, index) => (
                <div key={index} className="request-block">
                    <label>
                        Target:
                        <input value={req.target} onChange={(e) => handleRequestChange(index, 'target', e.target.value)} required />
                    </label>
                    <label>
                        Start Time (Unix):
                        <input type="number" value={req.startTime} onChange={(e) => handleRequestChange(index, 'startTime', e.target.value)} required />
                    </label>
                    <label>
                        End Time (Unix):
                        <input type="number" value={req.endTime} onChange={(e) => handleRequestChange(index, 'endTime', e.target.value)} required />
                    </label>
                    <label>
                        Camera:
                        <input value={req.camera} onChange={(e) => handleRequestChange(index, 'camera', e.target.value)} required />
                    </label>
                    <label>
                        Latitude:
                        <input type="number" value={req.lat} onChange={(e) => handleRequestChange(index, 'lat', e.target.value)} required />
                    </label>
                    <label>
                        Longitude:
                        <input type="number" value={req.lon} onChange={(e) => handleRequestChange(index, 'lon', e.target.value)} required />
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
