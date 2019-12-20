import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {

  availableSides = [
    {
      display: 'None',
      value: ''
    },
    {
      display: 'Dark',
      value: 'dark'
    },
    {
      display: 'Light',
      value: 'light'
    }
  ];
  swService: StarWarsService;
  constructor(swService: StarWarsService) {
    this.swService = swService;
   }

  ngOnInit() {
  }

    onSubmit(submittedForm) {
      this.swService.addCharacter(submittedForm.value);
    }
}
