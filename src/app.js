const express = require("express");
const { uuid, isUuid} = require('uuidv4');
const cors = require("cors");


// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];



app.get("/repositories", (request,response) => {
    

  return response.json(repositories)
 

});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes}= request.body;

 const repositorie = { id: uuid(), title, url,techs,likes}

 repositories.push(repositorie);

 return response.json(repositorie)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const { title, url, techs} = request.body;
  
  const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id == id)

  if (repositoriesIndex < 0) {
      return response.status(400).json({error: "Repositorie not Found"})
  }

  const repositorie = {
      id,
      title,
      url,
      techs

  };
  repositories[repositoriesIndex] = repositorie;
  

  return response.json(repositorie);


});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  
  
  const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id == id)

  if (repositoriesIndex < 0) {
      return response.status(400).json({error: "Repositorie not Found"})
  }

  repositories.splice(repositoriesIndex, 1)
  

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
 
  const {id} = request.params;
  
  const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id == id)

  if (repositoriesIndex < 0) {
      return response.status(400).json({error: "Repositorie not Found"})
  }

repositories[repositoriesIndex].likes+= 1;

  return response.json(repositories[repositoriesIndex])

});

module.exports = app;
