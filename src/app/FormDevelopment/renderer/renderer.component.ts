import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Formio, FormioForm } from '@formio/angular';
// import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-renderer',
  standalone: true,
  // imports: [SharedModule],
  imports:[CommonModule],
  templateUrl: './renderer.component.html',
  styleUrl: './renderer.component.css'
})
export class RendererComponent implements OnInit {
  public formTemplates!: FormioForm[];
  public selectedTemplate!: any;
  public submitedTemplate!: {};
  public isTemplateSelected: boolean = false;
  public isDataSubmited: boolean = false;

  ngOnInit(): void {

     // // Removing Syncfusion premium dialog after 2 seconds
     setTimeout(() => {
      const els = document.querySelectorAll(
          'div[style*="z-index: 999999999"]'
      );
      els.forEach((e) => {
          e.remove();
      });
  }, 200);
    let existingData = localStorage.getItem('formData');
    if (existingData !== null) {
      this.formTemplates = JSON.parse(existingData);
    }
  }

  renderTemplate(event: any) {
    if (event.target.value == -1) {
      this.isTemplateSelected = false;
    }
    else {
      this.isTemplateSelected = true;
      this.isDataSubmited = false;
      this.selectedTemplate = this.formTemplates[event.target.value];
      Formio.createForm(
        document.getElementById('formio'),
        this.selectedTemplate,
        {
          sanitize: true,
          sanitizeConfig: {
            allowedTags: ['sync-grid'],
            addTags: ['sync-grid']
          }
        }
      );
    }
  }

  onSubmitForm(formJson: any) {
    this.isDataSubmited = true;
    this.submitedTemplate = formJson.data;
  }

}