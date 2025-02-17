export const toBoolean = (value : string | undefined) => {
    return !!(value?.toLowerCase?.() === 'true');
};