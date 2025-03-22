var express = require("express");
//adicionado
const { Sequelize }=require("sequelize");
const cors=require("cors");
const dbConfig=require("./config/config.json").development;
const usuarioRoutes=require("./routes/usuarioRoutes");
const tareaRoutes=require("./routes/tareaRoutes");
//hasta aqui


//var router = express.Router();
//adicionado
const app=express();
const sequelize=new Sequelize(dbConfig);

// Usa CORS para permitir solicitudes de otros orígenes
const corsOptions = {
  origin:  "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
//utiliza CORS para permitir solicitudes de otros origenes

app.use(cors());
app.use(express.json());
app.use("/usuarios",usuarioRoutes);
app.use("/tareas",tareaRoutes);

//Conectar a la base de datos
sequelize.authenticate()
.then(()=> console.log("Conectando a PostgreSQL"))
.catch(err => console.error("Error al conectar:".err));

const PORT = process.env.PORT || 3001;
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API! Usa /usuarios o /tareas para interactuar.");
});


app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

module.exports = app;
