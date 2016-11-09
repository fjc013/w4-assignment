# Mongo REPL Syntax Tips

## Updating a user - turn on "admin privs"

```
> use conFusion
> db.users.update({username:"admin"},{$set : {admin:true}});
```
 ## Show all users

 ```
 > db.users.find().pretty();
```

## Remove all documents from a collection
```
> db.favorites.remove({});
```

## Facebook AppId and App Secret

App ID: 339061263125515
App Secret: 6c6e8f0d1aaddb775b33fd019ec317f6
