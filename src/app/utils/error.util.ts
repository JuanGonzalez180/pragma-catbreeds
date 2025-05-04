import { ApiError } from "@models/errors/api-error.model";
import { Observable, throwError } from "rxjs";

export class ErrorUtil {
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