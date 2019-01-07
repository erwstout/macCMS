# Users API

Collection of user endpoints. All user endpoints must be requested from inside the admin with a valid logged in user. These endpoints are not public and cannot be accessed outside of the admin as of now.

## Get All Users `/mac-cms/api/users`

Returns all users except users that have been deleted or contain a `deleted_at` value in the database.

## Get All Deleted Users `/mac-cms/api/users/deleted`

Returns all users that contain a `deleted_at` value in the database.

## Delete A User `/mac-cms/api/users/delete/:id`

Delete a user by ID. This keeps them in the database but adds a `deleted_at` timestamp to the database so they can be restored again later.

## Permanently Delete (Remove) A User `/mac-cms/api/users/remove/:id`

Permanently delete (remove) a user from the database. They cannot be restored after being permanently deleted.

## Restore A User `/mac-cms/api/users/restore/:id`

Restores a deleted user to an "active" state.

## Add A User `/mac-cms/api/users/add`

Adds a new user to the database. Expects `req.body` to be populated with user fields. This also automatically hashes the supplied user password and saves the hashed password to the database.

## Update User Data `/mac-cms/api/users/update`

Updates user record. Expects fields to be passed via `req.body`. It automatically removes any fields populated with empty strings so they remain `null` in the database record.

## Update/Change User Password `/mac-cms/api/users/change-password`

Requires the user `id` to be passed through `req.body` as well as `currentPassword` and `newPassword` fields. Automatically checks the current hashed password to ensure correctness and hashes new password and is stored in the database.
