import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ScrollMessageService, ScrollMessage } from '../../../core/services/scroll-message.service';

@Component({
    selector: 'app-admin-scroll-message',
    standalone: true,
    imports: [FormsModule, MatInputModule, MatButtonModule, MatListModule],
    template: `
    <h2>Manage Scroll Messages</h2>
    <form (ngSubmit)="addMessage()" #msgForm="ngForm">
      <mat-form-field appearance="fill">
        <mat-label>Message Text</mat-label>
        <input matInput [(ngModel)]="newMessage.text" name="text" required />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Start Date</mat-label>
        <input matInput [(ngModel)]="newMessage.startDate" name="start" type="date" required />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>End Date</mat-label>
        <input matInput [(ngModel)]="newMessage.endDate" name="end" type="date" required />
      </mat-form-field>
      <mat-checkbox [(ngModel)]="newMessage.active" name="active">Active</mat-checkbox>
      <button mat-raised-button color="primary" type="submit" [disabled]="msgForm.invalid">Add</button>
    </form>
    <mat-list>
      <mat-list-item *ngFor="let m of messages">
        <span>{{ m.text }} ({{ m.startDate | date }} - {{ m.endDate | date }})</span>
        <button mat-icon-button color="warn" (click)="delete(m.id)"><mat-icon>delete</mat-icon></button>
      </mat-list-item>
    </mat-list>
  `,
    styles: [
        `h2 { margin-bottom: 1rem; }`
    ]
})
export class AdminScrollMessageComponent {
    private service = inject(ScrollMessageService);
    messages: ScrollMessage[] = [];
    newMessage: Partial<ScrollMessage> = { text: '', startDate: '', endDate: '', active: false };

    constructor() {
        this.refresh();
    }

    refresh() {
        this.messages = this.service.getAll();
    }

    addMessage() {
        const { text, startDate, endDate, active } = this.newMessage as any;
        this.service.add({
            text,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            active: !!active
        });
        this.newMessage = { text: '', startDate: '', endDate: '', active: false };
        this.refresh();
    }

    delete(id: string) {
        this.service.delete(id);
        this.refresh();
    }
}
