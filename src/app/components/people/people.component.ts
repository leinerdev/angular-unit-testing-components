import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  people: Person[] = [
    new Person('Leiner', 'Barrios', 23, 65, 1.75),
    new Person('Jose', 'Barrios', 27, 75, 1.76),
  ]

  selectedPerson: Person | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  choose(person: Person) {
    this.selectedPerson = person;
  }

}
