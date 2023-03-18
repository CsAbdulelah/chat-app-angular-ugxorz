import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from '@progress/kendo-angular-conversational-ui';

@Injectable()
export class ChatService {
  private apiUrl = 'https://experimental.willow.vectara.io/v1/completions';
  private customerId = '1481263477';
  private apiKey = 'zqt_WEpJdVsNsyHj75mOqwEH6U_d0y4ZzmLktKOe3w';
  public readonly responses: Subject<Message> = new Subject<Message>();

  constructor(private http: HttpClient) {}

  sendMessage(question: string): Observable<Message> {
    const headers = {
      'Content-Type': 'application/json',
      'customer-id': this.customerId,
      'x-api-key': this.apiKey,
    };

    const body = {
      model: 'text-davinci-003',
      prompt: question,
      max_tokens: 1000,
      temperature: 0,
    };

    // return this.http.post<Message>(this.apiUrl, body, { headers });
    this.http.post<Message>(this.apiUrl, body, { headers }).subscribe((res) => {
      console.log(res);
      setTimeout(() => {
        this.responses.next(res);
        return 'DONE';
      }, 1000);
    });
  }
}
