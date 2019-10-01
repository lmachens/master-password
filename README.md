# master-password

Simple secrets manager for Node.js.

## First start

You need to generate a master password, which is used to encrypt the secrets.

```
node src/createHash.js YOUR_MASTER_PASSWORD
```

## Usage

There are three commands: `set`, `unset` and `get`
Secrets are saved by a KEY, which is unique.

### set

Use `set` to add or update a secret:

```
node src/app.js add KEY VALUE
```

### unset

Use `unset` to remove a secret:

```
node src/app.js unset KEY
```

### get

User `get` to receive a secret:

```
node src/app.js get KEY
```
