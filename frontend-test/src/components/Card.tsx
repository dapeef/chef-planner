'use client';

import React from 'react';

const Card = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="m-4 max-w-sm rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">Welcome to My App</h2>
                <p className="mb-4 text-gray-600">
                    This is a simple card component built with Next.js, TypeScript, and Tailwind CSS.
                </p>
                <button
                    onClick={() => alert('Hello!')}
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    Click Me
                </button>
            </div>
        </div>
    );
};

export default Card;