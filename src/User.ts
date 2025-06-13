import { v4 as uuidv4 } from 'uuid';

export class User {
    name: string;
    username: string;
    id: string;
  
    static current: User | null = User.loadFromLocalStorage();
  
    constructor(name: string, username: string, id: string) {
      this.name = name;
      this.username = username;
      this.id = id;
    }
  
    // Static method to generate a random user (as per your existing code)
    static makeGeneratedUser(): User {
      const firstNamePeople: string[] = [
        "Plato", "Socrates", "Aristotle", "Descartes", "Diogenes", "Hegel", "Kant", "Nietzsche", "Locke", "Wittgenstein"
      ];
      const modifiers: string[] = ["lil", "young", "big", "petit", "ol", "rich"];
      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)] || '';
      const name = `${modifier}${firstNamePeople[Math.floor(Math.random() * firstNamePeople.length)]}`;
      const username = `@philosopher`;
  
      return new User(name, username, uuidv4());
    }
  
    // Static method to save current user to local storage
    static saveToLocalStorage() {
      if (User.current) {
        const serializedUser = JSON.stringify(User.current);
        localStorage.setItem('currentUser', serializedUser);
      } else {
        console.warn('No current user to save.');
      }
    }

    // Static method to log out the user
    static logout() {
      localStorage.removeItem('currentUser');
      User.current = null;
    }
  
    // Static method to load a user from local storage and return it
    static loadFromLocalStorage(): User | null {
      const serializedUser = localStorage.getItem('currentUser');
      if (serializedUser) {
        const parsedUser = JSON.parse(serializedUser);
        return new User(parsedUser.name, parsedUser.username, parsedUser.id);
      } else {
        console.warn('No user found in local storage.');
        return null;
      }
    }
  
    // Static method to set the current user
    static setCurrentUser(user: User) {
      User.current = user;
    }
  
    // Static method to get the current user
    static getCurrentUser(): User | null {
      return User.current;
    }
  }