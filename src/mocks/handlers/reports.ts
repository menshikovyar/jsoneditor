import { http } from 'msw';
import { environment } from '../../environments/environments';
import { getPagesResolver, getElementsResolver, updateObjectResolver } from '../resolvers';

const apiUrl = environment.apiUrl;

export const reportsHandlers = [
  http.get(`http://localhost:4200/pages`, getPagesResolver),
  http.get(`http://localhost:4200/pages/:id/elements`, getElementsResolver),
  http.put(`http://localhost:4200/elements/:element_id`, updateObjectResolver),
];
