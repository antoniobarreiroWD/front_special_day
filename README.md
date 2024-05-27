# Legal Medicine Application

Legal Medicine is an application designed to streamline legal medicine procedures in the city of A Coruña. It allows professionals to create documentation for procedures, edit them, manage the pathology phase, and issue a final report that can be utilized in various judicial dependencies. The application aids professionals with services such as geolocation in complex areas, enhancing efficiency and accuracy in their work. This MERN stack-based app (MongoDB, Express, React.JS, Node) is equipped with features to ensure secure and organized management of sensitive medical legal documentation, facilitating the smooth operation of legal medical processes.

## Deployed Application

The deployed application can be found at the following link: "####".

To install all the dependencies used in the project, simply run the command:


## Environment Variables

You will need to create a .env (or .env.local) file if you want to run this project locally. In order to do so you will also need variable:

- REACT_APP_GOOGLE_MAPS_API_KEY

## Application Routes

| URL path | Description | Protected |
| :---: | :---: | :---: |
| / | Home page | ✅ |
| /login | Login page | ❌ |
| /guardhome | Procedure Home Page | ✅ |
| /create | Create Procedure Page | ✅ |
| /showprocedure/:id | Show one Procedure | ✅ |
| /editprocedure/:id | Edit One Procedure | ✅ |
| /pathology | Pathology Home Page | ✅ |
| /showpathology/:id | Show one Pathology | ✅ |
| /editpathology/:id | Edit One Pathology | ✅ |
| /finalreport | Final Report Home Page | ✅ |
| /showfinalreport/:id | Show one Final Report | ✅ |
| /editfinalreport/:id | Edit One Final Report | ✅ |
| /profile | Profile | ✅ |
