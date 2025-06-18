import React, { useState } from 'react';

function Ingest() {
    const [message, setMessage] = useState('');

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];

            if (file.type === 'application/zip') {
                const formData = new FormData();
                formData.append('batch', file);

                fetch('http://localhost:8080/batch', {
                    method: 'POST',
                    body: formData,
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        setMessage('File uploaded successfully!');
                        console.log('Response:', data);
                    })
                    .catch((error) => {
                        setMessage('Error uploading file.');
                        console.error('Error:', error);
                    });
            } else {
                setMessage('Please upload a valid ZIP file.');
            }
        }
    };

    return (
        <div>
            <h2>Drag and Drop ZIP File</h2>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{
                    width: '300px',
                    height: '300px',
                    border: '2px dashed #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '20px auto',
                    textAlign: 'center',
                }}
            >
                Drop your ZIP file here
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Ingest;