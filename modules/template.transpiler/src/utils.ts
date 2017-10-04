import { SPACING_REGEX, LINE_BREAK_REGEX, CONTROLLER_VARIABLE } from './constants';
export const textCleanup = (text: string) => {
    
    let result = text;
    while (SPACING_REGEX.test(result)) {
        result = result.replace(SPACING_REGEX, ' ');
    }
    while (LINE_BREAK_REGEX.test(result)) {
        result = result.replace(LINE_BREAK_REGEX, '');
    }
    return result;
};

export const getVariableContext = (variable: string, contextVariables: string[]) => {
    const arr = variable.split('.');
    return (contextVariables || []).indexOf(arr[0]) >= 0 ? variable : `${CONTROLLER_VARIABLE}.${variable}`;
};

export const eachInbetween = <T>(arr: T[], action: (item: T, index: number, arr: T[]) => void, between: () => void) => {
    arr.forEach((item, index, array) => {
        action(item, index, arr);
        console.log(item);
        if (index < array.length -1) {
            between();
        }
    });
};