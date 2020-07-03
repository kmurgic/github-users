## Github Users

Github users loads users from the Github API.  Infinite scroll is enabled for the list of users as well as for an individual user's followers and repositories.  The page remembers data that was previously loaded from the API, so you will only see loading spinners the first time you go to a new page.  The page reloads data from the API on refresh by design.

<img src='/public/movieQScreenShot.png' width='850px' height='459px' alt='screenshot'/>

## Built With

* [Create React App](https://github.com/facebookincubator/create-react-app)
* [React Router](https://reacttraining.com/react-router/core/guides/philosophy)
* [React-Testing Library](https://testing-library.com/)

## Features
* Infinite scroll of users, and repositories and followers for individual users
* Ability to filter a list of users or filter followers or repositories of individual users
* Responsive on all device sizes from mobile phones and iPads to desktop computers

## Future Updates

* Finish writing tests for the application
* Limit the number of DOM nodes that will display on a page at one time using DOM recycling
* Improve API error handling

## Demo Video

[<img src='public/GitHubUserList.png' width='290px' height='270px' alt='github-user-list-screenshot'/>](https://youtu.be/DPk5FQq1kpE)