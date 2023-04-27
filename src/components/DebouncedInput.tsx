import { useRef, useEffect, useState } from 'react';

const DebouncedInput = ({
    initialValue,
    onChange,
    debounceTime = 2000,
}: {
    initialValue: string,
    onChange: (value: string) => void,
    debounceTime?: number,
}) => {
    const timerRef = useRef<any>(null)
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {
            onChange(value)
        }, debounceTime)
    }, [value, onChange, debounceTime])

    const handleInputChange = (event: any) => {
        setValue(event.target.value);
    }

    const handleKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
            onChange(value)
        }
    }

    return (
        <input
            type="text"
            value={value}
            placeholder="type something..."
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
        />
    )
}
export default DebouncedInput;