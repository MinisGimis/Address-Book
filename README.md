# Address Book

Address Book - Web FrontEnd (Angular)

The bulk of the code is in ```/addressBook/src/app```

# Deployment / Running Instructions

1. Navigate to the root directory with ```cd addressBook```
2. Install node modules with ```npm install```
3. Run with ```npm run``` or ```ng serve```. Answer any questions it throws at you.
4. It should be started annd live on ```http://localhost:4200/```

## Alternative
1. https://agreeable-bay-0ab71a70f.4.azurestaticapps.net

# My approach
My approach was to have two main components, Book (the directory of users), and Details (the detailed view of a single user). Then we would have a service, Address, in charge of fetching and caching the data from the API.

In short, the component being displayed would depend on our navigation route, with /book going to Book and /detail going to Details. Books would request for a page of users from Address to display, who fetches the data from the API. Clicking on any of the users navigates us over to /detail, displaying the Detail component, who again requests for data (single user this time) from Address. Pressing the back button from the Detail component brings us back to /book.

Here is a lovely reference image I drew
<img width="645" alt="image" src="https://github.com/MinisGimis/Address-Book/assets/81587461/f7433e49-278a-4537-95a0-347326c184f1">

More specifically, Book component looks at the page number parameter in the navigation to determine what page to request from Address. It then assigns each of the users on the page an index from 1 to 10 (10 being the limit of users per page), and clicking on one of the users shoots our navigation over to /detail/id, where id is  ((page number we were on - 1) * (number of users per page) + (index of selected user)). When the Detail component takes over, it takes this id, and figures out the page and index of the user, before requesting it from Address, who at this point should hopefully have the data in cache. Address fetches and stores data from the API one page (of 10 users) at a time. If Address has the requested page/user stored in cache, it will immediately return it. Otherwise, it will first make an API call.

In addition to the 2 main components, I also created a simple button component and a header component.

I might have misunderstood the project as I was streaming data in 1 page of 10 users at a time rather than calling a single page of 1000+ users and then splitting it into chunks of 10. Though I did notice that fetching 1 page of 20 users gave different users than if you were to fetch 2 consecutive pages of 10.

I decided not to include sensitive data like SSN and login credentials.

# Features I've implemented
- deployed for all to enjoy! https://agreeable-bay-0ab71a70f.4.azurestaticapps.net
- quick navigation using address bar/url. Changing the url to /book/823 will bring you to page 823. /detail/12398 will pull up user 12398. (A bit broken on azure hosting, dns issue I think)
- Navigate using the browser's back-and-forth button.
- Friendly UI for all devices (I think, I did visual tests with Chrome's emulators)
- Detailed information UI shifts depending on screen size
- Tab navigation is supported
- Aria labels added
- Click/tap to quickly copy information on detailed view
- Clicking on "Location" copies their full address and postal code
- First loads up requested page before asynchronously preloading surrounding pages in the background
- Hidden home button (goes to page 1) disguised as website name in header
- refresh button in header that wipes cache in case your data is outdated
- fixed position Previous and Next page buttons so you don't have to scroll to the very top of the page every time to navigate
- bit of css :hover and stuff to make the ui more intuitive
- Not super garbage look to ui
- it works

# Potential Features
- Increase preloading of pages in the background. I got this idea of preloading the two pages around our currentPage, then continually expanding outwards as we preload more and more pages. So say we start with page 10, we would first preload 9 and 11, followed by 8 and 12, etc.
  - Estimated time: 1-3 hours. Main difficulty would just be organizing the code so it doesn't look that ugly, and testing to make sure there is no infinite loop or significant performance decrease.
- Dark mode
  - Estimated time: 1 hour or less. It should just be changing some colours around. (making it look nice is another thing)
  - Not sure how worth it this would be as this SAAS would likely be targeted to other businesss and I'm just not sure what the usage rate of dark mode is among less tech saavy people.
- bad wifi mode that disables images
  - Estimated time: 1 hour or less.
  - Not sure how significant the performance increase would even be
- jump to x page box
  - an in app way of quickly navigating to a specified page
  - Estimated time: less than 1 hour coding, hard part is figuring out where to put it as screen space is quite scarce on small mobile devices
- Previous/Next User navigation buttons in detailed view
  - Estimated time: less than an hour
- settings to display more information in the list view
  - Estimated time: 1-2 hours
- Changeable page size
  - Estimated time: 2-4 hours
  - This one would involve modifying how service stores and fetches the data. Not hard just changing page size, difficulty comes with how existing data fetched at X page size will mesh with new data at Y page size.
- Moveable navigation buttons. Maybe it being fixed at the top isn't convenient for some
  - Estimated time: 1 hour
- User search/sort
  - Estimated time: 1 day
  - I dont think the way I'm handling streaming the data is too optimal for searching/sorting them.
- Adding more features to the detailed view
  - A way to show how far ahead/behind their time zone is compared to youres/what the time in their time zone is
  - Google maps view or directions to the address
  - Little flag for country/nationality
  - Click to call or email
- Better looking loading message and animations
- Get a custom domain so I can modify dns settings and fix the url navigation

