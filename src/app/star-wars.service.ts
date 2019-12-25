import { LogService } from './log.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StarWarsService {

 private characters = [];
  apiChars: characters[];
  results: string[];
  next: string;
  previous: string;
  private logService: LogService;
  private httpClient: HttpClient;
  charactersChanged: Subject<void> = new Subject<void>();
  constructor(logService: LogService, httpClient: HttpClient) {
    this.logService = logService;
    this.httpClient = httpClient;
  }
  fetchCharacterNext(){
    this.httpClient.get(this.next).subscribe((data) => {
      this.characters = this.characters.concat(data.results.map((char) => {
        return {name: char.name, side: ''};
      }));
      console.log(this.next);
      this.next = data.next;
      console.log(this.next);
      this.charactersChanged.next();
    });

  }
  fetchCharacter() {
    this.httpClient.get('https://swapi.co/api/people/').subscribe((data) => {
      this.next = data.next;
      this.previous = data.previous;
      this.characters = this.characters.concat(data.results.map((char) => {
        return {name: char.name, side: '' };
      }));
      this.charactersChanged.next();
    });



    // console.log(this.apiChars);
  }
  getCharacters(chosenList) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }

    return this.characters.filter((char) => {
     return char.side === chosenList;
    });

}
onSideChosen(charInfo) {

  const pos = this.characters.findIndex((char) => {
    return char.name === charInfo.name;
  });
  this.characters[pos].side = charInfo.side;
  this.charactersChanged.next();
  this.logService.writeLog('Changed side of: ' + charInfo.name + '; new side: ' + charInfo.side);
}

addCharacter(character) {
  const pos = this.characters.findIndex((char) => {
    return char.name === character.name;
  });
  if (pos !== -1) {
    return;
  }
  this.characters.push(character);
}
}
