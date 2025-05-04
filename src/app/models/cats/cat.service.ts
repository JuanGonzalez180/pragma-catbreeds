import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CatBreed, CatSearchParams } from '@models/cats/cat.model';
import { environment } from '@environment';
import { HeaderUtil } from '@utils/header.util';
import { ErrorUtil } from '@utils/error.util';

/**
 * Service to handle operations related to TheCatAPI
 */
@Injectable({
    providedIn: 'root',
})
export class CatService {
    // API URLs and configurations from environment
    private readonly apiUrl = environment.catApiUrl;

    constructor(private readonly http: HttpClient) { }

    /**
     * Gets all cat breeds
     * @returns Observable with an array of CatBreed
     */
    getAllBreeds(): Observable<CatBreed[]> {
        const headers = HeaderUtil.getTheCatApiHeaders();

        return this.http.get<CatBreed[]>(`${this.apiUrl}/breeds`, { headers }).pipe(
            map((breeds: CatBreed[]) => {
                return breeds.filter((breed) => breed.image?.url);
            }),
            catchError(ErrorUtil.handleApiError)
        );
    }

    /**
     * Gets a specific breed by its ID
     * @param breedId ID of the breed to get
     * @returns Observable with the breed information
     */
    getBreedById(breedId: string): Observable<CatBreed> {
        const headers = HeaderUtil.getTheCatApiHeaders();

        return this.http
            .get<CatBreed>(`${this.apiUrl}/breeds/${breedId}`, { headers })
            .pipe(catchError(ErrorUtil.handleApiError));
    }

    /**
     * Searches breeds by their name (in English)
     * @param searchParams Search parameters
     * @returns Observable with an array of breeds that match the search
     */
    searchBreeds(searchParams: CatSearchParams): Observable<CatBreed[]> {
        const headers = HeaderUtil.getTheCatApiHeaders();
        console.log("searchParams::: ", searchParams);
        
        let params = new HttpParams().set('q', searchParams.query);

        if (searchParams.limit) {
            params = params.set('limit', searchParams.limit.toString());
        }

        return this.http
            .get<CatBreed[]>(`${this.apiUrl}/breeds/search`, {
                headers,
                params,
            })
            .pipe(catchError(ErrorUtil.handleApiError));
    }

    /**
     * Gets images for a specific breed
     * @param breedId ID of the breed
     * @param limit Maximum number of images to get
     * @returns Observable with an array of images
     */
    getBreedImages(breedId: string, limit: number = 10): Observable<any[]> {
        const headers = HeaderUtil.getTheCatApiHeaders();
        const params = new HttpParams()
            .set('breed_ids', breedId)
            .set('limit', limit.toString());

        return this.http
            .get<any[]>(`${this.apiUrl}/images/search`, {
                headers,
                params,
            })
            .pipe(catchError(ErrorUtil.handleApiError));
    }
}
