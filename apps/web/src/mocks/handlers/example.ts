import { http, HttpResponse, type RequestHandler } from 'msw';

export const exampleHandlers: RequestHandler[] = [
  http.get('/api/example', () => {
    return HttpResponse.json({
      message: 'hello msw',
    });
  }),
];
