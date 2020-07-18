# Moola 💸
Sometimes a product is a little expensive so you wait for the price to go down but you feel like you need to check it everyday. Well I've been buying a lot online recently and have come across this problem and I was looking to make a little project with Node.js and I think I can fix this problem with Node.  
  
What I want to do is add a product to an excell sheet and set a price desired price for the product. When the product is that price or below it will send me an E-mail that says what product it is, what price it is and a link to the product.
## How I made it 👨‍💻
Someone gave me the idea to get infromation out of a excel file.  
  
I chose to use Google Sheets because I can use it on every device where I login so access is easy. I use [Sheetsu](https://sheetsu.com/) to turn my Google Sheet into a API that I can fetch with Node.js.  
In my sheet I fill in a product name, desirend price and a link to the product.
  
  ![sheet](img/sheet.jpg "google sheet")

With Node I fetch the API and loop trough the rows and scrape every link to find it's price.  
I then compare each product price to the desired price to check if the price is lower or equal, if that is true I add the product to my mail which will be send with nodemailer at the end of my foreach loop. Thia whole process happends once a day on a server.
  
![email](img/email.png "e-mail")
  
## What I learned
- [x] Node.js webscraping with: *request-promise* & *cheerio*
- [x] Node.js emails with: *nodemailer*
- [x] Sort of making an API with: *Sheetsu*
- [x] How to use environment variables
