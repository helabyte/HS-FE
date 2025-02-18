import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'test' } = {}) {
  return createServer({
    environment,

    models: {
      question: Model,
    },

    seeds(server) {
      server.create('question', {
        id: '1',
        text: 'What is your favorite color?',
        type: 'text',
      });
      server.create('question', {
        id: '2',
        text: 'Do you like pizza?',
        type: 'radio',
        options: ['Yes', 'No'],
      });
      server.create('question', {
        id: '3',
        text: 'Which fruits do you like?',
        type: 'checkbox',
        options: ['Apple', 'Banana', 'Orange'],
      });
    },

    routes() {
      this.namespace = 'api'; // Important:  Match the apiUrl in Angular Service
      this.timing = 400; // Optional delay for simulating real API calls

      this.resource('questions'); // Shorthand for common CRUD routes

      // If you need more control, you can define routes individually:
      // this.get('/questions', (schema) => {
      //   return schema.questions.all();
      // });
      // this.get('/questions/:id', (schema, request) => {
      //   let id = request.params.id;
      //   return schema.questions.find(id);
      // });
      // this.post('/questions', (schema, request) => {
      //   let attrs = JSON.parse(request.requestBody);
      //   return schema.questions.create(attrs);
      // });
      // this.put('/questions/:id', (schema, request) => {
      //   let newAttrs = JSON.parse(request.requestBody);
      //   let id = request.params.id;
      //   let question = schema.questions.find(id);
      //   return question.update(newAttrs);
      // });
      // this.delete('/questions/:id', (schema, request) => {
      //   let id = request.params.id;
      //   return schema.questions.find(id).destroy();
      // });

      this.passthrough(); // Allow real API calls when not handled by Mirage
    },
  });
}
