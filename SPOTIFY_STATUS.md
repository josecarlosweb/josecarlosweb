# 🎹 My spotify status


## ✨ The magic behind my spotify status is:

1. Following the [Spotify documentation](https://developer.spotify.com/documentation/web-api/) i create one application and get a `Client ID` and a `Client Secret`.
2. Reading [this documentation](https://developer.spotify.com/documentation/general/guides/authorization/) i generate a `refresh_token` and and `access_token`.
3. [In my personal repository](https://github.com/josecarlosweb/josecarlosweb) i create a `NodeJs` project ('course, you can copy).
4. In this project i wrote the following flux:

![Schedule](/assets/schedule.png)

![Api](/assets/api.png)

5. I create an account on [Heroku](https://heroku.com)
6. I installed and configured [the heroku cli](https://devcenter.heroku.com/articles/heroku-cli)
7. Following [this tutorial](https://devcenter.heroku.com/articles/github-integration) i connected my github repo to heroku and deplyed my application.
8. At last, i used my endpoints to show the image:

```markdown
[![Spotify](https://my-spotify-activity.herokuapp.com/cover?)](https://my-spotify-activity.herokuapp.com/url)
```

