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

## Facebook AppId and App Secret stashed in Google Drive
