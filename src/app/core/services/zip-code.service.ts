import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ZipCodeService {
    private readonly storageKey = 'allowedZipCodes';
    private zipCodes: Set<string> = new Set();
    private availabilitySubject = new BehaviorSubject<boolean>(true);

    constructor() {
        this.loadZipCodes();
    }

    private loadZipCodes(): void {
        const raw = localStorage.getItem(this.storageKey);
        if (raw) {
            try {
                const arr = JSON.parse(raw) as string[];
                this.zipCodes = new Set(arr);
            } catch {
                this.zipCodes = new Set();
            }
        }
    }

    private saveZipCodes(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(Array.from(this.zipCodes)));
    }

    /**
     * Checks if the given zip code is in the allowed list.
     */
    isServiceAvailable(zip: string): boolean {
        return this.zipCodes.has(zip);
    }

    /**
     * Returns an observable of the latest availability check result.
     */
    checkAvailability(zip: string): Observable<boolean> {
        const available = this.isServiceAvailable(zip);
        this.availabilitySubject.next(available);
        return this.availabilitySubject.asObservable();
    }

    /**
     * Add a zip code to the allowed list.
     */
    addZipCode(zip: string): void {
        this.zipCodes.add(zip);
        this.saveZipCodes();
    }

    /**
     * Remove a zip code from the allowed list.
     */
    removeZipCode(zip: string): void {
        this.zipCodes.delete(zip);
        this.saveZipCodes();
    }

    /**
     * Get all allowed zip codes.
     */
    getAll(): string[] {
        return Array.from(this.zipCodes);
    }
}
