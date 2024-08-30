
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export const useDebouncedValue = (input: string = '', time: number = 500) => {

    const [debouncedValue, setDebouncedValue] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(input);
        }, time);

        return () => {
            clearTimeout(timeout);
        };
    }, [input]);

    return debouncedValue;
};

