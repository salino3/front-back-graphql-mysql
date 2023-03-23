// tsc --init
// npm i typescript ts-node express cors nodemon dotenv
// npm install @types/cors @types/express @types/node
// npm install typeorm mysql2 graphql express-graphql

import express  from 'express';
import {graphqlHTTP} from 'express-graphql';
import  dotenv from "dotenv"; 
import cors from 'cors';
import {schema} from './Schema'
import {createConnection} from 'typeorm';
import {Users} from './Entities/Users';

dotenv.config();

const main = async () => {
    

    await createConnection({
      type: "mysql",
      database: process.env.DATABASE,
      username: process.env.USER,
      password: process.env.PASSWORD,
      port: 3307,
      logging: true,
      synchronize: true,
      entities: [Users],
      insecureAuth: true, // opción agregada para solucionar problema deprecated
    }); 
     
    const app = express();
    app.use(cors()); 
    app.use(express.json());
    app.use("/graphql", graphqlHTTP({
        schema,
        graphiql: true
    })) 

    app.listen(process.env.PORT || 3300, () => {
        console.log("Server running on port " + process.env.PORT || 3300);
    });
};

main().catch((err) => { 
    console.log(err)
}); 