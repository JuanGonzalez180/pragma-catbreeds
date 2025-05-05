import { ApiError } from "@models/errors/api-error.model";
import { Observable, throwError } from "rxjs";

export class ErrorUtil {
    /**
     * Handles API errors by processing them and returning an Observable with an error
     * @param error The API error to handle
     * @returns An Observable that emits an error with a formatted message
     */
    static handleApiError(error: ApiError): Observable<never>  {
        console.error('Error en la petición a la API:', error);
        let errorMessage = 'Ocurrió un error desconocido';

        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
        }

        return throwError(() => new Error(errorMessage));
    }
}