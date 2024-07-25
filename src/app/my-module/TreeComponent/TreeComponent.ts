import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'prizm-tree-base-example',
  templateUrl: './TreeComponent.html',
})
export class TreeBaseExampleComponent implements OnChanges {
  @Input() treeData: any[] = [];
  @Input() selectedPageId: string | null = null;

  private apiUrl = 'http://localhost:4200'; 

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPageId'] && changes['selectedPageId'].currentValue) {
      this.loadElements();
    }
  }

  private loadElements(): void {
    if (this.selectedPageId) {
      const url = `${this.apiUrl}/pages/${this.selectedPageId}/elements`;

      this.http.get<any>(url).subscribe(
        (data: any) => {
          if (data && Array.isArray(data.result)) {
            this.treeData = this.buildTree(data.result);
          } else {
            console.error('Неправильный формат данных:', data);
          }
        },
        (error) => {
          console.error('Ошибка загрузки элементов:', error); 
        }
      );
    } else {
      console.error('ID страницы не выбран');
    }
  }

  private buildTree(elements: any[]): any[] {
    const elementMap = new Map<string, any>();
    elements.forEach(element => {
      element.children = element.children || [];
      elementMap.set(element.id, element);
    });

    const buildTreeRecursive = (elementId: string): any => {
      const element = elementMap.get(elementId);
      if (!element) {
        return null;
      }

      return {
        name: element.name,
        children: elements
          .filter(el => el.parentId === elementId)
          .map(el => buildTreeRecursive(el.id))
          .filter(child => child !== null)
      };
    };

    const rootElements = elements
      .filter(element => element.parentId === null)
      .map(element => buildTreeRecursive(element.id))
      .filter(root => root !== null);

    return rootElements;
  }
}
