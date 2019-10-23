# README


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index:true,null: false, unique: true|
|mail|string|null: false|

### Association
- has_many :groups,through: :groups_users
- has_many :messages
- has_many :groups_users

## groupテーブル

|Column|Type|Options|
|------|----|-------|

|chat-space|srting|null: false|

### Association
- has_many :users,through: :groups_users
- has_many :messages
- has_many :groups_users


## messageテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|
|tweet|string
|image|string

### Association
- belongs_to :group
- belongs_to :user
