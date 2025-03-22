import React from 'react';

interface ErrorProps {
    error: string | null;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
    if (!error) return null;

    return (
        <p style={{ color: '#f31', margin: '1rem 0' }} role="alert">
            {error}
        </p>
    );
};

export default Error;
