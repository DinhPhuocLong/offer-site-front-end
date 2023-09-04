
export const lengthValidationRule = (params = { fieldName: 'Field name', min: 4, max: 20, required: true }) => {
    const ruleParams = params;
    return [
        value => {
            if (!value && !ruleParams.required) return true;
            if (!value && ruleParams.required) return `${ruleParams.fieldName} is required.`;
            if (!ruleParams.required && (value === null || value === '')) return true;
        },
        value => {
            if (ruleParams.required && value && value.length < ruleParams.min) return `${ruleParams.fieldName} must be more or equal than ${ruleParams.min} characters.`;
            if (!ruleParams.required && value && (value.length < ruleParams.min || value.length > ruleParams.max)) return `${ruleParams.fieldName} must be between 2 and 50 characters.`;
            return true;
        },
        value => {
            if (value && value.length > ruleParams.max) return `${ruleParams.fieldName} must not be greater than ${ruleParams.max} characters`;
            return true;
        },
    ];
}

export const linkValidationRule = (params = { fieldName: 'Field name', required: true }) => {
    const ruleParams = params;
    return [
        value => {
            if (!value && ruleParams.required) return `${ruleParams.fieldName} is required.`;
            if (!ruleParams.required && (value === null || value === '')) return true;

            const urlPattern = /^(http[s]?:\/\/)?(www\.)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,4})(\/\S*)?$/;

            if (urlPattern.test(value)) return true;
            return `${ruleParams.fieldName} must be a valid link.`;
        },
    ]
}

export const nonNegativeNumberValidationRule = function (params = { fieldName: 'Field name', required: true }) {
    const ruleParams = params;
    return [
        value => {
            if (!value && ruleParams.required) return `${ruleParams.fieldName} is required.`;
            if (!ruleParams.required && (value === null || value === '')) return true;
            if (!isNaN(value) && parseFloat(value) >= 0) return true;
            return `${ruleParams.fieldName} must be a valid non-negative number.`;
        }
    ]
}


export function requiredRule(params = { fieldName: 'Field name' }) {
    const ruleParams = params;
    return [
        value => {
            if (!value) return `${ruleParams.fieldName} is required.`;
            return true;
        }
    ];
}


