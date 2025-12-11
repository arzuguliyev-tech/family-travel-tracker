import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

let currentIndex = 1;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const db = new pg.Client(
  {
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "arzu1234",
    port: 5432
  });

  db.connect();

  app.get("/",  async (req,res)=>
    {
        const userList = await getUser();
        const currentUser = userList.find((item) => item.id == currentIndex);
        const countrList = await getCountries(currentUser);


        res.render("index.ejs", 
          {
            countries: countrList.map(item => item.country_code),
            total: countrList.length,
            users: userList,
            color: currentUser.color
          })


    });


   
    
 app.post("/user", async(req,res)=>
  { 
      if(req.body.add)
        {
          res.render("new.ejs");
          
        }
        else
          { 
                currentIndex = req.body.user;
                res.redirect("/");
           
          }

        

  });
  
  


  app.post("/add", async(req, res)=>
    {
        try{


            const userInput = req.body.country.trim().toLowerCase();
            const { rows: visitedRow } = await db.query("SELECT country_code FROM countrylist WHERE LOWER(country_name) LIKE '%' || $1 || '%';", [userInput]);

            const userList = await getUser();
            const currentUser = userList.find((item) => item.id == currentIndex);
            

             const visitedCountry = visitedRow[0];
            
             if(!visitedCountry)
              {
                throw new Error("Country not found");
              }

              const countrList = await getCountries(currentUser);
              const countryCodes = countrList.map(item => item.country_code) 

              const allReadyAdded = countryCodes.includes(visitedCountry.country_code)
              
             if(allReadyAdded)
              {
               return  res.render("index.ejs", 
                  {
                    countries: countryCodes,
                    total: countryCodes.length,
                    users: userList,
                    color: currentUser.color,
                    error: "This country allready added"
                  })
              }
              else
                {
                  await db.query("INSERT INTO visited_with_family(country_code, user_id) VALUES($1, $2)", [visitedCountry.country_code, currentIndex]);
                  countryCodes.push(visitedCountry.country_code);

                  return res.render("index.ejs",
                    {
                      countries: countryCodes,
                      total: countryCodes.length,
                      users: userList,
                      color: currentUser.color,
                      error: "Congrats for your new countyr"

                    })

                }
              
              
              
          
             
       

        }
        catch(error)
        {
          console.log("Error block");
          res.redirect("/");

        }
    });


app.post("/new", async (req,res)=>
  { 
      const newUserName = req.body.name.trim(),
            newsUserColor = req.body.color;

            await db.query("INSERT INTO users(name, color) VALUES($1, $2)", [newUserName, newsUserColor]);
            res.redirect("/");

  });


app.listen(port, ()=>
  {
    console.log(`Server workin ong port: ${port}`)
  })


  async function getUser() {

      const { rows:  theUsers } =  await db.query("SELECT * FROM users");
      return theUsers;

  }

  async function getCountries(params){

        const { rows: countries } = await db.query("SELECT country_code FROM visited_with_family WHERE user_id = $1", [params.id]);
        return countries;
  }