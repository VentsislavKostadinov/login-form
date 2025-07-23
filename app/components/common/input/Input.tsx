import React, { InputHTMLAttributes } from 'react'
import './Input.scss'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    error?: string
}

const Input: React.FC<InputProps> = ({ label, error, id, ...props }) => {
    return (
        <div className="input-wrapper">
            {label && id && (
                <label htmlFor={id} className="input-label">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`input-field${error ? ' error-input' : ''}`}
                {...props}
            />
            {error && <p className="input-error">{error}</p>}
        </div>
    )
}

export default Input
