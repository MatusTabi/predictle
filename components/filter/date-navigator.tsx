'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

const DateNavigator = () => {
    const [date, setDate] = useState(new Date());

    const changeDate = (days: number) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        setDate(newDate);
    };

    return (
        <div className="flex items-center gap-4 mb-4">
            <Button
                onClick={() => changeDate(-1)}
                className="bg-tertiary-container text-on-tertiary-container"
            >
                <ChevronLeft />
            </Button>
            <span className="text-lg">{date.toLocaleDateString()}</span>
            <Button
                onClick={() => changeDate(1)}
                className="bg-tertiary-container text-on-tertiary-container"
            >
                <ChevronRight />
            </Button>
        </div>
    );
};

export default DateNavigator;
