import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PrizmSwitcherItem } from '@prizm-ui/components';

@Component({
  selector: 'prizm-switcher-outer-l-example',
  templateUrl: './StructureComponent.html',
  styleUrls: ['./StructureComponent.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrizmSwitcherOuterLExampleComponent {
  public readonly switchers: PrizmSwitcherItem[] = [
    {
      title: 'По id',
    },
    {
      title: 'По названию',
    }
  ];
}
