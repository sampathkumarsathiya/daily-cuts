import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ScrollMessage {
    id: string;
    text: string;
    startDate: Date;
    endDate: Date;
    active: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ScrollMessageService {
    private readonly storageKey = 'scrollMessages';
    private messages: ScrollMessage[] = [];
    private activeMessageSubject = new BehaviorSubject<string | null>(null);

    constructor() {
        this.loadMessages();
        this.updateActiveMessage();
    }

    private loadMessages(): void {
        const raw = localStorage.getItem(this.storageKey);
        if (raw) {
            try {
                const parsed = JSON.parse(raw) as any[];
                this.messages = parsed.map(m => ({
                    ...m,
                    startDate: new Date(m.startDate),
                    endDate: new Date(m.endDate)
                }));
            } catch {
                this.messages = [];
            }
        }
    }

    private saveMessages(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(this.messages));
        this.updateActiveMessage();
    }

    private updateActiveMessage(): void {
        const now = new Date();
        const active = this.messages.find(m => m.active && now >= m.startDate && now <= m.endDate);
        this.activeMessageSubject.next(active ? active.text : null);
    }

    getActiveMessage(): Observable<string | null> {
        return this.activeMessageSubject.asObservable();
    }

    getAll(): ScrollMessage[] {
        return [...this.messages];
    }

    add(message: Omit<ScrollMessage, 'id'>): void {
        const newMessage: ScrollMessage = { ...message, id: crypto.randomUUID() };
        this.messages.push(newMessage);
        this.saveMessages();
    }

    update(id: string, changes: Partial<Omit<ScrollMessage, 'id'>>): void {
        const idx = this.messages.findIndex(m => m.id === id);
        if (idx !== -1) {
            this.messages[idx] = { ...this.messages[idx], ...changes } as ScrollMessage;
            this.saveMessages();
        }
    }

    delete(id: string): void {
        this.messages = this.messages.filter(m => m.id !== id);
        this.saveMessages();
    }
}
