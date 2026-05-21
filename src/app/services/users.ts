import { Injectable, inject } from '@angular/core';
import { QuesaurillasDb } from './quesaurillas-db';

export interface User{
  id: number;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class Users {
  private db = inject(QuesaurillasDb);


  getAllUsers(): User[]{
    return this.db.query<User>(`SELECT * FROM users`);
  }

  getUser(id: number): User | null{
    const result = this.db.query<User>(
      `SELECT * FROM users WHERE id = ?`, [id]
    );
    return result[0] ?? null;
  }

  setUser(username: string, password: string): void{
    this.db.run(
      `INSERT INTO users (username, password) VALUES (?, ?)`, [username, password]
    );
  }

  deleteUser(id: number): void{
    this.db.run(
      `DELETE FROM users WHERE id = ?`, [id]
    );
  }

}
