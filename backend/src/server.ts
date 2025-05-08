import express, { json } from 'express';
// import { sequelize } from './database/models'; 
// import { Developer } from './database/models/developer';

const app = express();
const port = 3000;

// Middleware
app.use(json());

// Routes
app.get('/', (req, res) => {
  res.send('Backend Server...');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);

  // const run = async () => {
  //   try {
  //     await sequelize.authenticate();
  //     Developer.initModel(sequelize);
  
  //     const dev = await Developer.create({
  //       name: "Dev Name",
  //     });

  //     const developers = await Developer.findAll();
  //     console.log(developers);
  
  //     console.log('Developer created:', dev.toJSON());
  //     await sequelize.close();
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  
  // run();
});
