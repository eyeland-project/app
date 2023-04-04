export const errorHandler = (err: any, erroMap: Map<number, string>): string => {
    const errorResponse = err.response;
    if (err.message === 'Network Error') {
        return 'Compruebe su conexión a internet'
    } else if (errorResponse) {
        return erroMap.get(errorResponse.status) || 'Un error inesperado ocurrido';
    } else {
        return 'Un error inesperado ocurrido';
    }
}