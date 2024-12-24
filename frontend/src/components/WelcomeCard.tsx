'use client';

import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const WelcomeCard = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Welcome to My App</CardTitle>
                    <CardDescription>Built with Next.js and shadcn/ui</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600">
                        This is a simple card component using shadcn's beautiful UI components.
                    </p>
                </CardContent>
                <CardFooter>
                    <button
                        onClick={() => alert('Hello!')}
                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        Click Me
                    </button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default WelcomeCard;