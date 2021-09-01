A listing tool that allows me to add races into a Firebase database, and then lets users filter by their favourite simracing game.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

In order to run this listing with your own projects you'll need an account with Firebase, and create a _Realtime Database_. Then create `.env` file on your root with the following information, just replace the XXXXXXXX with your keys:

```
REACT_APP_API_KEY=XXXXXXXX
REACT_APP_AUTHDOMAIN=XXXXXXXX
REACT_APP_DATABASEURL=XXXXXXXX
REACT_APP_PROJECTID=XXXXXXXX
REACT_APP_STORAGEBUCKET=XXXXXXXX
REACT_APP_MESSAGINGSENDERID=XXXXXXXX
REACT_APP_APPID=XXXXXXXX
REACT_APP_MEASUREMENTID=XXXXXXXX
```

### Create an admin user and set up rules

In order to add new races, you'll need to create an user on Firebase. This user will be also allowed to manage and create new races, so copy its UID, go to your Realtime Database and check the `Rules`.

You'll need the following, just change `youruid`:

```
{
  "rules": {
    "races": {
      ".read": true,
      ".write": "auth !== null && auth.uid === 'youruid'"
    }
  }
}
```

### Adding new content

Once you've created a Firebase user and set up the database rules, visit <yoururl>/race-control/ to log in with the user you have just created, you'll see all your added races (at this point none) and be able to create new ones.

  
## Scripts

In the project directory, you can run:

* `yarn start` - to run the page in development mode
* `yarn build` - to create a build distribution ready to be pushed to whatever you're using to serve it

## Contributing

There's a big piece missing in order to make this project successful, and that's a way for league managers to easily add their own races, instead of me having to manually add them to the system.

This could be an API they can call to publish their races, or more likely a league admin area were people can sign up and add their own content. That content will need to be reviewed before getting public in order to avoid spammers.

If you'd like to contribute just get in touch! 
  
## License

This repository is licensed under a [Creative Commons Attribution License](https://creativecommons.org/licenses/by/3.0/us/)
