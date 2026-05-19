'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

type DateNavigatorProps = {
    value: Date;
    onChange: (date: Date) => void;
};

const DateNavigator = ({ value, onChange }: DateNavigatorProps) => {
    const changeDate = (days: number) => {
        const newDate = new Date(value);
        newDate.setDate(newDate.getDate() + days);
        onChange(newDate);
    };

    return (
        <div className="flex items-center gap-4 mb-4">
            <Button
                onClick={() => changeDate(-1)}
                className="bg-tertiary-container text-on-tertiary-container cursor-pointer"
            >
                <ChevronLeft />
            </Button>
            <span className="text-lg">{value.toLocaleDateString()}</span>
            <Button
                onClick={() => changeDate(1)}
                className="bg-tertiary-container text-on-tertiary-container cursor-pointer"
            >
                <ChevronRight />
            </Button>
        </div>
    );
};

export default DateNavigator;
