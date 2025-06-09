import React, {useState} from 'react';

function search() {

    const [searchParams, setSearchParams] = useState({
        dateStart: '',
        dateEnd: '',
        cameraType: '',
        imageId: '',
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
        const simulatedResults = [
            {dateStart: searchParams.dateStart, dateEnd: searchParams.dateEnd, cameraType: searchParams.cameraType, imageId: searchParams.imageId },
        ];
        setResults(simulatedResults)
    }

    return(
        <div className="search">
            <h2>Search Parameters</h2>
            <form>
                <label>
                    Date Start:
                    <input
                        type="date"
                        name="dateStart"
                        value={searchParams.dateStart}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Date End:
                    <input
                        type="date"
                        name="dateEnd"
                        value={searchParams.dateEnd}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Camera Type:
                    <input
                        type="text"
                        name="cameraType"
                        value={searchParams.cameraType}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Image ID:
                    <input
                        type="text"
                        name="imageId"
                        value={searchParams.imageId}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="button" onClick={handleSearch}>
                    Search
                </button>
            </form>

            <h3>Search Results</h3>
            {results.length > 0 && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Date Start</th>
                            <th>Date End</th>
                            <th>Camera Type</th>
                            <th>Image ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={index}>
                                <td>{result.dateStart}</td>
                                <td>{result.dateEnd}</td>
                                <td>{result.cameraType}</td>
                                <td>{result.imageId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default search

