# Shoemania - Semester Project (May 2021)

![mockup image of project](/images/shoemania-mockup.jpg)

Shoemania is a e-commerce website that has both a client-side and an admin-site section. Administrators can log in and add, change or delete products, and customers can add products to a shopping cart.

[Live version (currently in maintenance)](https://smselnes-shoemania.netlify.app/)

## Description

The project brief gave us following requirements:

### Client-side

- Landingpage

  - A hero banner containing an image uploaded to Strapi.
  - A list of featured products. These markings are changed inside the Strapi Admin panel.

- Products page

  - A list of all the products stored in Strapi. Products are displayed with a title, price and an image. Clicking on a product links to its specific details page.
  - Filtering functionality. It is possible to search through the products by filtering their titles.

- Product detail page

  - The details page contains a title, a description, price, an image and a "add to cart" button. Clicking this button toggles the product in and out of localstorage.

- Cart page
  - This page displays the products added to cart. If no products are added, there is a message displayed saying there is no favourites.
  - Products inside the cart displays a title, price, image and a link back to its specific details page.
  - Total price for all products added to the cart.

### Admin-side

- Login / Logout page.

  - A login form allowing admins to login by using localstorage to store user credentials.
  - When logged in, it displays a logout button which logs the user out and navigates back to landingpage.

- Add/Edit products
  - These forms allow logged in users to create or edit products. This functionality allows the user to toggle whether the product is featured or not.

## Built with

- Strapi (back-end CMS)
- Bootstrap
- Sass
- Trello (planning)
- Adobe XD (style tile + prototype)

## Getting started

### Installing

1. Clone the repository
2. Open in live server
