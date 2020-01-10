import { Component, OnInit } from '@angular/core';
import { options } from '../checkbox-options';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {
  public options: any;
  constructor() { }

  ngOnInit() {
    this.options = options;
  }

  checkValues(value: string, item: string, event) {
    const i = this.options[item].data.findIndex(e => e.item === value);
    this.options[item].data[i].checked = event.target.checked;

    const test = this.options[item].data.some(e => e.checked === false);

    this.options[item].allChecked = !test;
  }

  selectAll(key: string, event) {
    this.options[key].allChecked = event.target.checked;
    this.options[key].data.map(e => {
      e.checked = event.target.checked;
    });
  }

  onSubmit() {
    let finalObj = [];
    Object.keys(this.options).map(e => {
      this.options[e].data.map(value => {
        if (value.checked) {
          finalObj.push({ data: value, key: e });
        }
      });
    });
    console.log('finalObj', finalObj);

    let group = finalObj.reduce((r, a) => {
      r[a.key] = [...r[a.key] || [], a.data];
      return r;
    }, {});
    console.log("group", group);
  }
}

