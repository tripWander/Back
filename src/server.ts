// import { port } from ' config/config';
import dataSource from '@/db';
import app from './app';

const port = 8080
dataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log('server started', port);
  });
});
