import { HttpHeaders } from "@angular/common/http";
import { environment } from "@environment";

export class HeaderUtil {
    static getTheCatApiHeaders(): HttpHeaders {
        return new HttpHeaders({
            'x-api-key': environment.catApiKey,
            'Content-Type': 'application/json',
        });
    }
}