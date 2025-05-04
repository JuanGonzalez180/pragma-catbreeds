export interface ApiError {
    error?: {
        message: string;
    };
    status?: number;
    message: string;
}