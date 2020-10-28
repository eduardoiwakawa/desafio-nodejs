const express = require("express");
const cors = require("cors");

const {uuid , isUuid} = require('uuidv4');


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


//: 'https://github.com/eduardoiwakawa/desafio-nodejs.git' 


app.post("/repositories", (request, response) => {
 const {title, url , techs}  =  request.body;
 const repository = { id: uuid() , title , url,  techs, likes: 0 };
  repositories.push(repository);
  if(isUuid(repository.id)){
  return response.json(repositories[0]);
 }else{
  return response.status(400).send();
 }
 
});

app.get("/repositories", (request, response) => {
 
  return response.json(repositories);
});



app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title , url , techs , likes } = request.body;

  const repositoryIndex = repositories.findIndex( item => item.id === id);
    if(repositoryIndex < 0){
        return response.status(400).send();
    }
  const repository = { id, title, url , techs, likes:repositories[repositoryIndex].likes };
  repositories[repositoryIndex] = repository;
  return response.json(repository);
  
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex( item => item.id === id);
  if(repositoryIndex < 0){
      return response.status(400).send();
  }
  repositories.splice(repositoryIndex ,1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex( item => item.id === id);
  if(repositoryIndex < 0){
      return response.status(400).send();
  }

  repositories[repositoryIndex].likes ++;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;

