import { HttpHeaders } from "@angular/common/http";
import { environment } from "@environment";

/**
 * Utility class for handling HTTP headers
 */
export class HeaderUtil {
    /**
     * Creates and returns HTTP headers required for TheCat API requests
     * @returns HttpHeaders object containing the API key and content type headers
     */
    static getTheCatApiHeaders(): HttpHeaders {
        return new HttpHeaders({
            'x-api-key': environment.catApiKey,
            'Content-Type': 'application/json',
        });
    }
}