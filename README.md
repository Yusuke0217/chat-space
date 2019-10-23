# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


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
- has_many :groupes,through: members
- has_many :messages
- has_many :members

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|group_id|integer|null: false|

### Association
- has_many :users,through: members
- has_many :messages
- belongs_to :message


## messageテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|message_id|integer|null: false|

### Association
- belongs_to :group
- has_many :users,through: members
- has_many :messages,through: members
