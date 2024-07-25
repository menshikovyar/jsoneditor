import { http } from 'msw';
import pagesData from '../../assets/pages.json';
import elementsData from '../../assets/elements.json';


const filterPages = (data: any[]): any[] => {
  const filteredPages: any[] = [];

  const traverse = (nodes: any[]): void => {
    nodes.forEach(node => {
      if (node.cell && node.cell.page === true && node.cell.visible === true) {
        filteredPages.push(node);
      }
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    });
  };

  traverse(data);
  return filteredPages;
};

export const getPagesResolver = async ({ request }: { request: Request }) => {
  const filteredPages = filterPages(pagesData.result);
  return new Response(JSON.stringify({ result: filteredPages }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const getElementsResolver = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const id = url.pathname.split('/')[2];

  if (Array.isArray(elementsData.result)) {
    const elements = elementsData.result.filter((el: any) => el.pageId === id);
    if (elements.length > 0) {
      return new Response(JSON.stringify({ result: elements }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ error: 'Элементы не найдены' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } else {
    return new Response(JSON.stringify({ error: 'Неправильный формат данных элементов' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const updateObjectResolver = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const elementId = url.pathname.split('/')[2];
  const body = await request.json();

  return new Response(JSON.stringify({ success: true, element_id: elementId, body }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
