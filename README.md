# QforQuants
The MEAN stack application for Quantitative Questions Forum.


In Progress.... :)

Mean while can check the basic functionality.

To run the application just follow below basik steps and your are ready to go......

* prerequisite :-
    1) Install latest version of Git    : https://git-scm.com/downloads
    2) Install latest version of Node   : https://nodejs.org/en/download/
    3) Install latest version of MongoDb : https://www.mongodb.com/download-center

Install software, set path variables respectively.

After installation of above software, now its time to run the application.

step 1 : go to your application DIrectory .. e.g yourdir/app
then run npm install in app directory.

  e.g. yourDir/app> npm install.
  
step 2 : run bower in your app directory.

  e.g yourDir/app> bower install.
  
step 3: start the Mongo service
  start the mongo db server in another cmd. using command 
    cmd> mongod
  then create one database of any name.
  
  open the connetionUtil.js file and replace connection string with your new connection string.
  test the connection string is working or not.
    
step 4 : open another terminal go to your application directory. and run below command
 
 e.g. yourDir/app/server> node index.js
  
  now open the browser and type 'http://localhost:5000'
  
  
  Thanks.
  



