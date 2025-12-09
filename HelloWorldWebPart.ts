import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';

export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {


  public render(): void {
    this.domElement.innerHTML = `
    <section class="${styles.helloWorld} ${!!this.context.sdks.microsoftTeams ? styles.teams : ''}">
  
    <!-- TOP CENTERED HEADER -->
  <div class="${styles.topHeader}">
    <h2>${escape(this.context.pageContext.user.displayName)}'s workspace</h2>
  </div>

  <!-- CONTENT ROW: LEFT TEXT + RIGHT IMAGE -->
  <div class="${styles.contentRow}">
    
    <div class="${styles.leftContent}">
      <h3>Welcome back!</h3>
      <p>Notes</p>

      <h4>Important Links:</h4>
      <ul class="${styles.links}">
        <li><a href="https://aka.ms/spfx" target="_blank">SharePoint Framework Overview</a></li>
      </ul>
    </div>

    <img 
      alt="Headshot" 
      src="${require('./assets/headshot.jpg')}" 
      class="${styles.welcomeImage}" 
    />
  </div>

  <!-- FULL WIDTH BLACK SECTION -->
      <div class="${styles.blackSection}">
  <h1>Learn more</h1>
  <h2>
    Currently working on how to create custom web parts<br/>
    in SPFx without breaking and interfering with the Microsoft<br/>
    Tenant.
  </h2>

</div>

    </section>`;

  }




  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
