# Done App

Personal project to track the tasks I finish during the day and save them to Firestore.

The idea is I can use the tool anywhere whether at work or from home using CLI and being able to list
the tasks I've done on any particular day.

## Install

```
npm install -g doneapp
```

## Requirements
You need a firebase account and then a firestore database.

Once you signup, you need to create the firestore database and download your service account file.


## Env variables

| Variable | Description |
| - | - |
| `DATABASE_URL` | firestore database url |
| `SERVICE_ACCOUNT_FILE` | location of service account json file |
| `COLLECTION_NAME` | firebase collection name |

## TODO
- Add images on how to signup to firebase and download the service account file.