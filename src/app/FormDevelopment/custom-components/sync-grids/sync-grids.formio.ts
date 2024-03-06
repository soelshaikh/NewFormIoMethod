import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { Formio } from 'formiojs';
import { SyncGridsComponent } from './sync-grids.component';
import { Components } from 'formiojs';

export function registerSyncGridNewComponent(injector: Injector) {
  /**
   *  Use the createCustomElement() function to convert a component into a class that can be registered with the browser as a custom element.
   */
  const complexCustomComponent = createCustomElement(SyncGridsComponent, {
    injector,
  });

  /**
   * Use the built-in customElements.define() function to register the configured constructor and its associated custom-element tag with the browser's CustomElementRegistry.
   */
  customElements.define('sync-grid', complexCustomComponent);
  console.log(customElements.get('sync-grid') == undefined);

  /**
   * Once these components are created as a module, they can then easily be added to the renderer using the Formio.use method as follows.
   */
  Formio.use({
    components: {
      syncgrid: createCustomSyncGridComponent(),
    },
  });
}

/**
 * Dynamically creates a custom Angular component.
 * @returns A custom Angular component class extending a base component.
 */
function createCustomSyncGridComponent() {
  return class customComponent extends Components.components.input {
    /**
     * This is the default schema of your custom component. It will "derive"
     * from the base class "schema" and extend it with its default JSON schema
     * properties. The most important are "type" which will be your component
     * type when defining new components.
     */
    static override schema() {
      return super.schema({
        type: 'syncgrid',
        key: 'sync-grid',
        selector: 'sync-grid',
      });
    }

    /**
     * This is the Form Builder information on how this component should show
     * up within the form builder. The "title" is the label that will be given
     * to the button to drag-and-drop on the builder. The "icon" is the font awesome
     * icon that will show next to it, the "group" is the component group where
     * this component will show up, and the weight is the position within that
     * group where it will be shown. The "schema" field is used as the default
     * JSON schema of the component when it is dragged onto the form.
     */
    static get builderInfo() {
      return {
        title: 'Sync Grid New',
        icon: 'table',
        group: 'custom',
        schema: this.schema(),
      };
    }

    /**
     * Overrides the rendering of an element with custom information.
     * This method prepares rendering information, sets the type to 'sync-grid',
     * and renders a template with the updated information.
     * @returns Rendered template with custom information.
     */
    override renderElement() {
      const info = this.elementInfo();
      info.type = 'sync-grid';
      return this.renderTemplate('input', {
        input: info,
      });
    }

    // Get the value of the component from the dom elements.
    override getValue() {}

    /**
     * Set the value of the component into the dom elements.
     * @returns {boolean}
     * */
    override setValue(value: any, flags: any): boolean {
      return super.setValue(value, flags);
    }
  };
}