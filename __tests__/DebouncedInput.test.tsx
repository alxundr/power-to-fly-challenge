import { render, screen, act, fireEvent } from '@testing-library/react'

import DebouncedInput from '@/components/DebouncedInput'

describe('DebouncedInput',   () => {
    test('notifies input change after default 2s',  () => {
        jest.useFakeTimers();
        const onChange = jest.fn()
        render(<DebouncedInput initialValue='' onChange={onChange}/>)

        fireEvent.change(screen.getByPlaceholderText('type something...'), {
            target: {
                value: 'test'
            }
        })

        expect(onChange).not.toHaveBeenCalled()

        act(() => {
            jest.runOnlyPendingTimers()
        })

        expect(onChange).toHaveBeenCalledWith('test')
    })

    test('notifies input change on ENTER',  () => {
        jest.useFakeTimers();
        const onChange = jest.fn()
        render(<DebouncedInput initialValue='' onChange={onChange}/>)

        fireEvent.change(screen.getByPlaceholderText('type something...'), {
            target: {
                value: 'test'
            }
        })

        fireEvent.keyDown(screen.getByPlaceholderText('type something...'), {
            keyCode: 13
        })

        expect(onChange).toHaveBeenCalledWith('test')

        act(() => {
            jest.runOnlyPendingTimers()
        })

        expect(onChange).toHaveBeenCalledTimes(1)
    })
})