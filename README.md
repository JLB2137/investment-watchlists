# Stock Watchlists

## Technologies Used

- CSS
- React
- NodeJS
- Axios
- Express
- React Responsive
- Yahoo Finance RapidAPI
- Google Firebase (Authentication)
- React Router
- Mongoose
- MongoDB (Database)


## Screenshots

##### *Stock Watchlists*
![Stock Watchlists](/public/images/hp.png "Stock Watchlists")

##### *Gift Guide Navigation*
![Stock Watchlists Navigation](/public/images/nav.png "Stock Watchlists Navigation")

##### *About Page*
![About Page](/public/images/about.png "About Page")

##### *Search Page*
![Search Page](/public/images/search.png "Search Page")

##### *Stock Page*
![Stock Page](/public/images/stock.png "Stock Page")

##### *Settings Page*
![Settings Page](/public/images/settings.png "Settings Page")

##### *Watchlist Page*
![Watchlist Page](/public/images/watchlist.png "Watchlist Page")



## Getting Started

[Stock Watchlists](https://investment-watchlist.netlify.app/)

The Stock Watchlists app is designed to be an all encompassing tracker for stocks based on user input and saved settings.

1. Navigation - Navigation persists on all pages accross the gift guide. It has an attached 5 functions, which are contingent sign-in status.
   1. Home - This button will return you to the home page from any location. The home page maintains example data on the information provided to the user based on the stock.
   2. About - This page is meant to guide the user on some of the functions included on the site. It includes information on all the pages provided to the user.
   3. Search - This will bring the user to the search page that requires input of a stock symbol. Hitting the search button on this page will redirect the user to that stock's page and provide the user with detailed information.
   4. Watchlist - This route can actually be renamed using the settings page mentioned below. This page contains a lesser amount of information on each stock the user add's to the their watchlist from the stock page.
   5. Settings - This page will route the user to the settings for their unique Stock Watchlist's setup. This information will be saved, so any changes will reapear upon login.

2. Stock Pages - This page maintains detailed information on a stock including daily information, pre-market information, book information, and trading information. This page maintains a CTA below the data that compares against the user's current watchlist. If the stock is in the watchlist, it will tell the user "Added to Watchlist", otherwise a CTA will appear to track the stock.

3. Watchlist Page - This page is locked for users that are not signed-in. The name of the watchlist can be edited by the user using the settings page. Each added stock will provide a CTA to the stock page for additional information by clicking the ticker. This page will provide basic details for every stock on the list including company name, price, daily percent change, and daily volume. All stocks can then be removed from the watchlist using the CTA at the bottom of the card. 

4. Settings Page - This page allows the user to change their individual settings and is locked for only signed-in users. The page allows the user to update the navigation/main color as well as the accent color of their setup. Additionally, it provides the ability to change the name of the user's watchlist. Hitting the update button will then save this information for future use.


## Future Enhancements

I would like to continue to make updates to the CSS to beautify the site and provide the user with relevant data.
