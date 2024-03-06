import {
  Component,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormioForm, FormioModule } from '@formio/angular';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-builder',
  standalone: true,
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss',
  imports: [FormioModule, CommonModule, FormsModule],
})
export class BuilderComponent implements OnInit {
  ScreenTitleInput: string = '';
  @ViewChild('json', { static: true }) jsonElement?: ElementRef;
  form: any;

  option: any;
  constructor(inject: Injector) {
    this.form = { title: this.ScreenTitleInput, components: [] };
    this.option = {
      sanitizeConfig: {
        allowedTags: ['sync-grid'],
        addTags: ['sync-grid'],
      },

      builder: {
        basic: {
          default: false,
          weight: 1,
          components: {
            textarea: false,
          },
        },
        custom: {
          title: 'Custom',
          default: true,
          weight: 0,
        },
      },
    };
  }

  ngOnInit() {
    setTimeout(() => {
      const els = document.querySelectorAll('div[style*="z-index: 999999999"]');
      els.forEach((e) => {
        e.remove();
      });
    }, 200);
  }

  onChange(event: any) {
    if (
      event.type === 'updateComponent' &&
      event.component.type === 'syncgrid'
    ) {
      document
        .querySelectorAll('div[style*="background-color: rgba(0, 0, 0, 0.5)"]')
        .forEach((e) => {
          e.remove();
        });

      document
        .querySelectorAll('div[style*="z-index: 999999999"]')
        .forEach((e) => {
          e.remove();
        });
    } else {
    }
    this.jsonElement.nativeElement.innerHTML = '';
    this.jsonElement.nativeElement.appendChild(
      document.createTextNode(JSON.stringify(event.form, null, 4))
    );
  }
  onSubmit() {
    this.form = {
      title: this.ScreenTitleInput,
      components: this.form.components,
    };
    let existingData = localStorage.getItem('formData');

    if (existingData === null) {
      localStorage.setItem('formData', JSON.stringify([this.form]));
    } else {
      let formsJson = JSON.parse(existingData);
      let alradyExistForm: boolean = false;
      let alradyExistFormIndex: number = -1;

      formsJson.forEach((form: FormioForm, index: number) => {
        if (form.title === this.form.title) {
          alradyExistForm = true;
          alradyExistFormIndex = index;
        }
      });

      if (alradyExistForm) {
        formsJson[alradyExistFormIndex] = this.form;
      } else {
        formsJson.push(this.form);
      }
      localStorage.setItem('formData', JSON.stringify(formsJson));
      console.log(formsJson);
      this.ScreenTitleInput = '';
      alert('Done');
    }
  }
}
