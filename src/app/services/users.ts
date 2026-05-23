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
    return this.db.query<User>(`SELECT * FROM usuarios`);
  }

  getUser(id: number): User | null{
    const result = this.db.query<User>(
      `SELECT * FROM usuarios WHERE id = ?`, [id]
    );
    return result[0] ?? null;
  }

  setUser(username: string, password: string): void{
    this.db.run(
      `INSERT INTO usuarios (username, password) VALUES (?, ?)`, [username, password]
    );
  }

  updateUser(id: number, username?: string, password?: string): void {
  if (username) {
    this.db.run(
      `UPDATE usuarios SET username = ? WHERE id = ?`, [username, id]
    );
  }
  if (password) {
    this.db.run(
      `UPDATE usuarios SET password = ? WHERE id = ?`, [password, id]
    );
  }
}

  deleteUser(id: number): void{
    this.db.run(
      `DELETE FROM usuarios WHERE id = ?`, [id]
    );
  }

}
