# README


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index:true,null: false, unique: true|
|mail|string|null: false|

### Association
- has_many :groupes,through: groups_users
- has_many :messages
- has_many :groups_users

## groupテーブル

|Column|Type|Options|
|------|----|-------|
name chat-space

### Association
- has_many :users,through: groups_users
- has_many :messages
- has_many :groups_users


## messageテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|comment_id|text|null: false|
|tweet|string|null: false|
|image|string|null: false|

### Association
- belongs_to :group
- belongs_to :user
- belongs_to :member
