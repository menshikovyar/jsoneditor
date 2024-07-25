import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'prizm-select-base-example',
  templateUrl: './WindowComponent.html',
})
export class PrizmSelectBaseExampleComponent implements OnInit {
  readonly control = new UntypedFormControl('');
  items: string[] = [];
  pages: any[] = [];
  selectedPageId: string = '';
  treeData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPages();
  }

  private loadPages(): void {
    this.http.get<any>('assets/pages.json').subscribe(
      (data: any) => {
        this.pages = data.result;
        this.items = this.pages.map(page => page.cell?.data?.name || '');
        if (this.items.length > 0) {
          this.control.setValue(this.items[0]);
          this.onPageChange();
        }
      },
      (error) => {
        console.error('Error loading pages JSON:', error);
      }
    );
  }

  onPageChange(): void {
    const selectedPageName = this.control.value;
    const selectedPage = this.pages.find(page => page.cell?.data?.name === selectedPageName);
    if (selectedPage) {
      this.selectedPageId = selectedPage.id;
      this.loadTreeData();
    }
  }

  private loadTreeData(): void {
    this.http.get<any>('assets/elements.json').subscribe(
      (data: any) => {
        this.treeData = this.buildTree(data.result);
        console.log('Загруженные данные дерева:', this.treeData);
      },
      (error) => {
        console.error('Error loading elements:', error);
      }
    );
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
        id: element.id,  
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
