
# Introduction

   “Hello, Hotcakes!” is an up and coming restaurant that believes in making the best pancakes around! You’ll love their pancakes whether you enjoy the classics or tasty, new surprises. 

   The restaurant is getting busier every day, and no one likes waiting in crowds - takeout is “in”! To keep up, the restaurant needs a new way to serve those sweet pancake stacks… 
   
   This application lets customers create orders online while offering a curated experience that is unique to Hello, Hotcakes! 

# Purpose & motivation for project 

   I had a few diffrent learning goals in mind when creating this web application! 
   
   A big focus of the project was to practice working with API. The project was centered around creating a CRUD application where a database was used to create, read, update, and delete information. 

   I was also interested in designing and creating forms. The application uses a variety of form input fields and buttons with different functionality for users to interact with. 

   Lastly, I wanted to use CSS to give the website a custom color palette, layout, and typography to establish a comforting, homely but still modern look and feel. 

# How does the application work? 

   This is a front-end application or app that uses a local host server to function. 

   The app opens to a sign-in form with a link to a registration page. Those already registered as users can sign in and access the app's features while new users will need to register first. The app classifies users as two types, “Guest” and “Member”, which is decided by the user when they register. The features that users can access depends on their type.  

   All users get access to the restaraunt's "Custom Menu", which is a page view that shows four select input fields and a submit button. Each select input field holds options that for the user to choose. When the user makes their selections using the input fields and clicks the submit button, the user's selections combine to form an "item" that is stored in the database. An "order" is then formed based on the item and stored in the database.

    ![](https://github.com/hello-hotcakes/http://g.recordit.co/ca1LDOeq4x.gif) 
   
   All users have access to another form called the "Classic Menu", which is a page view with a list of radio input fields and a single submit button. Each radio input represents one "item". When the user selects an item and clicks the submit button, an "order" is created and stored in the database. 

   ![](https://github.com/hello-hotcakes/http://g.recordit.co/P5EySLBInn.gif)

   A third form/page view is also available, called "Secret Menu". This form functions like the "Classic Menu" form, but it is only available to users that are marked as members. 

    ![](https://github.com/hello-hotcakes/http://g.recordit.co/VremFCN51g.gif) 
   
   Each "order" created is displayed on the "Cart" page, which references a unique "cart" object that is created for each user after they sign into the app. Each order reflected on the cart page has its own edit button and delete button. 

   When the edit button for an individual order is clicked, the user is redirected to an edit form with a save button. The edit form will show the user's original selections and let them make changes. After clicking the save button, the changes are recorded and the database updates the matching order/item. Finally, the user is then redirected back to the Cart page to see their changes reflected on the order they edited. 

    ![](https://github.com/hello-hotcakes/http://g.recordit.co/3YkFrZ8wD3.gif) 

    ![](https://github.com/hello-hotcakes/http://g.recordit.co/mswkME7uXS.gif) 

    ![](https://github.com/hello-hotcakes/http://g.recordit.co/NuSOKNX0H3.gif)
   
   When the delete button for an individual order is clicked, the order/item is removed from the database. As a result, the order no longer appears on the Cart page. 

   ![](https://github.com/hello-hotcakes/http://g.recordit.co/Y5cD7qK5vr.gif) 

   ![](https://github.com/hello-hotcakes/http://g.recordit.co/33YSG9q9yk.gif)

   To simulate finalizing the orders in the cart, users can click a "Checkout" button that navigates to a new page view called "Checkout". 

# How was the application developed?

   The app was created using React JS and CSS. 

   ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) 


# How to install and run the application. 
   
   The application uses two repositories, "hello-hotcakes" and "hello-hotcakes-api", and runs using React. The "hello-hotcakes" repository holds the project module/component code. The "hello-hotcakes-api" repository holds the API database module. The app is optimized for desktop. 

   **FIRST**, users should PULL the repositories from GitHub. Please see below for links. 

   https://github.com/pancakes-because/hello-hotcakes 
   https://github.com/pancakes-because/hello-hotcakes-api 
   
   **SECOND**, users should complete the following package installations in order for the application to run. Users should be inside the "hello-hotcakes" directory before starting this process. Once inside the directory, users will run the following command to install React in their terminal, `npm install --save react-router-dom`. 

   **THIRD**, users may run the following command in their terminal, `npm start`, when they are ready to run the application. The browser will open the http://localhost:xxxx URL automatically. When successful, the message below will dispaly in the terminal. 

    " Compiled successfully!

      You can now view hello-hotcakes in the browser.

      Local:            http://localhost:xxxx
      On Your Network:  http://xxx.xx.xx.xxx:localhost#

      Note that the development build is not optimized.
      To create a production build, use npm run build.

      webpack compiled successfully " 

   **FOURTH**, users will open a NEW terminal window or tab to run the API in the background. Users should be inside the "hello-hotcakes-api" directory. Users will then enter this command in the terminal, `json-server -p 8088 database.json`. When successful, the message below will display in the second terminal window/tab. 

      " \{^_^}/ hi!
      
        Loading database.json
        Done 

        Resources
        http://localhost:8088/users
        http://localhost:8088/carts
        http://localhost:8088/pickUpTimes
        http://localhost:8088/menuOrders
        http://localhost:8088/menuItems
        http://localhost:8088/secretMenuOrders
        http://localhost:8088/secretMenuItems
        http://localhost:8088/customMenuOrders
        http://localhost:8088/customMenuItems
        http://localhost:8088/batters
        http://localhost:8088/fillings
        http://localhost:8088/toppingOrders
        http://localhost:8088/toppings
        http://localhost:8088/stackSizes
        
        Home
        http://localhost:8088 " 
   
# Difficulties & challenges faced during the process.

   Because the application has a lot of functionality behind it, a more challenging aspect of the project was managing the data relationships involved. For example, it was challenging to get the user created orders to carry over and display on the Cart page. In addition, it was also tricky making sure that users could create more than one order from each menu and add them to the cart. 
   
   The second most difficult yet rewarding piece of the application was getting the edit functionality to consistently work. There was a lot of trial and error with creating the fetch calls used, especially with the custom menu item and order objects, and ultimately a lot of testing and adjustments were required. 

# Integration tests 

   ### CREATE AN ORDER USING THE "CLASSIC MENU" FORM 

   Start on the "Login" page.
   If needed, register as a new user. Either user type is fine. 
   Sign in as user on the "Login" page. 
   Upon signing in, the user will be on the "Home" page. 
   See the navbar at the top of the page and click "Classic Menu". 
   User should see a form they can fill out to create their order. 
   User will make a selection by clicking one of the radio button inputs. 
   User will then click the "Add to Cart" button. 
   User should see a feedback message saying that the order was added to the cart. 
   In the API/database, a new bject should be created in the "menuOrders" array. 
   User may visit the "Cart" page. 
   User should see the order they created under the "Classic Menu Orders" heading. 

   ### CREATE AN ORDER USING THE "SECRET MENU" FORM 

   Start on the "Login" page.
   If needed, register as a new user first. Register with member checkbox marked. 
   Sign in as a member user on the "Login" page. 
   Upon signing in, user will be on the "Home" page. 
   See the navbar at the top of the page and click "Secret Menu". 
   User should see a form they can fill out to create their order. 
   User will make a selection by clicking one of the radio button inputs. 
   User will then click the "Add to Cart" button. 
   User should see a feedback message saying that the order was added to the cart. 
   In the API/database, a new object should be created in the "secretMenuOrders" array. 
   User may visit the "Cart" page. 
   User should see the order they created under the "Secret Menu Orders" heading. 
 
  ### CREATE AN ORDER USING THE "CUSTOM MENU" FORM 

   Start on the "Login" page.
   If needed, register as a new user. Either user type is fine.  
   Sign in as user on the "Login" page. 
   Upon signing in, the user will be on the "Home" page. 
   See the navbar at the top of the page and click "Custom Menu". 
   User should see a form they can fill out to create their order. 
   For each field available, user should make a selection by choosing an option from the drop-down menu.
   User will then click the "Add to Cart" button. 
   User should see a feedback message saying that the order was added to the cart. 
   In the API/database, a new object should be created in the "customMenuItems" array. 
   In the API/database, a new object should be created in the "customMenuOrders" array. 
   User may visit the "Cart" page. 
   User should see the order they created under the "Custom Menu Orders" heading. 

   ### EDIT A CLASSIC MENU ORDER 

   Start on the "Cart" page. 
   Please see orders listed under the "Classic Menu Orders" heading. 
   If there are no orders, user may complete and submit the "Classic Menu" form to create an order first.

   For an individual order listed, click the "Edit Order" button. 
   User will be redirected to the "Classic Menu" edit form. 
   The edit form will show the radio button input selected to create the original order. 

   User may edit the curent order's selection by clicking a different radio button. 
   User may click the "Save Edit" button to record the new selection. 
   User will be redirected to the Cart page. 
   User may refer back to the "Classic Menu Orders" heading. Check the individual order that was edited. 
   The order should be different and reflect the user's new choices(s) recorded by the edit form. 
   In the API/database, the value of the "menuOrderItemId" property of the "menuOrder" object should be different. 

   ### EDIT A SECRET MENU ORDER 

   Start on the "Cart" page. 
   Please see orders listed under the "Secret Menu Orders" heading. 
   If there are no orders, user may complete and submit the "Secret Menu" form to create an order first.

   For an individual order listed, click the "Edit Order" button. 
   User will be redirected to the "Secret Menu" edit form. 
   The edit form will show the radio button input selected to create the original order. 

   User may edit the curent order's selection by clicking a different radio button. 
   User may click the "Save Edit" button to record the new selection. 
   User will be redirected to the Cart page. 
   User may refer back to the "Secret Menu Orders" heading. Check the individual order that was edited. 
   The order should be different and reflect the user's new choices(s) recorded by the edit form. 
   In the API/database, the value of the "secretMenuOrderItemId" property of the "secretMenuOrder" object should be different. 

   ### EDIT A CUSTOM MENU ORDER 

   Start on the "Cart" page. 
   Please see orders listed under the "Custom Menu Orders" heading. 
   If there are no orders, user may complete and submit the "Custom Menu" form to create an order first.

   For an individual order listed, click the "Edit Order" button. 
   User will be redirected to the "Custom Menu" edit form. 
   The edit form will show the select inputs chosen to create the original order. 

   User may edit the curent order's choices by choosing a different option for one or more of the select input fields. 
   User may click the "Save Edit" button to record the new choice(s). 
   User will be redirected to the Cart page. 
   User may refer back to the "Custom Menu Orders" heading. Check the individual order that was edited. 
   The order should be different and reflect the user's new choices(s) recorded by the edit form. 
   In the API/database, the value of the "batterId", "fillingId", "toppingId", and/or "stackSizeId" property of the "customMenuItems" object should be different depending on what was edited by the user. 

   ### DELETE A CLASSIC MENU ORDER

   Start on the "Cart" page. 
   Please see orders listed under the "Classic Menu Orders" heading. 
   If there are no orders, user may complete and submit the "Classic Menu" form to create an order first.

   For an individual order listed, click the "Delete Order" button. 
   Under the "Classic Menu Orders" heading, the chosen individual order should no longer be displayed. 
   In the API/database, the matching object representing the order in the "menuOrders" array should be gone. 

   ### DELETE A SECRET MENU ORDER

   Start on the "Cart" page. 
   Please see orders listed under the "Secret Menu Orders" heading. 
   If there are no orders, user may complete and submit the "Classic Menu" form to create an order first.

   For an individual order listed, click the "Delete Order" button. 
   Under the "Secret Menu Orders" heading, the chosen individual order should no longer be displayed. 
   In the API/database, the matching object representing the order in the "secretMenuOrders" array should be gone. 

   ### DELETE A CUSTOM MENU ORDER

   Start on the "Cart" page. 
   Please see orders listed under the "Custom Menu Orders" heading. 
   If there are no orders, user may complete and submit the "Classic Menu" form to create an order first.

   For an individual order listed, click the "Delete Order" button. 
   Under the "Custom Menu Orders" heading, the chosen individual order should no longer be displayed. 
   In the API/database, the matching object representing the order in the "customMenuOrders" array should be gone. 
   In the API/database, the matching object representing the order in the "customMenuItems" array should be gone.