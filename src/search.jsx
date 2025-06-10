import React, {useState} from 'react';

function search() {

    const [searchParams, setSearchParams] = useState({
        obs_id: '',
        start_time: '',
        end_time: '',
        lat_from: '',
        lat_to: '',
        lon_from: '',
        lon_to: '',
        camera: '',
        date: '',
    });

    const [results, setResults] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSearch = () => {
        const baseUrl = 'http://localhost:8081/images';

        const queryString = Object.entries(searchParams)
            .filter(([_, value]) => value)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        const fullUrl = `${baseUrl}?${queryString}`;

        console.log(`Fetching data from: ${fullUrl}`);

        const simulatedResults = [
            {obs_id: searchParams.obs_id, start_time: searchParams.start_time, end_time: searchParams.end_time,
            lat_from: searchParams.lat_from, lat_to: searchParams.lat_to, lon_from: searchParams.lon_from, lon_to: searchParams.lon_to,
            camera: searchParams.camera, date: searchParams.date},
        ];
        setResults(simulatedResults)

        fetch(fullUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.blob(); // Get the response as a Blob
            })
            .then((blob) => {
                // Create a download link for the ZIP file
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'data.zip'; // Set the desired file name
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url); // Clean up the URL object
            })
            .catch((error) => {
                console.error('Error fetching ZIP file:', error);
            });
    }

    return(
        <div className="search">
            <h2>Search Parameters</h2>
            <form>
                <label>
                    Observation ID:
                    <input
                        name="obs_id"
                        value={searchParams.obs_id}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Start Time:
                    <input
                        name="start_time"
                        value={searchParams.start_time}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    End Time:
                    <input
                        name="end_time"
                        value={searchParams.end_time}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Latitude From:
                    <input
                        name="lat_from"
                        value={searchParams.lat_from}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Latitude To:
                    <input
                        name="lat_to"
                        value={searchParams.lat_to}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Longitude From:
                    <input
                        name="lon_from"
                        value={searchParams.lon_from}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Longitude To:
                    <input
                        name="lon_to"
                        value={searchParams.lon_to}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Camera Type:
                    <input
                        name="camera"
                        value={searchParams.camera}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={searchParams.date}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="button" onClick={handleSearch}>
                    Search
                </button>
            </form>

            <h3>Search Parameters Received</h3>
            {results.length > 0 && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>observation ID</th>
                            <th>start time</th>
                            <th>end time</th>
                            <th>lat from</th>
                            <th>lat to</th>
                            <th>lon from</th>
                            <th>lon to</th>
                            <th>camera type</th>
                            <th>date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={index}>
                                <td>{result.obs_id}</td>
                                <td>{result.start_time}</td>
                                <td>{result.end_time}</td>
                                <td>{result.lat_from}</td>
                                <td>{result.lat_to}</td>
                                <td>{result.lon_from}</td>
                                <td>{result.lon_to}</td>
                                <td>{result.camera}</td>
                                <td>{result.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default search

